// Full Documentation: https://push.org/docs/chain/build/send-universal-transaction

// Import Push Chain Core
import { PushChain } from '@pushchain/core'

// Import ethers for example
import { ethers } from 'ethers'

// Import viem
import { createWalletClient, defineChain, http } from 'viem'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'

// Readline for input
import * as readline from 'node:readline/promises'

// ⭐️ MAIN FUNCTION ⭐️
async function main() {
  console.log('\n⚡ Ethers v6 Examples - EVM Chain')
  await ethersV6()
}

// Run main
await main().catch(console.error)

// --- Ethers Examples ---

async function ethersV6() {
  console.log('\n1. Create Universal Signer')
  const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY')
  console.log('🔑 Got wallet', wallet)
  const provider = new ethers.JsonRpcProvider('https://evm.rpc-testnet-donut-node1.push.org/')
  const signer = wallet.connect(provider)
  const universalSigner = await PushChain.utils.signer.toUniversal(signer)
  console.log('🔑 Got universal signer')

  console.log('\n2. Initialize Push Chain Client')
  const pushChainClient = await PushChain.initialize(universalSigner, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET_DONUT,
  })
  console.log('🚀 Got push chain client')

  console.log('\n3. Wait for testnet funds to be sent by developer')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  const answer = await rl.question(`:::prompt:::Please send funds to ${wallet.address}. Press Enter to continue.`)
  rl.close()

  console.log('\n4. Send Universal Transaction')
  try {
    // Example: Send 0.001 ETH to a random address
    const txReceipt = await pushChainClient.universal.sendTransaction({
      to: '0x0000000000000000000000000000000000042101', // receiver address
      value: ethers.parseEther('0.001'),
    })
    console.log('📤 Transaction sent:', txReceipt)
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('💡 Note: This example requires testnet funds to execute')
  }
}
