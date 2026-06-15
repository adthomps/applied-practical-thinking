---
title: Delivery Increment Plan Example
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# Delivery Increment Plan Example

## Context

A cross-layer change needs to move from approved intent into implementation without becoming one large, hard-to-review PR.

## Problem

Delivery breaks down when an implementer receives broad intent but no increment boundaries, validation checkpoints, or stop conditions.

## APT Principles Applied

- Execution: small, testable increments.
- Quality: validation evidence is planned before implementation.
- Release: user-facing changes need notes and rollback awareness.
- AI: agents need deterministic boundaries and stop conditions.

## Solution

Split work into increments that each name input, output, validation, and stop condition.

```text
Increment 1: Contract and doctrine
Input: approved spec and canonical docs
Output: updated contract/docs
Validation: npm run validate
Stop condition: missing source-of-truth decision

Increment 2: Implementation
Input: validated contract/docs
Output: code or content changes
Validation: lint, typecheck, focused tests
Stop condition: boundary change not covered by architecture notes

Increment 3: Release evidence
Input: implemented change
Output: release note, support note, rollback path
Validation: build or preview check
Stop condition: failing required check without risk acceptance
```

## Example Structure

```text
Increment:
Owner:
Input artifact:
Output artifact:
Affected layers:
Validation:
Stop condition:
Release/support impact:
```

## Tradeoffs

Increment planning can feel slower than starting with code, but it prevents broad ambiguous changes from hiding missing decisions.

## Common Mistakes

- Splitting by file type instead of reviewable behavior.
- Leaving validation until the final increment.
- Continuing after a missing architecture or security decision appears.
- Treating AI-generated work as exempt from the increment plan.

## Related Documents

- `../../execution.md`
- `../../quality-testing.md`
- `../../release-change-management.md`
- `spec-to-story-flow.md`
