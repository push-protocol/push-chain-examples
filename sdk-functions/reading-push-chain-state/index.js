import { ethers } from 'ethers'
import { createPublicClient, http, defineChain } from 'viem'

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

// Initialize clients
const provider = new ethers.JsonRpcProvider('https://evm.rpc-testnet-donut-node1.push.org/')
const viemClient = createPublicClient({
  chain: pushTestnet,
  transport: http(),
})

// Custom replacer function to handle BigInt serialization
function replacer(key, value) {
  if (typeof value === 'bigint') {
    return value.toString()
  }
  return value
}

async function getTransactionByHash() {
  const transactionHash = '0x95b8600bd48154e22e513219c139a370e3cab4d1191d6d33ca8d74f72788154c'

  // Get transaction using ethers
  const ethersTransaction = await provider.getTransaction(transactionHash)

  // Get transaction using viem
  const viemTransaction = await viemClient.getTransaction({
    hash: transactionHash,
  })

  return { ethersTransaction, viemTransaction }
}

async function getLatestBlock() {
  // Get latest block using ethers
  const ethersBlock = await provider.getBlock('latest')

  // Get latest block using viem
  const viemBlock = await viemClient.getBlock()

  return { ethersBlock, viemBlock }
}

async function getBlockByHash() {
  const blockHash = '0xccdb5bc5b71ece5a73aa42d5d3171b156f1c0735ac97a07ccec3156b59ac936c'

  // Get block using ethers
  const ethersBlock = await provider.getBlock(blockHash)

  // Get block using viem
  const viemBlock = await viemClient.getBlock({
    blockHash,
  })

  return { ethersBlock, viemBlock }
}

async function main() {
  console.log('\nFetching transaction by hash...')
  const transactionResult = await getTransactionByHash()
  console.log('Ethers transaction:', JSON.stringify(transactionResult.ethersTransaction, replacer, 2))
  console.log('Viem transaction:', JSON.stringify(transactionResult.viemTransaction, replacer, 2))

  console.log('\nFetching latest block...')
  const latestBlockResult = await getLatestBlock()
  console.log('Ethers latest block:', JSON.stringify(latestBlockResult.ethersBlock, replacer, 2))
  console.log('Viem latest block:', JSON.stringify(latestBlockResult.viemBlock, replacer, 2))

  console.log('\nFetching block by hash...')
  const blockByHashResult = await getBlockByHash()
  console.log('Ethers block by hash:', JSON.stringify(blockByHashResult.ethersBlock, replacer, 2))
  console.log('Viem block by hash:', JSON.stringify(blockByHashResult.viemBlock, replacer, 2))
}

main().catch(console.error)
