import { ethers } from 'ethers'
import { createPublicClient, defineChain, http } from 'viem'

async function ethersV6Initialize() {
  const provider = new ethers.JsonRpcProvider('https://evm.rpc-testnet-donut-node1.push.org/')
  return provider
}

async function ethersV6GetTransactionByHash() {
  const transactionHash = '0xa7839fb1e3483eab628cbf18f42603ba192cef99b724d4b651eb7c4e9683b79e'
  const provider = await ethersV6Initialize()
  const transaction = await provider.getTransaction(transactionHash)
  console.log(transaction)
  return transaction
}

async function viemInitialize() {
  // Define Push Testnet chain configuration
  const pushTestnet = defineChain({
    id: 42101,
    name: 'Push Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'PC',
      symbol: '$PC',
    },
    rpcUrls: {
      default: {
        http: ['https://evm.rpc-testnet-donut-node1.push.org/', 'https://evm.rpc-testnet-donut-node2.push.org/'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Push Testnet Explorer',
        url: 'https://explorer.testnet.push.org/',
      },
    },
  })

  const publicClient = createPublicClient({
    chain: pushTestnet,
    transport: http(),
  })

  return publicClient
}

async function viemGetTransactionByHash() {
  const transactionHash = '0xa7839fb1e3483eab628cbf18f42603ba192cef99b724d4b651eb7c4e9683b79e'
  const publicClient = await viemInitialize()
  const transaction = await publicClient.getTransaction({
    hash: transactionHash,
  })
  console.log(transaction)
  return transaction
}

async function main() {
  console.log('🔑 Initializing ethersV6...')
  await ethersV6Initialize()
  console.log('🔑 Got ethersV6 provider')
  console.log('🔑 Getting transaction by hash...')
  await ethersV6GetTransactionByHash()

  console.log('🔑 Initializing viem...')
  await viemInitialize()
  console.log('🔑 Got viem public client')
  console.log('🔑 Getting transaction by hash...')
  await viemGetTransactionByHash()
}

main().catch(console.error)
