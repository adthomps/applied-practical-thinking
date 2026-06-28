---
title: "Proposed File Changes"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/PROPOSED-FILE-CHANGES.md"]
---

# Proposed File Changes

This file tracks the intended additive migration.

## Added

- `agents/` harness agent specifications.
- `routing/` model routing, local-first routing, task classification, token budgeting, registry, capability matrix, and update report.
- `context/` shared context packs.
- `skills/token-efficiency/SKILL.md`.
- `agent-repo.manifest.json`.
- Lifecycle scripts for install, scan, repair, sync, local model detection, registry update, and routing validation.
- Catalog and architecture docs in `docs/`.
- Harness profiles: `minimal`, `standard`, `security`, `full`, and `custom`.

## Updated

- README and operating docs to describe the harness layer.
- setup, actions, layout, post-operation, rollout, and profile reference docs to include new commands.
- package scripts to expose new harness commands.

## Preserved

- Existing `profiles/*.json` behavior.
- Existing `install-agent-standards.mjs` and `sync-agent-standards.mjs` entry points.
- Existing Claude, Codex, and Copilot surfaces.
- Legacy `.apt/installation.json` compatibility.
