// Import Push Chain SDK and Ethers
// You can use other library like veim, etc
import { PushChain } from '@pushchain/core'
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts'
import { createWalletClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import { ethers } from 'ethers'
import { Keypair } from '@solana/web3.js'

async function ethersV6PushChainInitialize() {
  // 1. Connect to a provider (e.g., Push Chain RPC URL)
  const provider = new ethers.JsonRpcProvider('https://evm.rpc-testnet-donut-node1.push.org/')

  // 2. Create a random wallet (or use your own private key)
  const wallet = ethers.Wallet.createRandom(provider)

  // 3. Convert ethers signer to Universal Signer
  // Most popular libraries can pass just the signer to get universal signer
  // Or use PushChain.utils.signer.construct to create a custom one
  const universalSigner = await PushChain.utils.signer.toUniversal(wallet)

  // Initialize Push Chain SDK for use from Push Chain account
  const pushChainClient = await PushChain.initialize(universalSigner, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET,
  })

  console.log(pushChainClient)
}

async function ethersV6SepoliaInitialize() {
  // 1. Connect to a provider (e.g., Push Chain RPC URL)
  const provider = new ethers.JsonRpcProvider('https://sepolia.gateway.tenderly.co')

  // 2. Create a random wallet (or use your own private key)
  const wallet = ethers.Wallet.createRandom(provider)

  // 3. Convert ethers signer to Universal Signer
  // Most popular libraries can pass just the signer to get universal signer
  // Or use PushChain.utils.signer.construct to create a custom one
  const universalSigner = await PushChain.utils.signer.toUniversal(wallet)

  // Initialize Push Chain SDK for use from Push Chain account
  const pushChainClient = await PushChain.initialize(universalSigner, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET,
  })

  console.log(pushChainClient)
}

async function viemSepoliaInitialize() {
  // 1. Construct account
  const account = privateKeyToAccount(generatePrivateKey())

  // 2. Initialize signer
  const signer = createWalletClient({
    transport: http('https://sepolia.gateway.tenderly.co'), // or your preferred RPC URL
    chain: sepolia,
    account, // <-- our signer
  })

  // 3. Convert signer to Universal Signer
  // Most of the popular libraries can pass just the signer to get universal signer
  // Or use PushChain.utils.signer.construct to create a custom one
  const universalSigner = await PushChain.utils.signer.toUniversal(signer)

  // Initialize Push Chain SDK for use from Ethereum account
  const pushChainClient = await PushChain.initialize(universalSigner, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET,
  })

  console.log(pushChainClient)
}

async function solanaInitialize() {
  // 1. Generate or import your Solana keypair
  const solKeypair = Keypair.generate()

  // 2. Convert the Solana Keypair into a Push Chain universal signer.
  //    We use the helper `toUniversalFromKeyPair`, which internally builds
  //    the necessary adapter (signTransaction, signMessage).
  const universalSigner = await PushChain.utils.signer.toUniversalFromKeyPair(solKeypair, {
    chain: PushChain.CONSTANTS.CHAIN.SOLANA_DEVNET,
    library: PushChain.CONSTANTS.LIBRARY.SOLANA_WEB3JS,
  })

  // 3. Initialize Push Chain SDK
  const pushChainClient = await PushChain.initialize(universalSigner, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET,
  })

  console.log(pushChainClient)
}

async function main() {
  console.log('🔑 Initializing ethersV6...')
  await ethersV6PushChainInitialize()
  console.log('🔑 Got ethersV6 push chain client')

  console.log('🔑 Initializing ethersV6Sepolia...')
  await ethersV6SepoliaInitialize()
  console.log('🔑 Got ethersV6Sepolia push chain client')

  console.log('🔑 Initializing viemSepolia...')
  await viemSepoliaInitialize()
  console.log('🔑 Got viemSepolia push chain client')

  console.log('🔑 Initializing solana...')
  await solanaInitialize()
  console.log('🔑 Got solana push chain client')
}

main().catch(console.error)
