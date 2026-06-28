---
title: Distribution setup
kind: runbook
domain: operations
status: active
owner: APT maintainers
last_updated: 2026-06-28
source_paths: ["apt-principles-agents/scripts/apt-assets.mjs"]
---

# Distribution setup

Use Node 20 or newer. Select one or more manifests from `manifests/`, then preview the installation before applying it.

```powershell
node scripts/apt-assets.mjs install --target ../target-repo --manifest core --dry-run
node scripts/apt-assets.mjs install --target ../target-repo --manifest core --apply
```

The installer creates `.apt/installation.json` in the target. That file is the target-owned record of selected manifests, managed mappings, installed hashes, local context, source revision, and the last operation. Commit it with the managed assets.

Use `--platform codex,claude,copilot,gemini` when the target needs an explicit platform subset. Existing files are skipped unless `--force` is supplied; forced replacement creates timestamped backups under `.apt-backups/`.

For a legacy target, preview and then run:

```powershell
node scripts/apt-assets.mjs migrate-legacy --target ../target-repo --manifest core --dry-run
node scripts/apt-assets.mjs migrate-legacy --target ../target-repo --manifest core --apply --force
```

Migration removes `.apt/installation.json` only after the new installation record is written.
