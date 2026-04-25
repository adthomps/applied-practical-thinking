---
title: APT Release & Change Management (Promote)
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# APT Release & Change Management

## Overview

APT Release & Change Management defines how changes move from preview to production with traceability and control.

Release answers:

- What changed?
- Why did it change?
- What validation passed?
- What risk remains?
- How can the change be rolled back or supported?

## Purpose

Release management makes production changes intentional. It gives maintainers, operators, and support teams enough context to understand and recover from change.

## Core Principles

### 1. Every change is traceable

Production behavior should connect back to a spec, issue, PR, decision, or release note.

### 2. Preview before production

User-facing and integration changes should be reviewed in a preview environment before promotion.

### 3. Production releases are intentional

Avoid hidden, manual, undocumented, or accidental production changes.

### 4. Changelog is a required artifact

Meaningful changes need concise release notes that explain impact.

### 5. Support must understand every release

Support needs known issues, rollback notes, and user-facing behavior changes.

## Standards / Rules

- Promote only after required validation passes.
- Group related changes into meaningful releases.
- Record rollback or recovery steps before production promotion.
- Include support notes for user-visible or operationally risky changes.
- Do not rely on dashboard-only manual deploy steps unless documented.
- Versioned doctrine, copied references, and generated public views must identify source and status.

## Required Artifacts

- Release notes
- Validation evidence
- Deployment record
- Rollback plan
- Support handoff notes

## Good Example

A docs navigation release includes:

- summary of changed routes
- validation results
- preview URL
- rollback commit or redeploy path
- support note for changed links

## Bad Example

Promoting multiple unrelated changes with no release summary, no validation record, and no known rollback path.

## AI Prompt Example

```text
Prepare an APT release summary.

Input:
- Change list:
- Validation evidence:
- Deployment target:
- Known risks:

Return:
1. Release notes
2. Risk summary
3. Rollback plan
4. Support handoff
```

## Related Checklists

- `checklists/release-readiness-checklist.md`

## Related Examples

- `examples/workflows/preview-to-prod-flow.md`

## Related Prompts

- `prompts/release-review-prompt.md`

## Related References

- `references/metadata-versioning-contract.json`

## Related Documents

- `quality-testing.md`
- `operations-support.md`

## Summary

Release management promotes validated change with enough context to support and recover it.
