# Docs KB Maintainer

Canonical source: `apt-principles/.claude/skills/docs-kb-maintainer/SKILL.md` — sync when updating.

## Purpose

Create and maintain practical documentation for developers, operators, and AI agents working in this repo.

## Use this skill when

The user asks to:
- Write or update a README
- Update engineering docs in `docs/`
- Create a migration guide
- Explain an API route or data contract
- Create troubleshooting docs for the Worker or web build
- Document deployment steps
- Update `AGENTS.md` or `CLAUDE.md`
- Create or update AI prompt files in `apps/web/ai/prompts/`

## Documentation locations

| Type | Location |
|------|----------|
| Agent/Claude instructions | `CLAUDE.md`, `AGENTS.md`, `.claude/` |
| Internal engineering docs | `docs/` |
| Decision log | `docs/DECISION_LOG.md` |
| Design doctrine | `apps/web/docs/design/` |
| AI prompts (internal) | `apps/web/ai/prompts/` |
| Public content | `apps/web/content/` |
| APT doctrine (read-only) | `apt-principles/` |

## Documentation style

Prefer:
- Clear headings and short paragraphs
- Step-by-step instructions with commands
- Tables for comparison
- Realistic examples from the codebase
- Troubleshooting sections with known errors
- Explicit known limitations

Do not:
- Over-market or use vague superlatives
- Omit commands when they are the point
- Write docs that will immediately rot (avoid "current" or "recent" without dates)

## Standard doc structure

```markdown
# Title

## Overview

## Who this is for

## Prerequisites

## How it works

## Setup / Usage

## Configuration

## Testing / Validation

## Troubleshooting

## Known limitations

## Related docs
```

## Rules

- Keep docs close to what they describe (prefer inline READMEs over distant wiki pages).
- Update docs when code behavior changes — stale docs are worse than no docs.
- Be direct about limitations.
- Include exact commands, not paraphrases of commands.
