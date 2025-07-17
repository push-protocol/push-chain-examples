# PushChain Examples

A comprehensive collection of example applications, SDK functions, and smart contracts to help you build on PushChain. This repository serves as a learning resource and reference implementation for developers looking to leverage PushChain's cross-chain capabilities.

## Repository Structure

### [Apps](./apps)

Complete application examples showcasing various PushChain features and integration patterns. Each app demonstrates a specific use case or implementation approach.

#### Available Applications

- **[Simulate](./apps/simulate)** - A transaction simulation tool that helps developers test and validate cross-chain transactions before executing them on mainnet. Includes transaction preview and gas estimation features.

### [Core SDK Functions](./core-sdk-functions)

Examples of how to use PushChain's SDK for common blockchain operations, including account management, transaction handling, cross-chain communication, and more.

#### Available SDK Examples

- **[Create Universal Signer](./core-sdk-functions/create-universal-signer)** - Learn how to create and manage universal signers that work across multiple blockchains.

- **[Custom Universal Signer](./core-sdk-functions/custom-universal-signer)** - Advanced examples of customizing universal signer behavior for specific use cases.

- **[Initialize EVM Client](./core-sdk-functions/initialize-evm-client)** - Examples of connecting to and interacting with EVM-compatible blockchains.

- **[Initialize Push Chain Client](./core-sdk-functions/initialize-push-chain-client)** - Learn how to initialize and configure the PushChain client for your applications.

- **[Reading Push Chain State](./core-sdk-functions/reading-push-chain-state)** - Examples of reading and querying state from the PushChain network.

- **[Send Universal Transaction](./core-sdk-functions/send-universal-transaction)** - Learn how to send transactions that work across multiple blockchains using PushChain's universal transaction system.

- **[Speedrun](./core-sdk-functions/speedrun)** - Quick start examples for rapid development and testing.

- **[Utility Functions](./core-sdk-functions/utility-functions)** - Common utility functions and helper methods for PushChain development.

- **[Others Contract Helpers](./core-sdk-functions/others-contract-helpers)** - Additional contract interaction helpers and utilities.

### [Tutorials](./tutorials)

Step-by-step guides and example projects that teach you how to build specific features using PushChain. Each tutorial includes both smart contracts and frontend code.

#### Available Tutorials

- **[Universal Counter](./tutorials/universal-counter)** - A demonstration of cross-chain interaction using PushChain's Universal Ethereum Account (UEA) system. This project shows how users from Ethereum, Solana, and PushChain can interact with the same application seamlessly.

## Featured Examples

### Universal Counter

A demonstration of cross-chain interaction using PushChain's Universal Ethereum Account (UEA) system. This project shows how users from Ethereum, Solana, and PushChain can interact with the same application seamlessly.

[Go to Universal Counter Tutorial →](./tutorials/universal-counter)

## Getting Started

1. **Choose Your Path**: Browse the repository to find an example that matches your use case
   - For complete applications, start with the [Apps](./apps) directory
   - For SDK integration, explore the [Core SDK Functions](./core-sdk-functions) directory
   - For learning tutorials, check out the [Tutorials](./tutorials) directory

2. **Follow Instructions**: Each example includes detailed README instructions for setup and usage

3. **Experiment**: Modify the code to suit your specific needs and requirements

4. **Build**: Use these examples as building blocks for your own PushChain applications

## Prerequisites

- Basic knowledge of blockchain development concepts
- Familiarity with JavaScript/TypeScript for frontend examples
- Understanding of Solidity for smart contract examples
- Node.js and npm/yarn for development environment

## Quick Start

To get started with any example:

```bash
# Clone the repository
git clone https://github.com/pushchain/push-chain-examples.git
cd push-chain-examples

# Navigate to your chosen example
cd apps/chess  # or any other app

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Development Workflow

1. **Explore Examples**: Start by running the examples to understand how they work
2. **Study Code**: Examine the implementation details and patterns used
3. **Modify**: Make changes to experiment with different features
4. **Build**: Create your own applications using these patterns
5. **Contribute**: Share your improvements and new examples with the community

## Resources

- [PushChain Documentation](https://push.org/docs)
- [PushChain GitHub](https://github.com/pushchain)
- [PushChain Community Discord](https://discord.gg/pushchain)
- [PushChain Portal](https://portal.push.org/)

## Contributing

Contributions are welcome! If you have an example or tutorial you'd like to add, please submit a pull request. We encourage:

- New application examples
- Additional SDK function examples
- Tutorial improvements
- Documentation enhancements
- Bug fixes and performance improvements

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

If you need help with any of these examples or have questions about PushChain development:

- Join our [Discord community](https://discord.gg/pushchain)
- Check our [documentation](https://push.org/docs)
- Open an issue on GitHub for bugs or feature requests
