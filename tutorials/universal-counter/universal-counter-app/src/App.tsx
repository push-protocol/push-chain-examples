import React, { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Import Ethers
import { ethers } from 'ethers'
import UniversalCounterABI from './abi/UniversalCounter.json'

const App: React.FC = () => {
  const [count, setCount] = useState(0)
  const [account, setAccount] = useState<string>('')

  async function connect() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const [selected] = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[]
        setAccount(selected)
      } catch (err) {
        console.error(err)
      }
    } else {
      alert('MetaMask not detected')
    }
  }

  async function disconnect() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_accounts' })
        setAccount('')
      } catch (err) {
        console.error(err)
      }
    } else {
      alert('MetaMask not detected')
    }
  }

  async function incrementUniversalCounter() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        
        // Create Web3Provider from MetaMask and get signer
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        
        // Create contract instance with signer
        const contract = new ethers.Contract('0x45fc17bbfbbad868711b67eab8b3af351a85f7ea', UniversalCounterABI.abi, signer)
        
        // Send transaction
        const tx = await contract.increment()
      } catch (err) {
        console.error(err)
      }
    } else {
      alert('MetaMask not detected')
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {!account && (
          <button onClick={connect}>
            {account ? `${account.slice(0,6)}...${account.slice(-4)}` : 'Connect MetaMask'}
          </button>
        )}
        
        {account && (
          <div>
            <div>
              <p style={{ color: 'green' }}>Connected to {account.slice(0,6)}...{account.slice(-4)}</p>
              <button onClick={disconnect}>Disconnect</button>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <p>Universal Counter: {count}</p>
              <button onClick={incrementUniversalCounter}>Increment Universal Counter</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
