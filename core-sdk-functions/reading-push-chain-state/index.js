// Full Documentation: https://push.org/docs/chain/build/reading-blockchain-state

import { ethers } from 'ethers'
import { createPublicClient, defineChain, http, webSocket } from 'viem'

// MAIN FUNCTION
async function main() {
  console.log('🚀 Starting Push Chain state reading examples...')
  try {
    console.log('\n🔍 Running examples with both ethers.js and viem...')
    // Run all examples
    await getTransactionByHash()
    await getLatestBlock()
    await getBlockByHash()
    await watchBlocks()
  } catch (error) {
    console.error('❌ Error:', error)
    if (error.message?.includes('WebSocket')) {
      console.log('ℹ️ Note: Make sure the WebSocket endpoint is available and accessible')
    }
  }
}

// Define Push Testnet chain configuration for Viem
const pushTestnet = defineChain({
  rpcUrls: {
    default: {
      http: ['https://evm.rpc-testnet-donut-node1.push.org/'],
    },
  },
});

// Initialize HTTP clients for Ethers
const provider = new ethers.JsonRpcProvider('https://evm.rpc-testnet-donut-node1.push.org/')
const viemClient = createPublicClient({
  chain: pushTestnet,
  transport: http(),
})

// Initialize WebSocket clients
const wsProvider = new ethers.WebSocketProvider('wss://evm.rpc-testnet-donut-node1.push.org/')
const wsViemClient = createPublicClient({
  chain: pushTestnet,
  transport: webSocket('wss://evm.rpc-testnet-donut-node1.push.org/'),
})

// Initialize WebSocket connection
wsProvider.websocket.onclose = () => {
  console.log('🔴 WebSocket disconnected')
}

wsProvider.websocket.onerror = (error) => {
  console.error('❌ WebSocket error:', error)
}

wsProvider.websocket.onopen = () => {
  console.log('🟢 WebSocket connected')
}

// Run main
await main().catch(console.error)

// Custom replacer function to handle BigInt serialization
function replacer(key, value) {
  if (typeof value === 'bigint') {
    return value.toString()
  }
  return value
}

// 1. Fetch transaction by hash
async function getTransactionByHash() {
  console.log('\n1️⃣ Fetching transaction by hash...')
  const txHash = '0xa7839fb1e3483eab628cbf18f42603ba192cef99b724d4b651eb7c4e9683b79e'

  // Ethers implementation
  const ethersTransaction = await provider.getTransaction(txHash)
  console.log('📝 Ethers transaction:', JSON.stringify(ethersTransaction, replacer, 2))

  // Viem implementation
  const viemTransaction = await viemClient.getTransaction({ hash: txHash })
  console.log('📝 Viem transaction:', JSON.stringify(viemTransaction, replacer, 2))
}

// 2. Fetch latest block
async function getLatestBlock() {
  console.log('\n2️⃣ Fetching latest block...')

  // Ethers implementation
  const ethersBlock = await provider.getBlock('latest')
  console.log('🔲 Ethers latest block:', JSON.stringify(ethersBlock, replacer, 2))

  // Viem implementation
  const viemBlock = await viemClient.getBlock()
  console.log('🔲 Viem latest block:', JSON.stringify(viemBlock, replacer, 2))
}

// 3. Fetch block by hash
async function getBlockByHash() {
  console.log('\n3️⃣ Fetching block by hash...')
  const blockHash = '0x1bdc478ba03f52a7f35071e0f03676368cda76b95c4846f21844a39cfd541f32'

  // Ethers implementation
  const ethersBlock = await provider.getBlock(blockHash)
  console.log('🔲 Ethers block:', JSON.stringify(ethersBlock, replacer, 2))

  // Viem implementation
  const viemBlock = await viemClient.getBlock({ blockHash })
  console.log('🔲 Viem block:', JSON.stringify(viemBlock, replacer, 2))
}

// 4. Watch for new blocks with transaction filtering
async function watchBlocks() {
  console.log('\n4️⃣ Watching for new blocks...')
  const watchedAddress = '0x0000000000000000000000000000000000042101'.toLowerCase()

  // Ethers implementation
  console.log('👀 Ethers watching blocks for transactions to:', watchedAddress)
  wsProvider.on('block', async (blockNumber) => {
    const block = await wsProvider.getBlock(blockNumber, true)
    if (block && block.transactions) {
      console.log('🆕 New block:', block.number)
      const txs = await Promise.all(block.transactions.map(hash => wsProvider.getTransaction(hash)))
      txs
        .filter((tx) => tx.to?.toLowerCase() === watchedAddress)
        .forEach((tx) => console.log('💸 Transaction detected:', tx.hash))
    }
  })

  // Viem implementation
  console.log('👀 Viem watching blocks for transactions to:', watchedAddress)
  const unwatch = wsViemClient.watchBlocks({
    onBlock: async (block) => {
      console.log('🆕 New block:', block.number)
      const fullBlock = await wsViemClient.getBlock({ blockHash: block.hash, includeTransactions: true })
      if (fullBlock.transactions) {
        fullBlock.transactions
          .filter((tx) => tx.to?.toLowerCase() === watchedAddress)
          .forEach((tx) => console.log('💸 Transaction detected:', tx.hash))
      }
    },
    onError: console.error,
  })

  // Stop watching after 30 seconds
  setTimeout(() => {
    console.log('\n⏹️ Stopping block watchers...')
    wsProvider.removeAllListeners()
    wsProvider.destroy()
    unwatch()
  }, 30000)
}



