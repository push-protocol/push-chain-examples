// Import required modules
import { PushChain } from '@pushchain/core';

// Import Ethers for example
import { ethers } from 'ethers';

// Import Viem for example
import { hexToBytes } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

async function example() {
  // 1. Create a random wallet (or use your own private key)
  const wallet = ethers.Wallet.createRandom();

  // 2. Connect to a provider (e.g., Push Chain RPC URL)
  const provider = new ethers.JsonRpcProvider('https://evm.pn1.dev.push.org');
  const signer = wallet.connect(provider);

  // 3. Convert ethers signer to Universal Signer
  // Most popular libraries can pass just the signer to get universal signer
  // Or use PushChain.utils.signer.construct to create a custom one
  const universalSigner = await PushChain.utils.signer.toUniversal(signer);

  // Initialize Push Chain SDK for use from Push Chain account
  const pushChainClient = await PushChain.initialize(universalSigner, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET,
  });

  // Send a universal transaction (from any chain to Push Chain)
  const txHash = await pushChainClient.universal.sendTransaction({
    to: '0xD0DE00000447492307108Bdc7Ff6BaB33Ff37Dacc479', // To address on Push Chain
    value: BigInt(0), // $PC Value to send
  });

  console.log('Transaction sent:', txHash);
}

example().catch(console.error);