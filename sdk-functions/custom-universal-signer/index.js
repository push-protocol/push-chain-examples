// Import Push Chain Core
import { PushChain } from '@pushchain/core';

// Import if you are using ethers
import { ethers } from 'ethers';

// Import input

async function main() {
  // ETHERS USAGE
  console.log('Let\'s create custom universal signer');
  console.log('You ONLY DO THIS when you don\'t have a supported library like ethers, viem, etc. or want to create a custom implementation');
  console.log('If you have a supported library, check createUniversalSigner example');
  
  console.log('------');
  console.log('We will create a custom universal signer using ethers for this example');

  // We need to pass the following to PushChain.utils.signer.construct(account, {options})
  // 1. account which is a universal account
  // 2. options which is an object with the following properties
  // 2.1 signAndSendTransaction
  // 2.2 signMessage
  // 2.3 signTypedData

  console.log('------\n\n');
  console.log('1. account to universal account');


  // 1. account to universal account
  // Create random wallet
  const wallet = ethers.Wallet.createRandom();
  
  // Convert wallet.address to Universal Account
  const universalAccount = PushChain.utils.account.toUniversal(wallet.address, {
    chain: PushChain.CONSTANTS.CHAIN.ETHEREUM_SEPOLIA,
  });
  console.log('1. Created Universal Account:', JSON.stringify(universalAccount, null, 2), '\n--\n\n');


  // 2. options to construct
  // 2.1 signAndSendTransaction
  // create custom Sign and Send Transaction
  const customSignAndSendTransaction = async (unsignedTx) => {
    // Sign the transaction using ethers wallet
    const signedTx = await wallet.signTransaction(unsignedTx);
    const sendTx = await wallet.sendTransaction(signedTx);

    // Always a Uint8Array
    return Uint8Array.from(sendTx);
  };
  console.log('2.1 Created customSignAndSendTransaction function:', JSON.stringify(customSignAndSendTransaction, null, 2), '\n--\n\n');

  
  // 2.2 signMessage
  const customSignMessage = async (message) => {
    // Sign message using ethers wallet
    const signature = await wallet.signMessage(message);

    // Always a Uint8Array
    return Uint8Array.from(signature);
  };
  console.log('2.2 Created customSignMessage function:', JSON.stringify(customSignMessage, null, 2), '\n--\n\n');

  // 2.3 signMessage
  const customSignTypedData = async (domain, types, value) => {
    // Sign typed data using ethers wallet
    const signature = await wallet._signTypedData(domain, types, value);

    // Always a Uint8Array
    return Uint8Array.from(signature);
  };
  console.log('2.3 Created customSignTypedData function:', JSON.stringify(customSignAndSendTransaction, null, 2), '\n--\n\n');


  // * Construct the universal signer skeleton with custom signing functions
  const universalSignerSkeleton = await PushChain.utils.signer.construct(universalAccount, {
    signTransaction: customSignAndSendTransaction,
    signMessage: customSignMessage,
    signTypedData: customSignTypedData
  });
  console.log('3. Created Universal Signer with custom signing functions', JSON.stringify(universalSignerSkeleton, null, 2), '\n--\n\n');
  

  // ** Pass constructed universal signer skeleton to create universal signer **
  const universalSigner = await PushChain.utils.signer.toUniversal(universalSignerSkeleton);
  console.log('4. Created Universal Signer with custom signer', JSON.stringify(universalSigner, null, 2), '\n--\n\n');

  // ** Initialize Push Chain SDK with custom signer **
  const pushChain = await PushChain.initialize(universalSigner, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET,
  });
  console.log('(Optional) 5. Initialized Push Chain SDK with custom signer', JSON.stringify(pushChain), '\n--\n\n');

  // Send Transaction
  const tx = await pushChain.universal.sendTransaction({
    to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    value: BigInt('0'),
  });
  console.log('Transaction sent:', tx);
}

main().catch(console.error);
