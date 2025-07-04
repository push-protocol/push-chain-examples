import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

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
