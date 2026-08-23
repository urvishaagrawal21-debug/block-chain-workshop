# Level 1 (Easy)

## 1) Change UI text
- **Problem**: Make branding text more personalized for your team.
- **Concept**: Frontend customization.
- **Example AI prompt**: "Explain current header/footer text, then update wording only without changing logic."
- **Files**: `frontend/index.html`, `frontend/style.css`
- **How to test**: Reload page and verify text is updated.

## 2) Add categories
- **Problem**: Let users pick a category before submitting.
- **Concept**: Form handling + basic data structure update.
- **Example AI prompt**: "Explain existing create flow; add category support while preserving old behavior where possible."
- **Files**: `contract/IdeaFlow.sol`, `frontend/index.html`, `frontend/app.js`, `frontend/abi.js`
- **How to test**: Submit ideas with different categories and verify display.

## 3) Add timestamps to UI
- **Problem**: Show idea creation times clearly in cards.
- **Concept**: On-chain timestamp formatting.
- **Example AI prompt**: "Explain how timestamps are currently read and improve their UI formatting."
- **Files**: `frontend/app.js`
- **How to test**: Create idea and check timestamp formatting.

## 4) Improve idea cards
- **Problem**: Improve readability and spacing.
- **Concept**: UI polish without logic changes.
- **Example AI prompt**: "Keep functionality same; improve card design for projector visibility."
- **Files**: `frontend/style.css`
- **How to test**: Check responsive layout and contrast.

## 5) Add filtering
- **Problem**: Filter ideas by text or category.
- **Concept**: Frontend state filtering.
- **Example AI prompt**: "Explain current rendering code and add client-side filtering without changing contract methods."
- **Files**: `frontend/index.html`, `frontend/app.js`
- **How to test**: Filter list and verify correct cards appear.
