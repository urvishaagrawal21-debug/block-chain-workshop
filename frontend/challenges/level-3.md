# Level 3 (Advanced)

## 1) Reputation points
- **Problem**: Give creators points when ideas receive votes.
- **Concept**: Derived scoring on-chain.
- **Example AI prompt**: "Explain current vote flow, add reputation tracking, and list security trade-offs."
- **Files**: `contract/IdeaFlow.sol`, `frontend/abi.js`, `frontend/app.js`
- **How to test**: Upvotes increase creator reputation.

## 2) Role-based permissions
- **Problem**: Restrict selected actions to moderator/admin roles.
- **Concept**: Access control patterns.
- **Example AI prompt**: "Explain current unrestricted functions and implement role checks with minimal complexity."
- **Files**: `contract/IdeaFlow.sol`, `frontend/abi.js`, `frontend/app.js`
- **How to test**: Unauthorized role cannot call restricted function.

## 3) Proposal approval
- **Problem**: Ideas must be approved before voting.
- **Concept**: Workflow state machine.
- **Example AI prompt**: "Explain current create/upvote behavior and add approval gate with testing plan."
- **Files**: `contract/IdeaFlow.sol`, `frontend/*`
- **How to test**: Unapproved ideas reject votes; approved ideas allow votes.

## 4) Admin/moderator functionality
- **Problem**: Add moderation actions (close, flag, remove).
- **Concept**: Governance operations.
- **Example AI prompt**: "Explain existing contract data model and add moderation functions without breaking core flow."
- **Files**: `contract/IdeaFlow.sol`, `frontend/*`
- **How to test**: Moderator actions update state and UI correctly.
