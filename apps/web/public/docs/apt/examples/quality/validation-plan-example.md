---
title: Validation Plan Example
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Validation Plan Example

## Context

A docs navigation change updates routes, links, and active navigation states.

## Problem

The change may pass unit tests but still break links, keyboard behavior, or preview navigation.

## APT Principles Applied

- Quality: layered validation.
- Design: interaction states are part of the feature.
- Release: preview evidence is required for user-facing changes.

## Solution

Create an ordered validation plan:

```text
1. Run docs validator.
2. Run link/reference scan.
3. Build the app or docs bundle.
4. Validate preview route navigation.
5. Check keyboard focus and active states.
6. Record evidence and residual risk.
```

## Example Structure

```text
Change:
Risk:
Fast checks:
Boundary checks:
Preview checks:
Evidence:
Failure criteria:
Residual risk:
```

Example:

```text
Change: Add public APT project profile page.
Checks:
1. Validate apt-principles.
2. Confirm project profile schema fields.
3. Preview page at desktop and mobile widths.
4. Check links to canonical doctrine.
Failure response: block release until schema or link failures are resolved.
```

## Tradeoffs

Layered validation costs more than a single build, but catches failures at the cheapest useful level.

## Common Mistakes

- Treating a build as full release evidence.
- Skipping preview for route changes.
- Not recording what was checked.
- Treating screenshots as a substitute for contract or link validation.

## Implementation Notes

Order checks so cheap failures appear first. For mixed docs and UI changes, combine structural validation, link checks, and preview review. Record any skipped check with a reason and risk owner.

## Related Documents

- `../../quality-testing.md`
- `../../checklists/quality-testing-checklist.md`
