# AI Prompts

This directory contains role-specific prompts for AI agents.

## Available Prompts

- [repo-maintainer.md](prompts/repo-maintainer.md) - General repository maintenance
- [design-maintainer.md](prompts/design-maintainer.md) - Design system changes
- [api-maintainer.md](prompts/api-maintainer.md) - API/Worker development
- [reviewer.md](prompts/reviewer.md) - Review existing work and new builds against APT standards

## Usage

Reference the appropriate prompt when working on specific areas of the codebase.

These prompts are internal operating instructions. Public-facing content and doctrine should be sourced from:

- `apps/web/content/`
- approved public docs in `apps/web/docs/design/`

When an external AI or working agent needs a pointable standards document, use `apps/web/docs/design/static/APT-REVIEW-STANDARD.md` as the primary handoff.
