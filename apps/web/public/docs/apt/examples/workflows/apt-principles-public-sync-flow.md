---
title: APT Principles Public Sync Flow
version: v1
last_updated: 2026-04-25
owner: APT
status: draft
---

# APT Principles Public Sync Flow

## Context

`apt-principles` is the canonical doctrine/build-kit/references package. `applied-practical-thinking` is the public portfolio/demo/learning site that publishes a public APT Principles view from canonical source.

In local development and internal CI with both repositories available, public artifacts should be regenerated from canonical source before release. In single-repo deploy contexts (for example Cloudflare Pages building only `applied-practical-thinking`), committed generated artifacts are used as the fallback.

## Problem

Without a repeatable sync flow, the public APT pages can drift from canonical doctrine, or deploys can fail when canonical source is unavailable at build time. Teams need one process that supports both canonical refresh and reliable single-repo deploys.

## APT Principles Applied

- Knowledge: one canonical source, controlled downstream consumption.
- System Standards: predictable artifact paths and manifests.
- Release & Change: explicit regeneration and promotion steps.
- Quality & Testing: governance validation before publish.
- Operations & Support: deploy-safe fallback when canonical source is absent.

## Solution

Use a two-mode sync model:

1. Canonical refresh mode:
   Regenerate consumer artifacts from `apt-principles` and commit outputs in `applied-practical-thinking`.
2. Deploy fallback mode:
   If canonical source is not mounted in deploy CI, reuse committed generated artifacts so deploy remains stable.

Core consumer commands in `applied-practical-thinking`:

```text
pnpm --dir apps/web run generate-apt-principles-public
pnpm --dir apps/web run validation-report
pnpm --dir apps/web run build-content-index
pnpm --dir apps/web run copy-content-to-public
```

Artifacts that must be committed in consumer repo:

```text
apps/web/public/docs/apt/**
apps/web/data/generated/aptPrinciplesPublicManifest.ts
```

Optional canonical root override:

```text
APT_PRINCIPLES_ROOT=<path-to-apt-principles> pnpm --dir apps/web run generate-apt-principles-public
```

## Example Structure

Sync checklist:

```text
Source change:
Consumer regeneration:
Validation report result:
Generated files reviewed:
Commit includes generated artifacts:
Deploy context:
- canonical source mounted? yes/no
- fallback artifacts present? yes/no
```

Promotion note:

```text
Canonical source version/date:
Consumer sync commit:
Public manifest updated:
Risk:
Rollback:
```

## Tradeoffs

Committed generated artifacts add repository churn, but they keep single-repo deploy targets reliable and prevent hard coupling between public deploys and multi-repo checkout behavior.

## Common Mistakes

- Updating canonical docs but not regenerating consumer artifacts.
- Treating fallback warning logs as build failures when committed artifacts are current.
- Omitting generated manifest updates from release commits.
- Running public deploys from stale generated artifacts without a refresh cadence.
- Not documenting the canonical source version/date in release notes.

## Related Documents

- `../../apt-principles.md`
- `../../knowledge-system.md`
- `../../release-change-management.md`
- `../../quality-testing.md`
- `../../checklists/project-adoption-checklist.md`
- `../../checklists/release-readiness-checklist.md`
