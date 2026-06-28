---
title: "Action Playbooks"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/ACTIONS.md"]
---

# Action Playbooks

Use these playbooks for recurring work with APT agent standards.

For a complete worked example against `apt-anet-accept-suite-toolbox`, see `docs/EXAMPLE-APT-ANET-ACCEPT-SUITE-TOOLBOX.md`.

For installed AI folder conventions, see `docs/AI-TOOL-LAYOUT.md`.

For commands to run after install or sync, see `docs/POST-OPERATION-CHECKS.md`.

For using installed prompts, skills, and agents to improve the target repo, see `docs/USING-INSTALLED-STANDARDS.md`.

For multi-repo rollout status, curated profile defaults, and project-context completion, see `docs/WORKSPACE-ROLLOUT.md`.

For harness routing and lifecycle behavior, see `docs/HARNESS-ARCHITECTURE.md`, `docs/AGENT-CATALOG.md`, and `routing/model-routing.md`.

## Action: Audit A Workspace Before Rollout

1. Run the read-only audit:

   ```bash
   node scripts/apt-assets.mjs audit-workspace --workspace-root .. --include-detection
   ```

2. For a curated target set, pass repo names explicitly:

   ```bash
   node scripts/apt-assets.mjs audit-workspace --workspace-root .. --repos applied-practical-thinking,apt-principles-agents,apt-anet-integration-toolbox,apt-coach,apt-commerce,apt-design-reference,apt-dream-to-reality,apt-exercise,apt-issue-system,apt-novel-reviewer,apt-principles-agents,crt-world --include-detection
   ```

3. Use `state` to decide the next action:
   - `installed`: run sync dry-run.
   - `partial-manual`: review existing local files, then run a first-time install dry-run.
   - `not-installed`: choose curated profiles and run a first-time install dry-run.
4. Treat `payments`, `lovable`, and `migration` detections as advisory until the repo's product scope confirms them.
5. Do not blindly self-install this package into `apt-principles-agents` or `apt-principles-agents`; maintain those source repos directly.

## Action: Onboard A New Repo With Auto-Detection

1. Preview detected profiles:

   ```bash
   node scripts/apt-assets.mjs install --target ../target-repo --auto
   ```

2. Inspect detection reasons:

   ```bash
   node scripts/detect-profiles.mjs --target ../target-repo --json
   ```

3. Compare recommendations with `docs/PROFILE-REFERENCE.md`.
4. Apply detected profiles:

   ```bash
   node scripts/apt-assets.mjs install --target ../target-repo --auto --apply
   ```

5. Fill in `../target-repo/docs/project-context.md`.
6. Review `../target-repo/.apt/installation.json`.
7. Run post-install checks from `docs/POST-OPERATION-CHECKS.md`.

## Action: Onboard A Repo With Chosen Profiles

1. Choose profiles from `docs/PROFILE-REFERENCE.md`.
2. Dry-run the install:

   ```bash
   node scripts/apt-assets.mjs install --target ../target-repo --profiles cloudflare,documentation,api-review --dry-run
   ```

3. Review skipped files.
4. Apply:

   ```bash
   node scripts/apt-assets.mjs install --target ../target-repo --profiles cloudflare,documentation,api-review
   ```

5. Update project context in the target repo.
6. Run post-install checks from `docs/POST-OPERATION-CHECKS.md`.

## Action: Onboard A Repo With The Harness Installer

1. Choose `minimal`, `standard`, `security`, `full`, or a curated profile list from `docs/PROFILE-REFERENCE.md`.
2. Dry-run the harness install:

   ```bash
   node scripts/install-agent-repo.mjs --target ../target-repo --profiles standard --dry-run
   ```

3. Review copied, skipped, and report paths.
4. Apply only after review:

   ```bash
   node scripts/install-agent-repo.mjs --target ../target-repo --profiles standard --apply
   ```

5. Fill `docs/project-context.md` and review `.apt/installation.json/local-overrides.md`.
6. Run:

   ```bash
   node scripts/scan-agent-install.mjs --target ../target-repo --json
   node scripts/sync-agent-repo.mjs --target ../target-repo --dry-run
   ```

## Action: Add Profiles To An Existing Install

1. Review current target manifest:

   ```text
   ../target-repo/.apt/installation.json
   ```

2. Dry-run the additional profile install:

   ```bash
   node scripts/apt-assets.mjs install --target ../target-repo --profiles governance,training --dry-run
   ```

3. Apply if the copied and skipped files are expected:

   ```bash
   node scripts/apt-assets.mjs install --target ../target-repo --profiles governance,training
   ```

4. Re-review `.apt/installation.json`. The installer preserves existing manifest profiles and managed files, then adds newly copied managed files from the added profiles.
5. Run post-profile-add checks from `docs/POST-OPERATION-CHECKS.md`.

## Action: Sync Standards Into A Target Repo

1. Confirm the target repo has `.apt/installation.json`.
2. Preview sync:

   ```bash
   node scripts/apt-assets.mjs sync --target ../target-repo --dry-run
   ```

3. Review `updated` and `skipped`.
4. Apply sync:

   ```bash
   node scripts/apt-assets.mjs sync --target ../target-repo
   ```

5. Review the target repo diff.
6. Run post-sync checks from `docs/POST-OPERATION-CHECKS.md`.

For harness installs, prefer:

```bash
node scripts/sync-agent-repo.mjs --target ../target-repo --dry-run
```

This reads `.apt/installation.json/manifest.json` when present and falls back to `.apt/installation.json`.

## Action: Scan And Repair A Target Install

1. Run a scan:

   ```bash
   node scripts/scan-agent-install.mjs --target ../target-repo --json
   ```

2. Review `.apt/installation.json/scan-report.md`.
3. Preview repair:

   ```bash
   node scripts/repair-agent-install.mjs --target ../target-repo --report-only
   ```

4. Apply only when the plan is expected:

   ```bash
   node scripts/repair-agent-install.mjs --target ../target-repo --apply --backup --force
   ```

5. Review `.apt/installation.json/repair-report.md` and the target repo diff.

## Action: Validate Model Routing

1. Validate registry and routing docs:

   ```bash
   node scripts/validate-model-routing.mjs
   ```

2. Optionally inspect local model availability:

   ```bash
   node scripts/check-local-models.mjs
   ```

3. Update the registry with local detection only when you intend to record local state:

   ```bash
   node scripts/update-model-registry.mjs --dry-run
   ```

## Action: Resolve Skipped Files

1. For each skipped file, compare the target file to the source file in this repo.
2. Keep local content when it is project-specific.
3. Merge manually when both files contain useful content.
4. Use `--force` only when the standards source should replace the target file.

## Action: Update Project Context

1. Open the target repo's `docs/project-context.md`.
2. Update purpose, architecture, commands, integrations, installed profiles, local standards, and known risks.
3. Keep project-specific decisions in this file rather than in managed standards files.
4. Revisit this file after migrations, deployment changes, API changes, and profile changes.

## Action: Review A Target Install

Check these files first:

```text
.apt/installation.json
docs/project-context.md
AGENTS.md
.claude/CLAUDE.md
.claude/agents/
.codex/skills/
.github/copilot-instructions.md
.github/instructions/
.github/prompts/
```

Confirm:

- Installed profiles match the repo's capabilities.
- Managed files should actually be managed by sync.
- Project context is specific to the target repo.
- Existing local standards were not overwritten unintentionally.

## Action: Use Installed Standards To Improve A Repo

1. Read the target repo's `docs/project-context.md`.
2. Choose the workflow from `docs/USING-INSTALLED-STANDARDS.md`.
3. Choose the right AI mode:

   ```text
   Chat mode for questions and planning.
   Review mode for findings without edits.
   Agent/Edit mode for scoped file changes.
   Copilot Chat when using .github/prompts/.
   Claude Code subagent mode when using .claude/agents/.
   Codex skill-guided agent work when using .codex/skills/.
   ```

4. Ask the AI tool to inspect and plan before editing.
5. Use the relevant installed files:

   ```text
   .codex/skills/
   .claude/agents/
   .github/prompts/
   .github/instructions/
   ```

6. If the AI says it cannot find a skill, agent, or prompt, reference the literal file path and ask it to open that file directly.
7. Review the plan and approve only the first small change.
8. Run validation commands from `docs/POST-OPERATION-CHECKS.md`.
9. Update target repo docs if behavior, setup, commands, API contracts, or workflows changed.

## Action: Modernize A Target Repo

1. Install or confirm the relevant profiles, usually `modernization`, `cloudflare`, `governance`, and `training`.
2. Use Chat mode first with `.codex/skills/cloudflare-modernization/SKILL.md` or `.claude/agents/cloudflare-architect.md`.
3. Ask for a staged modernization plan before edits.
4. Switch to Agent/Edit mode only for one approved stage.
5. Require the plan to preserve behavior and name validation commands.
6. Implement one stage at a time.
7. Run tests and update docs after each stage.

## Action: Prepare A New Standards Release

1. Update standards content, profiles, scripts, and docs.
2. Confirm profile manifests reference real source files.
3. Run a full-profile dry run:

   ```bash
   node scripts/apt-assets.mjs install --target ../scratch-target --profiles cloudflare,documentation,api-review,ux-review,migration,modernization,governance,lovable,payments,health,training,ai-development --dry-run
   ```

   Also run the harness full profile dry run:

   ```bash
   node scripts/install-agent-repo.mjs --target ../scratch-target --profiles full --dry-run
   ```

4. Run auto-detection against representative target repos.
5. Run install and sync smoke tests on a disposable target.
6. Run `node scripts/validate-model-routing.mjs` and `node scripts/check-ai-tool-parity.mjs`.
7. Update `CHANGELOG.md`.
8. Review `README.md`, `docs/SETUP.md`, `docs/OPERATING.md`, `docs/ACTIONS.md`, and `docs/PROFILE-REFERENCE.md`.

## Action: Recover From A Bad Install

1. Use the target repo's version control diff to identify unwanted files.
2. Remove files that should not be managed.
3. Edit `.apt/installation.json` so `managedFiles` lists only files that should be synced.
4. Run:

   ```bash
   node scripts/apt-assets.mjs sync --target ../target-repo --dry-run
   ```

5. If `--force` overwrote a file, restore the previous file from target repo version control.
