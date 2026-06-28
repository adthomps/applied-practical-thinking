---
title: "Workspace Rollout Guide"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/WORKSPACE-ROLLOUT.md"]
---

# Workspace Rollout Guide

Use this guide to audit, install, and sync APT agent standards across a sibling workspace such as `Applied Practical Thinking`.

## First Command

Start with the read-only workspace audit:

```bash
node scripts/apt-assets.mjs audit-workspace --workspace-root .. --repos applied-practical-thinking,apt-principles-agents,apt-anet-integration-toolbox,apt-coach,apt-commerce,apt-design-reference,apt-dream-to-reality,apt-exercise,apt-issue-system,apt-novel-reviewer,apt-principles-agents,crt-world --include-detection
```

Use JSON output when another script or report will consume the result:

```bash
node scripts/apt-assets.mjs audit-workspace --workspace-root .. --repos applied-practical-thinking,apt-principles-agents,apt-anet-integration-toolbox,apt-coach,apt-commerce,apt-design-reference,apt-dream-to-reality,apt-exercise,apt-issue-system,apt-novel-reviewer,apt-principles-agents,crt-world --include-detection --json
```

The audit does not write files. It reports manifest presence, `AGENTS.md`, `docs/project-context.md`, installed profiles, detected profiles, missing first-run files, and sync eligibility. For harness-level drift and report generation, run `scan-agent-install.mjs` on a specific repo.

## State Model

- `installed`: `.apt/installation.json`, `AGENTS.md`, and `docs/project-context.md` are present.
- `manifest-incomplete`: a manifest exists, but one of the expected local guidance files is missing.
- `partial-manual`: local guidance exists without a standards manifest.
- `not-installed`: no manifest, no root agent guidance, and no project context file were found.

Use `sync-agent-standards.mjs` only when a repo is sync eligible. Use `install-agent-standards.mjs` for legacy first-run installs or profile additions. Prefer `install-agent-repo.mjs` for new installs that should create `.apt/installation.json/` manifests and reports.

## Curated Rollout Profiles

Auto-detection is a starting point. Profiles such as `payments`, `lovable`, and `migration` can be valid but noisy because payment/webhook language or Lovable dependencies may appear in demos, docs, or generated ancestry. Review these before bulk applying them.

| Repo | Default action | Curated profiles |
| --- | --- | --- |
| `applied-practical-thinking` | first-run review | `cloudflare,documentation,api-review,ux-review,ai-development,knowledge-graph` |
| `apt-anet-integration-toolbox` | update run | sync existing manifest, then review `knowledge-graph` |
| `apt-coach` | first-run review | `cloudflare,documentation,api-review,ux-review,health,ai-development,knowledge-graph` |
| `apt-commerce` | first-run install | `cloudflare,documentation,api-review,ux-review,payments` |
| `apt-design-reference` | first-run install | `documentation,ux-review` |
| `apt-dream-to-reality` | first-run install | `cloudflare,documentation,api-review,ux-review,ai-development,knowledge-graph` |
| `apt-exercise` | first-run install | `cloudflare,documentation,ux-review` |
| `apt-issue-system` | first-run install | `documentation,governance` |
| `apt-novel-reviewer` | first-run review | `documentation,ux-review` |
| `crt-world` | update run | sync existing manifest, then review `knowledge-graph` |

Maintain `apt-principles-agents` and `apt-principles-agents` directly. Do not blindly self-install this distribution package into either source repo.

For new harness-aware installs, start with `standard` plus the curated profiles above. Use `minimal` only for repos that need routing basics without broader governance. Use `full` only for fixtures or repositories that genuinely need every current capability.

## Knowledge Graph Rollout

Use `apt-principles-agents` as the APT-wide Graphify operator home. It owns the runbook, graph scripts, curated repo set, and graph gap reports. Use the optional `knowledge-graph` profile in this standards repo to install target-repo guidance for graph hygiene, privacy boundaries, and source-backed review.

Recommended graph participation:

| Tier | Repos | Action |
| --- | --- | --- |
| Core graph governance | `apt-principles-agents`, `apt-principles-agents`, `applied-practical-thinking` | Keep Graphify runbook/scripts in `apt-principles-agents`; add standards guidance through `apt-principles-agents`; include public-site/docs relationships. |
| High-value product graphs | `apt-anet-integration-toolbox`, `apt-anet-accept-suite-toolbox`, `apt-coach`, `apt-commerce`, `apt-dream-to-reality`, `crt-world` | Install or review `knowledge-graph` after documentation/governance basics are present. |
| Focused or periodic graphing | `apt-payment-rpc-api`, `apt-novel-reviewer`, `apt-design-reference`, `apt-issue-system` | Use graphing for audits, migrations, and drift review rather than routine change checks. |
| Needs tighter filtering | `apt-exercise` | Build a narrow staging filter before broad graph inclusion. |

Do not create a separate `apt-graphify-standards` repo unless Graphify standards become an independently released product with their own installer, fixtures, compatibility tests, and release notes. For now, keep doctrine and reports in `apt-principles-agents`, and keep installable guidance in `apt-principles-agents`.

## First-Time Install

1. Audit the workspace or target repo.
2. Choose curated profiles from the table above or `docs/PROFILE-REFERENCE.md`.
3. Dry-run:

   ```bash
node scripts/apt-assets.mjs install --target ../target-repo --profiles documentation,governance --dry-run
```

Harness-aware dry-run:

```bash
node scripts/install-agent-repo.mjs --target ../target-repo --profiles standard,documentation,governance --dry-run
```

4. Review `copied`, `skipped`, and `createdContext`.
5. Apply:

   ```bash
node scripts/apt-assets.mjs install --target ../target-repo --profiles documentation,governance
```

Harness-aware apply:

```bash
node scripts/install-agent-repo.mjs --target ../target-repo --profiles standard,documentation,governance --apply
```

6. Fill `../target-repo/docs/project-context.md` with real product, architecture, command, integration, local-standard, and risk details.
7. Review `.apt/installation.json` and run target validation.

## Update Run

1. Confirm the repo is sync eligible in the workspace audit.
2. Preview sync:

   ```bash
node scripts/apt-assets.mjs sync --target ../target-repo --dry-run
```

For harness-aware installs:

```bash
node scripts/sync-agent-repo.mjs --target ../target-repo --dry-run
```

3. Apply sync only after reviewing the dry-run output:

   ```bash
   node scripts/apt-assets.mjs sync --target ../target-repo
   ```

4. Confirm `docs/project-context.md` was preserved.
5. Run target validation and review the diff.

## Project Context Completion

Every target repo should own `docs/project-context.md`. Keep project-specific material there rather than in managed standards files.

Include:

- product purpose and target users
- architecture and package boundaries
- commands for build, lint, test, typecheck, deploy, and local development
- integrations, secrets boundaries, and production-impacting systems
- installed profiles and local exceptions
- known risks, generated-output folders, and validation gaps
- knowledge-graph participation status, useful graph queries, graph-output ignore policy, and semantic-extraction privacy boundaries when the repo uses Graphify

Update this file after meaningful architecture, deployment, API, AI, or profile changes.
