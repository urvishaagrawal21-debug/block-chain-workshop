# IdeaFlow Smart Contract Guide

## What is a smart contract?

A smart contract is code stored on a blockchain. Once deployed, anyone can call its functions, and every state change is recorded through transactions.

## What this contract stores

`IdeaFlow` stores campus ideas in a mapping by `id`.

Each idea includes:
- `title`
- `description`
- `creator` wallet address
- `votes`
- `timestamp`

## What `createIdea()` does

`createIdea(title, description)`:
1. Checks that title is not empty
2. Increases `ideaCount`
3. Saves the idea on-chain
4. Emits `IdeaCreated`

## What `upvote()` does

`upvote(id)`:
1. Checks that the idea exists
2. Increases vote count
3. Emits `IdeaUpvoted`

## What `msg.sender` means

`msg.sender` is the wallet address that called the function. In this project, it marks who created or upvoted an idea.

## What events are

Events are blockchain logs emitted by contracts.

In IdeaFlow:
- `IdeaCreated` helps frontend/apps track new ideas
- `IdeaUpvoted` helps track voting activity

## What is stored on-chain

On-chain state includes:
- total idea count
- each idea's data and vote count

This is why anyone can verify state directly from blockchain reads.
