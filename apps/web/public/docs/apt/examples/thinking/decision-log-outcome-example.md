---
title: Decision Log Outcome Example
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# Decision Log Outcome Example

## Context

A team needs to accept a time-bounded exception, choose a delivery path, or approve a high-impact tradeoff before implementation continues.

## Problem

Important decisions often live in chat, PR comments, or memory. That makes outcomes hard to trace and accepted risk hard to revisit.

## APT Principles Applied

- Thinking: decisions, tradeoffs, assumptions, and measurable outcomes are explicit.
- Release: accepted risk needs rollback or revisit context.
- Knowledge: durable decisions become reusable source material.

## Solution

Use a compact decision entry that ties the choice to the desired outcome.

```md
## [2026-06-13] Use preview-first rollout for docs search

- Owner: APT
- Outcome: Reduce failed docs lookup handoffs by making preview search behavior reviewable before production.
- Baseline: Search failures are found during release review or support reports.
- Target signal: Preview validates search path, empty state, and degraded state before promotion.
- Decision: Ship docs search behind preview validation before enabling production routing.
- Rationale: Search quality affects public doctrine trust and support load.
- Tradeoff: Slower release, stronger confidence.
- Risk: Preview data may not match production content exactly.
- Mitigation: Run generated manifest validation and spot-check canonical source paths.
- Expiry/Revisit date: 2026-07-13
- Follow-up: Add production search telemetry after release.
- Approver: APT maintainer
```

The decision should be append-only when it accepts risk. Later changes add a superseding entry rather than rewriting history.

## Example Structure

```text
Decision:
Outcome:
Baseline:
Target signal:
Owner:
Rationale:
Tradeoff:
Risk:
Mitigation:
Revisit:
Evidence:
```

## Tradeoffs

Decision logs add process weight. Use them for durable choices, accepted risk, architecture/security/release changes, and exceptions rather than every small implementation detail.

## Common Mistakes

- Recording the decision without the outcome it serves.
- Treating "implemented" as the success criterion.
- Accepting risk without owner, mitigation, or revisit date.
- Rewriting old decisions instead of appending a superseding entry.

## Related Documents

- `../../thinking.md`
- `../../apt-principles.md`
- `../../knowledge-system.md`
- `../../checklists/thinking-review-checklist.md`
