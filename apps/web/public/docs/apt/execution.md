---
title: APT Execution Model (Build)
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# APT Execution Model

## Overview

The APT Execution Model defines how approved thinking, design, and architecture move into build work.

Execution answers:

- What is the smallest useful increment?
- What source of truth drives the work?
- Which checks prove the increment is safe?
- Which artifacts need to be updated?
- How should humans and AI agents collaborate?

## Purpose

Execution keeps build work traceable, reviewable, and recoverable. It prevents large ambiguous changes from bypassing doctrine, quality gates, or release controls.

## Core Principles

### 1. Spec-driven development

Docs, tickets, or specs should define intent before implementation begins.

### 2. Small, testable increments

Prefer a sequence of safe steps over one large unreviewable change.

### 3. Preview-first workflow

User-facing changes should be validated in preview before production.

### 4. Fail fast on bad assumptions

Expose missing decisions, unclear boundaries, and broken checks early.

### 5. Automate repeatable steps

Build, test, validation, docs sync, and deployment checks should be repeatable.

## Standards / Rules

- Do not start with code when the problem, design, and boundary are unclear.
- Break work into increments that can be reviewed independently.
- Keep PRs scoped to a coherent change.
- Update docs, examples, or prompts when behavior changes.
- AI-generated work must follow the same repo structure, tests, and review gates as human work.

## Required Artifacts

- Spec or issue
- Implementation checklist
- Acceptance criteria
- Validation evidence
- Release note or changelog entry when user-facing behavior changes

## Good Example

For a principle framework update:

1. Update canonical doc structure.
2. Expand examples and checklists.
3. Update site data or navigation.
4. Run validation and docs link checks.
5. Promote with release notes.

## Bad Example

Mixing doctrine rewrites, UI redesign, route changes, and deployment changes in one unscoped update with no validation evidence.

## AI Prompt Example

```text
Break this approved spec into APT execution increments.

Input:
- Spec:
- Current repo state:
- Validation commands:
- Release constraints:

Return:
1. Ordered implementation steps
2. Files or systems affected
3. Validation after each step
4. Risks and rollback notes
```

## Related Checklists

- `checklists/execution-readiness-checklist.md`

## Related Examples

- `examples/workflows/spec-to-story-flow.md`
- `examples/workflows/preview-to-prod-flow.md`

## Related Prompts

- `prompts/apt-one-shot-build-prompt.md`

## Related Documents

- `thinking.md`
- `quality-testing.md`
- `release-change-management.md`

## Summary

Execution converts decisions into small, validated, reviewable build increments.
