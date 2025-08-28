// components/RegisterForm.tsx
'use client'
import { useState } from 'react'
import { useSaluDataContract } from '../hooks/useSaluDataContract'

export function RegisterForm() {
  const [role, setRole] = useState<'patient' | 'doctor'>('patient')
  const [publicKey, setPublicKey] = useState('')
  const [name, setName] = useState('')
  const [license, setLicense] = useState('')
  const [clinic, setClinic] = useState('')

  const { registerAsPatient, registerAsDoctor, isWriting } = useSaluDataContract()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (role === 'patient') {
        await registerAsPatient(publicKey)
      } else {
        await registerAsDoctor(publicKey, name, license, clinic)
      }
      alert('¡Registro exitoso! La transacción ha sido enviada.')
    } catch (err: any) {
      console.error(err)
      alert(`Error: ${err.shortMessage || err.message}`)
    }
  }

  return (
    <div className="my-8 p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Registro de Usuario</h2>
        <form onSubmit={handleRegister}>
    <div className="mb-4">
        <label className="block mb-2">Selecciona tu rol:</label>
        <select onChange={(e) => setRole(e.target.value as any)} value={role} className="w-full p-2 border rounded">
            <option value="patient">Paciente</option>
            <option value="doctor">Doctor</option>
        </select>
    </div>
    <div className="mb-4">
        <label className="block mb-2">Tu Clave Pública de Cifrado:</label>
        <input type="text" value={publicKey} onChange={(e) => setPublicKey(e.target.value)} required className="w-full p-2 border rounded" />
    </div>

    {role === 'doctor' && (
        <>
            <div className="mb-4">
                <label className="block mb-2">Nombre Completo:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Matrícula Profesional:</label>
                <input type="text" value={license} onChange={(e) => setLicense(e.target.value)} required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Clínica / Consultorio:</label>
                <input type="text" value={clinic} onChange={(e) => setClinic(e.target.value)} required className="w-full p-2 border rounded" />
            </div>
        </>
    )}

    <button type="submit" disabled={isWriting} className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400">
        {isWriting ? 'Registrando...' : 'Registrar'}
    </button>
</form>
    </div>
  )
}