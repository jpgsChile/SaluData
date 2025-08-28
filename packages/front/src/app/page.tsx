// app/page.tsx
import { ConnectWallet } from "../../components/ConnectWallet";
import { RegisterForm } from "../../components/RegisterForm";
// ¡Podrías crear un componente de perfil también!

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4 border-b">
        <h1 className="text-3xl font-bold text-blue-700">SaluData</h1>
        <ConnectWallet />
      </header>
      
      <main className="mt-8">
        <p className="text-lg text-gray-700">Bienvenido a SaluData, la plataforma donde tú tienes el control de tus datos médicos.</p>
        
        {/* Aquí mostramos el formulario de registro */}
        <RegisterForm />
        
        {/* En el futuro, podrías mostrar el Dashboard del usuario si ya está conectado y registrado */}
      </main>
    </div>
  )
}