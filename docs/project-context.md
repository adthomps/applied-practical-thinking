---
title: Applied Practical Thinking Project Context
kind: project-context
status: active
owner: APT
last_updated: 2026-07-26
source_paths: ["applied-practical-thinking/README.md", "applied-practical-thinking/docs/project-context.md"]
---

# Project Context

## Purpose

`applied-practical-thinking` is the public APT portfolio, learning, content, and publication surface. It publishes public APT Principles content generated from sibling `apt-principles-agents`.

## Architecture

- `apps/web` is the Vite/React public app and documentation publication surface.
- `apps/worker` is the Cloudflare Worker API/AI subsystem.
- `packages/ui`, `packages/config`, and `packages/knowledge` provide shared UI, config, and content contracts.
- Public copied docs and content under `apps/web/public/` are generated outputs.

## Operating Rules

- Edit authored content in source locations, not copied public output.
- Regenerate public APT Principles docs with the existing `apps/web` script after canonical doctrine changes.
- Preserve Worker-backed feed/API contracts for Labs, Proof, and Insights.
- Reusable APT doctrine and agent distribution changes belong in `apt-principles-agents`.

## Validation

```bash
pnpm --dir apps/web run generate-apt-principles-agents-public
pnpm --dir apps/web run validation-report
pnpm --dir apps/web lint
pnpm --dir apps/web build
```
