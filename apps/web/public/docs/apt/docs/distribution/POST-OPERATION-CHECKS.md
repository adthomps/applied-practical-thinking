---
title: "Post-Operation Checks"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/POST-OPERATION-CHECKS.md"]
---

# Post-Operation Checks

Run these checks after installing, adding profiles, or syncing standards into a target repo.

## After Install

From this standards repo, confirm the target install plan is repeatable:

```bash
node scripts/apt-assets.mjs install --target ../target-repo --profiles documentation --dry-run
node scripts/install-agent-repo.mjs --target ../target-repo --profiles standard --dry-run
node scripts/apt-assets.mjs sync --target ../target-repo --dry-run
node scripts/validate-model-routing.mjs
```

From the target repo, inspect generated files:

```bash
git status --short
```

Review these files first:

```text
.apt/installation.json
.apt/installation.json/manifest.json
.apt/installation.json/local-overrides.md
docs/project-context.md
AGENTS.md
.claude/CLAUDE.md
.codex/skills/
.github/copilot-instructions.md
.github/instructions/
.github/prompts/
```

Confirm:

- `.apt/installation.json` lists the intended profiles.
- `.apt/installation.json/manifest.json` exists for harness installs and lists expected profiles, routing version, reports, local context, and local overrides.
- `managedFiles` contains target-native paths, such as `.codex/skills/...` and `.github/instructions/...`.
- `managedFileSources` maps each managed target file back to a source file in this standards repo.
- `docs/project-context.md` is filled with project-specific content, not only template text.
- Existing target files were not overwritten unintentionally.

## After Adding Profiles

From this standards repo:

```bash
node scripts/apt-assets.mjs install --target ../target-repo --profiles governance,training --dry-run
node scripts/apt-assets.mjs install --target ../target-repo --profiles governance,training
```

From the target repo:

```bash
git status --short
```

Check that `.apt/installation.json` preserved existing profiles and managed files, then added the new profile files.

## After Sync

From this standards repo:

```bash
node scripts/apt-assets.mjs sync --target ../target-repo --dry-run
node scripts/sync-agent-repo.mjs --target ../target-repo --dry-run
node scripts/apt-assets.mjs sync --target ../target-repo
```

From the target repo:

```bash
git status --short
```

Confirm:

- Only files listed in `.apt/installation.json` changed.
- `docs/project-context.md` did not change unless you edited it manually.
- `.apt/installation.json/local-overrides.md` did not change unless you edited it manually.
- No unmanaged project docs, source files, or local AI settings were touched.

## After Scan Or Repair

From this standards repo:

```bash
node scripts/scan-agent-install.mjs --target ../target-repo --json
node scripts/repair-agent-install.mjs --target ../target-repo --report-only
```

Confirm:

- Scan reports missing, drifted, missing-source, and unmanaged AI tool files.
- Repair preview does not write unless `--apply` is passed.
- Drifted files are skipped unless `--force` is passed.
- Backups are created when `--backup` is used with apply.

## Generic Target Repo Validation Commands

Run commands that exist in the target repo. Common examples:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

For pnpm repos:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

For workspaces or monorepos, prefer targeted checks when a full run is expensive:

```bash
pnpm --filter <package-name> lint
pnpm --filter <package-name> typecheck
pnpm --filter <package-name> test
pnpm --filter <package-name> build
```

## AI Tool Sanity Checks

Check that the target-native files exist:

```text
AGENTS.md
.claude/CLAUDE.md
.claude/agents/
.codex/skills/
.github/copilot-instructions.md
.github/instructions/
.github/prompts/
```

Open one file from each AI tool family and confirm it contains useful project guidance:

- `AGENTS.md`
- `.claude/CLAUDE.md`
- `.claude/agents/<agent>.md`
- `.codex/skills/<skill>/SKILL.md`
- `.github/copilot-instructions.md`
- `.github/instructions/<name>.instructions.md`

For Cloudflare modernization, confirm these files exist before using the modernization prompt:

```text
.codex/skills/cloudflare-modernization/SKILL.md
.codex/skills/cloudflare-react-hono/SKILL.md
.claude/agents/cloudflare-architect.md
.claude/agents/cloudflare-modernization-architect.md
.claude/agents/cloudflare-react-hono-architect.md
.github/instructions/cloudflare.instructions.md
.github/prompts/cloudflare-modernization.prompt.md
.github/prompts/cloudflare-react-hono.prompt.md
```

If any are missing, install or add the `cloudflare` profile. If only `.codex/skills/cloudflare-modernization/SKILL.md` is present, add the `cloudflare` profile as well as `modernization`.

If Copilot Chat says it cannot find an installed skill, use the `.github/prompts/*.prompt.md` file instead of the `.codex/skills` file:

```text
Read and follow .github/prompts/cloudflare-modernization.prompt.md and .github/prompts/cloudflare-react-hono.prompt.md.
If you cannot auto-load them as prompts, open those files directly and follow their instructions.
```

For every Codex skill, there should be a same-name Copilot prompt:

```text
.codex/skills/<skill-name>/SKILL.md
.github/prompts/<skill-name>.prompt.md
```

From the standards repo, validate that pairing with:

```bash
node scripts/check-ai-tool-parity.mjs
node scripts/validate-model-routing.mjs
```

## Documentation Checks

After install or sync, review docs for drift:

```text
README.md
docs/project-context.md
docs/
```

Check that `docs/project-context.md` includes:

- Purpose.
- Architecture.
- Installed profiles.
- Commands.
- Integrations.
- Local standards.
- Known risks.

For this standards repo, also check that public guidance links and folders are usable:

```text
context-packs/README.md
checklists/
showcases/
prompts/
```

Confirm:

- new folders contain useful files, not empty placeholders.
- README links point to existing files.
- `context-packs/` explains optional compression without making Headroom mandatory.
- `prompts/` is clearly separate from `github-copilot/prompts/`.
- checklist-backed evidence is required before claiming APT compliance.

## Payment Or API Repo Checks

For repos with payment or API profiles, additionally inspect:

- Webhook validation.
- Error response shape.
- Secret handling.
- Sandbox versus production configuration.
- Idempotency and retry behavior.
- Logs for sensitive data exposure.

Run targeted API tests when available:

```bash
npm test -- --runInBand
pnpm --filter <api-package> test
```

## Cloudflare Repo Checks

For repos with the `cloudflare` profile, inspect:

```text
wrangler.toml
apps/*/wrangler.toml
package.json
apps/*/package.json
```

Run available Cloudflare validation commands:

```bash
npm run build
npm run deploy -- --dry-run
pnpm --filter <worker-package> build
pnpm --filter <worker-package> exec wrangler deploy --dry-run
```

Do not run real deploy commands unless that is the explicit goal.

## Completion Criteria

Treat an install, profile add, or sync as complete when:

- Dry-run output has been reviewed.
- Manifest paths and source mappings are correct.
- Project context is filled in or intentionally queued for completion.
- Target repo validation commands pass or known failures are documented.
- The target repo diff contains only intended standards changes.

## Next Improvement Step

After the install or sync is verified, use the installed standards to improve the repo:

1. Run an APT readiness audit.
2. Pick one high-value issue.
3. Use the relevant installed skill, prompt, or agent.
4. Make a small change.
5. Run validation.
6. Update docs.

See `docs/USING-INSTALLED-STANDARDS.md` for concrete prompts and workflows.
