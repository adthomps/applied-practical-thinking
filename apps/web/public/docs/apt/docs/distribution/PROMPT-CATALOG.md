---
title: "Prompt Catalog"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/PROMPT-CATALOG.md"]
---

# Prompt Catalog

## Tool-Neutral Standards Prompts

These prompts live in `prompts/` and are meant for agents or operators working from this standards repo. They are not GitHub Copilot prompt files and are not installed into `.github/prompts/` by current profiles.

- `prompts/repo-alignment-review.md`
- `prompts/apply-apt-principles-agents.md`
- `prompts/generate-context-pack.md`
- `prompts/update-agent-standards.md`

## Canonical Same-Name Skill Prompts

These prompts mirror Codex skills so GitHub Copilot Chat can follow the same workflow:

- `ai-output-review.prompt.md`
- `api-review.prompt.md`
- `apt-readiness-audit.prompt.md`
- `apt-review.prompt.md`
- `cloudflare-modernization.prompt.md`
- `cloudflare-react-hono.prompt.md`
- `docs-sync.prompt.md`
- `documentation-normalization.prompt.md`
- `knowledge-graph-review.prompt.md`
- `lovable-to-apt.prompt.md`
- `lovable-to-cloudflare.prompt.md`
- `refactor-safety.prompt.md`
- `repo-standardization.prompt.md`
- `test-generator.prompt.md`
- `ux-review.prompt.md`

## Alias And Utility Prompts

The following prompts are intentionally retained as user-friendly aliases or generic review helpers:

- `generate-tests.prompt.md`
- `repo-standardize.prompt.md`
- `review-api.prompt.md`
- `review-diff.prompt.md`
- `update-docs.prompt.md`

## Consolidation Policy

- Keep same-name skill prompts canonical for parity checks.
- Keep alias prompts short and direct; point new detailed behavior to the canonical prompt when possible.
- Keep `prompts/` tool-neutral and `github-copilot/prompts/` Copilot-native.
- Do not duplicate long doctrine from `apt-principles-agents`.
- Prefer source-backed instructions and file references over examples that may drift.
