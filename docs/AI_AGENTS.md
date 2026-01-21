# AI Agents Contract

- All AI agents must be stateless and idempotent.
- Inputs/outputs must be documented and versioned.
- No agent may mutate state outside its scope.
- Prompts must be file-based and versioned in `apps/worker/src/ai/prompts`.
