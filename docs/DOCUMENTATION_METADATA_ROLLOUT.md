---
title: Documentation Metadata Rollout
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# Documentation Metadata Rollout

## Purpose

Define phased enforcement for markdown frontmatter metadata across the repo while preserving current delivery stability.

Required metadata keys (for governed markdown in each enforcement wave):

- `title`
- `version`
- `status`
- `audience`
- `visibility`
- `source`

## Current Enforcement State

- Strict-frontmatter enforcement is active for manifest-governed design doctrine and audited doctrine checks in `apps/web/docs/design/versions/*`.
- Repo-wide metadata enforcement is **report-only** for rollout waves below.

## Wave Plan

### Wave 1 (enforce on 2026-04-20)

Scope:

- `apps/web/docs/design/static/*.md`
- `apps/web/ai/prompts/*.md`

### Wave 2 (enforce on 2026-05-15)

Scope:

- `docs/*.md`
- Root operational docs:
  - `README.md`
  - `PROJECT_RULES.md`
  - `DOCUMENTATION_INDEX.md`
  - `AGENTS.md`
  - `QUICK_REFERENCE.md`

### Wave 3 (enforce on 2026-06-15)

Scope:

- `apps/worker/src/ai/docs/*.md`
- `.github/*.md`

## Explicit Exceptions (During Rollout)

- `docs/DECISION_LOG.md`:
  - reason: historical log format is preserved during phased rollout.
- `.github/pull_request_template.md`:
  - reason: GitHub template structure is preserved during phased rollout.

These exceptions are reviewed again before Wave 3 enforcement.

## Reporting and Governance

- Report command (quick): `pnpm --dir apps/web run validation-report`
- Report command (full, includes tests): `pnpm --dir apps/web run validation-report:full`
- Frontmatter-only command remains available: `pnpm --dir apps/web run frontmatter-report`
- Frontmatter autofix starter (preview default): `pnpm --dir apps/web run validation-frontmatter-autofix -- --wave=wave1`
- Frontmatter autofix apply mode: `pnpm --dir apps/web run validation-frontmatter-autofix -- --wave=wave1 --apply`
- Governance command includes report generation: `pnpm --dir apps/web run verify-doc-governance`
- Lint path includes governance: `pnpm --dir apps/web lint`
- Artifacts are written to `reports/validation/` as `LATEST.json`, `LATEST.md`, and timestamped run files.

If a wave is not yet enforced, findings are tracked as remediation backlog, not merge blockers.
