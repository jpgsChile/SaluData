'use client'

import { useAccount } from 'wagmi'
import { WalletConnect } from '@/components/wallet-connect'
import { RegisterPublicKey } from '@/components/register-public-key'
import { RegisterRecord } from '@/components/register-record'
import { GrantConsent } from '@/components/grant-consent'
import { AccessDetails } from '@/components/access-details'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, Shield, FileText, Key, Eye } from 'lucide-react'
import { useIsMounted } from '@/lib/use-is-mounted'

export default function Home() {
  const { isConnected } = useAccount()
  const mounted = useIsMounted()

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">SaluData</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plataforma descentralizada para la gestión segura y privada de registros médicos
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="flex justify-center mb-8">
          <WalletConnect />
        </div>

        {/* Main Content */}
        {isConnected ? (
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="register" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="register" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Clave Pública
                </TabsTrigger>
                <TabsTrigger value="record" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Registro Médico
                </TabsTrigger>
                <TabsTrigger value="consent" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Consentimiento
                </TabsTrigger>
                <TabsTrigger value="access" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Acceso
                </TabsTrigger>
              </TabsList>

              <TabsContent value="register" className="mt-6">
                <div className="flex justify-center">
                  <RegisterPublicKey />
                </div>
              </TabsContent>

              <TabsContent value="record" className="mt-6">
                <div className="flex justify-center">
                  <RegisterRecord />
                </div>
              </TabsContent>

              <TabsContent value="consent" className="mt-6">
                <div className="flex justify-center">
                  <GrantConsent />
                </div>
              </TabsContent>

              <TabsContent value="access" className="mt-6">
                <div className="flex justify-center">
                  <AccessDetails />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                  Conecta tu Wallet
                </CardTitle>
                <CardDescription>
                  Para usar SaluData, necesitas conectar tu wallet primero
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  SaluData utiliza tecnología blockchain para garantizar la privacidad y seguridad 
                  de tus datos médicos. Conecta tu wallet para comenzar.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Características de SaluData
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Privacidad Garantizada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tus datos médicos están cifrados y solo tú controlas quién puede acceder a ellos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Registros Inmutables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Los registros médicos se almacenan de forma inmutable en la blockchain.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-purple-600" />
                  Control Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Otorga y revoca permisos de acceso a tus registros médicos cuando lo necesites.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}