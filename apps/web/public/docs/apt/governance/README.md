---
title: APT Governance Index
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# APT Governance

This directory defines how APT-aligned repositories are assessed, reviewed, and improved over time.

## Documents

| Document | Purpose |
|----------|---------|
| [maturity-model.md](maturity-model.md) | 5-level rubric scoring repositories across all APT dimensions |
| [scorecard.md](scorecard.md) | Per-repository scoring template used during reviews |
| [repository-review.md](repository-review.md) | Review process, cadence, participants, and pass criteria |
| [service-readiness-review.md](service-readiness-review.md) | Pre-launch gate with full checklist and sign-off record |

## When to Use

- **Starting a new project** — use the maturity model to understand target state.
- **Before a production release** — complete the service readiness review.
- **Every quarter** — complete a scorecard and repository review.
- **Adopting APT** — use the scorecard to assess current state and identify gaps.

## Validation

Run `npm run validate` to get automated structural evidence for scoring dimensions.

Run `npm run sweep:project-profiles` to assess all repositories in a workspace.
