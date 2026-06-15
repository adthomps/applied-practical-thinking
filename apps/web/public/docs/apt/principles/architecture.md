---
title: Architecture Principle
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# Architecture

**Principle:** Structure the system so responsibilities are clear, boundaries are safe, and changes are predictable.

Architecture prevents category errors — putting the wrong logic in the wrong layer.

## Core Rules

- Assign explicit ownership for each responsibility (rendering, API, business logic, validation, config, AI prompts, logging).
- Isolate layers so UI changes do not cascade into API contracts and API changes do not cascade into storage.
- High-risk changes (repo structure, API contracts, auth model) require an ADR and staged rollout.
- Prefer proven patterns over novel architecture.
- Document the architecture; undocumented structure cannot be maintained.

## Risk Levels

| Risk | Examples | Required |
|------|---------|---------|
| Low | UI copy, styling | PR review |
| Medium | API contract, package addition | Review + tests |
| High | Repo structure, auth model, data schema | ADR + staged rollout |

## Required Artifacts

- `ARCHITECTURE.md` in the project
- ADR for high-risk decisions (`docs/decisions/`)
- Responsibility map

## Enforcement Points

- High-risk changes without an ADR are blockers.
- Logic in the wrong layer (e.g., business logic in UI components) is a blocker.
- Missing observability (logging, request IDs) in new services is a blocker.

## Canonical Doc

`architecture.md` — full principles, responsibility map, Cloudflare baseline, change containment rules, and AI prompt.

## Related Build Kit

- `checklists/architecture-review-checklist.md`
- `examples/architecture/monorepo-layout-example.md`
- `examples/architecture/cloudflare-pages-workers-example.md`
- `prompts/architecture-review-prompt.md`
- `templates/ADR-TEMPLATE.md`
