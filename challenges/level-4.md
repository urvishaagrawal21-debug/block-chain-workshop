# Level 4 (Experimental)

## 1) DAO-style voting
- **Problem**: Replace simple upvote with proposal + voting windows.
- **Concept**: Governance design.
- **Example AI prompt**: "Explain base contract first, then propose a minimal DAO-style extension with security checks."
- **Files**: `contract/IdeaFlow.sol`, `frontend/*`, `docs/*`
- **How to test**: Create proposal, vote, and finalize outcomes.

## 2) Token-based reputation
- **Problem**: Weight influence using token/reputation score.
- **Concept**: Token-driven governance ideas.
- **Example AI prompt**: "Explain current vote logic and add optional weighted scoring with risk analysis."
- **Files**: `contract/IdeaFlow.sol`, `frontend/*`
- **How to test**: Different balances/weights produce different outcomes.

## 3) Funding proposals
- **Problem**: Add treasury-like proposal funding flow.
- **Concept**: Resource allocation governance.
- **Example AI prompt**: "Explain current architecture and design a safe, testnet-only funding prototype."
- **Files**: `contract/IdeaFlow.sol`, `frontend/*`, `docs/*`
- **How to test**: Proposal lifecycle and payout conditions.

## 4) AI-assisted idea categorization
- **Problem**: Auto-suggest categories for new ideas.
- **Concept**: AI + dApp UX integration.
- **Example AI prompt**: "Explain current form flow and add optional AI category suggestions without blocking manual entry."
- **Files**: `frontend/index.html`, `frontend/app.js`
- **How to test**: Category suggestion appears and can be edited.

## 5) On-chain reputation model
- **Problem**: Build transparent reputation update rules.
- **Concept**: On-chain incentive system design.
- **Example AI prompt**: "Explain existing state structure, then add a beginner-readable reputation model with threat analysis."
- **Files**: `contract/IdeaFlow.sol`, `frontend/abi.js`, `frontend/app.js`, `docs/*`
- **How to test**: Reputation changes are deterministic and queryable.
