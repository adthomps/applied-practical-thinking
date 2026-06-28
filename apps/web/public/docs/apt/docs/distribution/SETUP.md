---
title: "Setup Guide"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/SETUP.md"]
---

# Setup Guide

This repository has no runtime dependencies beyond Node.js. The installer, sync, detection, routing, scan, and repair scripts use Node.js built-in modules only.

## Requirements

- Node.js 18 or newer.
- A local checkout of this repository.
- A target repository path when installing or syncing standards.

## Fresh Local Setup

1. Open a terminal in this repository:

   ```bash
   cd apt-principles-agents
   ```

2. Confirm Node.js is available:

   ```bash
   node --version
   ```

3. Confirm package metadata:

   ```bash
   node -e "console.log(require('./package.json').name)"
   ```

4. Run script help:

   ```bash
   node scripts/apt-assets.mjs install --help
   node scripts/install-agent-repo.mjs --help
   node scripts/detect-profiles.mjs --help
   node scripts/apt-assets.mjs sync --help
   node scripts/scan-agent-install.mjs --help
   node scripts/repair-agent-install.mjs --help
   node scripts/sync-agent-repo.mjs --help
   node scripts/validate-model-routing.mjs --help
   node scripts/apt-assets.mjs audit-workspace --help
   ```

No `npm install` step is required for the current implementation.

## Optional npm Script Usage

The package scripts forward arguments to the Node scripts:

```bash
npm run detect:profiles -- --target ../target-repo --json
npm run install:standards -- --target ../target-repo --profiles documentation --dry-run
npm run sync:standards -- --target ../target-repo --dry-run
npm run install:agent-repo -- --target ../target-repo --profiles standard --dry-run
npm run scan:agent-repo -- --target ../target-repo --json
npm run validate:model-routing
npm run audit:workspace -- --workspace-root .. --include-detection
```

## Local Smoke Test

Use a disposable target repo path before applying standards to a real project.

1. Create a small target project.
2. Add a `package.json`, docs file, or config that should trigger detection.
3. Run:

   ```bash
   node scripts/detect-profiles.mjs --target ../target-repo --json
   node scripts/apt-assets.mjs install --target ../target-repo --auto
   node scripts/apt-assets.mjs install --target ../target-repo --auto --apply
   node scripts/install-agent-repo.mjs --target ../target-repo --profiles standard --dry-run
   node scripts/apt-assets.mjs sync --target ../target-repo --dry-run
   node scripts/scan-agent-install.mjs --target ../target-repo --dry-run
   node scripts/validate-model-routing.mjs
   ```

4. Review the target repo's `.apt/installation.json` and `docs/project-context.md`.

## Repository Files To Review First

- `README.md` for purpose and examples.
- `docs/OPERATING.md` for the full runbook.
- `docs/HARNESS-ARCHITECTURE.md` for the agent harness design.
- `docs/AGENT-CATALOG.md`, `docs/SKILL-CATALOG.md`, and `docs/PROMPT-CATALOG.md` for routing inventories.
- `routing/model-routing.md` for model tier rules.
- `docs/ACTIONS.md` for task-specific playbooks.
- `docs/AI-TOOL-LAYOUT.md` for source-to-target AI folder mapping.
- `docs/POST-OPERATION-CHECKS.md` for commands to run after install, profile adds, or sync.
- `docs/USING-INSTALLED-STANDARDS.md` for using installed prompts, skills, and agents to update, fix, and modernize target repos.
- `docs/WORKSPACE-ROLLOUT.md` for multi-repo audits, first-run installs, update runs, and project-context completion.
- `docs/EXAMPLE-APT-ANET-ACCEPT-SUITE-TOOLBOX.md` for a real target repo example.
- `docs/PROFILE-REFERENCE.md` for profile selection.
- `scripts/apt-assets.mjs install` for install behavior.
- `scripts/detect-profiles.mjs` for auto-detection signals.
- `scripts/apt-assets.mjs sync` for managed-file sync behavior.
- `scripts/apt-assets.mjs audit-workspace` for read-only workspace rollout status.
- `scripts/install-agent-repo.mjs`, `scripts/scan-agent-install.mjs`, `scripts/repair-agent-install.mjs`, and `scripts/sync-agent-repo.mjs` for harness lifecycle operations and reports.

## Troubleshooting

- If a target file is skipped, it already exists and `--force` was not used.
- If auto-detection recommends too few profiles, add explicit `--profiles`.
- If sync skips a missing target file, use `--force` only when recreating that managed file is intentional.
- If `.apt/installation.json` is missing, run install before sync.
- If `.apt/installation.json/manifest.json` is missing, run `install-agent-repo.mjs --dry-run` to preview the harness manifest migration.
