import { PushChain } from '@pushchain/core'
import { createWalletClient, http } from 'viem'
import { ethers } from 'ethers'
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts'
import { sepolia } from 'viem/chains'

function toChainAgnostic() {
  const chainAgnosticAddress = PushChain.utils.account.toChainAgnostic('0xD8d6aF611a17C236b13235B5318508FA61dE3Dba', {
    chain: PushChain.CONSTANTS.CHAIN.ETHEREUM_SEPOLIA,
  })
  return chainAgnosticAddress
}

async function convertOriginToExecutor() {
  const account = PushChain.utils.account.toUniversal('0xD8d6aF611a17C236b13235B5318508FA61dE3Dba', {
    chain: PushChain.CONSTANTS.CHAIN.ETHEREUM_SEPOLIA,
  })

  const executorInfo = await PushChain.utils.account.convertOriginToExecutor(account, {
    status: true,
  })

  const executorSimple = await PushChain.utils.account.convertOriginToExecutor(account, {
    status: false,
  })

  return { executorInfo, executorSimple }
}

function toUniversalAccount() {
  const account = PushChain.utils.account.toUniversal('0xD8d6aF611a17C236b13235B5318508FA61dE3Dba', {
    chain: PushChain.CONSTANTS.CHAIN.ETHEREUM_SEPOLIA,
  })
  return account
}

function fromChainAgnostic() {
  const account = PushChain.utils.account.fromChainAgnostic(
    'eip155:11155111:0xD8d6aF611a17C236b13235B5318508FA61dE3Dba'
  )
  return account
}

async function toUniversalFromKeyPair() {
  // ethers
  const provider = new ethers.JsonRpcProvider('https://sepolia.drpc.org')
  const wallet = new ethers.Wallet(ethers.Wallet.createRandom().privateKey, provider)

  const universalSignerEthers = await PushChain.utils.signer.toUniversalFromKeyPair(wallet, {
    chain: PushChain.CONSTANTS.CHAIN.ETHEREUM_SEPOLIA,
    library: PushChain.CONSTANTS.LIBRARY.ETHEREUM_ETHERSV6,
  })

  // viem
  const account = privateKeyToAccount(generatePrivateKey())
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(),
  })
  const viemSigner = await PushChain.utils.signer.toUniversalFromKeyPair(walletClient, {
    chain: PushChain.CONSTANTS.CHAIN.ETHEREUM_SEPOLIA,
    library: PushChain.CONSTANTS.LIBRARY.ETHEREUM_VIEM,
  })
  return { universalSignerEthers, viemSigner }
}

async function toUniversalSigner() {
  // ethers example
  const provider = new ethers.JsonRpcProvider('https://sepolia.drpc.org')
  const wallet = new ethers.Wallet(ethers.Wallet.createRandom().privateKey, provider)
  const ethersSigner = await PushChain.utils.signer.toUniversal(wallet)

  // viem example
  const account = privateKeyToAccount(generatePrivateKey())
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(),
  })
  const viemSigner = await PushChain.utils.signer.toUniversal(walletClient)

  return { ethersSigner, viemSigner }
}

async function construct() {
  const viemAccount = privateKeyToAccount(generatePrivateKey())
  const universalAccount = PushChain.utils.account.fromChainAgnostic(`eip155:11155111:${viemAccount.address}`)

  const address = viemAccount.address
  const signMessage = async (data) => {
    const hexSig = await viemAccount.signMessage({
      message: { raw: data },
    })
    return hexToBytes(hexSig)
  }
  const signTransaction = async (unsignedTx) => {
    const tx = parseTransaction(bytesToHex(unsignedTx))
    const txHash = await viemAccount.signTransaction(tx)
    return hexToBytes(txHash)
  }
  const signTypedData = async ({ domain, types, primaryType, message }) => {
    const hexSig = await viemAccount.signTypedData({
      domain,
      types,
      primaryType,
      message,
    })
    return hexToBytes(hexSig)
  }

  const skeleton = PushChain.utils.signer.construct(universalAccount, {
    signMessage,
    signTransaction,
    signTypedData,
  })

  return skeleton
}

async function main() {
  console.log('\nTrying to call toChainAgnostic')
  const chainAgnosticResult = toChainAgnostic()
  console.log('Result from toChainAgnostic:', chainAgnosticResult)

  console.log('\nTrying to call convertOriginToExecutor')
  const executorResult = await convertOriginToExecutor()
  console.log('Result from convertOriginToExecutor:', JSON.stringify(executorResult, null, 2))

  console.log('\nTrying to call toUniversalAccount')
  const universalAccountResult = toUniversalAccount()
  console.log('Result from toUniversalAccount:', JSON.stringify(universalAccountResult, null, 2))

  console.log('\nTrying to call fromChainAgnostic')
  const fromChainAgnosticResult = fromChainAgnostic()
  console.log('Result from fromChainAgnostic:', JSON.stringify(fromChainAgnosticResult, null, 2))

  console.log('Trying to call toUniversalFromKeyPair')
  const universalFromKeyPairResult = await toUniversalFromKeyPair()
  console.log('Result from toUniversalFromKeyPair:', JSON.stringify(universalFromKeyPairResult, null, 2))

  console.log('\nTrying to call toUniversalSigner')
  const universalSignerResult = await toUniversalSigner()
  console.log('Result from toUniversalSigner:', JSON.stringify(universalSignerResult, null, 2))

  console.log('\nTrying to call construct')
  const constructResult = await construct()
  console.log('Result from construct:', JSON.stringify(constructResult, null, 2))
}

main().catch(console.error)
