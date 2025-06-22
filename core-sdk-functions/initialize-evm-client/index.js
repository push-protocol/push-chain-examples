// Full Documentation: https://push.org/docs/chain/build/initialize-evm-client

// Import if you are using ethers
import { ethers } from 'ethers';

// Import if you are using viem
import { createPublicClient, defineChain, http } from 'viem';

async function main() {
  console.log('\n⚡ Ethers Examples');
  console.log('\n1. Initialize Provider');
  await initializeEthersProvider();

  console.log('\n2. Get Transaction');
  await getEthersTransaction();

  console.log('\n🌟 Viem Examples');
  console.log('\n1. Initialize Client');
  await initializeViemClient();

  console.log('\n2. Get Transaction');
  await getViemTransaction();
}

await main().catch(console.error);

// --- Ethers Examples ---

// Initialize Ethers Provider
async function initializeEthersProvider() {
  const provider = new ethers.JsonRpcProvider('https://evm.rpc-testnet-donut-node1.push.org/');
  console.log('🔑 Got provider instance');
  return provider;
}

// Get Transaction with Ethers
async function getEthersTransaction() {
  const transactionHash = '0xa7839fb1e3483eab628cbf18f42603ba192cef99b724d4b651eb7c4e9683b79e';
  const provider = await initializeEthersProvider();
  const transaction = await provider.getTransaction(transactionHash);
  console.log('📄 Transaction details:', transaction);
  return transaction;
}

// --- Viem Examples ---

// Initialize Viem Client
async function initializeViemClient() {
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
  });

  const publicClient = createPublicClient({
    chain: pushTestnet,
    transport: http(),
  });

  console.log('🔑 Got public client instance');
  return publicClient;
}

// Get Transaction with Viem
async function getViemTransaction() {
  const transactionHash = '0xa7839fb1e3483eab628cbf18f42603ba192cef99b724d4b651eb7c4e9683b79e';
  const publicClient = await initializeViemClient();
  const transaction = await publicClient.getTransaction({
    hash: transactionHash,
  });
  console.log('📄 Transaction details:', transaction);
  return transaction;
}

