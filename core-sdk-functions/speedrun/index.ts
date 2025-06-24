// Full Documentation: https://push.org/docs/chain/build/recommended-practices/#speed-run

// Import Push Chain
import { PushChain } from '@pushchain/core';

// Import Ethers for example
import { ethers } from 'ethers';

// ⭐️ MAIN FUNCTION ⭐️
async function main() {
  console.log('Creating Universal Signer - Ethers V6');

  // Create random wallet
  const wallet = ethers.Wallet.createRandom();

  // Set up provider connected to Ethereum Sepolia Testnet
  const provider = new ethers.JsonRpcProvider('https://gateway.tenderly.co/public/sepolia');
  const signer = wallet.connect(provider);

  // Convert ethers signer to Universal Signer
  const universalSigner = await PushChain.utils.signer.toUniversal(signer);
  console.log('🔑 Got universal signer');

  // Initialize Push Chain SDK
  const pushChainClient = await PushChain.initialize(universalSigner, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET_DONUT,
  });
  // FIX: JSON.stringify with BigInt support
  console.log(
    '🚀 Got push chain client',
    JSON.stringify(pushChainClient, (_k, v) => (typeof v === 'bigint' ? v.toString() : v), 2)
  );
}

main().catch(console.error);
