---
title: Distribution operations
kind: runbook
domain: operations
status: active
owner: APT maintainers
last_updated: 2026-06-28
source_paths: ["apt-principles-agents/scripts/apt-assets.mjs"]
---

# Distribution operations

The safe operating loop is detect, preview, apply, and verify.

```powershell
node scripts/apt-assets.mjs detect --target ../target-repo
node scripts/apt-assets.mjs scan --target ../target-repo
node scripts/apt-assets.mjs sync --target ../target-repo --dry-run
node scripts/apt-assets.mjs sync --target ../target-repo --apply
node scripts/apt-assets.mjs scan --target ../target-repo
```

`scan` reports missing, changed, and current managed artifacts. `sync` preserves locally changed files. Use `repair --force` only after reviewing drift; overwritten files are backed up first.

```powershell
node scripts/apt-assets.mjs repair --target ../target-repo --dry-run
node scripts/apt-assets.mjs repair --target ../target-repo --apply --force
```

Uninstall also begins as a preview. Files whose installed hashes no longer match are retained unless forced.

```powershell
node scripts/apt-assets.mjs uninstall --target ../target-repo --dry-run
```
