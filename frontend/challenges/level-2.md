# Level 2 (Intermediate)

## 1) Prevent duplicate votes
- **Problem**: One wallet should not vote same idea twice.
- **Concept**: Mapping-based access control in Solidity.
- **Example AI prompt**: "Explain current upvote logic and add duplicate-vote prevention with security notes and test steps."
- **Files**: `contract/IdeaFlow.sol`, `frontend/abi.js`, `frontend/app.js`
- **How to test**: Vote once succeeds; second vote from same wallet fails.

## 2) Show creator profile
- **Problem**: Add a simple creator profile view.
- **Concept**: Address-based aggregation in frontend.
- **Example AI prompt**: "Explain current idea rendering and add a profile summary by creator address."
- **Files**: `frontend/index.html`, `frontend/app.js`, `frontend/style.css`
- **How to test**: Create ideas from different wallets and validate grouping.

## 3) Add idea status
- **Problem**: Ideas can be open/closed.
- **Concept**: Enum/state transitions in contract.
- **Example AI prompt**: "Explain current idea struct and add status field with minimal API changes."
- **Files**: `contract/IdeaFlow.sol`, `frontend/abi.js`, `frontend/app.js`
- **How to test**: Change status and verify UI updates.

## 4) Add voting deadline
- **Problem**: Disable votes after deadline.
- **Concept**: Time-based smart contract checks.
- **Example AI prompt**: "Explain current upvote validations and add deadline logic with clear error messages."
- **Files**: `contract/IdeaFlow.sol`, `frontend/app.js`, `frontend/abi.js`
- **How to test**: Vote before deadline works; after deadline fails.
