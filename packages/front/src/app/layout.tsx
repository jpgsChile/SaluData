// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Web3Provider } from '../../providers/Web3Provider' // Importamos

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaluData',
  description: 'Tu salud, tus datos, tu control.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Web3Provider>{children}</Web3Provider> {/* Envolvemos aquí */}
      </body>
    </html>
  )
}