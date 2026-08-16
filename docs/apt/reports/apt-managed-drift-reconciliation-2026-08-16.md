---
title: Applied Practical Thinking Managed APT Drift Reconciliation
version: v1
last_updated: 2026-08-16
owner: APT
status: complete
audience: internal
visibility: internal
source: manual
review_type: managed-asset-drift-reconciliation
canonical_source: ../../../../apt-principles-agents
---

# Applied Practical Thinking Managed APT Drift Reconciliation

## Outcome

The apparent 98-file local-drift problem reduces to 48 canonical-source decisions. Forty-seven downstream source versions are byte-for-byte historical blobs from `apt-principles-agents`; they contain no unique local content and are candidates for reviewed replacement. The remaining file, `references/workspace-consumers.json`, contains a mixed registry change that must be reconciled in the canonical repository before replacement.

No managed asset was synced, repaired, overwritten, archived, or deleted during this stage.

## Scope And Method

This review used read-only operations from `apt-principles-agents`:

1. `npm run audit:workspace`
2. `node scripts/apt-assets.mjs scan --target ../applied-practical-thinking`
3. `node scripts/apt-assets.mjs sync --target ../applied-practical-thinking`
4. `.apt/installation.json` target-to-source mapping
5. SHA-256 checks across repeated target surfaces
6. Git blob comparison against all canonical repository history
7. Focused source-to-target diffs for doctrine, skills, prompts, schemas, and registry data

The sync command was run without `--apply`; it was a preview only.

## Counts

| Measure | Count | Interpretation |
|---|---:|---|
| Current managed targets | 490 | Target content matches current canonical content. |
| Drifted managed targets | 98 | Source and target differ from the installation record and require review. |
| Safe preview updates | 7 | The sync preview can update these without overwriting local drift. |
| Unique canonical sources behind drift | 48 | The actual number of source-level decisions. |
| Historical canonical matches | 47 | Downstream content exactly matches a prior canonical Git blob. |
| Unmatched downstream sources | 1 | `references/workspace-consumers.json`. |
| Multi-surface source groups | 17 | Sixteen skills copied to four surfaces and one prompt copied to three. |
| Divergent copies within a multi-surface group | 0 | All copies of each downstream source are byte-identical. |

## Drift By Canonical Family

| Family | Unique sources | Target copies |
|---|---:|---:|
| Agents | 2 | 2 |
| Checklists | 2 | 2 |
| Context packs | 1 | 1 |
| Governance | 1 | 1 |
| Principles | 22 | 22 |
| Prompts | 1 | 3 |
| References | 2 | 2 |
| Skills | 16 | 64 |
| Templates | 1 | 1 |
| **Total** | **48** | **98** |

## Classification A: Historical Canonical Snapshots

The following 47 source groups exactly match content that previously existed in the canonical repository. They are stale managed snapshots, not locally authored exceptions.

### Agents, checklists, context, governance, and templates

- `agents/api/apt-api-migration-planner.md`
- `agents/api/apt-api-reviewer.md`
- `checklists/ai-agent-review-checklist.md`
- `checklists/execution-readiness-checklist.md`
- `context-packs/apt-ui-pack.md`
- `governance/scorecard.md`
- `templates/product/README.md`

### Principles

- `principles/framework.md`
- `principles/thinking/practical-thinking.md`
- `principles/design/README.md`
- `principles/design/intent-based-design.md`
- `principles/design/ui-api-alignment.md`
- `principles/execution/README.md`
- `principles/documentation/ai-usage-examples.md`
- `principles/documentation/api-examples.md`
- `principles/documentation/audience-layered-docs.md`
- `principles/documentation/implementation-blueprints.md`
- `principles/documentation/migration-guides.md`
- `principles/documentation/product-hub-standard.md`
- `principles/api/ai-consumable-apis.md`
- `principles/api/human-consumable-apis.md`
- `principles/api/modern-api-design.md`
- `principles/security-risk/README.md`
- `principles/security-risk/data-handling.md`
- `principles/ai/README.md`
- `principles/ai/agent-design.md`
- `principles/ai/ai-safety-and-evaluation.md`
- `principles/ai/local-llm-routing.md`
- `principles/ai/skill-design.md`

### Prompt and schema

- `prompts/audits/api-audit.md`
- `references/project-profile.schema.json`

### Skills

- `skills/thinking/problem-framing/SKILL.md`
- `skills/design/intent-based-ui-design/SKILL.md`
- `skills/design/ui-api-alignment-review/SKILL.md`
- `skills/documentation/ai-example-builder/SKILL.md`
- `skills/documentation/api-example-builder/SKILL.md`
- `skills/documentation/audience-layered-docs/SKILL.md`
- `skills/documentation/implementation-blueprint-writer/SKILL.md`
- `skills/documentation/migration-guide-writer/SKILL.md`
- `skills/documentation/product-hub-builder/SKILL.md`
- `skills/api/ai-consumable-api-design/SKILL.md`
- `skills/api/intent-based-api-design/SKILL.md`
- `skills/api/modern-api-design/SKILL.md`
- `skills/security-risk/data-handling-review/SKILL.md`
- `skills/ai-agents/agent-routing/SKILL.md`
- `skills/ai-agents/local-llm-routing/SKILL.md`
- `skills/ai-agents/skill-authoring/SKILL.md`

### Required treatment

- Do not promote these downstream versions upstream; they are already preserved in canonical Git history.
- Replace them with current canonical versions only through reviewed distribution tooling.
- Treat `.apt`, `.codex`, `.claude`, `.github`, and `.gemini` targets as projections of their mapped source, not independent content decisions.
- Run target-repository validation after replacement because current canonical content is more specialized and the profile schema changes from v1 to v2-compatible.

## Classification B: Registry Conflict Requiring Upstream Reconciliation

`references/workspace-consumers.json` is the only downstream blob that does not match canonical Git history.

The downstream version:

- adds `apt-anet-hosted-toolbox` as a consumer;
- removes `apt-security-harness`;
- adds `apt-starter-project`.

Current workspace evidence shows:

- `apt-anet-hosted-toolbox` exists, is active, has an APT installation, and is currently reported as installed but unregistered;
- `apt-security-harness` exists, is active, installed, and registered;
- `apt-starter-project` is not a discovered top-level project.

Recommended canonical resolution:

1. Verify `apt-anet-hosted-toolbox` manifests, platforms, and validation commands from its repository, then add it to the canonical consumer registry.
2. Retain `apt-security-harness` in the canonical registry.
3. Do not add `apt-starter-project` unless that project is restored and independently verified.
4. Replace the downstream managed registry copy only after the canonical registry passes validation and the workspace audit recognizes the hosted toolbox.

## Representative Difference Findings

- `practical-thinking.md`, `problem-framing/SKILL.md`, and `api-audit.md` are older generic versions that predate the reviewed topic-specific guidance.
- `project-profile.schema.json` is the v1 schema and lacks the backward-compatible version-2 inventory contract.
- `principles/framework.md` contains the older lifecycle-layer model; current canonical doctrine distinguishes four pillars, lifecycle practices, and cross-cutting AI/security overlays.
- The tool-specific skill and prompt copies remain mutually consistent, so there is no evidence of adapter-specific authored content to preserve.

## Stage 2 Gate

Stage 2 may begin when all of the following are true:

1. `apt-anet-hosted-toolbox` has been verified and its canonical consumer-registry entry decided.
2. The canonical registry retains verified active consumers and excludes absent projects.
3. `apt-principles-agents` passes `npm run check` and `npm run audit:workspace` reflects the intended registry.
4. A repair preview identifies only the reviewed 48 source groups plus independently safe updates.
5. The `applied-practical-thinking` working tree is clean immediately before mutation.

The preferred Stage 2 mutation path is the repository's reviewed repair workflow with backups, followed by scan, profile migration, public-content regeneration, validation, tests, and build. Do not use a blind file copy or bulk overwrite.

## Stage 2 Resolution

Stage 2 completed the registry reconciliation and stopped before downstream mutation.

- Verified `apt-anet-hosted-toolbox` as an active Git repository with package identity, documented lint/typecheck/build/test commands, and an APT installation containing the proposed nine manifests and four platform adapters.
- Added `apt-anet-hosted-toolbox` to the canonical `apt-principles-agents/references/workspace-consumers.json` registry.
- Retained `apt-security-harness`; its active APT installation matches the canonical manifests and Codex platform entry.
- Kept `apt-starter-project` excluded because no such top-level project is present.
- `npm run check` passed in `apt-principles-agents` after the registry change.
- The workspace audit now reports no missing registered consumers and no installed-but-unregistered consumers. It still reports repository drift and the separate active-but-uninstalled `apt-anet-relaytests` condition.
- A non-applying repair preview for this repository reported the previously reviewed 98 drift targets as `skipped-local-drift` and 7 independently clean targets as `would-update`. It made no downstream changes.

The next mutation stage remains gated on committing or otherwise preserving the authored reconciliation work so that `applied-practical-thinking` is clean immediately before repair. The repair must use backups and force only the 98 reviewed drift targets; the 7 clean updates can follow normal synchronization behavior.

## Archive And Deletion Position

- Do not archive managed copies before repair; they are active installed surfaces.
- Do not preserve the 47 stale snapshots as new archive files; canonical Git already retains their exact content and provenance.
- Backup material created by the repair workflow may be removed only after the repaired installation, generated public content, and target validation are verified and the backup is recoverable through version control or the repair record.
- No deletion is authorized by this report.
