// SPDX-License-Identifier: MIT
pragma solidity 0.8.27; // <--- Versión de pragma unificada

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// NO MÁS IMPORTACIONES DE ENCRYPTEDMETADATA NI TYPES AQUÍ

// === INICIO CÓDIGO DE TYPES.SOL INTEGRADO ===
struct Metadata {
    address messageFrom;
    address messageTo;
    string messageType;
    bytes encryptedMsg;
}
// === FIN CÓDIGO DE TYPES.SOL INTEGRADO ===


// === INICIO CÓDIGO DE ENCRYPTEDMETADATA.SOL INTEGRADO ===
// NO HEREDAMOS DE OTRO CONTRATO, ASÍ QUE LAS FUNCIONES DEBEN SER SIMPLEMENTE INTERNAS
contract SaluData is ERC721 { // <--- Ya no hereda de EncryptedMetadata
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // --- Funciones y Eventos de EncryptedMetadata (INTEGRADOS) ---
    event PrivateMessage(
        address indexed from,
        address indexed to,
        Metadata metadata
    );

    // Esta función ahora es una función interna directamente en SaluData
    function _sendEncryptedMetadata(
        address to,
        string memory messageType,
        bytes calldata message
    ) internal { // Ya no es 'virtual'
        Metadata memory metadata = Metadata({
            messageFrom: msg.sender,
            messageTo: to,
            messageType: messageType,
            encryptedMsg: message
        });
        emit PrivateMessage(msg.sender, to, metadata);
    }
    // === FIN CÓDIGO DE ENCRYPTEDMETADATA.SOL INTEGRADO ===


    // --- ESTRUCTURAS Y ESTADOS (RESTO DE SALUDATA) ---
    enum AccessStatus { Inactive, Active, Revoked }

    struct MedicalRecord {
        bytes32 recordId;
        address owner;
        string cid;
        string metaHash;
    }

    struct AccessGrant {
        bytes32 recordId;
        address patient;
        address doctor;
        AccessStatus status;
        string encryptedDEKForDoctor;
        uint256 expiresAt;
    }

    // --- MAPPINGS ---
    mapping(bytes32 => MedicalRecord) public records;
    mapping(uint256 => AccessGrant) public consentGrants;
    mapping(address => string) public publicEncryptionKeys;

    // --- EVENTOS ---
    event RecordRegistered(bytes32 indexed recordId, address indexed owner);
    event ConsentGranted(bytes32 indexed recordId, address indexed doctor, uint256 indexed consentTokenId);
    event AccessRevoked(uint256 indexed consentTokenId);
    event PublicKeyRegistered(address indexed user, string publicKey);
    // El evento PrivateMessage es ahora parte de este contrato integrado.

    constructor() ERC721("SaluData Consent Receipt", "SDCR") {}

    function registerPublicKey(string calldata publicKey) public {
        require(bytes(publicKey).length > 0, "Public key cannot be empty");
        publicEncryptionKeys[msg.sender] = publicKey;
        emit PublicKeyRegistered(msg.sender, publicKey);
    }

    function registerRecord(bytes32 recordId, string calldata cid, string calldata metaHash) public {
        require(records[recordId].owner == address(0), "Record ID already exists");
        records[recordId] = MedicalRecord(recordId, msg.sender, cid, metaHash);
        emit RecordRegistered(recordId, msg.sender);
    }
    
    function grantConsent(bytes32 recordId, address doctor, bytes calldata encryptedDEKForDoctor, uint256 durationSeconds) public {
        require(records[recordId].owner == msg.sender, "Only owner can grant consent");
        require(bytes(publicEncryptionKeys[doctor]).length > 0, "Doctor has no public key registered");
        require(bytes(encryptedDEKForDoctor).length > 0, "Encrypted DEK cannot be empty");
        
        _tokenIds.increment();
        uint256 newConsentTokenId = _tokenIds.current();

        _safeMint(doctor, newConsentTokenId);
        
        consentGrants[newConsentTokenId] = AccessGrant({
            recordId: recordId,
            patient: msg.sender,
            doctor: doctor,
            status: AccessStatus.Active,
            encryptedDEKForDoctor: string(encryptedDEKForDoctor),
            expiresAt: block.timestamp + durationSeconds
        });

        emit ConsentGranted(recordId, doctor, newConsentTokenId);

        // La llamada a _sendEncryptedMetadata ahora se resuelve dentro de este mismo contrato
        _sendEncryptedMetadata(doctor, "ACCESS_KEY_DEK", encryptedDEKForDoctor);
    }

    function getAccessDetails(uint256 consentTokenId) public view returns (string memory cid, string memory encryptedDEK) {
        require(_ownerOf(consentTokenId) == msg.sender, "Caller does not own this consent token");
        
        AccessGrant memory grant = consentGrants[consentTokenId];
        
        require(grant.doctor == msg.sender, "Not authorized");
        require(grant.status == AccessStatus.Active, "Consent is not active");
        require(block.timestamp < grant.expiresAt, "Consent has expired");

        MedicalRecord memory record = records[grant.recordId];
        return (record.cid, grant.encryptedDEKForDoctor);
    }

    function revokeConsent(uint256 consentTokenId) public {
        AccessGrant storage grant = consentGrants[consentTokenId];
        require(grant.patient == msg.sender, "Only the patient can revoke consent");
        
        grant.status = AccessStatus.Revoked;
        emit AccessRevoked(consentTokenId);
    }
}