---
title: Spec to Story Flow
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Spec to Story Flow

## Context

A feature spec is approved and needs to become implementation work.

## Problem

Large vague stories lead to unclear ownership, hidden dependencies, and weak validation.

## APT Principles Applied

- Thinking: problem and success criteria stay visible.
- Execution: small testable increments.
- Quality: validation is planned before build.

## Solution

Break the spec into stories by stable boundary.

```text
Spec
  -> user outcome
  -> acceptance criteria
  -> architecture boundary
  -> implementation increment
  -> validation checkpoint
```

## Example Structure

Story format:

```text
Title:
Outcome:
Scope:
Out of scope:
Affected layers:
Acceptance criteria:
Validation:
Release note:
```

Example story:

```text
As an APT project maintainer,
I want a project profile that names principles demonstrated,
so the public portfolio can show real examples without inventing project status.

Acceptance:
- profile includes purpose, audience, maturity, and learning value
- profile links to canonical principles
- validation passes
```

## Tradeoffs

More planning up front reduces rework and makes AI-assisted implementation safer.

## Common Mistakes

- Stories that combine UI, API, auth, data migration, and release in one change.
- Acceptance criteria that only restate the task.
- No validation checkpoint.
- Story mixes unrelated doctrine, UI, and release changes without splitting review.

## Implementation Notes

Stories should be small enough for one review thread. If the story changes doctrine and public presentation, split it into a doctrine update and a consumer update with an explicit dependency.

## Related Documents

- `../../execution.md`
- `../../thinking.md`
- `../../quality-testing.md`
