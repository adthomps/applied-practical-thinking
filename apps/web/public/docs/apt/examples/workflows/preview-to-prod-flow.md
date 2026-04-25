---
title: Preview to Prod Flow
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Preview to Prod Flow

## Context

A user-facing change is ready for release.

## Problem

Production releases without preview evidence, release notes, or rollback plans create support and recovery risk.

## APT Principles Applied

- Quality: validate before promotion.
- Release: production changes are intentional.
- Operations: support needs context.

## Solution

Use a controlled promotion flow:

```text
PR opened
  -> checks run
  -> preview deploy created
  -> preview validated
  -> release notes prepared
  -> production promoted
  -> post-release check
```

## Example Structure

Release summary:

```text
Change:
Preview:
Validation:
Risk:
Rollback:
Support notes:
Owner:
```

Evidence bundle:

```text
Validation:
- npm --prefix apt-principles run validate
- preview smoke test
- affected links checked

Promotion:
- source branch or commit
- production target
- reviewer
```

## Tradeoffs

Preview-first release adds a step, but it catches integration, routing, and visual issues before users see them.

## Common Mistakes

- Merging because checks passed without preview review.
- No rollback note.
- Support finds out from users.
- Release notes describe implementation details but omit user or operator impact.

## Implementation Notes

For doctrine and build-kit releases, preview evidence may be validation output plus link/reference scans. For product releases, include the preview URL, screenshot or smoke-test notes, known-risk summary, and owner responsible for post-release verification.

## Related Documents

- `../../release-change-management.md`
- `../../quality-testing.md`
- `../../checklists/release-readiness-checklist.md`
