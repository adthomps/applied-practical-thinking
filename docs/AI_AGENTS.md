# AI Agent Contract

## Overview
All AI agents in this repo must follow these rules:

- Prompts must be file-based and versioned in `apps/worker/src/ai/prompts`.
- All agent logic must be testable and separated from route handlers.
- Agents must not bypass business logic boundaries (no direct DB access from routes).
- All agent instructions and contracts must be documented and versioned.

## Implementation
- Use only shared utilities from `packages/core` for business logic.
- Do not hardcode prompt strings in code; use prompt files.
- All agent responses must be validated against schemas in `packages/core`.

## Review
- All prompt and agent changes require review and version bump.# AI_AGENTS.md

## AI Agent Contract for APT

- All AI prompts live in `apps/web/ai/prompts/`
- Each prompt must have an owner and version
- AI endpoints must be explicit: `/api/ai/*` (internal), `/v1/ai/*` (public)
- Prompts are code: versioned, reviewed, tested
- No prompt may bypass auth or validation
- All prompt changes must be documented in `apps/web/docs/design/decision-log.md`
