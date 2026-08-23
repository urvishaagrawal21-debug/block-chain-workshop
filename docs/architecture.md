# IdeaFlow Architecture

## Core flow

User  
↓  
Frontend  
↓  
MetaMask  
↓  
Transaction  
↓  
Smart Contract  
↓  
Blockchain  
↓  
State Change  
↓  
Frontend

## What each component does

- **User**: creates ideas and upvotes from the browser.
- **Frontend**: HTML/CSS/JS interface where users connect wallet and contract.
- **MetaMask**: asks user to approve transactions and signs them.
- **Transaction**: carries a requested state change to the network.
- **Smart Contract**: contains the rules (`createIdea`, `upvote`).
- **Blockchain (Sepolia)**: stores contract state and transaction history.
- **State Change**: new idea or vote count update.
- **Frontend refresh**: reads latest state again and displays it.

## Hosting model

The frontend is a normal static website hosted by the instructor.

Participants do not deploy frontend infrastructure. They only deploy a contract address in Remix and connect that address in the UI.

## dApp meaning in this workshop

dApp = Frontend + Wallet + Smart Contract + Blockchain.

Web3 is broader than blockchain alone; here students learn how these pieces connect in practice.
