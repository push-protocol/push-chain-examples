// Import Push Chain Core
import { PushChain } from '@pushchain/core'

// Import if you are using ethers
import { ethers, hexlify } from 'ethers'
import { hexToBytes } from 'viem'

// Import input
import readline from 'readline'

async function main() {
  // ETHERS USAGE
  console.log("🚀 Let's create custom universal signer")
  console.log(
    "⚠️  You ONLY DO THIS when you don't have a supported library like ethers, viem, etc. or want to create a custom implementation"
  )
  console.log('💡 If you have a supported library, check createUniversalSigner example')

  console.log('------')
  console.log('🛠️  We will create a custom universal signer using ethers for this example')

  // We need to pass the following to PushChain.utils.signer.construct(account, {options})
  // 1. account which is a universal account
  // 2. options which is an object with the following properties
  // 2.1 signAndSendTransaction
  // 2.2 signMessage
  // 2.3 signTypedData

  console.log('------\n\n')
  console.log('1️⃣  Converting account to universal account...')

  // 1. account to universal account
  // Create random wallet
  const provider = new ethers.JsonRpcProvider('https://evm.rpc-testnet-donut-node1.push.org/')
  const wallet = ethers.Wallet.createRandom(provider)

  // Convert wallet.address to Universal Account
  const universalAccount = PushChain.utils.account.toUniversal(wallet.address, {
    chain: PushChain.CONSTANTS.CHAIN.PUSH_TESTNET,
  })
  console.log('✅ Created Universal Account:\n', JSON.stringify(universalAccount, null, 2), '\n\n\n')

  // 2. options to construct
  // 2.1 signAndSendTransaction
  // create custom Sign and Send Transaction
  console.log('2️⃣  Creating signing functions for custom signer')
  const customSignAndSendTransaction = async (unsignedTx) => {
    const unsignedHex = hexlify(unsignedTx)
    const tx = ethers.Transaction.from(unsignedHex)
    const txResponse = await wallet.sendTransaction(tx)
    return hexToBytes(txResponse.hash)
  }
  console.log('✅  Created customSignAndSendTransaction function', customSignAndSendTransaction)

  // 2.2 signMessage
  const customSignMessage = async (message) => {
    // Sign message using ethers wallet
    const signature = await wallet.signMessage(message)

    // Always a Uint8Array
    return Uint8Array.from(signature)
  }
  console.log('✅  Created customSignMessage function', customSignMessage)

  // 2.3 signMessage
  const customSignTypedData = async (domain, types, value) => {
    // Sign typed data using ethers wallet
    const signature = await wallet._signTypedData(domain, types, value)

    // Always a Uint8Array
    return Uint8Array.from(signature)
  }
  // This is optional as solana doesn't support sign typed data
  console.log('✅  Created customSignTypedData function', customSignTypedData, '\n\n\n')

  console.log('3️⃣  Creating Universal Signer Skeleton with custom signing functions...')
  // * Construct the universal signer skeleton with custom signing functions
  const universalSignerSkeleton = PushChain.utils.signer.construct(universalAccount, {
    signAndSendTransaction: customSignAndSendTransaction,
    signMessage: customSignMessage,
    signTypedData: customSignTypedData,
  })
  console.log(
    '✅  Created Universal Signer with custom signing functions\n',
    JSON.stringify(universalSignerSkeleton, null, 2),
    '\n\n\n'
  )

  console.log('4️⃣  Creating Universal Signer from Skeleton...')
  // ** Pass constructed universal signer skeleton to create universal signer **
  const universalSigner = await PushChain.utils.signer.toUniversal(universalSignerSkeleton)
  console.log('✅  Created Universal Signer Skeleton\n', JSON.stringify(universalSigner, null, 2), '\n\n\n')

  // ** Optional: Initialize Push Chain Client and Send Transaction **
  await optionalPushChainClientAndSendTx(universalSigner)
}
await main().catch(console.error)

// ** Optiona: Initialize Push Chain Client and Send Transaction **
async function optionalPushChainClientAndSendTx(universalSigner) {
  // setup for input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  console.log('5️⃣  (Optional) Initializing Push Chain Client with custom signer')
  // ** Initialize Push Chain client **
  const pushChainClient = await PushChain.initialize(universalSigner, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET,
  })
  // JSON.stringify with BigInt support
  console.log(
    '✅  Push Chain Client Initialized\n',
    JSON.stringify(pushChainClient, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
    '\n\n\n'
  )

  // Wrap in a promise to handle async/await
  await new Promise((resolve) => {
    rl.question(
      `💰 Please make sure that this wallet address: ${pushChainClient.universal.origin.address} is funded with test tokens for this chain ${pushChainClient.universal.origin.chain}\n⏎  Press Enter to continue...`,
      async () => {
        try {
          console.log('6️⃣  (Optional) Sending transaction...')

          // Send Transaction
          const tx = await pushChainClient.universal.sendTransaction({
            target: '0x0000000000000000000000000000000000042101',
            value: BigInt(1),
          })
          console.log('📤 Transaction sent:', tx)
        } catch (err) {
          console.error('❌ Error sending transaction:', err)
        } finally {
          rl.close()
          resolve()
        }
      }
    )
  })
}
