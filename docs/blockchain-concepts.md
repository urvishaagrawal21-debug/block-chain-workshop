# Blockchain Concepts for IdeaFlow

## Blockchain

A shared ledger where data is recorded in blocks and cannot be easily altered.

## Wallet

A wallet (MetaMask) lets users own an address and sign transactions.

## Smart contract

A smart contract is blockchain code with rules for changing state.

## Read vs Write

- **Read** calls (view): no state change, no gas fee
- **Write** calls: change state, require transaction confirmation and test ETH

## `msg.sender`

The wallet address that called a function.

## Events

Events are logs that help apps track what happened on-chain.

## dApp architecture

Frontend handles UX, smart contract handles logic, blockchain stores trusted state.
