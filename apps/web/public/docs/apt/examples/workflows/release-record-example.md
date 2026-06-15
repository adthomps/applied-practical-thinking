---
title: Release Record Example
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# Release Record Example

## Context

A validated change is ready to move from preview to production or a doctrine/build-kit package is ready to publish.

## Problem

Release notes often describe what changed but omit why, validation evidence, rollback, support impact, and residual risk.

## APT Principles Applied

- Release: every change is traceable.
- Quality: validation evidence is required.
- Operations: support needs changed behavior and recovery notes.
- Knowledge: release outcomes become reusable history.

## Solution

Use a release record that can be copied into a PR, release note, or deployment log.

```text
Release: APT doctrine build-kit sync
Source: PR or commit link
Outcome: Broaden enforceable guidance across APT lifecycle layers
Changed behavior: New examples, checklist gates, prompt review criteria
Validation: npm run validate passed
Preview: public docs preview checked
Deployment target: canonical repository and generated public docs
Rollback: revert commit or restore prior generated docs
Support impact: maintainers should use new examples when reviewing lifecycle work
Known risks: sibling repo checks may fail for unrelated project-profile issues
Owner: APT maintainer
```

## Example Structure

```text
Release:
Source:
Outcome:
Changed behavior:
Validation:
Preview:
Deployment target:
Rollback:
Support impact:
Known risks:
Owner:
```

## Tradeoffs

A release record may feel redundant for tiny docs changes. It becomes important when changes affect public docs, generated assets, reference contracts, security, operations, or multiple repositories.

## Common Mistakes

- Listing changed files without changed behavior.
- Omitting rollback because the release is "just docs."
- Failing to name unrelated known check failures.
- Leaving support to infer user-facing impact.

## Related Documents

- `../../release-change-management.md`
- `../../quality-testing.md`
- `../../operations-support.md`
- `preview-to-prod-flow.md`
