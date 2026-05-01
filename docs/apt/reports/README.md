---
title: APT Reports
version: v1
status: draft
audience: internal
visibility: internal
source: manual
---

# APT Reports

Local APT audit outputs for `applied-practical-thinking`.

- Canonical doctrine source: `../../../../apt-principles`
- Human-readable reports: `docs/apt/reports/*.md`
- Machine-readable outputs: `docs/apt/reports/static/*`

Current core baseline reports:

- `docs/apt/reports/apt-principles-conformance-matrix-2026-04-30.md`
- `docs/apt/reports/static/apt-principles-conformance-matrix-2026-04-30.json`
- `docs/apt/reports/apt-design-route-gate-check-2026-04-30.md`
- `docs/apt/reports/static/apt-design-route-gate-check-2026-04-30.json`

Report contract:

- Owner: APT maintainers for this repository
- Cadence: update on every conformance batch closure and before release promotion
- Verification command: `pnpm run validate:apt-conformance`

Keep doctrine updates in `apt-principles` and keep only repo-specific findings here.
