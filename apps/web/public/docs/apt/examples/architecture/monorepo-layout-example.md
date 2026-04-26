---
title: Monorepo Layout Example
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Monorepo Layout Example

## Context

A Cloudflare-based product includes a frontend app, worker API, shared UI, config, and utilities.

## Problem

A flat repo makes ownership unclear and allows frontend, backend, and shared logic to blur together.

## APT Principles Applied

- Architecture: every responsibility has one home.
- System standards: shared packages stay reusable.
- AI: agents can reason from stable paths.

## Solution

Use explicit app and package boundaries:

```text
apps/
  web/
  worker/

packages/
  ui/
  config/
  utils/

docs/
  architecture.md
  api.md
  security.md
```

## Example Structure

- `apps/web` renders and composes UI.
- `apps/worker` owns HTTP routes and server-side enforcement.
- `packages/ui` contains presentational components.
- `packages/config` contains tokens and environment helpers.
- `packages/utils` contains pure reusable utilities.

Boundary rule examples:

```text
apps/web may import packages/ui and packages/config.
packages/ui must not import apps/web or apps/worker.
apps/worker owns server-side auth and validation.
docs/apt owns project adoption notes, not canonical doctrine.
```

## Tradeoffs

The structure takes discipline, but it prevents accidental coupling and makes reviews faster.

## Common Mistakes

- Putting business logic in `apps/web`.
- Putting app-specific logic in `packages/ui`.
- Creating root-level scripts or code without ownership.
- Letting AI-generated code choose new folders that bypass the ownership map.

## Implementation Notes

Include the boundary map in the project README or architecture doc. If a project vendors APT assets, keep them under a clear docs or principles path so they do not look like application runtime code.

## Related Documents

- `../../architecture.md`
- `../../system-standards.md`
- `../../checklists/architecture-review-checklist.md`
