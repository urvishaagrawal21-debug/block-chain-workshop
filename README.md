# IdeaFlow — UnBlocked Web3 Workshop

IdeaFlow is a beginner-friendly Web3 project for the **UnBlocked** workshop by **IEEE IAS SBC PDEU**.

Students deploy a smart contract in Remix, connect it through MetaMask, and use a static frontend to submit and upvote campus ideas.

## What you will learn

- What blockchain state means
- How wallets sign transactions
- How smart contracts store and enforce rules
- How a frontend reads and writes on-chain data
- How events help dApps react to changes
- How to extend a Web3 project with AI safely

## Zero-install approach

You do **not** need Node.js, npm, React, Vite, Python, Hardhat, or Foundry.

This repository uses:

- Solidity in Remix
- A static HTML/CSS/JS frontend
- ethers.js from CDN
- MetaMask + Sepolia

## Project architecture

User → Frontend → MetaMask → Smart Contract → Sepolia blockchain → Updated state → Frontend refresh

See `docs/architecture.md` for full explanation.

## Folder structure

```text
idea-chain/
├── README.md
├── LICENSE
├── contract/
│   ├── IdeaFlow.sol
│   └── README.md
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   ├── abi.js
│   ├── config.js
│   └── assets/
├── docs/
│   ├── architecture.md
│   ├── workshop-flow.md
│   ├── blockchain-concepts.md
│   └── ai-coding-guide.md
└── challenges/
    ├── README.md
    ├── level-1.md
    ├── level-2.md
    ├── level-3.md
    └── level-4.md
```

## Smart contract overview

`contract/IdeaFlow.sol` stores ideas on-chain with:

- title
- description
- creator wallet (`msg.sender`)
- votes
- timestamp

Functions:

- `createIdea(title, description)` adds a new idea
- `upvote(id)` increases vote count

Events:

- `IdeaCreated`
- `IdeaUpvoted`

## Deploy contract with Remix (Sepolia)

1. Open [https://remix.ethereum.org](https://remix.ethereum.org)
2. Create a file named `IdeaFlow.sol`
3. Paste code from `contract/IdeaFlow.sol`
4. Compile with Solidity `^0.8.20`
5. Open **Deploy & Run Transactions**
6. Set environment to **Injected Provider - MetaMask**
7. Ensure MetaMask network is **Sepolia**
8. Deploy contract and confirm transaction
9. Copy deployed contract address

## Connect frontend to your contract

1. Open hosted `frontend/index.html`
2. Click **Connect Wallet**
3. Paste deployed contract address in **Contract Address**
4. Click **Connect Contract**
5. Start creating and upvoting ideas

The address is saved in browser localStorage for convenience.

## MetaMask quick setup

1. Install MetaMask browser extension
2. Create/import a workshop wallet
3. Switch network to **Sepolia**
4. Request test ETH from a Sepolia faucet

## Using Sepolia safely

- Sepolia ETH is for testing only
- Transactions can take a short time to confirm
- Use Etherscan links in the app to inspect activity

## How to use the app

1. Connect wallet
2. Connect contract
3. Create idea (transaction)
4. Wait for confirmation
5. See updated idea list
6. Upvote ideas (transaction)

## Extend with AI

Use `docs/ai-coding-guide.md` and `challenges/`.

Recommended workflow:

1. Ask AI to explain existing code first
2. Request a focused change only
3. Test behavior after every change
4. Review security impact

## Security warnings (read carefully)

- Never share your private key
- Never share your recovery phrase
- Never paste secrets into GitHub
- Use only testnet funds
- Sepolia ETH has no real-world value
- Never use a workshop wallet with real funds
