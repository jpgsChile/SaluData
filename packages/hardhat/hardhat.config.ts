import { HardhatUserConfig } from "hardhat/config";
// CAMBIO CLAVE: Importamos la caja de herramientas específica para Viem.
import "@nomicfoundation/hardhat-toolbox-viem"; 
import "dotenv/config"; 

// Lee las variables de entorno
const FUJI_RPC_URL = process.env.FUJI_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    fuji: {
      url: FUJI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 43113,
    },
  },
};

export default config;