'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileText, CheckCircle } from 'lucide-react'
import { SALUDATA_CONTRACT_ADDRESS, SALUDATA_ABI } from '@/lib/contract-config'

export function RegisterRecord() {
  const [recordId, setRecordId] = useState('')
  const [cid, setCid] = useState('')
  const [metaHash, setMetaHash] = useState('')
  const { address } = useAccount()
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recordId.trim() || !cid.trim() || !metaHash.trim()) return

    // Convertir recordId a bytes32
    const recordIdBytes32 = `0x${recordId.padStart(64, '0')}` as `0x${string}`

    writeContract({
      address: SALUDATA_CONTRACT_ADDRESS as `0x${string}`,
      abi: SALUDATA_ABI,
      functionName: 'registerRecord',
      args: [recordIdBytes32, cid, metaHash],
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Registrar Registro Médico
        </CardTitle>
        <CardDescription>
          Registra un nuevo registro médico en la blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recordId">ID del Registro</Label>
            <Input
              id="recordId"
              type="text"
              placeholder="Ej: 1234567890abcdef..."
              value={recordId}
              onChange={(e) => setRecordId(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cid">CID (IPFS)</Label>
            <Input
              id="cid"
              type="text"
              placeholder="QmHash..."
              value={cid}
              onChange={(e) => setCid(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="metaHash">Hash de Metadatos</Label>
            <Input
              id="metaHash"
              type="text"
              placeholder="Hash de los metadatos..."
              value={metaHash}
              onChange={(e) => setMetaHash(e.target.value)}
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
                ¡Registrado!
              </>
            ) : (
              'Registrar Registro'
            )}
          </Button>
          
          {isConfirmed && (
            <p className="text-sm text-green-600 text-center">
              ✅ Registro médico registrado exitosamente
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
