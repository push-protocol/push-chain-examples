import { ethers } from 'ethers'
import { http, defineChain, createPublicClient } from 'viem'

async function ethersV6Initialize() {
  const provider = new ethers.JsonRpcProvider('https://evm.rpc-testnet-donut-node1.push.org/')
  return provider
}

async function ethersV6GetTransactionByHash() {
  const transactionHash = '0x95b8600bd48154e22e513219c139a370e3cab4d1191d6d33ca8d74f72788154c'
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
  const transactionHash = '0x95b8600bd48154e22e513219c139a370e3cab4d1191d6d33ca8d74f72788154c'
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
