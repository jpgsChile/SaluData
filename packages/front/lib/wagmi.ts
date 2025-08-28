// lib/wagmi.ts
import { http, createConfig } from 'wagmi'
import { avalancheFuji } from 'wagmi/chains' // Usamos la red de pruebas Fuji

export const config = createConfig({
  chains: [avalancheFuji],
  transports: {
    [avalancheFuji.id]: http(),
  },
})