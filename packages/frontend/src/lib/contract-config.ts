import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, localhost } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// Configuración de Wagmi para conectar con diferentes redes
export const config = createConfig({
  chains: [mainnet, sepolia, localhost],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId: 'your-project-id' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [localhost.id]: http('http://127.0.0.1:8545'),
  },
})

// Dirección del contrato SaluData desplegado en Fuji
export const SALUDATA_CONTRACT_ADDRESS = '0x070018089b50cdac6b25bdb60b7c71a829c29f10'

// ABI del contrato SaluData
export const SALUDATA_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "consentTokenId",
        "type": "uint256"
      }
    ],
    "name": "AccessRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "recordId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "doctor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "consentTokenId",
        "type": "uint256"
      }
    ],
    "name": "ConsentGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "messageFrom",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "messageTo",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "messageType",
            "type": "string"
          },
          {
            "internalType": "bytes",
            "name": "encryptedMsg",
            "type": "bytes"
          }
        ],
        "indexed": false,
        "internalType": "struct Metadata",
        "name": "metadata",
        "type": "tuple"
      }
    ],
    "name": "PrivateMessage",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "publicKey",
        "type": "string"
      }
    ],
    "name": "PublicKeyRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "recordId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "RecordRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "consentTokenId",
        "type": "uint256"
      }
    ],
    "name": "getAccessDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "encryptedDEK",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "recordId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "doctor",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "encryptedDEKForDoctor",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "durationSeconds",
        "type": "uint256"
      }
    ],
    "name": "grantConsent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "publicEncryptionKeys",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "publicKey",
        "type": "string"
      }
    ],
    "name": "registerPublicKey",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "recordId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "metaHash",
        "type": "string"
      }
    ],
    "name": "registerRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "recordId",
        "type": "bytes32"
      }
    ],
    "name": "records",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "recordId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "metaHash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "consentTokenId",
        "type": "uint256"
      }
    ],
    "name": "revokeConsent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const
