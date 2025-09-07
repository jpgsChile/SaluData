# 🚀 Guía Completa para Desplegar SaluData en Vercel

## ✅ Estado Actual
- ✅ Frontend configurado y listo para producción
- ✅ Build exitoso verificado
- ✅ Configuración de Vercel creada
- ✅ Variables de entorno configuradas

## 📋 Pasos para Desplegar

### 1. Desplegar el Contrato SaluData

Primero necesitas desplegar el contrato en una red blockchain:

```bash
# Ir al directorio hardhat
cd packages/hardhat

# Desplegar en Fuji testnet (recomendado para pruebas)
npx hardhat run scripts/deploy.ts --network fuji

# O desplegar en localhost para desarrollo
npx hardhat run scripts/deploy.ts --network localhost
```

**Guarda la dirección del contrato que aparece en la consola.**

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en `packages/frontend/`:

```env
NEXT_PUBLIC_SALUDATA_CONTRACT_ADDRESS=0x... # Dirección del contrato desplegado
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu_project_id # Opcional
NEXT_PUBLIC_DEFAULT_CHAIN=fuji # o localhost, sepolia, mainnet
```

### 3. Desplegar en Vercel

#### Opción A: Desde GitHub (Recomendado)

1. **Sube tu código a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SaluData frontend"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/saludata.git
   git push -u origin main
   ```

2. **Conecta con Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con GitHub
   - Haz clic en "New Project"
   - Importa tu repositorio SaluData
   - Selecciona el directorio `packages/frontend` como Root Directory

3. **Configura las variables de entorno**:
   - En el dashboard de Vercel, ve a Settings > Environment Variables
   - Agrega las siguientes variables:
     - `NEXT_PUBLIC_SALUDATA_CONTRACT_ADDRESS`: Dirección del contrato
     - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: ID del proyecto (opcional)
     - `NEXT_PUBLIC_DEFAULT_CHAIN`: Red por defecto

4. **Despliega**:
   - Haz clic en "Deploy"
   - Espera a que se complete el despliegue

#### Opción B: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desde el directorio frontend
cd packages/frontend

# Desplegar
vercel

# Seguir las instrucciones del CLI
# Configurar las variables de entorno cuando se solicite
```

### 4. Verificar el Despliegue

1. **Visita tu aplicación** en la URL proporcionada por Vercel
2. **Conecta tu wallet** (MetaMask recomendado)
3. **Configura la red** en tu wallet:
   - Para Fuji: https://docs.avax.network/quickstart/fuji-workflow
   - Para localhost: http://localhost:8545
4. **Prueba las funcionalidades**:
   - Registra una clave pública
   - Registra un registro médico
   - Otorga consentimientos
   - Consulta accesos

## 🔧 Configuración de Redes

### Fuji Testnet (Recomendado para pruebas)
- **Chain ID**: 43113
- **RPC URL**: https://api.avax-test.network/ext/bc/C/rpc
- **Explorer**: https://testnet.snowtrace.io/

### Sepolia Testnet
- **Chain ID**: 11155111
- **RPC URL**: https://sepolia.infura.io/v3/YOUR_INFURA_KEY
- **Explorer**: https://sepolia.etherscan.io/

### Localhost (Desarrollo)
- **Chain ID**: 31337
- **RPC URL**: http://localhost:8545
- **Explorer**: N/A

## 🛠️ Troubleshooting

### Error de Build
- Verifica que todas las dependencias estén instaladas
- Asegúrate de que las variables de entorno estén configuradas
- Revisa los logs de build en Vercel

### Error de Conexión de Wallet
- Verifica que la red esté configurada correctamente en tu wallet
- Asegúrate de que la dirección del contrato sea correcta
- Verifica que el contrato esté desplegado en la red correcta

### Error de Transacciones
- Verifica que tengas fondos en la wallet
- Asegúrate de estar conectado a la red correcta
- Verifica que el contrato esté funcionando correctamente

## 📱 URLs Importantes

- **Frontend**: https://tu-app.vercel.app
- **Contrato en Explorer**: https://testnet.snowtrace.io/address/0x...
- **Documentación**: https://docs.saludata.com

## 🎉 ¡Listo!

Tu aplicación SaluData está ahora desplegada en Vercel y lista para usar. Los usuarios pueden:

1. Conectar sus wallets
2. Registrar claves públicas
3. Subir registros médicos
4. Otorgar permisos de acceso
5. Consultar detalles de acceso

¡Felicidades por desplegar tu primera dApp de salud en blockchain! 🚀
