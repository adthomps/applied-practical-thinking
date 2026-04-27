---
title: APT Docs Index
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# APT Principles

This directory is the canonical doctrine and build kit for APT (Applied Practical Thinking).

APT docs are maintained in three active layers:

1. **Doctrine** - the principles, standards, and operating model.
2. **Build kit** - checklists, examples, prompts, and templates that help humans and AI agents apply the doctrine.
3. **References** - portable machine-readable contracts that projects and public sites can consume.

`apt-principles` owns the canonical APT source of truth. `applied-practical-thinking` owns the public APT portfolio, demo, learning, and showcase experience. The public APT Principles view should pull from this folder instead of maintaining a separate doctrine copy.

Historical source/reference material has been saved outside this active package. Do not use external historical files as canonical guidance unless an active doc explicitly points to them.

## Canonical Doctrine

Root Markdown files are intentional. They are the canonical human-readable APT doctrine layer, kept at the top level so humans, agents, downstream projects, and public-site importers can find the framework quickly.

- `apt-principles.md` - full framework and lifecycle map
- `thinking.md` - why the work exists
- `design.md` - what the solution communicates and how it behaves
- `architecture.md` - how the system is structured
- `system-standards.md` - consistency rules and shared contracts
- `security.md` - authentication, authorization, trust, and abuse controls
- `execution.md` - how work moves from spec to build
- `quality-testing.md` - how work is validated
- `release-change-management.md` - how work is promoted safely
- `operations-support.md` - how systems are run and supported
- `knowledge-system.md` - how learning is captured and reused
- `ai-agent-framework.md` - how AI and agents participate safely
- `apt-principles-framework-audit.md` - active consolidation audit and framework history

## Build Kit

- `checklists/` - review and release gates
- `examples/` - concrete examples of APT patterns in use
- `prompts/` - reusable AI prompts aligned to APT doctrine
- `templates/` - starting structures for new docs, examples, checklists, and prompts
- `references/` - JSON contracts for tokens, review bundles, architecture maps, knowledge schemas, metadata/versioning, and project profiles

## Folder Contract

The active structure is deliberate:

- `apt-principles/*.md` - canonical doctrine and the active framework audit.
- `checklists/` - gates for review, release, adoption, quality, and operational readiness.
- `examples/` - applied patterns and real project profile examples.
- `prompts/` - reusable AI, agent, and operator prompts.
- `references/` - machine-readable contracts for projects and public-site consumers.
- `scripts/` - portable validation tooling.
- `templates/` - authoring templates for new APT artifacts.
- `package.json` - local script entrypoint that makes this folder self-validating.

New top-level Markdown files should only be added when they become canonical framework areas or active framework governance records. Otherwise, add content to the appropriate build-kit folder.

## Project Adoption

Current and future APT projects can apply these principles in four supported modes:

- Copy: vendor selected docs, prompts, examples, checklists, templates, and references.
- Sync: periodically refresh local APT assets from this canonical folder.
- Apply: reference this folder as external doctrine while keeping project-specific implementation docs local.
- Showcase: publish a project profile that `applied-practical-thinking` can use for portfolio and case-study pages.

Recommended downstream structure:

```text
docs/apt/
  README.md
  adoption.md
  project-profile.md
  decisions/
  reports/
  references/
```

Projects should document local decisions and exceptions instead of casually forking doctrine. Reusable improvements should come back to `apt-principles`.

Real APT examples include `apt-coach`, `apt-dream-to-reality`, `apt-novel-reviewer`, `apt-payment-rpc-api`, `crt-world`, and future APT projects.

## Public Publish Sync (Applied Practical Thinking)

`applied-practical-thinking` is the public presentation layer and should publish APT principles from this canonical package.

Canonical workflow:

1. Update doctrine/build-kit/reference content in `apt-principles`.
2. In `applied-practical-thinking`, run:
   - `pnpm --dir apps/web run generate-apt-principles-public`
   - `pnpm --dir apps/web run validation-report`
   - `pnpm --dir apps/web run build-content-index`
   - `pnpm --dir apps/web run copy-content-to-public`
3. Commit regenerated public artifacts in `applied-practical-thinking`, including:
   - `apps/web/public/docs/apt/**`
   - `apps/web/data/generated/aptPrinciplesPublicManifest.ts`
4. Deploy from `applied-practical-thinking`.

If the canonical source folder is unavailable in a CI environment, the consumer repo may reuse committed generated artifacts. This is expected in single-repo deploy contexts like Cloudflare Pages. To force refresh from canonical source, provide `APT_PRINCIPLES_ROOT` or check out `apt-principles` alongside the consumer repo.

Reference runbook example: `examples/workflows/apt-principles-public-sync-flow.md`.

## Validation

Run the local doctrine/build-kit validator before expanding or reorganizing content:

```bash
npm --prefix apt-principles run validate
```

The validator checks active docs and references only and ignores `archive/`. It fails on structural drift, missing frontmatter, missing required sections, invalid JSON references, and broken active local links. It warns on shallow content, unfinished-work markers, empty headings, and missing related-artifact signals.

For portable usage in other APT projects, copy `scripts/validate-apt-principles.mjs` and adjust the configuration constants at the top of the script.

## Audit Report Scaffolding

Use the scaffold CLI to create a repo-local APT audit report from the canonical template instead of hand-creating the Markdown shell.

Run from `apt-principles`:

```bash
npm run scaffold:audit-report -- --project apt-payment-rpc-api --repo-root ../apt-payment-rpc-api
```

Optional flags:

- `--date YYYY-MM-DD` to control the audit filename and report metadata.
- `--output <path>` to write to a specific file.
- `--reviewer <label>` to set the reviewer field.
- `--review-type <label>` to change the scope label.
- `--force` to overwrite an existing scaffold target.

Expected reviewer workflow:

1. Run the scaffold command for the target repo.
2. Review the target repo against canonical APT doctrine, checklists, and references.
3. Replace the scaffold placeholders with evidence-based findings, rubric scores, remediation actions, and validation outcomes.
4. Store machine-readable outputs in the target repo under `docs/apt/reports/static/` and reference them from the Markdown report.
5. Run the target repo validation commands plus `npm run validate` in `apt-principles` before finalizing the audit.

## Project Profile Sweep

Use the workspace sweep CLI to validate every sibling repo that has a root `package.json` and write a JSON summary into each repo's local `docs/apt/reports/static/` directory.

Run from `apt-principles`:

```bash
npm run sweep:project-profiles
```

Optional flags:

- `--workspace-root <path>` to override the default sibling-workspace root.
- `--repos repo-a,repo-b` to limit the sweep to a subset of repos.
- `--date YYYY-MM-DD` to control the JSON output filename.

Output behavior:

- Repos with `docs/apt/references/project-profile.json` receive `docs/apt/reports/static/project-profile-validation-sweep-YYYY-MM-DD.json`.
- The JSON includes local repo validation, extracted audit findings/rubric data, and a workspace-level summary.
- `apt-principles` also receives a master workspace JSON at `reports/project-profile-validation-sweep-YYYY-MM-DD.json` for portfolio-level review.
- `apt-principles` also receives a compact Markdown dashboard at `reports/project-profile-validation-sweep-YYYY-MM-DD.md` with principle coverage plus findings grouped by severity and APT layer.
- Repos without a local profile file are included in the workspace summary as `skipped` and do not receive a local output file until they adopt the local APT evidence layer.

## Running Checks And Using Results

Use these documents for execution and interpretation guidance:

- `reports/README.md` for quick commands and output locations.
- `reports/VALIDATION_RESULTS_GUIDE.md` for full runbook steps, triage direction, and CI usage patterns.

Fast operator entrypoint:

```bash
npm run run-all-checks
```

This runs canonical validation, the workspace sweep, and selected sibling repo `lint`, `typecheck`, and `test` commands before printing a compact summary.

## Documentation Rules

1. Each topic has one canonical file.
2. Cross-reference other docs; do not redefine their rules.
3. Keep core docs principle-driven and artifact-oriented.
4. Put detailed reference cases in `examples/`.
5. Put validation gates in `checklists/`.
6. Put reusable AI instructions in `prompts/`.
7. Put portable machine-readable contracts in `references/`.
8. Keep `package.json` at the root so validation remains portable.
9. Keep historical exports outside the active package unless they are intentionally reintroduced as canonical or reference material.

## What Good Looks Like

A good APT doc:

- has clear scope
- defines standards and required artifacts
- explains when to use and when not to use
- includes tradeoffs and failure modes
- links to related examples, checklists, and prompts

## Historical Material Policy

Older one-shots, generated guides, Lovable themes, Copilot prompts, and source references were useful during consolidation, but they are no longer part of the active package.

Historical material may be harvested again later, but active guidance must live in the canonical doctrine files, build-kit folders, or references folder.

`apt-principles-framework-audit.md` stays top-level while the framework is still being consolidated. When the framework stabilizes, it may move to a future `reports/` pattern or external historical export with a validator update.
