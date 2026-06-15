---
title: Delivery Principle
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# Delivery

**Principle:** Convert decisions into small, validated, reviewable build increments.

Delivery keeps build work traceable, reviewable, and recoverable.

## Core Rules

- Work is driven by a spec or issue — no code without clear intent.
- Break work into increments that can be reviewed independently.
- Each increment names its input, output, validation evidence, and stop condition.
- Validate in preview before promoting to production.
- Keep PRs scoped to a coherent change.
- AI-generated work must follow the same structure, tests, and review gates as human work.

## Required Artifacts

- Spec or issue
- Implementation checklist
- Acceptance criteria
- Increment plan with owner and validation command
- Validation evidence (test run, preview check)
- Release note when user-facing behavior changes
- Rollback or recovery path for production-impacting changes

## Release Readiness

Before promoting any change:

- Build passes
- Tests pass
- Preview validated
- Docs updated for behavior changes
- Release note written if user-facing
- Rollback path identified for high-risk changes

## Enforcement Points

- Code without a backing spec or issue is out of process.
- Merging without validation evidence is a blocker.
- Large, mixed-scope PRs require decomposition before review.
- Failed checks require triage as blocking, deferred with accepted risk, or unrelated pre-existing failure.

## Canonical Docs

- `execution.md` — spec-driven development, increments, preview workflow
- `release-change-management.md` — promotion, release gates, rollback

## Related Build Kit

- `checklists/execution-readiness-checklist.md`
- `checklists/release-readiness-checklist.md`
- `examples/workflows/spec-to-story-flow.md`
- `examples/workflows/preview-to-prod-flow.md`
- `prompts/release-review-prompt.md`
