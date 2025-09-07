'use client'

import { useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, CheckCircle } from 'lucide-react'
import { SALUDATA_CONTRACT_ADDRESS, SALUDATA_ABI } from '@/lib/contract-config'

export function AccessDetails() {
  const [consentTokenId, setConsentTokenId] = useState('')
  const { address } = useAccount()

  // Leer los detalles de acceso
  const { data: accessDetails, isLoading: isReading } = useReadContract({
    address: SALUDATA_CONTRACT_ADDRESS as `0x${string}`,
    abi: SALUDATA_ABI,
    functionName: 'getAccessDetails',
    args: consentTokenId ? [BigInt(consentTokenId)] : undefined,
  })

  const handleGetAccess = () => {
    if (!consentTokenId.trim()) return
    // La función getAccessDetails es de solo lectura, no necesita writeContract
  }

  return (
    <div className="space-y-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Consultar Acceso
          </CardTitle>
          <CardDescription>
            Consulta los detalles de acceso a un registro médico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="consentTokenId">ID del Token de Consentimiento</Label>
              <Input
                id="consentTokenId"
                type="text"
                placeholder="1"
                value={consentTokenId}
                onChange={(e) => setConsentTokenId(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={handleGetAccess}
              className="w-full" 
              disabled={!address || !consentTokenId.trim()}
            >
              Consultar Acceso
            </Button>
          </div>
        </CardContent>
      </Card>

      {accessDetails && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Detalles de Acceso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <Label className="text-sm font-medium">CID del Registro:</Label>
              <p className="text-sm font-mono break-all mt-1">
                {accessDetails[0]}
              </p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <Label className="text-sm font-medium">DEK Cifrado:</Label>
              <p className="text-sm font-mono break-all mt-1">
                {accessDetails[1]}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {isReading && (
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-6">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              <span>Cargando detalles...</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
