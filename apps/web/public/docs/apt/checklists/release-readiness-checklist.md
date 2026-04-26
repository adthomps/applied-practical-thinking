---
title: Release Readiness Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Release Readiness Checklist

## Scope

Use this checklist before promoting changes to production or publishing a versioned doctrine/build-kit update.

It applies to code releases, docs releases, reference contract updates, project showcase updates, and copied/synced APT assets. Run it after validation and before promotion.

## Required Checks

- [ ] Change scope is documented.
- [ ] Required tests and validation have passed.
- [ ] Preview validation is complete for user-facing changes.
- [ ] Security review is complete for auth, data, secrets, or sensitive endpoint changes.
- [ ] Release notes describe user-facing and operational impact.
- [ ] Rollback or recovery path is known.
- [ ] Support notes are included when behavior changes.
- [ ] Known risks are documented.

## Failure Conditions

- No validation evidence.
- No rollback path for production-impacting changes.
- Release mixes unrelated changes without explanation.
- Support cannot understand what changed.
- Manual deploy steps are required but undocumented.

## Evidence Required

- Validation summary.
- Preview URL or review notes when applicable.
- Release notes and rollback notes.
- Version or source reference for changed doctrine or references.
- Known-risk note for anything intentionally deferred.

## Pass Standard

The release is ready when someone outside the implementation work can answer what changed, why it changed, how it was validated, what risk remains, and how to recover. If those answers live only in chat, release is not ready.

## Related Documents

- `../release-change-management.md`
- `../quality-testing.md`
- `../operations-support.md`
- `../examples/workflows/preview-to-prod-flow.md`
