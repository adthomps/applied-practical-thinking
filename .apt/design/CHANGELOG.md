---
title: "APT Design Changelog"
kind: changelog
domain: design
status: active
owner: APT
last_updated: 2026-10-04
source_paths: ["apt-principles-agents/design/VERSION", "apt-principles-agents/design/tokens/APT-TOKENS.json"]
---

# APT Design Changelog

Each entry matches a `design/VERSION` value. Consumers record the version they synced in `.apt/installation.json` (`designVersion`). Run `node scripts/apt-assets.mjs audit-workspace --workspace-root ..` to see which repos are behind.

## 2.1.0 - 2026-10-04

Canonical tokens moved into apt-principles-agents (APT-019).

- **Source:** `design/tokens/APT-TOKENS.json` is now the single source. Generated artifacts live in `design/generated/` and ship through the `design` manifest.
- **Contrast (APT-017):** dark primary family is `220 70% 61%` (5.14:1 on background, 4.68:1 on card).
- **Status and muted text (APT-018):**
  - `success`, `success-foreground`, `warning` and `warning-foreground` are canonical in both themes.
  - Dark `muted-foreground` and `apt-text-secondary` are `220 10% 60%`.
- **Sidebar:** `sidebar-*` tokens are now canonical. The values come from the APT site with no change.
- **Migration:**
  1. Sync the `design` manifest.
  2. Add `apt-design.json`.
  3. Import `.apt/design/generated/apt-tokens.css` (or `apt-tokens.dark-first.css`) instead of hand-copied values.
  4. Run `node .apt/design/bin/apt-design-check.mjs` in CI.
