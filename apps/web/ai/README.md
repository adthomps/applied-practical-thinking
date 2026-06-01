# AI Prompts

This directory contains role-specific prompts for AI agents.

## Available Prompts

**Role prompts** (operating instructions for a session):
- [repo-maintainer.md](prompts/repo-maintainer.md) - General repository maintenance
- [design-maintainer.md](prompts/design-maintainer.md) - Design system changes
- [api-maintainer.md](prompts/api-maintainer.md) - API/Worker development
- [reviewer.md](prompts/reviewer.md) - Review existing work and new builds against APT standards

**Domain review prompts** (use when reviewing a specific area):
- [design-review.md](prompts/design-review.md) - Design system, token, and state review against APT Design Principles
- [architecture-review.md](prompts/architecture-review.md) - Boundary, contract, and deployment review against APT Architecture Standards

For the full APT review prompt set covering framework, security, testing, release, operations, and knowledge, see `apt-principles/prompts/`.

## Usage

Reference the appropriate prompt when working on specific areas of the codebase.

These prompts are internal operating instructions. Public-facing content and doctrine should be sourced from:

- `apt-principles` for doctrine and version authority
- `apps/web/content/`
- approved published mirror docs in `apps/web/docs/design/`
- generated public APT principles mirrors in `apps/web/public/docs/apt/`

This repo is the portfolio, visual implementation, guide, and examples surface for APT. It should not be treated as the doctrine or version authority.

When an external AI or working agent needs a pointable standards document, use `apps/web/docs/design/static/APT-REVIEW-STANDARD.md` as the primary handoff.

## Prompt and Agent Ownership

- Prompts are file-based and versioned in `apps/web/ai/prompts/`.
- Worker agent/runtime logic belongs below `apps/worker/src/ai/` and route handlers should stay thin.
- Shared request, response, content, and assistant contracts belong in `packages/knowledge`.
- Agent or prompt paths may not bypass auth, validation, or worker route boundaries.
- Prompt changes require review when they affect product behavior, safety behavior, or generated content.
- APT-wide AI-agent doctrine lives in `apt-principles/ai-agent-framework.md` and is published publicly at `/docs/apt/ai-agent-framework.md`.
