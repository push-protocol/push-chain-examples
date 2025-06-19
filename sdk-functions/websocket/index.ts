import { ethers } from 'ethers'
import { createPublicClient, defineChain, http } from 'viem'

function ethersWebSocket() {
  console.log('🔑 Starting ethers WebSocket connection...')
  const WEBSOCKET_URL = 'https://evm.rpc-testnet-donut-node1.push.org/'

  // Create a WebSocket provider
  const provider = new ethers.WebSocketProvider(WEBSOCKET_URL)

  // Subscribe to new block events
  provider.on('block', (blockNumber: any) => {
    console.log('New block:', blockNumber)
  })

  // Stop listening after 10 seconds
  setTimeout(() => {
    console.log('Stopping block listener after 10 seconds...')
    provider.removeAllListeners()
    provider.destroy()
  }, 10000)
}

function viemWebSocket() {
  console.log('🔑 Starting viem WebSocket connection...')
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

  const viemClient = createPublicClient({
    chain: pushTestnet,
    transport: http(),
  })

  const stop = viemClient.watchBlocks({
    onBlock: (block) => {
      console.log('🆕 Block', block.number, block.hash)
    },
    onError: (err) => console.error('WebSocket error', err),
  })

  // Stop listening after 10 seconds
  setTimeout(() => {
    console.log('Stopping viem block listener after 10 seconds...')
    stop()
  }, 10000)
}

function main() {
  ethersWebSocket()
  viemWebSocket()
}

main()
