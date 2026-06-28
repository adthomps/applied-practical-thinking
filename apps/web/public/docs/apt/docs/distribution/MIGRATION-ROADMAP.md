---
title: "Migration Roadmap"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/MIGRATION-ROADMAP.md"]
---

# Migration Roadmap

## Phase 1: Assessment And Catalogs

Add current-state assessment, agent catalog, skill catalog, prompt catalog, governance architecture, and risk assessment.

## Phase 2: Harness Architecture

Add first-class harness agents, context packs, token-efficiency guidance, and model-routing documentation.

## Phase 3: Manifest V1

Introduce `agent-repo.manifest.json` as the source manifest and `.apt/installation.json/manifest.json` as the installed target manifest. Preserve `.apt/installation.json` compatibility.

## Phase 4: Routing Tooling

Add local model detection, model registry update, and routing validation scripts. Avoid paid API calls unless explicitly configured later.

## Phase 5: Lifecycle Tooling

Add install, scan, repair, and sync scripts that generate reports and preserve local overrides. Keep legacy scripts available.

## Phase 6: Profile Integration

Add harness-oriented profiles: `minimal`, `standard`, `security`, `full`, and `custom`. Keep existing profiles stable and composable.

## Phase 7: Validation And Rollout

Run parity checks, model validation, dry-run installs, dry-run syncs, scan/repair fixtures, and representative workspace audits. Update docs after behavior changes.
