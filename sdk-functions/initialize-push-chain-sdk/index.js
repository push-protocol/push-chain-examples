// Import Push Chain Core
import { PushChain } from '@pushchain/core'
import { ethers } from 'ethers'
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts'
import { createWalletClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import { Keypair } from '@solana/web3.js'

async function ethersV6() {
  console.log('Creating Universal Signer - Ethers V6')

  // Create random wallet
  const wallet = ethers.Wallet.createRandom()

  // Set up provider connected to Ethereum Sepolia Testnet
  const provider = new ethers.JsonRpcProvider('https://gateway.tenderly.co/public/sepolia')
  const signer = wallet.connect(provider)

  // Convert ethers signer to Universal Signer
  const universalSigner = await PushChain.utils.signer.toUniversal(signer)
  console.log('🔑 Got universal signer')
  console.dir(universalSigner)
}

async function viem() {
  console.log('Creating Universal Signer - Viem')

  // Create random wallet
  const account = privateKeyToAccount(generatePrivateKey())
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(),
  })

  // Convert viem wallet client to Universal Signer
  const universalSigner = await PushChain.utils.signer.toUniversal(walletClient)
  console.log('🔑 Got universal signer')
  console.dir(universalSigner)
}

async function solanaweb3Js() {
  console.log('Creating Universal Signer - Solana Web3.js')

  const keyPair = Keypair.generate()

  const universalSigner = await PushChain.utils.signer.toUniversalFromKeyPair(keyPair, {
    chain: PushChain.CONSTANTS.CHAIN.SOLANA_DEVNET,
    library: PushChain.CONSTANTS.LIBRARY.SOLANA_WEB3JS,
  })
  console.log('🔑 Got universal signer')
  console.dir(universalSigner)
}

async function main() {
  console.log('\nTrying to call ethersV6')
  await ethersV6()
  console.log('\nTrying to call viem')
  await viem()
  console.log('\nTrying to call solanaweb3Js')
  await solanaweb3Js()

  console.log('\nAll done!')
}

main().catch(console.error)
