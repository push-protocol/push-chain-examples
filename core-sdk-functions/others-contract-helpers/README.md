# Other Contract Helper Examples

When building smart contract applications on Push Chain, you'll at times need helper contracts to surface on-chain metadata—like identifying external chain users or computing deterministic smart account addresses. Push Chain provides a set of helper interfaces under the hood to simplify these workflows.

- [Push Chain Documentation](https://push.org/docs/chain/build/contract-helpers)

## 🚀 Quick Start

```bash
npm install
npm start
```

## ⚡ Ethers Examples

The example shows how to:
- Query origin account information using `getOriginForUEA`
- Compute UEA addresses for Ethereum accounts using `getUEAForOrigin`
- Handle proper address formatting and checksums

## ☀️ Solana Examples

The example shows how to:
- Convert Solana addresses to bytes format
- Compute UEA addresses for Solana accounts
- Handle base58 encoding/decoding

## 📦 Dependencies

- `@pushchain/core`: For Push Chain contract helpers
- `ethers`: ^6.14.4 - For contract interaction
- `@scure/base`: For Solana address conversion