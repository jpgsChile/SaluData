'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, CheckCircle } from 'lucide-react'
import { SALUDATA_CONTRACT_ADDRESS, SALUDATA_ABI } from '@/lib/contract-config'

export function GrantConsent() {
  const [recordId, setRecordId] = useState('')
  const [doctorAddress, setDoctorAddress] = useState('')
  const [encryptedDEK, setEncryptedDEK] = useState('')
  const [duration, setDuration] = useState('')
  const { address } = useAccount()
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recordId.trim() || !doctorAddress.trim() || !encryptedDEK.trim() || !duration.trim()) return

    // Convertir recordId a bytes32
    const recordIdBytes32 = `0x${recordId.padStart(64, '0')}` as `0x${string}`
    // Convertir encryptedDEK a bytes
    const encryptedDEKBytes = `0x${encryptedDEK}` as `0x${string}`
    // Convertir duration a número
    const durationSeconds = parseInt(duration) * 24 * 60 * 60 // días a segundos

    writeContract({
      address: SALUDATA_CONTRACT_ADDRESS as `0x${string}`,
      abi: SALUDATA_ABI,
      functionName: 'grantConsent',
      args: [recordIdBytes32, doctorAddress as `0x${string}`, encryptedDEKBytes, BigInt(durationSeconds)],
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Otorgar Consentimiento
        </CardTitle>
        <CardDescription>
          Otorga acceso a un doctor para ver tu registro médico
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
            <Label htmlFor="doctorAddress">Dirección del Doctor</Label>
            <Input
              id="doctorAddress"
              type="text"
              placeholder="0x..."
              value={doctorAddress}
              onChange={(e) => setDoctorAddress(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="encryptedDEK">DEK Cifrado</Label>
            <Input
              id="encryptedDEK"
              type="text"
              placeholder="Clave cifrada para el doctor..."
              value={encryptedDEK}
              onChange={(e) => setEncryptedDEK(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duración (días)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
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
                ¡Consentimiento Otorgado!
              </>
            ) : (
              'Otorgar Consentimiento'
            )}
          </Button>
          
          {isConfirmed && (
            <p className="text-sm text-green-600 text-center">
              ✅ Consentimiento otorgado exitosamente
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
