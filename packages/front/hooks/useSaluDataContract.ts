// hooks/useSaluDataContract.ts
import { useWriteContract, useReadContract } from 'wagmi'

// ¡LA MAGIA! Importamos el ABI directamente desde el proyecto Hardhat.
import SaluDataABI from '../../hardhat/artifacts/contracts/SaluData.sol/SaluData.json'

// ¡MUY IMPORTANTE! Reemplaza esto con la dirección de tu contrato desplegado en Fuji.
export const SALUDATA_CONTRACT_ADDRESS = 'TU_DIRECCION_DE_CONTRATO_AQUI' as `0x${string}`

export function useSaluDataContract() {
  const { writeContractAsync, isPending } = useWriteContract()

  // --- Funciones de ESCRITURA (Transacciones que cuestan gas) ---

  const registerAsPatient = async (publicKey: string) => {
    return await writeContractAsync({
      abi: SaluDataABI.abi,
      address: SALUDATA_CONTRACT_ADDRESS,
      functionName: 'registerAsPatient',
      args: [publicKey],
    })
  }

  const registerAsDoctor = async (publicKey: string, name: string, license: string, clinic: string) => {
    return await writeContractAsync({
        abi: SaluDataABI.abi,
        address: SALUDATA_CONTRACT_ADDRESS,
        functionName: 'registerAsDoctor',
        args: [publicKey, name, license, clinic],
      })
  }

  // ...Aquí agregarías las otras funciones como grantConsent, uploadRecord, etc.

  return {
    registerAsPatient,
    registerAsDoctor,
    isWriting: isPending // Para saber si una transacción está en curso
  }
}

// --- Hooks de LECTURA (Consultas gratuitas al contrato) ---

// Hook para leer el perfil de un usuario
export function useUserProfile(address: `0x${string}` | undefined) {
    return useReadContract({
        abi: SaluDataABI.abi,
        address: SALUDATA_CONTRACT_ADDRESS,
        functionName: 'profiles',
        args: [address!], // El '!' indica que nos aseguramos de que no sea undefined
        query: {
            enabled: !!address, // Solo ejecuta la consulta si la dirección existe
        }
    })
}