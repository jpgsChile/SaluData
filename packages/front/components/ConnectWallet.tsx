// components/ConnectWallet.tsx
'use client'
import { useState, useEffect } from 'react' // Import useState and useEffect
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  // State to track if the component has mounted on the client
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  // If we are on the server or before the component has mounted, render nothing
  if (!isClient) {
    return null
  }
  
  // Now, the rest of the logic only runs on the client
  if (isConnected) {
    return (
      <div className="text-right">
        <p className="text-sm">Connected: {`${address?.slice(0, 6)}...${address?.slice(-4)}`}</p>
        <button onClick={() => disconnect()} className="text-xs text-red-500 hover:underline">
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button onClick={() => connect({ connector: injected() })}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      Connect Wallet
    </button>
  )
}