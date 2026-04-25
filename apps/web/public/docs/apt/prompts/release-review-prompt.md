---
title: Release Review Prompt
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Release Review Prompt

## Purpose

Review whether a change is ready to move from preview or review into production.

## Input Expectations

- Change summary
- Validation evidence
- Preview notes
- Known risks
- Rollback or recovery path

## Prompt

```text
You are reviewing release readiness using APT Release & Change Management.

Use:
- release-change-management.md
- quality-testing.md
- operations-support.md
- checklists/release-readiness-checklist.md
- examples/workflows/preview-to-prod-flow.md

Review for:
1. Traceability to intent or issue
2. Validation evidence
3. Preview readiness
4. User-facing and operational impact
5. Rollback path
6. Support handoff
7. Known risks

Return:
- Release readiness verdict
- Blocking gaps
- Release notes draft
- Rollback/support notes
- Evidence table with source, status, and owner
```

## Expected Output

The output should be suitable for a release handoff or PR release comment.

Use this shape:

```text
Verdict:
Blockers:
Required before promotion:
Release notes:
Rollback:
Support handoff:
Residual risk:
```

## Guardrails

- Do not approve production promotion without validation evidence.
- Do not hide known risks.
- Do not omit support impact for user-facing changes.
- Do not treat a passing build as complete release evidence when preview, security, or support checks apply.

## Review Evidence

The response should cite the validation result, preview evidence, release note source, rollback path, and owner for unresolved risks.

## Related Documents

- `../release-change-management.md`
- `../checklists/release-readiness-checklist.md`
