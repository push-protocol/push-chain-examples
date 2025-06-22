// Full Documentation: https://push.org/docs/chain/build/contract-helpers

// Import Push Chain Core
import { base58 } from '@scure/base';
import { ethers } from 'ethers';

// UEAFactory minimal ABI
const UEAFactoryABI = [
  // returns (UniversalAccount account, bool isUEA)
  "function getOriginForUEA(address addr) view returns (tuple(string chain, address owner) account, bool isUEA)",
  // takes (UniversalAccount _id) and returns (address uea, bool isDeployed)
  "function getUEAForOrigin(tuple(string chain, bytes owner) _id) view returns (address uea, bool isDeployed)"
];

// Constants
const FACTORY_ADDRESS = '0x00000000000000000000000000000000000000eA';
const RPC_URL = 'https://evm.rpc-testnet-donut-node1.push.org/';

// Helper function to convert Solana address to bytes
function solanaAddressToBytes(address) {
  return base58.decode(address);
}

// ⭐️ MAIN FUNCTION ⭐️
async function main() {
  console.log('\n⚡ Ethers Examples');
  console.log('\n1. Get Origin for UEA');
  await getOriginForUEA();

  console.log('\n2. Get UEA for Origin');
  await getUEAForOrigin_Ethereum();

  console.log('\n☀️ Solana Examples');
  console.log('\n1. Get UEA for Origin');
  await getUEAForOrigin_Solana();
}

await main().catch(console.error);

// --- Get Origin for UEA Example ---
async function getOriginForUEA() {
  // Initialize provider and contract
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const factory = new ethers.Contract(FACTORY_ADDRESS, UEAFactoryABI, provider);

  // Get origin information for an address
  const someAddress = '0xa96CaA79eb2312DbEb0B8E93c1Ce84C98b67bF11';
  const originResult = await factory.getOriginForUEA(someAddress);

  console.log('🔍 Input Address:', someAddress);
  console.log('📄 Result:', JSON.stringify({
    account: {
      chain: originResult[0].chain,
      owner: originResult[0].owner
    },
    isUEA: originResult[1]
  }, null, 2));
}

// --- Get UEA for Origin (Ethereum) Example ---
async function getUEAForOrigin_Ethereum() {
  // Initialize provider and contract
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const factory = new ethers.Contract(FACTORY_ADDRESS, UEAFactoryABI, provider);

  // Set up Ethereum account
  const ethAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // Checksum address
  const ethOriginAccount = {
    chain: 'eip155:11155111',  // Ethereum Sepolia namespace
    owner: ethers.getBytes(ethAddress) // Convert to bytes
  };

  // Get UEA information
  const ueaResult = await factory.getUEAForOrigin(ethOriginAccount);

  console.log('🔍 Input Account:', JSON.stringify({
    chain: ethOriginAccount.chain,
    owner: ethAddress
  }, null, 2));
  console.log('📄 Result:', JSON.stringify({
    uea: ueaResult[0],
    isDeployed: ueaResult[1]
  }, null, 2));
}

// --- Get UEA for Origin (Solana) Example ---
async function getUEAForOrigin_Solana() {
  // Initialize provider and contract
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const factory = new ethers.Contract(FACTORY_ADDRESS, UEAFactoryABI, provider);

  // Set up Solana account
  const solAddress = '14grJpemFaf88c8tiVb77W7TYg2W3ir6pfkKz3YjhhZ5';
  const solOriginAccount = {
    chain: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',  // Solana Devnet namespace
    owner: solanaAddressToBytes(solAddress) // Convert to bytes
  };

  // Get UEA information
  const ueaResult = await factory.getUEAForOrigin(solOriginAccount);

  console.log('🔍 Input Account:', JSON.stringify({
    chain: solOriginAccount.chain,
    owner: solAddress
  }, null, 2));
  console.log('📄 Result:', JSON.stringify({
    uea: ueaResult[0],
    isDeployed: ueaResult[1]
  }, null, 2));
}
