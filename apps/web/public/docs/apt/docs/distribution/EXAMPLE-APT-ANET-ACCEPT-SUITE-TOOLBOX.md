---
title: "Example: apt-anet-accept-suite-toolbox"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/EXAMPLE-APT-ANET-ACCEPT-SUITE-TOOLBOX.md"]
---

# Example: apt-anet-accept-suite-toolbox

This example shows how to operate `apt-principles-agents` against:

```text
C:\Users\sanch\Documents\Github\Applied Practical Thinking\apt-anet-accept-suite-toolbox
```

Run these commands from this standards repo:

```text
C:\Users\sanch\Documents\Github\Applied Practical Thinking\apt-principles-agents
```

## Target Repo Signals

The toolbox repo is a pnpm monorepo for Authorize.net Accept Suite and Unified Checkout reference tooling.

Observed signals:

- `apps/web`: React and Vite frontend.
- `apps/worker`: Cloudflare Worker API using Hono.
- `apps/worker/wrangler.toml`: Cloudflare Worker configuration.
- `docs/reference/authorize-net`: Authorize.net and Unified Checkout reference docs.
- Worker route files for payment flows, payment status, webhooks, Accept Hosted, AcceptJS, AcceptUI, and customer profiles.
- Payment and merchant terminology throughout docs and scripts.

## Recommended Profiles

Use this curated profile set for the first install:

```text
cloudflare,documentation,api-review,ux-review,payments,governance,training
```

Why:

- `cloudflare`: Pages, Workers, Hono, D1, KV, Wrangler, React, and Vite guidance.
- `documentation`: large reference docs and operating docs need governance.
- `api-review`: Worker routes and payment integration endpoints need API contract review.
- `ux-review`: frontend pages and payment/demo workflows need intent UX review.
- `payments`: Authorize.net, merchant, webhook, Visa Acceptance, and payment flow guidance.
- `governance`: readiness, AI-output audit, and review discipline.
- `training`: focused test generation and standards adoption support.

Auto-detection should also recommend:

```text
ai-development,api-review,cloudflare,documentation,payments,ux-review
```

`governance` and `training` are intentionally added as rollout profiles even when auto-detection does not require them.

## Step 1: Detect Profiles

```bash
node scripts/detect-profiles.mjs --target "C:\Users\sanch\Documents\Github\Applied Practical Thinking\apt-anet-accept-suite-toolbox" --json
```

Expected profile recommendations:

```json
[
  "ai-development",
  "api-review",
  "cloudflare",
  "documentation",
  "payments",
  "ux-review"
]
```

## Step 2: Dry-Run The Curated Install

```bash
node scripts/apt-assets.mjs install --target "C:\Users\sanch\Documents\Github\Applied Practical Thinking\apt-anet-accept-suite-toolbox" --profiles cloudflare,documentation,api-review,ux-review,payments,governance,training --dry-run
```

Review the JSON output:

- `profiles` should include `apt-core` plus the selected profiles.
- `copied` lists files that would be managed by standards sync.
- `skipped` should be reviewed before applying.
- `createdContext` should be `true` if `docs/project-context.md` does not exist yet.

## Step 3: Apply The Install

Only run this after reviewing the dry-run output.

```bash
node scripts/apt-assets.mjs install --target "C:\Users\sanch\Documents\Github\Applied Practical Thinking\apt-anet-accept-suite-toolbox" --profiles cloudflare,documentation,api-review,ux-review,payments,governance,training
```

This writes:

```text
.apt/installation.json
docs/project-context.md
apt-core/
AGENTS.md
.claude/CLAUDE.md
.claude/agents/
.codex/skills/
.github/copilot-instructions.md
.github/instructions/
.github/prompts/
```

Existing files are not overwritten unless `--force` is passed.

## Step 4: Fill In Project Context

Edit the target repo's:

```text
docs/project-context.md
```

Recommended content for this repo:

- Purpose: Authorize.net Accept Suite and Unified Checkout reference tooling.
- Architecture: pnpm monorepo with React/Vite web app and Hono Cloudflare Worker API.
- Apps: `apps/web`, `apps/worker`.
- Packages: `packages/config`, `packages/ui`, `packages/utils`.
- Data/infrastructure: Cloudflare Pages, Workers, D1, KV, Wrangler.
- Integrations: Authorize.net, Accept Hosted, AcceptJS, AcceptUI, Unified Checkout, Visa webhook/payment status flows.
- Commands: root `pnpm` scripts and smoke-test scripts.
- Risks: payment data handling, webhook validation, sandbox vs production secrets, D1/KV binding drift, reference-doc freshness.

## Step 5: Review Managed Files

Open the target repo's:

```text
.apt/installation.json
```

Confirm:

- `profiles` include the expected set.
- `managedFiles` includes only standards-owned files.
- `localContext` is `docs/project-context.md`.
- No project-specific docs were added to `managedFiles`.

## Step 6: Validate The Target Repo

From the target repo:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Useful targeted commands from the target root:

```bash
pnpm --filter @apt-anet-accept-suite/web run check:design
pnpm --filter @apt-anet-accept-suite/worker test
pnpm --filter @apt-anet-accept-suite/worker build
```

Run smoke scripts only when the required local environment and secrets are configured.

Also inspect the target repo diff:

```bash
git status --short
```

Expected standards files include:

```text
.apt/installation.json
AGENTS.md
.claude/CLAUDE.md
.claude/agents/
.codex/skills/
.github/copilot-instructions.md
.github/instructions/
.github/prompts/
docs/project-context.md
apt-core/
```

## Step 7: Sync Later Updates

When this standards repo changes, preview sync first:

```bash
node scripts/apt-assets.mjs sync --target "C:\Users\sanch\Documents\Github\Applied Practical Thinking\apt-anet-accept-suite-toolbox" --dry-run
```

Then apply:

```bash
node scripts/apt-assets.mjs sync --target "C:\Users\sanch\Documents\Github\Applied Practical Thinking\apt-anet-accept-suite-toolbox"
```

Sync updates only files listed in `.apt/installation.json` and preserves `docs/project-context.md`.

After sync, from the target repo:

```bash
git status --short
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

For a focused worker-only check:

```bash
pnpm --filter @apt-anet-accept-suite/worker test
pnpm --filter @apt-anet-accept-suite/worker build
```

Do not run production deploy commands unless deployment is the explicit goal.

## Step 8: Add Optional AI-Development Profile

If the target repo should receive explicit AI-development standards in addition to the curated rollout set:

```bash
node scripts/apt-assets.mjs install --target "C:\Users\sanch\Documents\Github\Applied Practical Thinking\apt-anet-accept-suite-toolbox" --profiles ai-development --dry-run
node scripts/apt-assets.mjs install --target "C:\Users\sanch\Documents\Github\Applied Practical Thinking\apt-anet-accept-suite-toolbox" --profiles ai-development
```

The installer preserves existing manifest profiles and managed files, then adds newly copied managed files from the added profile.

## Step 9: Use The Installed Standards To Improve The Toolbox Repo

After install and validation, use the installed files to audit and modernize the repo.

### Start With Readiness

From the toolbox repo, ask the AI tool:

```text
Mode: Chat or Review mode.

Read and follow .codex/skills/apt-readiness-audit/SKILL.md.
If it is not auto-discovered as a skill, open the file directly and follow its process.
Read docs/project-context.md, AGENTS.md, README.md, package.json, apps/web, apps/worker, docs/reference, and apps/worker/wrangler.toml.
Score APT alignment, architecture, documentation, UX, API, testing, Cloudflare readiness, and maintainability.
Return findings, evidence, risks, and a prioritized improvement backlog. Do not edit files yet.
```

### Review Payment API Safety

```text
Mode: Review mode first. Switch to Agent/Edit mode only after choosing a specific fix.

Read and follow .codex/skills/api-review/SKILL.md.
If using Copilot Chat, read and follow .github/prompts/api-review.prompt.md.
If they are not auto-discovered, open those files directly and follow their guidance.
Review apps/worker/src/routes for Authorize.net, Accept Hosted, AcceptJS, AcceptUI, customer profile, payment status, and webhook flows.
Focus on validation, error shape, idempotency, secret handling, webhook verification, logging, and docs drift.
Return findings first with file references. Do not edit files yet.
```

### Modernize Cloudflare Carefully

```text
Mode: Chat mode for the modernization plan. Agent/Edit mode only for one approved stage.

If using Copilot Chat, read and follow .github/prompts/cloudflare-modernization.prompt.md and .github/prompts/cloudflare-react-hono.prompt.md.
If using Codex, read and follow .codex/skills/cloudflare-modernization/SKILL.md and .codex/skills/cloudflare-react-hono/SKILL.md.
If using Claude Code, use .claude/agents/cloudflare-modernization-architect.md and .claude/agents/cloudflare-react-hono-architect.md.
If they are not auto-discovered, open those files directly and follow their guidance.
Inspect apps/worker/wrangler.toml, apps/worker/src, apps/web, package scripts, D1/KV bindings, and deploy docs.
Recommend a staged Cloudflare modernization plan that preserves behavior.
Do not add D1, KV, R2, queues, or other services unless the current behavior justifies them.
```

### Sync Documentation

```text
Mode: Agent/Edit mode after the stale docs are identified.

Read and follow .codex/skills/docs-sync/SKILL.md.
If using Copilot Chat, read and follow .github/prompts/docs-sync.prompt.md.
If they are not auto-discovered, open those files directly and follow their guidance.
Compare README.md, README-QuickCommands.md, docs/project-context.md, docs/reference/authorize-net, apps/worker/README.md, apps/worker/README-SECRETS.md, package scripts, and wrangler config.
Update only stale docs that can be verified from code or config.
```

### Generate Focused Tests

```text
Mode: Agent/Edit mode.

Read and follow .codex/skills/test-generator/SKILL.md.
If using Copilot Chat, read and follow .github/prompts/test-generator.prompt.md.
If they are not auto-discovered, open those files directly and follow their guidance.
Add focused tests for the highest-risk payment or webhook behavior identified by the API review.
Follow the existing Vitest patterns in apps/worker/tests.
Run pnpm --filter @apt-anet-accept-suite/worker test.
```

### Validate Each Improvement

After each small change, run:

```bash
git status --short
pnpm --filter @apt-anet-accept-suite/worker test
pnpm --filter @apt-anet-accept-suite/worker build
pnpm typecheck
```

Run broader checks before considering the improvement complete:

```bash
pnpm lint
pnpm test
pnpm build
```

## First Review Order

After installation, review in this order:

1. `.apt/installation.json`
2. `docs/project-context.md`
3. `AGENTS.md`
4. `.claude/CLAUDE.md`
5. `.codex/skills/api-review/SKILL.md`
6. `.codex/skills/cloudflare-react-hono/SKILL.md`
7. `.codex/skills/apt-readiness-audit/SKILL.md`
8. `.github/instructions/api.instructions.md`
9. `.github/instructions/cloudflare.instructions.md`
10. `.github/prompts/cloudflare-modernization.prompt.md`
11. `.github/prompts/cloudflare-react-hono.prompt.md`
12. `.github/prompts/api-review.prompt.md`
13. `.github/prompts/docs-sync.prompt.md`
14. `.github/prompts/test-generator.prompt.md`

## Recovery Notes

If the install is broader than intended:

1. Use the target repo's Git diff to inspect generated files.
2. Remove files that should not be kept.
3. Edit `.apt/installation.json` so `managedFiles` only lists files that should sync.
4. Run sync with `--dry-run` to verify the managed set.

## Command Summary

From this standards repo:

```bash
node scripts/detect-profiles.mjs --target "C:\Users\sanch\Documents\Github\Applied Practical Thinking\apt-anet-accept-suite-toolbox" --json
node scripts/apt-assets.mjs install --target "C:\Users\sanch\Documents\Github\Applied Practical Thinking\apt-anet-accept-suite-toolbox" --profiles cloudflare,documentation,api-review,ux-review,payments,governance,training --dry-run
node scripts/apt-assets.mjs install --target "C:\Users\sanch\Documents\Github\Applied Practical Thinking\apt-anet-accept-suite-toolbox" --profiles cloudflare,documentation,api-review,ux-review,payments,governance,training
node scripts/apt-assets.mjs sync --target "C:\Users\sanch\Documents\Github\Applied Practical Thinking\apt-anet-accept-suite-toolbox" --dry-run
```

From the toolbox repo:

```bash
git status --short
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @apt-anet-accept-suite/web run check:design
pnpm --filter @apt-anet-accept-suite/worker test
pnpm --filter @apt-anet-accept-suite/worker build
```
