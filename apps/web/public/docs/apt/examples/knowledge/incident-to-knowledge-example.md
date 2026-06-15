---
title: Incident to Knowledge Example
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# Incident to Knowledge Example

## Context

An incident, failed validation run, or repeated support question reveals a gap in docs, tests, UX, runbooks, or doctrine.

## Problem

Teams often close the incident after recovery but fail to capture the reusable learning. The same failure then returns as drift or support load.

## APT Principles Applied

- Knowledge: document once, reuse everywhere.
- Operations: support feedback drives improvement.
- Quality: failure diagnostics should become better checks.
- Release: known risks and fixes need traceability.

## Solution

Convert the incident into one durable artifact or an explicit non-action.

```text
Incident: Preview docs search failed on generated source path
Cause: Generated manifest omitted a canonical source alias
Learning type: doc gap + validation gap
Artifact update: add manifest validation note to knowledge docs
Test update: add source-path assertion to validation report
Release note: generated docs sync now validates canonical source paths
Non-action: no architecture change needed
Owner: APT maintainer
Evidence: failed validation output and passing rerun
```

## Example Structure

```text
Incident or finding:
Impact:
Cause:
Learning type:
Artifact update:
Validation update:
Release/support note:
Accepted non-action:
Owner:
Evidence:
```

## Tradeoffs

Not every incident deserves new doctrine. Small issues may only need a test, runbook, or local project note. The important rule is that the team chooses deliberately.

## Common Mistakes

- Treating recovery as the end of the work.
- Updating local docs when canonical doctrine is the real source.
- Creating duplicate guidance instead of linking to the canonical file.
- Forgetting to record an accepted non-action.

## Related Documents

- `../../knowledge-system.md`
- `../../operations-support.md`
- `../../quality-testing.md`
- `canonical-doc-update-example.md`
