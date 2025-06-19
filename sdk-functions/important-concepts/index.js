import { PushChain } from '@pushchain/core'
import { ethers } from 'ethers'
import { Keypair } from '@solana/web3.js'

async function toUniversalAccount() {
  // PushChain.utils.account.toUniversal(address, {chain})
  const ethereumAccount = PushChain.utils.account.toUniversal('0x742d35Cc6370C742Fc60f8b67da6c68F091C42b5', {
    chain: PushChain.CONSTANTS.CHAIN.ETHEREUM_SEPOLIA,
  })

  console.log(JSON.stringify(ethereumAccount, null, 2))

  // Solana Testnet
  const solanaAccount = PushChain.utils.account.toUniversal('ySYrGNLLJSK9hvGGpoxg8TzWfRe8ftBtDSMECtx2eJR', {
    chain: PushChain.CONSTANTS.CHAIN.SOLANA_DEVNET,
  })

  console.log(JSON.stringify(solanaAccount, null, 2))
}

async function toUniversalSigner() {
  // Ethereum Sepolia
  const ethwallet = ethers.Wallet.createRandom()
  const ethprovider = new ethers.JsonRpcProvider('https://sepolia.gateway.tenderly.co')
  const signer = ethwallet.connect(ethprovider)

  const universalSignerFromEth = await PushChain.utils.signer.toUniversal(signer)

  // Solana Testnet
  const solKeypair = Keypair.generate()

  const universalSignerFromSol = await PushChain.utils.signer.toUniversalFromKeyPair(solKeypair, {
    chain: PushChain.CONSTANTS.CHAIN.SOLANA_DEVNET,
    library: PushChain.CONSTANTS.LIBRARY.SOLANA_WEB3JS,
  })

  console.log(JSON.stringify(universalSignerFromEth, null, 2))
  console.log(JSON.stringify(universalSignerFromSol, null, 2))
}

async function main() {
  console.log('🔑 toUniversalAccount')
  await toUniversalAccount()

  console.log('🔑 toUniversalSigner')
  await toUniversalSigner()
}

main().catch(console.error)
