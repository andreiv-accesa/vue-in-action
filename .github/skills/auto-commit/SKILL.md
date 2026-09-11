---
name: auto-commit
description: Stages changes, analyzes the diff to generate a Conventional Commit message, and waits for explicit user approval before committing and pushing.
---

# Auto Commit

Use for: "commit my changes", "generate a commit", "save my work".

Execute these steps in order. Do not skip or combine steps.

1. **STAGE:** Run `git add .`.
2. **DIFF:** Run `git diff --staged`.
3. **READ & FORMAT:** Generate exactly ONE commit message as `type: description` (types: feat, fix, chore, docs, refactor, style, test). Max 50 characters. Lowercase. Imperative. No period.
4. **STOP & ASK:** Do not commit yet. Ask the user:
   "Proposed commit message: `[message]`. Approve? (Yes / No / Edit)"
5. **COMMIT & PUSH:** Wait for response:
   - `Yes`: Run `git commit -m "[message]"`, then `git push`.
   - `Edit: [new message]`: Run `git commit -m "[new message]"`, then `git push`.
   - `No`: Stop. Do not commit or push.
   - Ambiguous: Ask again.

Run commit and push as separate commands. Push only if commit succeeds.
