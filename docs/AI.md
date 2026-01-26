# AI Usage

## Overview
This repo uses AI agents for select features. All AI logic must follow project guardrails:

- Prompts are file-based and versioned.
- All agent logic is separated from route handlers.
- All agent responses are validated against schemas.

## Prompt Management
- Prompts live in `apps/worker/src/ai/prompts`.
- No hardcoded prompt strings in code.

## Review
- All AI-related changes require review and versioning.# AI.md

## AI Usage in APT

- All AI endpoints are served by the worker under `/api/ai/*` (internal) or `/v1/ai/*` (public)
- Prompts are versioned in `apps/web/ai/prompts/`
- Prompt changes must be reviewed and logged
- No prompt or endpoint may bypass authentication or validation
- See `AI_AGENTS.md` and `AI_PROMPT.md` for authoring and contract
