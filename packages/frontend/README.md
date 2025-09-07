# SaluData Frontend

Frontend moderno para la plataforma SaluData - Gestión segura de registros médicos en blockchain.

## Características

- 🔐 **Conexión de Wallet**: Integración con MetaMask y otras wallets
- 🔑 **Registro de Claves Públicas**: Registra tu clave de cifrado pública
- 📄 **Registro Médico**: Registra registros médicos en la blockchain
- 🛡️ **Gestión de Consentimientos**: Otorga y revoca permisos de acceso
- 👁️ **Consulta de Acceso**: Consulta detalles de acceso a registros

## Tecnologías Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Wagmi** - Integración con Ethereum
- **Viem** - Cliente Ethereum
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos

## Instalación

```bash
npm install
```

## Configuración

1. **Configurar la dirección del contrato**:
   - Edita `src/lib/wagmi.ts`
   - Actualiza `SALUDA_CONTRACT_ADDRESS` con la dirección del contrato desplegado

2. **Configurar la red**:
   - Asegúrate de que tu wallet esté conectada a la red correcta (localhost, Fuji, etc.)

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

1. **Conecta tu Wallet**: Usa el botón de conexión para conectar MetaMask
2. **Registra tu Clave Pública**: Primero registra tu clave de cifrado
3. **Registra Registros Médicos**: Sube tus registros médicos a la blockchain
4. **Otorga Consentimientos**: Comparte acceso con doctores específicos
5. **Consulta Accesos**: Revisa los detalles de acceso a tus registros

## Estructura del Proyecto

```
src/
├── app/                 # Páginas de Next.js
├── components/          # Componentes React
│   ├── ui/             # Componentes base de UI
│   └── ...             # Componentes específicos
├── lib/                # Utilidades y configuración
└── ...
```

## Componentes Principales

- `WalletConnect` - Conexión de wallet
- `RegisterPublicKey` - Registro de claves públicas
- `RegisterRecord` - Registro de registros médicos
- `GrantConsent` - Otorgamiento de consentimientos
- `AccessDetails` - Consulta de detalles de acceso

## Seguridad

- Todas las transacciones requieren confirmación del usuario
- Los datos sensibles están cifrados antes de enviarse a la blockchain
- Solo el propietario puede otorgar o revocar permisos