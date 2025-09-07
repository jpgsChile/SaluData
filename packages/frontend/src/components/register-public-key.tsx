'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Key, CheckCircle } from 'lucide-react'
import { SALUDATA_CONTRACT_ADDRESS, SALUDATA_ABI } from '@/lib/contract-config'

export function RegisterPublicKey() {
  const [publicKey, setPublicKey] = useState('')
  const { address } = useAccount()
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey.trim()) return

    writeContract({
      address: SALUDATA_CONTRACT_ADDRESS as `0x${string}`,
      abi: SALUDATA_ABI,
      functionName: 'registerPublicKey',
      args: [publicKey],
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Registrar Clave Pública
        </CardTitle>
        <CardDescription>
          Registra tu clave pública de cifrado para recibir datos médicos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="publicKey">Clave Pública</Label>
            <Input
              id="publicKey"
              type="text"
              placeholder="Ingresa tu clave pública..."
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isPending || isConfirming || !address}
          >
            {isPending || isConfirming ? (
              'Procesando...'
            ) : isConfirmed ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                ¡Registrada!
              </>
            ) : (
              'Registrar Clave'
            )}
          </Button>
          
          {isConfirmed && (
            <p className="text-sm text-green-600 text-center">
              ✅ Clave pública registrada exitosamente
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
