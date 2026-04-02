# AI_AGENTS.md

## AI Agent Contract

- Prompts are file-based and versioned in `apps/web/ai/prompts/`
- Agent/runtime logic in the worker must be testable and separated from route handlers
- Shared request/response/domain contracts belong in `packages/knowledge`
- No agent path may bypass auth, validation, or route boundaries
- Prompt and agent changes require review
