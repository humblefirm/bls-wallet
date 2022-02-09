# BLS Wallet

BLS Wallet is an Ethereum Layer 2 smart contract wallet that uses [BLS signatures](https://en.wikipedia.org/wiki/BLS_digital_signature) to bundle multiple transactions into one, saving on gas costs.

TODO 
See gas measurements at fjrnjkgnre

## Components

[contracts](./contracts/)

Solidity smart contracts for wallets, BLS signature verification, and deployment/testing tools.

[aggregator](./aggregator/)

Service which accepts BLS signed transactions and bundles them into one for submission.

[bls-wallet-clients](./contracts/clients/)

npm package which provides easy to use constructs to interact with the contracts and aggregator.

[extension](./extension/) 

Browser extnesion used to manage BLS Wallets and sign transactions.

## Getting Started

- [Use BLS Wallet in a browser/NodeJS/Deno app](./docs/use_bls_wallet_clients.md)
- [Setup the BLS Wallet components for local development](./docs/local_development.md)
