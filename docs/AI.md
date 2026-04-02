# AI.md

## AI Usage in APT

- Worker-served AI/API endpoints live in `apps/worker`
- Prompts are versioned in `apps/web/ai/prompts/`
- Shared assistant contracts belong in `packages/knowledge`
- No prompt or endpoint may bypass authentication or validation
- See `AI_AGENTS.md` and `AI_PROMPT.md` for authoring and contract details
