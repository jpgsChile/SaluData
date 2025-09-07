# Despliegue de SaluData en Vercel

## Pasos para desplegar en Vercel

### 1. Preparar el proyecto

```bash
# Asegúrate de estar en el directorio del frontend
cd packages/frontend

# Instalar dependencias
npm install

# Construir el proyecto localmente para verificar
npm run build
```

### 2. Desplegar el contrato

Antes de desplegar el frontend, necesitas desplegar el contrato SaluData:

```bash
# Desde el directorio hardhat
cd ../hardhat

# Desplegar en la red que prefieras (ej: Fuji testnet)
npx hardhat run scripts/deploy.ts --network fuji
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en el directorio frontend con:

```env
NEXT_PUBLIC_SALUDATA_CONTRACT_ADDRESS=0x... # Dirección del contrato desplegado
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu_project_id # Opcional
NEXT_PUBLIC_DEFAULT_CHAIN=fuji # o la red que uses
```

### 4. Desplegar en Vercel

#### Opción A: Desde la interfaz web de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Importa el repositorio SaluData
4. Configura las variables de entorno en Vercel
5. Despliega

#### Opción B: Desde la línea de comandos

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desde el directorio frontend
cd packages/frontend

# Desplegar
vercel

# Seguir las instrucciones del CLI
```

### 5. Configurar variables de entorno en Vercel

En el dashboard de Vercel, ve a Settings > Environment Variables y agrega:

- `NEXT_PUBLIC_SALUDATA_CONTRACT_ADDRESS`: Dirección del contrato
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: ID del proyecto WalletConnect (opcional)
- `NEXT_PUBLIC_DEFAULT_CHAIN`: Red por defecto

### 6. Verificar el despliegue

1. Visita la URL de tu aplicación en Vercel
2. Conecta tu wallet
3. Prueba las funcionalidades del contrato

## Redes soportadas

- **Localhost**: Para desarrollo local
- **Fuji Testnet**: Red de prueba de Avalanche
- **Sepolia**: Red de prueba de Ethereum
- **Mainnet**: Red principal (usar con precaución)

## Troubleshooting

### Error de build
- Verifica que todas las dependencias estén instaladas
- Asegúrate de que las variables de entorno estén configuradas
- Revisa los logs de build en Vercel

### Error de conexión de wallet
- Verifica que la red esté configurada correctamente
- Asegúrate de que la dirección del contrato sea correcta
- Verifica que el contrato esté desplegado en la red correcta

### Error de transacciones
- Verifica que tengas fondos en la wallet
- Asegúrate de estar conectado a la red correcta
- Verifica que el contrato esté funcionando correctamente
