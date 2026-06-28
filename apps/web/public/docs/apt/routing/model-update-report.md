---
title: "Model Update Report"
kind: "routing"
domain: "ai"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/routing/model-update-report.md"]
---

# Model Update Report

Last initialized: 2026-06-17

## Current Status

- Registry exists at `routing/model-registry.json`.
- Local model availability is detected by `scripts/check-local-models.mjs`.
- Routing references are validated by `scripts/validate-model-routing.mjs`.
- Registry updates are written by `scripts/update-model-registry.mjs`.

## Operator Notes

- Local model detection is best-effort and does not install models.
- Cloud model entries are capability references only; no paid API calls are made.
- Deprecated entries should remain in the registry until dependent docs and reports are updated.
