---
title: Pattern Ownership Command Matrix Example
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# Pattern Ownership Command Matrix Example

## Context

A repo contains multiple deployable surfaces, shared packages, AI prompts, and documentation that need clear ownership and validation.

## Problem

Architecture can look clean while ownership and commands remain hidden. That causes review gaps, support confusion, and risky manual release behavior.

## APT Principles Applied

- Architecture: every responsibility has one obvious home.
- System Standards: repeatable commands enforce consistency.
- Operations: ownership must be legible before incidents.
- Release: deployment and rollback paths must be known.

## Solution

Create a command and ownership matrix for each deployable surface and shared package.

```text
Surface: apps/web
Owner: Frontend maintainer
Boundary: UI rendering, route state, service clients
Commands: lint, typecheck, test, build, preview
Required checks: lint + typecheck + build
Deploy target: Cloudflare Pages
Rollback: Pages deployment history

Surface: apps/worker
Owner: Platform maintainer
Boundary: API routes, validation handoff, auth, telemetry
Commands: lint, typecheck, test, deploy:preview, deploy:production
Required checks: lint + typecheck + tests + smoke
Deploy target: Cloudflare Workers
Rollback: wrangler deployments rollback

Surface: packages/ui
Owner: Design system maintainer
Boundary: presentational components only
Commands: lint, typecheck, test
Required checks: lint + typecheck
Deploy target: consumed by apps
Rollback: revert package change
```

Use a decision record for changes to protected branches, deploy targets, package ownership, or forbidden import rules.

## Example Structure

```text
Surface/package:
Owner:
Boundary:
Allowed dependencies:
Forbidden dependencies:
Commands:
Required checks:
Deploy target:
Rollback:
Escalation:
```

## Tradeoffs

Maintaining a matrix takes effort, but it turns architecture into an enforceable operating model instead of a diagram.

## Common Mistakes

- Naming folders but not owners.
- Requiring checks that do not exist.
- Allowing dashboard-only deploy steps with no rollback note.
- Letting shared packages import app-specific runtime code.

## Related Documents

- `../../architecture.md`
- `../../system-standards.md`
- `../../operations-support.md`
- `../../references/architecture-map.json`
