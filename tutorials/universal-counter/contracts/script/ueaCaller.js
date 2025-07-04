import { PushChain } from '@pushchain/core';
import { ethers } from 'ethers';
import * as readline from 'node:readline/promises';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Suppress the punycode deprecation warning
process.removeAllListeners('warning');

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ——— CONFIG ———
// RPC URL OF DIFFERENT CHAINS
const RPC_PUSH = process.env.RPC_PUSH;
const RPC_SEPOLIA = process.env.RPC_SEPOLIA;

// Contract details
const ABI_PATH = path.join(__dirname, 'UniversalCounterABI.json');
// TODO: Replace with your actual deployed contract address on Push Chain testnet
const CONTRACT_ADDRESS = process.env.UNIVERSAL_COUNTER_ADDRESS;
// Get private key from environment variable
const PRIVATE_KEY = process.env.USER_KEY;

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ⭐️ MAIN FUNCTION ⭐️
async function main() {
  console.log('🚀 Initializing Universal Counter Increment Example');
  
  try {
    // Load the ABI
    const abi = JSON.parse(fs.readFileSync(ABI_PATH, 'utf8'));
    // Use private key from environment variable
    const privateKey = PRIVATE_KEY;
    
    // Set up provider and connect wallet
    const provider = new ethers.JsonRpcProvider(RPC_SEPOLIA);
    const signer = new ethers.Wallet(privateKey, provider);
    console.log('📝 Using ETH wallet:', signer.address);
    // Convert to Universal Signer
    console.log('🔄 Converting to Universal Signer...');
    const universalSigner = await PushChain.utils.signer.toUniversal(signer);

    // Initialize Push Chain Client
    console.log('🔗 Initializing Push Chain Client...');
    const pushChainClient = await PushChain.initialize(universalSigner, {
      network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET,
      printTraces: true
    });
    console.log('🔑 Deterministic address of UEA for the original EOA:', pushChainClient.universal.account);  
    
    // Encode the increment() function call
    const abiInterface = new ethers.Interface(abi);
    const data = abiInterface.encodeFunctionData('increment'); // 0xd09de08a
    // Prepare transaction parameters
    const txParams = {
      to: CONTRACT_ADDRESS,
      data: data,
      value: 0n
    };
    // Send universal transaction
    console.log('📤 Sending increment() transaction to contract:', CONTRACT_ADDRESS);
    
    try {
      const txResponse = await pushChainClient.universal.sendTransaction(txParams);
      //console.log('✅ Transaction sent! Response:', JSON.stringify(txResponse, null, 2));
      console.log('Transaction hash:', txResponse);
      
      // Check if countEth was incremented (optional)
      console.log('\nWaiting for transaction confirmation...');
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      // Create contract instance to check the result
      const pushProvider = new ethers.JsonRpcProvider(RPC_PUSH);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, pushProvider);
      
      try {
        const countEth = await contract.countEth();
        console.log(`\n🔢 Current countEth value: ${countEth}`);
      } catch (error) {
        console.log('Could not fetch countEth value:', error.message);
      }
      
    } catch (error) {
      console.error('❌ Transaction failed:', error.message);
      if (error.message.includes('insufficient funds')) {
        console.log('\nMake sure your UEA has enough PC tokens for gas fees.');
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
}

// Run the main function
main().catch(console.error);
