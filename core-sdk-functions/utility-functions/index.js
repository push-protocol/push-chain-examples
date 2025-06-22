// Full Documentation: https://push.org/docs/sdk-functions/utility-functions

import { PushChain } from '@pushchain/core';
import { ethers } from 'ethers';
import { createWalletClient, http } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

// ⭐️ MAIN FUNCTION ⭐️
async function main() {
  console.log("\n\n\n🔑 Account Utilities");

  console.log('\n🏃 Trying to call PushChain.utils.account.convertOriginToExecutor');
  const executorResult = await convertOriginToExecutor();
  console.log('✅ Success:', JSON.stringify(executorResult, null, 2));
  
  console.log('\n🏃 Trying to call toChainAgnostic');
  const chainAgnosticResult = toChainAgnostic();
  console.log('✅ Success:', chainAgnosticResult);

  console.log('\n🏃 Trying to call toUniversalAccount');
  const universalAccountResult = toUniversalAccount();
  console.log('✅ Success:', JSON.stringify(universalAccountResult, null, 2));

  console.log('\n🏃 Trying to call fromChainAgnostic');
  const fromChainAgnosticResult = fromChainAgnostic();
  console.log('✅ Success:', JSON.stringify(fromChainAgnosticResult, null, 2));

  console.log('🏃 Trying to call toUniversalFromKeypair');
  const universalFromKeyPairResult = await toUniversalFromKeypair();
  console.log('✅ Success:', JSON.stringify(universalFromKeyPairResult, null, 2));


  console.log("\n\n\n📝 Signer Utilities");
  console.log('\n🏃 Trying to call PushChain.utils.signer.toUniversalSigner');
  const universalSignerResult = await toUniversalSigner();
  console.log('✅ Success:', JSON.stringify(universalSignerResult, null, 2));


  console.log("🔍 Explorer Utilities\n\n\n");
  console.log('\n🏃 Trying to call pushChainClient.explorer.getTransactionUrl');
  const transactionUrlResult = await getTransactionUrl();
  console.log('✅ Success:', transactionUrlResult);

  console.log('\n🏃 Trying to call pushChainClient.explorer.listUrls');
  const listUrlsResult = await listUrls();
  console.log('✅ Success:', listUrlsResult);


  console.log("🛠️  Helper Utilities\n\n\n");
  console.log('\n🏃 Trying to call PushChain.utils.helpers.getChainName');
  const chainNameFromIdResult = await getChainName();
  console.log('✅ Success:', chainNameFromIdResult);
}

await main().catch(console.error);

// Account Utilities
// PushChain.utils.account.convertOriginToExecutor(account: string, { chain: string })
async function convertOriginToExecutor() {
  const account = PushChain.utils.account.toUniversal('0xD8d6aF611a17C236b13235B5318508FA61dE3Dba', {
    chain: PushChain.CONSTANTS.CHAIN.ETHEREUM_SEPOLIA,
  });

  const executorInfo = await PushChain.utils.account.convertOriginToExecutor(account, {
    status: true,
  });

  const executorSimple = await PushChain.utils.account.convertOriginToExecutor(account, {
    status: false,
  });

  return { executorInfo, executorSimple };
}

// PushChain.utils.account.toUniversal(address: string, { options: { chain: string }})
function toUniversalAccount() {
  const account = PushChain.utils.account.toUniversal('0xD8d6aF611a17C236b13235B5318508FA61dE3Dba', {
    chain: PushChain.CONSTANTS.CHAIN.ETHEREUM_SEPOLIA,
  });
  return account;
}

// PushChain.utils.account.toChainAgnostic(address: string, { chain: string })
function toChainAgnostic() {
  const chainAgnosticAddress = PushChain.utils.account.toChainAgnostic('0xD8d6aF611a17C236b13235B5318508FA61dE3Dba', {
    chain: PushChain.CONSTANTS.CHAIN.ETHEREUM_SEPOLIA,
  });
  return chainAgnosticAddress;
}


// PushChain.utils.account.fromChainAgnostic(address: string)
function fromChainAgnostic() {
  const account = PushChain.utils.account.fromChainAgnostic(
    'eip155:11155111:0xD8d6aF611a17C236b13235B5318508FA61dE3Dba'
  );
  return account;
}


// Signer Utilities
// PushChain.utils.signer.toUniversalFromKeypair(signer: Signer, { chain: string })
async function toUniversalFromKeypair() {
  // ethers
  const provider = new ethers.JsonRpcProvider('https://sepolia.drpc.org');
  const wallet = new ethers.Wallet(ethers.Wallet.createRandom().privateKey, provider);

  const universalSignerEthers = await PushChain.utils.signer.toUniversalFromKeypair(wallet, {
    chain: PushChain.CONSTANTS.CHAIN.ETHEREUM_SEPOLIA,
    library: PushChain.CONSTANTS.LIBRARY.ETHEREUM_ETHERSV6,
  });

  // viem
  const account = privateKeyToAccount(generatePrivateKey());
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(),
  });
  const viemSigner = await PushChain.utils.signer.toUniversalFromKeypair(walletClient, {
    chain: PushChain.CONSTANTS.CHAIN.ETHEREUM_SEPOLIA,
    library: PushChain.CONSTANTS.LIBRARY.ETHEREUM_VIEM,
  });
  return { universalSignerEthers, viemSigner };
}


// Explorer Utilities
// pushChainClient.explorer.getTransactionUrl(txHash: string)
async function getTransactionUrl() {
  // ethers
  const provider = new ethers.JsonRpcProvider('https://evm.rpc-testnet-donut-node1.push.org/');
  const wallet = new ethers.Wallet(ethers.Wallet.createRandom().privateKey, provider);

  const universalSigner = await PushChain.utils.signer.toUniversal(wallet.connect(provider));
  
  const pushChainClient = await PushChain.initialize(wallet, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET,
  });
  const txHash = '0x4627fd2eca321d5fd007995c94af636e5e332760f50fbd8e3426ad0c67543dad';
  const url = pushChainClient.explorer.getTransactionUrl(txHash);
  return url;
}

// pushChainClient.explorer.listUrls()
async function listUrls() {
  // ethers
  const provider = new ethers.JsonRpcProvider('https://evm.rpc-testnet-donut-node1.push.org/');
  const wallet = new ethers.Wallet(ethers.Wallet.createRandom().privateKey, provider);

  const universalSigner = await PushChain.utils.signer.toUniversal(wallet.connect(provider));
  
  const pushChainClient = await PushChain.initialize(wallet, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET,
  });

  const explorerUrls = pushChainClient.explorer.listUrls();
  return explorerUrls;
}


// Helper Utilities
// PushChain.utils.helpers.getChainName(chainNamespace: string)
async function getChainName() {
  // ETHEREUM_SEPOLIA
  const chainName = PushChain.utils.helpers.getChainName('eip155:11155111');
  return chainName;
}
