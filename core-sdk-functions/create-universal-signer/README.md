# Create Universal Signer Examples

Create a Universal Signer to wrap any EVM or non-EVM signer (ethers, viem, Solana, etc.) into a chain-agnostic UniversalSigner object, so you can send cross-chain transactions via Push Chain without changing your on-chain code.

- [Push Chain Documentation](https://push.org/docs/chain)

## 🚀 Quick Start

```bash
npm install
npm start
```

## ⚡ Ethers Examples

The example shows how to create Universal Signers with ethers.js for:
- Push Chain accounts using Push Chain testnet
- Ethereum accounts using Sepolia testnet
- Converting ethers signer to Universal Signer format

## 🌟 Viem Examples

The example shows how to create Universal Signers with viem for:
- Push Chain accounts using Push Chain testnet
- Ethereum accounts using Sepolia testnet
- Converting viem wallet client to Universal Signer format

## ☀️ Solana Examples

The example shows how to:
- Create Solana keypairs
- Convert Solana web3.js signer to Universal Signer format

## 📦 Dependencies

- `@pushchain/core`: For Universal Signer conversion
- `ethers`: ^6.14.4 - For ethers.js implementation
- `viem`: ^2.31.3 - For viem implementation
- `@solana/web3.js`: For Solana implementation