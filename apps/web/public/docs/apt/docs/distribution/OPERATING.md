---
title: "Operating Guide"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/OPERATING.md"]
---

# Operating Guide

This guide is the runbook for installing and maintaining APT agent standards and harness metadata in target repositories.

For local setup, start with `docs/SETUP.md`. For task-specific checklists, use `docs/ACTIONS.md`. For target folder conventions, use `docs/AI-TOOL-LAYOUT.md`. For post-install and post-sync checks, use `docs/POST-OPERATION-CHECKS.md`. For using installed prompts, skills, and agents, use `docs/USING-INSTALLED-STANDARDS.md`. For multi-repo rollout, use `docs/WORKSPACE-ROLLOUT.md`. For a concrete target repo walkthrough, use `docs/EXAMPLE-APT-ANET-ACCEPT-SUITE-TOOLBOX.md`.

## Doctrine Source Of Truth

`apt-principles-agents` is the canonical source for APT doctrine, review checklists, prompts, examples, reference contracts, and project adoption rules. Use this repo to distribute those standards into tool-native files across target repositories; do not make installed `AGENTS.md`, `.claude/`, `.codex/`, or `.github/` files a competing doctrine source.

When doctrine changes in `apt-principles-agents`, update this repo only when profile composition, installed agent files, tool-specific prompts, routing guidance, lifecycle scripts, or installer behavior must change. When a target repo reveals reusable doctrine gaps, capture the improvement in `apt-principles-agents` first, then sync distribution files here if needed.

## Harness Source Of Truth

This repo owns the operational harness:

- `agents/` for canonical harness agent roles.
- `routing/` for model tiers, local-first routing, task classification, token budgeting, and registry validation.
- `context/` for shared context packs.
- `context-packs/` for public context-pack strategy and compression rules.
- `checklists/` for required repo-alignment, docs, API, UI, security, and agent checks.
- `showcases/` for small examples of APT-aligned patterns.
- `prompts/` for tool-neutral reusable prompt templates.
- `skills/token-efficiency/` for model-agnostic token control.
- `agent-repo.manifest.json` for source manifest metadata.
- `.apt/installation.json/` in target repos for install, scan, repair, and sync reports.

## Core Safety Rules

- APT Core is always installed.
- Profiles are composable capabilities, not repo types.
- Use `--dry-run` before writing to a real target repo.
- New `agent-repo` lifecycle install is dry-run by default unless `--apply` is passed.
- Existing target files are not overwritten unless `--force` is passed.
- Sync updates only files listed in the target repo's `.apt/installation.json`.
- Harness sync updates only files listed in `.apt/installation.json/manifest.json` or the legacy manifest.
- `docs/project-context.md` is local project context and is preserved by sync.
- `.apt/installation.json/local-overrides.md` is local override context and is preserved by sync and repair.
- Scripts use Node.js built-in modules only.

## Before You Install

1. Confirm the target repo path.
2. Check whether the target repo already has agent files, docs, Claude config, Codex skills, or Copilot instructions.
3. Run auto-detection to get a starting recommendation:

   ```bash
   node scripts/apt-assets.mjs install --target ../target-repo --auto
   ```

4. Compare the recommendation with `docs/PROFILE-REFERENCE.md`.
5. Decide whether to install detected profiles or a curated list.

## Repo Alignment Before Install

For unfamiliar target repos, run a lightweight alignment pass before applying standards:

1. Identify the repo type from files, scripts, docs, runtime config, and deployment settings.
2. Read the target `README.md`, `AGENTS.md` if present, and `docs/project-context.md` if present.
3. Select relevant profiles with `docs/PROFILE-REFERENCE.md`.
4. Select context packs with `context-packs/README.md`.
5. Apply the relevant checklist under `checklists/`.
6. Use `showcases/` only as pattern examples, not as proof of compliance.
7. Return mandatory gaps separately from recommended improvements.

Do not claim the target repo follows APT standards unless the relevant files were checked against the relevant checklist.

Compression is allowed for discovery, planning, summarization, and cross-repo alignment. Compression is not enough for security, compliance, payment handling, final validation, or exact code edits.

## Run Guide

Use these commands from this standards repository.

| Task | Command |
| --- | --- |
| Show installer help | `node scripts/apt-assets.mjs install --help` |
| Show harness installer help | `node scripts/install-agent-repo.mjs --help` |
| Detect profiles | `node scripts/detect-profiles.mjs --target ../target-repo --json` |
| Preview auto install | `node scripts/apt-assets.mjs install --target ../target-repo --auto` |
| Apply auto install | `node scripts/apt-assets.mjs install --target ../target-repo --auto --apply` |
| Preview harness install | `node scripts/install-agent-repo.mjs --target ../target-repo --profiles standard --dry-run` |
| Apply harness install | `node scripts/install-agent-repo.mjs --target ../target-repo --profiles standard --apply` |
| Preview manual install | `node scripts/apt-assets.mjs install --target ../target-repo --profiles documentation --dry-run` |
| Apply manual install | `node scripts/apt-assets.mjs install --target ../target-repo --profiles documentation` |
| Preview sync | `node scripts/apt-assets.mjs sync --target ../target-repo --dry-run` |
| Preview harness sync | `node scripts/sync-agent-repo.mjs --target ../target-repo --dry-run` |
| Scan install | `node scripts/scan-agent-install.mjs --target ../target-repo --json` |
| Preview repair | `node scripts/repair-agent-install.mjs --target ../target-repo --report-only` |
| Validate model routing | `node scripts/validate-model-routing.mjs` |
| Check local models | `node scripts/check-local-models.mjs` |
| Apply sync | `node scripts/apt-assets.mjs sync --target ../target-repo` |
| Audit workspace | `node scripts/apt-assets.mjs audit-workspace --workspace-root .. --include-detection` |
| Check AI tool parity | `node scripts/check-ai-tool-parity.mjs` |

The same operations can be run through npm scripts:

```bash
npm run detect:profiles -- --target ../target-repo --json
npm run install:standards -- --target ../target-repo --profiles documentation --dry-run
npm run install:agent-repo -- --target ../target-repo --profiles standard --dry-run
npm run sync:standards -- --target ../target-repo --dry-run
npm run scan:agent-repo -- --target ../target-repo --json
npm run validate:model-routing
npm run audit:workspace -- --workspace-root .. --include-detection
npm run check:ai-tool-parity
```

## Harness Install

Use the harness installer for new lifecycle metadata and reports. It also writes the legacy `.apt/installation.json` manifest for compatibility.

```bash
node scripts/install-agent-repo.mjs --target ../target-repo --profiles standard --dry-run
node scripts/install-agent-repo.mjs --target ../target-repo --profiles standard --apply
```

The harness installer creates or updates:

```text
.apt/installation.json
.apt/installation.json/manifest.json
.apt/installation.json/local-overrides.md
.apt/installation.json/install-report.md
docs/project-context.md
```

Use `minimal` for routing basics, `standard` for most repos, `security` for sensitive repos, and `full` only when all current capabilities are appropriate.

## Workspace Audit

Use the workspace audit before first-time installs or periodic update runs across sibling repos:

```bash
node scripts/apt-assets.mjs audit-workspace --workspace-root .. --include-detection
```

For a curated APT workspace rollout list and profile defaults, see `docs/WORKSPACE-ROLLOUT.md`. Treat detected `payments`, `lovable`, and `migration` profiles as advisory until a human confirms they match the repo's actual scope.

## Manual Install

Use manual install when you already know the capabilities a repo needs.

1. Preview the file plan:

   ```bash
   node scripts/apt-assets.mjs install --target ../target-repo --profiles cloudflare,documentation,api-review --dry-run
   ```

2. Review `copied`, `skipped`, and `createdContext` in the JSON output.
3. Apply the install:

   ```bash
   node scripts/apt-assets.mjs install --target ../target-repo --profiles cloudflare,documentation,api-review
   ```

4. Open the target repo and review:

   ```text
   .apt/installation.json
   docs/project-context.md
   apt-core/
   AGENTS.md
   .claude/
   .codex/skills/
   .github/
   ```

5. Fill in `docs/project-context.md` with real project purpose, architecture, commands, integrations, local standards, and known risks.

## Auto-Detected Install

Use auto-detection when onboarding an unfamiliar repo.

1. Preview recommendations:

   ```bash
   node scripts/apt-assets.mjs install --target ../target-repo --auto
   ```

2. Inspect why each profile was recommended:

   ```bash
   node scripts/detect-profiles.mjs --target ../target-repo --json
   ```

3. Apply the detected profiles:

   ```bash
   node scripts/apt-assets.mjs install --target ../target-repo --auto --apply
   ```

4. If auto-detection misses a needed capability, combine `--auto --apply` with explicit profiles:

   ```bash
   node scripts/apt-assets.mjs install --target ../target-repo --auto --apply --profiles governance,training
   ```

## Handling Existing Files

The installer skips existing files by default. This protects local standards and project-specific work.

If output shows skipped files:

1. Open the skipped target file.
2. Compare it with the source standard in this repo.
3. Decide whether to keep the local file, merge manually, or overwrite.
4. Use `--force` only when overwriting is intentional:

   ```bash
   node scripts/apt-assets.mjs install --target ../target-repo --profiles documentation --force
   ```

## Manifest Review

Every install writes `.apt/installation.json` in the target repo.

Review these fields:

- `source`: absolute path to this standards repo.
- `version`: standards package version installed.
- `profiles`: resolved profiles, including `apt-core`.
- `managedFiles`: target-repo files sync is allowed to update.
- `managedFileSources`: source files in this standards repo that correspond to the managed target files.
- `localContext`: target repo context file, normally `docs/project-context.md`.

Do not add project-specific files to `managedFiles` unless you want sync to control them.

When installing additional profiles into a repo that already has `.apt/installation.json`, the installer preserves existing `profiles` and `managedFiles`, then adds newly copied managed files from the selected profiles.

## Sync Standards

Use sync when this standards repo changes and a target repo should receive updates to already managed files.

1. Preview sync:

   ```bash
   node scripts/apt-assets.mjs sync --target ../target-repo --dry-run
   ```

2. Review `updated` and `skipped`.
3. Apply sync:

   ```bash
   node scripts/apt-assets.mjs sync --target ../target-repo
   ```

4. Review the target repo diff before committing anything there.

Sync does not discover new profile files. To add new capabilities, run the installer again with additional profiles.

Harness sync uses the new manifest when present:

```bash
node scripts/sync-agent-repo.mjs --target ../target-repo --dry-run
node scripts/sync-agent-repo.mjs --target ../target-repo
```

It preserves `docs/project-context.md` and `.apt/installation.json/local-overrides.md`.

## Scan And Repair

Use scan before repair:

```bash
node scripts/scan-agent-install.mjs --target ../target-repo --json
```

Repair is safe by default. It does not write unless `--apply` is passed, and drifted files require `--force` before overwrite:

```bash
node scripts/repair-agent-install.mjs --target ../target-repo --report-only
node scripts/repair-agent-install.mjs --target ../target-repo --apply --backup --force
```

Review `.apt/installation.json/repair-plan.md` before applying repair to a real repo.

## Project Context Maintenance

`docs/project-context.md` is created from `standards/project-context.template.md` only when missing.

Maintain it whenever:

- Product purpose changes.
- Architecture changes.
- Commands change.
- Deployment or infrastructure changes.
- External integrations change.
- Installed profiles change.
- Local conventions or known risks change.

## Context Pack Usage

Use context packs to reduce repeated reading during planning and cross-repo alignment. The installable pack sources live in `context/`; the public strategy guide lives in `context-packs/README.md`.

For sensitive or final-change work, read exact source files even when a context pack or compressed summary was already loaded. Exact reads are required for security, compliance, payment handling, final validation, and exact code edits.

## Validation Checklist

After installing or syncing standards in a target repo:

- `.apt/installation.json` exists and lists expected profiles.
- `docs/project-context.md` exists and contains project-specific content.
- Existing local files were not overwritten unintentionally.
- Managed files are useful and non-empty.
- Claude, Codex, and Copilot instructions match the repo's needs.
- Target repo validation commands still pass.

## Commands To Run After Install Or Sync

From this standards repo:

```bash
node scripts/apt-assets.mjs sync --target ../target-repo --dry-run
```

From the target repo:

```bash
git status --short
npm run lint
npm test
npm run build
```

Use the package manager and scripts that actually exist in the target repo. For pnpm monorepos, common checks are:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

For more complete command sets and profile-specific checks, use `docs/POST-OPERATION-CHECKS.md`.

## Using Installed Standards After Setup

After setup is verified, use the installed files to improve the target repo:

1. Start with an APT readiness audit.
2. Choose one workflow: fix, test generation, docs sync, API review, UX review, repo standardization, or modernization.
3. Choose the right AI mode: Chat for planning, Review for findings, Agent/Edit for scoped file changes, Copilot Chat for `.github/prompts/`, Claude subagent mode for `.claude/agents/`, or Codex skill-guided work for `.codex/skills/`.
4. Use the matching installed prompt, skill, or agent.
5. Ask for inspection and a plan before edits.
6. Apply one small change.
7. Validate and update docs.

See `docs/USING-INSTALLED-STANDARDS.md` for prompt examples.

## Recovery

If an install was too broad:

1. Use the target repo's version control diff to inspect changes.
2. Remove unwanted files from the target repo.
3. Edit `.apt/installation.json` so `managedFiles` contains only files that should be synced.
4. Re-run sync in dry-run mode to confirm the new managed set:

   ```bash
   node scripts/apt-assets.mjs sync --target ../target-repo --dry-run
   ```

If files were overwritten with `--force`, recover them from the target repo's version control history.

## Release Checklist For This Standards Repo

Before tagging a new standards version:

1. Review profile manifests for missing source files.
2. Run `node scripts/check-ai-tool-parity.mjs`.
3. Run a full-profile dry run against a temp target.
4. Run auto-detection against representative projects.
5. Run the workspace audit against representative sibling repos.
6. Run install and sync smoke tests.
7. Update `CHANGELOG.md`.
8. Review `README.md`, `AGENTS.md`, `docs/SETUP.md`, this operating guide, `docs/ACTIONS.md`, `docs/WORKSPACE-ROLLOUT.md`, `docs/POST-OPERATION-CHECKS.md`, `docs/USING-INSTALLED-STANDARDS.md`, `docs/AI-TOOL-LAYOUT.md`, and `docs/PROFILE-REFERENCE.md`.
