---
title: applied-practical-thinking APT Adoption
version: v1
last_updated: 2026-04-26
owner: APT
status: draft
---

# applied-practical-thinking APT Adoption

## Purpose

`applied-practical-thinking` is the public-facing APT platform repo. It consumes canonical doctrine from `apt-principles` and publishes website content, Worker APIs, and generated public APT materials.

## Adoption Mode

Primary mode: `apply + showcase`

- Canonical doctrine remains in `apt-principles`.
- This repo stores only project-specific implementation evidence and audit outputs.
- Generated public artifacts are treated as outputs, not authored doctrine.

## Principles Applied

- Thinking: public narrative and platform intent are explicit in `README.md` and site docs.
- Design: design doctrine and token contracts are maintained in `apps/web/docs/design/`.
- Architecture: clear split between `apps/web`, `apps/worker`, and shared `packages/*`.
- Knowledge: local APT audit reports are stored under `docs/apt/reports/`.
- AI: worker AI/content route boundaries are documented in code and docs.

## Local Structure

```text
docs/apt/
  adoption.md
  project-profile.md
  references/
    project-profile.json
  reports/
    README.md
    *.md
    static/
```

## Validation

Run from repo root:

```powershell
pnpm --dir apps/web run validation-report
pnpm --dir apps/web test
pnpm --dir apps/web lint
```

Canonical doctrine validation:

```powershell
cd ../apt-principles
npm run validate
```

## Related Documents

- `README.md`
- `PROJECT_RULES.md`
- `docs/DECISION_LOG.md`
- `docs/apt/reports/apt-principles-audit-2026-04-26.md`
- `../apt-principles/checklists/project-adoption-checklist.md`
- `../apt-principles/references/project-profile.schema.json`
