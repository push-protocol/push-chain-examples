# Custom Universal Signer Examples

If you don't have a supported library signer to [create universal signer](../create-universal-signer/) or want to create a custom implementation, you can construct a Universal Signer manually by implementing the required signing functions.

- [Push Chain Documentation](https://push.org/docs/chain/build/advanced/custom-universal-signer)

## 🚀 Quick Start

```bash
npm install
npm start
```

## ⚡ Custom Signer Example

The example shows how to:
- Convert an account to Universal Account format
- Implement custom signing functions:
  - `signAndSendTransaction`
  - `signMessage`
  - `signTypedData`
- Construct a Universal Signer with custom implementations
- Send transactions using the custom signer

## 📦 Dependencies

- `@pushchain/core`: For Universal Signer construction
- `ethers`: ^6.14.4 - For example implementation
- `viem`: ^2.31.3 - For hex utilities