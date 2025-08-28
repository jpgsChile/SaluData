// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title SaluData
 * @notice Un sistema descentralizado para la gestión de datos médicos con identidad criptográfica.
 * @dev La confianza se establece a través del registro de perfiles y claves públicas de cifrado,
 * permitiendo un intercambio de datos seguro y verificado por el consentimiento del paciente.
 */
contract SaluData is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _consentTokenIds;

    // --- ROLES Y ESTADOS ---

    enum Role { None, Patient, Doctor }
    enum AccessStatus { Inactive, Active, Revoked }

    struct UserProfile {
        Role role;
        string publicKey; // ¡LA PIEZA CLAVE! La clave pública de cifrado del usuario.
        string name;
        string licenseNumber;
        string clinicInfo;
    }

    struct MedicalRecord {
        bytes32 recordId;
        address patientOwner;
        address uploadedBy;
        string cid;
        string metaHash;
        uint256 timestamp;
    }

    struct AccessGrant {
        bytes32 recordId;
        address patient;
        address doctor;
        AccessStatus status;
        // NUEVO: Este campo es ahora esencial.
        string encryptedDEK; // La clave del archivo, cifrada con la clave pública del doctor.
        uint256 expiresAt;
    }

    // --- MAPPINGS ---
    mapping(address => UserProfile) public profiles;
    mapping(bytes32 => bool) private doctorUniqueness;
    mapping(bytes32 => MedicalRecord) public records;
    mapping(uint256 => AccessGrant) public consentGrants;

    // --- EVENTOS ---
    event UserRegistered(address indexed user, Role role, string publicKey);
    event RecordUploaded(bytes32 indexed recordId, address indexed patient, address indexed uploader);
    event ConsentGranted(uint256 indexed consentTokenId, address indexed patient, address indexed doctor);
    event ConsentRevoked(uint256 indexed consentTokenId);

    constructor() ERC721("SaluData Consent Receipt", "SDCR") {}

    // --- FUNCIONES DE REGISTRO CON CLAVE PÚBLICA ---

    /**
     * @notice Registra un usuario como Paciente, asociando su clave pública.
     * @param publicKey La clave pública de cifrado del paciente (ej. formato ECIES).
     */
    function registerAsPatient(string calldata publicKey) public {
        require(profiles[msg.sender].role == Role.None, "User already registered");
        require(bytes(publicKey).length > 0, "Public key cannot be empty");

        profiles[msg.sender] = UserProfile({
            role: Role.Patient,
            publicKey: publicKey,
            name: "",
            licenseNumber: "",
            clinicInfo: ""
        });
        emit UserRegistered(msg.sender, Role.Patient, publicKey);
    }

    /**
     * @notice Registra un usuario como Doctor, asociando su clave pública y datos profesionales.
     * @param publicKey La clave pública de cifrado del doctor.
     * @param name Nombre completo del doctor.
     * @param licenseNumber Matrícula profesional.
     * @param clinicInfo Información de la clínica o consultorio.
     */
    function registerAsDoctor(string calldata publicKey, string calldata name, string calldata licenseNumber, string calldata clinicInfo) public {
        require(profiles[msg.sender].role == Role.None, "User already registered");
        require(bytes(publicKey).length > 0, "Public key cannot be empty");

        bytes32 uniquenessHash = keccak256(abi.encodePacked(name, licenseNumber));
        require(!doctorUniqueness[uniquenessHash], "Doctor with this name and license already exists");

        doctorUniqueness[uniquenessHash] = true;
        profiles[msg.sender] = UserProfile({
            role: Role.Doctor,
            publicKey: publicKey,
            name: name,
            licenseNumber: licenseNumber,
            clinicInfo: clinicInfo
        });
        emit UserRegistered(msg.sender, Role.Doctor, publicKey);
    }

    // --- FUNCIONES DE GESTIÓN DE DATOS ---

    function uploadRecord(address patientAddress, bytes32 recordId, string calldata cid, string calldata metaHash) public {
        Role senderRole = profiles[msg.sender].role;
        require(senderRole == Role.Patient || senderRole == Role.Doctor, "Caller must be a registered Patient or Doctor");
        
        if (senderRole == Role.Doctor) {
            require(profiles[patientAddress].role == Role.Patient, "Target address is not a patient");
        } else {
            patientAddress = msg.sender;
        }

        require(records[recordId].patientOwner == address(0), "Record ID already exists");

        records[recordId] = MedicalRecord({
            patientOwner: patientAddress,
            uploadedBy: msg.sender,
            recordId: recordId,
            cid: cid,
            metaHash: metaHash,
            timestamp: block.timestamp
        });
        emit RecordUploaded(recordId, patientAddress, msg.sender);
    }

    // --- FUNCIONES DE PERMISOS ---

    /**
     * @notice El paciente concede consentimiento, creando un NFT con la clave de acceso cifrada para el doctor.
     * @param recordId El ID del estudio al que se da acceso.
     * @param doctor La dirección del doctor que recibirá el acceso.
     * @param encryptedDEK La clave del archivo (DEK), ya cifrada por el paciente con la clave pública del doctor.
     */
    function grantConsent(bytes32 recordId, address doctor, string calldata encryptedDEK) public {
        require(profiles[msg.sender].role == Role.Patient, "Only patients can grant consent");
        require(profiles[doctor].role == Role.Doctor, "Consent can only be granted to doctors");
        require(records[recordId].patientOwner == msg.sender, "Patient does not own this record");

        _consentTokenIds.increment();
        uint256 newConsentTokenId = _consentTokenIds.current();

        _safeMint(doctor, newConsentTokenId);

        consentGrants[newConsentTokenId] = AccessGrant({
            recordId: recordId,
            patient: msg.sender,
            doctor: doctor,
            status: AccessStatus.Active,
            encryptedDEK: encryptedDEK, // Se almacena la clave cifrada.
            expiresAt: block.timestamp + 1 hours
        });

        emit ConsentGranted(newConsentTokenId, msg.sender, doctor);
    }

    function revokeConsent(uint256 consentTokenId) public {
        AccessGrant storage grant = consentGrants[consentTokenId];
        require(grant.patient == msg.sender, "Only the patient can revoke consent");
        require(grant.status == AccessStatus.Active, "Consent is not active");

        grant.status = AccessStatus.Revoked;
        emit ConsentRevoked(consentTokenId);
    }

    // --- FUNCIONES DE LECTURA (Para el Doctor) ---

    function getAccessDetails(uint256 consentTokenId) public view returns (string memory cid, string memory encryptedDEK) {
        require(ownerOf(consentTokenId) == msg.sender, "Caller does not own the consent NFT");
        
        AccessGrant memory grant = consentGrants[consentTokenId];
        require(grant.doctor == msg.sender, "Not authorized");

        if (grant.status != AccessStatus.Active) revert("Access has been revoked");
        if (block.timestamp >= grant.expiresAt) revert("Access has expired");

        MedicalRecord memory record = records[grant.recordId];
        return (record.cid, grant.encryptedDEK);
    }
}