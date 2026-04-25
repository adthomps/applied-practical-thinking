---
title: APT Quality & Testing (Validate)
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# APT Quality & Testing

## Overview

APT Quality & Testing defines how systems are checked before release.

Quality answers:

- What could break?
- Which checks prove the behavior works?
- Which user journeys matter most?
- What evidence is required?
- What happens when validation fails?

## Purpose

Quality protects users, maintainers, and support teams by catching defects before promotion and making failures diagnosable.

## Core Principles

### 1. Fast checks first

Run low-cost checks before expensive checks: lint, type, unit, integration, build, preview, E2E.

### 2. Test logic close to where it lives

Validate pure logic near its package or service. Validate journeys at the app boundary.

### 3. E2E validates journeys, not everything

Use E2E tests for critical flows and integration confidence, not every branch.

### 4. Preview must be tested

Production-like behavior should be checked in a preview environment before release.

### 5. Failures must produce usable diagnostics

Logs, traces, screenshots, artifacts, and error messages should help someone act.

## Standards / Rules

- Every change needs an appropriate validation plan.
- Shared contracts require tests at the boundary.
- Security-sensitive changes require security review.
- User-facing changes require preview or visual validation where possible.
- Failing checks must be fixed or explicitly accepted with documented risk.
- Design-system lint gates are part of quality for UI and public documentation surfaces.
- AI review findings require evidence, severity, standard references, and residual-risk notes.

## Required Artifacts

- Validation plan
- Test results or command output summary
- Failure criteria
- Preview evidence for user-facing changes
- Known risk notes if coverage is intentionally limited

## Good Example

After a navigation update:

- Run lint and type checks.
- Run route and data contract tests.
- Build the site.
- Validate keyboard navigation and active states in preview.
- Attach screenshots or notes to the release summary.

## Bad Example

Deploying after "it works locally" without automated checks, preview review, or rollback awareness.

## AI Prompt Example

```text
Create a focused APT validation plan for this change.

Input:
- Change summary:
- Affected user journeys:
- Existing test coverage:
- Risk level:

Return:
1. Ordered checks
2. Required evidence
3. Failure criteria
4. Gaps or residual risk
```

## Related Checklists

- `checklists/quality-testing-checklist.md`
- `checklists/release-readiness-checklist.md`

## Related Examples

- `examples/quality/validation-plan-example.md`

## Related Prompts

- `prompts/testing-review-prompt.md`

## Related References

- `references/design-lint-gates.json`
- `references/ai-review-bundle.json`

## Related Documents

- `execution.md`
- `release-change-management.md`

## Summary

Quality turns correctness into evidence before work reaches users.
