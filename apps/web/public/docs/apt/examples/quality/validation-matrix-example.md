---
title: Validation Matrix Example
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# Validation Matrix Example

## Context

A multi-surface repo needs a clear validation plan for code, docs, prompts, references, and deployments.

## Problem

Validation summaries often list commands without explaining risk, evidence, or what to do when a check fails.

## APT Principles Applied

- Quality: correctness becomes evidence.
- Execution: validation is known before work starts.
- Release: failed checks require disposition before promotion.
- Operations: diagnostics should help someone act.

## Solution

Use a validation matrix that maps risk to evidence.

```text
Layer: doctrine/build-kit
Risk: contract or link drift
Check: npm run validate
Evidence: pass/fail summary
Failure disposition: blocking unless validator bug is documented

Layer: frontend
Risk: user-facing regression
Check: lint, typecheck, build, preview visual review
Evidence: command output, screenshot or preview notes
Failure disposition: blocking unless unrelated pre-existing issue is cited

Layer: worker/API
Risk: boundary or auth regression
Check: route tests, contract tests, smoke test
Evidence: test output and changed endpoint list
Failure disposition: blocking for changed boundary
```

Failed checks should be labeled as blocking, deferred with accepted risk, or unrelated pre-existing failure. The release note should not simply say "some checks failed."

## Example Structure

```text
Layer:
Risk:
Command or review method:
Expected evidence:
Failure criteria:
Disposition:
Owner:
Residual risk:
```

## Tradeoffs

A validation matrix is more verbose than a command list. It is worth using when multiple packages, deploy targets, or high-risk workflows are involved.

## Common Mistakes

- Reporting only that commands were run.
- Ignoring failed checks because they are outside the current package.
- Missing preview evidence for user-facing behavior.
- Treating local manual testing as enough for production-impacting work.

## Related Documents

- `../../quality-testing.md`
- `../../execution.md`
- `../../release-change-management.md`
- `../../checklists/quality-testing-checklist.md`
