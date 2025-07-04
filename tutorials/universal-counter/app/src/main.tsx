import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Buffer polyfill
import { Buffer } from 'buffer'

// Add Buffer to window type
declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

// Set Buffer on window
window.Buffer = window.Buffer || Buffer

import { PushUI, PushUniversalWalletProvider } from '@pushchain/ui-kit'

import App from './App.tsx'
import './index.css'

// Define Wallet Config
const walletConfig = {
  network: PushUI.CONSTANTS.PUSH_NETWORK.TESTNET,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PushUniversalWalletProvider config={walletConfig}>
      <App />
    </PushUniversalWalletProvider>
  </StrictMode>,
)
