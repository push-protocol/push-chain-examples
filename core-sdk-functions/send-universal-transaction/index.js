// Full Documentation: https://push.org/docs/chain/build/send-universal-transaction

// Import Push Chain Core
import { PushChain } from '@pushchain/core';

// Import ethers for example
import { ethers } from 'ethers';

// Import Solana web3
import { Connection, Keypair } from '@solana/web3.js';

// Import viem
import { createWalletClient, defineChain, http } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

// Readline for input
import * as readline from 'node:readline/promises';

// For input from user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ⭐️ MAIN FUNCTION ⭐️
async function main() {
  console.log('\n⚡ Ethers v6 Examples - PUSH Chain');
  await ethersV6();

  console.log('\n🌟 Viem Examples - PUSH Chain');
  await viemExample();

  console.log('\n🌞 Solana Examples - SOL Chain');
  await solanaExample();
}

// Run main
await main().catch(console.error);

// --- Ethers Example ---
// ---------------------
async function ethersV6() {
  // Decide the flow, native transaction or transaction from other chains
  const chainSelection = await rl.question(`:::prompt:::Please select the chain to send the transaction from (1 for Push Testnet Donut, 2 for Ethereum Sepolia): `);
  chainSelection !== '1' && chainSelection !== '2' ? console.log('Invalid selection. Please select 1 or 2.') : null;

  // Set provider based on chain selection
  const PROVIDER = chainSelection === '1' ? 'https://evm.rpc-testnet-donut-node1.push.org/' : 'https://ethereum-sepolia-rpc.publicnode.com';

  // LFG!!
  console.log('\n1. Create Universal Signer');
  const wallet = ethers.Wallet.createRandom();
  console.log('🔑 Got wallet: ', wallet.address);

  const provider = new ethers.JsonRpcProvider(PROVIDER);
  const signer = wallet.connect(provider);
  const universalSigner = await PushChain.utils.signer.toUniversal(signer);
  console.log('🔑 Got universal signer');

  console.log('\n2. Initialize Push Chain Client');
  const pushChainClient = await PushChain.initialize(universalSigner, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET_DONUT,
  });
  console.log('🚀 Got push chain client');

  // Wait for testnet funds to be sent by developer
  console.log('\n3. Wait for testnet funds to be sent by developer');
  await rl.question(`:::prompt:::Please send funds to ${wallet.address} on ${chainSelection === '1' ? 'Push Testnet Donut' : 'Ethereum Sepolia'} and Press Enter to continue.`);

  // Send Universal Transaction
  console.log('\n4. Send Universal Transaction');
  try {
    // Example: Send 0.001 ETH to a random address
    const txResponse = await pushChainClient.universal.sendTransaction({
      to: '0x0000000000000000000000000000000000042101', // receiver address
      value: ethers.parseEther('0.001'),
    });
    console.log('📤 Transaction Response:', txResponse);

    // TODO: enable when txResponse object is done
    // const receipt = txResponse.wait();
    // console.log('✅ Transaction mined receipt:', receipt);

    if (chainSelection !== '1') {
      console.log('🎉 Congrats! You just sent a universal transaction! Here is what happened:');
      console.log('1️⃣  You sent SEPOLIA ETH to our Universal Gateway on Sepolia');
      console.log('2️⃣  Our Universal Gateway locked the funds, converted them to USD stablecoin');
      console.log('3️⃣  Push Chain Validators confirms the funds and deploys Universal Executor Account(gasslessly) controlled by your Sepolia wallet');
      console.log('4️⃣  Push CHain Validators then minted equivalent amount of $PC through internal AMM on Push Chain');
      console.log('5️⃣  Your signature was used to verify and complete your transaction on Push Chain and gas was paid in $PC from your UEA');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('💡 Note: This example requires testnet funds to execute');
  } finally {
    rl.close();
  }
}


// --- Viem Examples ---
// ---------------------
async function viemExample() {
  // Decide the flow, native transaction or transaction from other chains
  const chainSelection = await rl.question(`:::prompt:::Please select the chain to send the transaction from (1 for Push Testnet Donut, 2 for Ethereum Sepolia): `);
  chainSelection !== '1' && chainSelection !== '2' ? console.log('Invalid selection. Please select 1 or 2.') : null;

  // Set RPC based on chain selection
  const RPC_URL = chainSelection === '1' ? 'https://evm.rpc-testnet-donut-node1.push.org/' : 'https://ethereum-sepolia-rpc.publicnode.com';

  // LFG!!
  console.log('\n1. Create Universal Signer');
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  console.log('🔑 Got account: ', account.address);

  // Define Push Testnet chain configuration for Viem
  const pushTestnet = defineChain({
    rpcUrls: {
      default: { http: [RPC_URL] },
    },
  });

  // create viem client
  const client = createWalletClient({
    account,
    chain: pushTestnet,
    transport: http(),
  });
  const universalSigner = await PushChain.utils.signer.toUniversal(client);
  console.log('🔑 Got universal signer');

  console.log('\n2. Initialize Push Chain Client');
  const pushChainClient = await PushChain.initialize(universalSigner, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET_DONUT,
  });
  console.log('🚀 Got push chain client');

  console.log('\n3. Wait for testnet funds to be sent by developer');
  await rl.question(`:::prompt:::Please send funds to ${wallet.address} on ${chainSelection === '1' ? 'Push Testnet Donut' : 'Ethereum Sepolia'} and Press Enter to continue.`);

  console.log('\n4. Send Universal Transaction');
  try {
    const txResponse = await pushChainClient.universal.sendTransaction({
      to: '0x0000000000000000000000000000000000042101',
      value: BigInt(1000000000000000), // 0.001 ETH in wei
    });
    console.log('📤 Transaction Response:', txResponse);

    // TODO: enable when txResponse object is done
    // const receipt = txResponse.wait();
    // console.log('✅ Transaction mined receipt:', receipt);

    if (chainSelection !== '1') {
      console.log('🎉 Congrats! You just sent a universal transaction! Here is what happened:');
      console.log('1️⃣  You sent SEPOLIA ETH to our Universal Gateway on Sepolia');
      console.log('2️⃣  Our Universal Gateway locked the funds, converted them to USD stablecoin');
      console.log('3️⃣  Push Chain Validators confirms the funds and deploys Universal Executor Account(gasslessly) controlled by your Sepolia wallet');
      console.log('4️⃣  Push CHain Validators then minted equivalent amount of $PC through internal AMM on Push Chain');
      console.log('5️⃣  Your signature was used to verify and complete your transaction on Push Chain and gas was paid in $PC from your UEA');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('💡 Note: This example requires testnet funds to execute');
  }
}


// --- Solana Examples ---
// ---------------------
async function solanaExample() {
  console.log('\n1. Create Universal Signer');
  const keypair = Keypair.generate();
  console.log('🔑 Got keypair: ', keypair.publicKey.toBase58());

  // Create connection
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  const universalSigner = await PushChain.utils.signer.toUniversalFromKeypair(keypair, {
    chain: PushChain.CONSTANTS.CHAIN.SOLANA_DEVNET,
    library: PushChain.CONSTANTS.LIBRARY.SOLANA_WEB3JS,
  });
  
  console.log('🔑 Got universal signer');

  console.log('\n2. Initialize Push Chain Client');
  const pushChainClient = await PushChain.initialize(universalSigner, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.SOLANA_DEVNET,
  });
  console.log('🚀 Got push chain client');

  console.log('\n3. Wait for testnet funds to be sent by developer');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const answer = await rl.question(`:::prompt:::Please send funds to ${keypair.publicKey.toBase58()} and Press Enter to continue.`);
  rl.close();

  console.log('\n4. Send Universal Transaction');
  try {
    const txResponse = await pushChainClient.universal.sendTransaction({
      to: '0x0000000000000000000000000000000000042101',
      value: BigInt(1000000000000), // .001 PC 
    });
    console.log('📤 Transaction Response:', txResponse);

    // TODO: enable when txResponse object is done
    // const receipt = txResponse.wait();
    // console.log('✅ Transaction mined receipt:', receipt);

    console.log('🎉 Congrats! You just sent a universal transaction! Here is what happened:');
    console.log('1️⃣  You sent DEVNET SOLANA to our Universal Gateway on Solana Devnet');
    console.log('2️⃣  Our Universal Gateway locked the funds, converted them to USD stablecoin');
    console.log('3️⃣  Push Chain Validators confirms the funds and deploys Universal Executor Account(gasslessly) controlled by your Solana wallet');
    console.log('4️⃣  Push CHain Validators then minted equivalent amount of $PC through internal AMM on Push Chain');
    console.log('5️⃣  Your signature was used to verify and complete your transaction on Push Chain and gas was paid in $PC from your UEA');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('💡 Note: This example requires testnet funds to execute');
  }
}
