# AI Coding Guide for IdeaFlow

AI can help you extend IdeaFlow, but you must review and test every suggestion.

## Development loop

ASK  
↓  
READ  
↓  
TEST  
↓  
BREAK  
↓  
FIX

## Prompt structure

Use this structure in every prompt:

1. **CONTEXT** (what project/file/function you have)
2. **GOAL** (what change you want)
3. **CONSTRAINTS** (what must not change)
4. **OUTPUT** (what kind of answer/code you need)

## Required instructions for AI

Always tell the AI to:
- explain existing code first
- explain proposed changes
- not change unrelated functionality
- identify security concerns
- provide testing steps

## Example prompts

1. Add a timestamp to every idea.
2. Prevent a wallet from upvoting the same idea twice.
3. Add categories.
4. Add a deadline for voting.
5. Add a creator reputation system.
6. Add idea status.
7. Add proposal-based voting.

## Safety rule

**Never blindly copy AI-generated code.**

Always read, test, and verify behavior on Sepolia.
