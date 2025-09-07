// scripts/deploy.ts

// Importamos el Hardhat Runtime Environment (hre) para tener acceso a todo.
import hre from "hardhat";

async function main() {
  // Ahora usamos 'hre.viem.getContractFactory' que es la forma correcta y robusta.
  const saluData = await hre.viem.deployContract("SaluData");

  console.log(`SaluData desplegado en la dirección: ${saluData.address}`);
}

// Manejo de errores estándar.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});