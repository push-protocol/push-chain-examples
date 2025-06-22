# Send Universal Transaction Examples

Learn how to send transactions using Push Chain's Universal Transaction system. Compare implementations using different clients (ethers.js and viem).

- [Push Chain Documentation](https://push.org/docs/chain)

## 🚀 Quick Start

```bash
npm install
npm start
```

## 🔄 Transaction Examples

The example shows how to:
- Create a universal signer with different clients
- Initialize Push Chain client
- Send universal transactions:
  - Basic ETH transfer
  - Contract interaction
  - Raw transaction data
- Handle transaction receipts
- Compare responses between ethers.js and viem

## 💻 Implementation Details

### Creating Universal Signer
```javascript
// Ethers
const wallet = ethers.Wallet.createRandom();
const provider = new ethers.JsonRpcProvider('https://evm.rpc-testnet-donut-node1.push.org/');
const signer = wallet.connect(provider);
const universalSigner = await PushChain.utils.signer.toUniversal(signer);

// Viem
const account = privateKeyToAccount(generatePrivateKey());
const client = createWalletClient({
  account,
  chain: pushTestnet,
  transport: http()
});
const universalSigner = await PushChain.utils.signer.toUniversal(client);
```

### Sending Universal Transaction
```javascript
// Initialize Push Chain client
const pushChainClient = await PushChain.initialize(universalSigner, {
  network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET_DONUT
});

// Send transaction
const tx = await pushChainClient.universal.sendTransaction({
  to: "0x...",
  value: "1000000000000000"
});

// Get receipt
const receipt = await tx.wait();
```

## 📦 Dependencies

- `@pushchain/core`: ^0.1.1 - Push Chain Core SDK
- `ethers`: ^6.14.4 - For ethers.js implementation
- `viem`: ^2.31.3 - For viem implementation
