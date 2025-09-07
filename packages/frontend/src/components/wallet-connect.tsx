'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, LogOut, User } from 'lucide-react'
import { useIsMounted } from '@/lib/use-is-mounted'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const mounted = useIsMounted()

  if (!mounted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Conectar Wallet
          </CardTitle>
          <CardDescription>
            Cargando...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isConnected) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Wallet Conectada
          </CardTitle>
          <CardDescription>
            Tu wallet está conectada exitosamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm font-mono break-all">
              {address}
            </p>
          </div>
          <Button 
            onClick={() => disconnect()} 
            variant="outline" 
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Desconectar
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Conectar Wallet
        </CardTitle>
        <CardDescription>
          Conecta tu wallet para usar SaluData
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => connect({ connector })}
              disabled={isPending}
              className="w-full"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {connector.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
