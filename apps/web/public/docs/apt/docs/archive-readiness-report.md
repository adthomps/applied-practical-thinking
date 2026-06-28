---
title: Archive readiness report
kind: report
domain: governance
status: active
owner: APT maintainers
last_updated: 2026-06-28
source_paths: ["apt-principles-agents/docs/migration/source-ledger.json", "apt-principles-agents/scripts/apt-assets.mjs"]
---

# Archive readiness report

## Decision

**Cutover implemented; source-repository archival approval is pending.**

`apt-principles-agents` now owns canonical doctrine and distribution. Do not yet tag or archive `apt-principles` or `apt-agent-standards`: the remaining acceptance evidence listed below must be green first.

## Source coverage

The migration ledger classifies all 505 source files:

| Classification | Files |
|---|---:|
| Migrated | 330 |
| Merged | 62 |
| Externally owned | 91 |
| Historical/generated | 19 |
| Historical | 1 |
| Intentionally retired | 2 |

The 91 externally owned files are the `apt-design-reference` kit. Its 83 already-preserved files remain there, and its eight unique UI-kit README guides were added there. Source working-tree captures, hashes, patches, capture bases, and final source commits are recorded under `docs/archive/source-provenance/`.

- `apt-principles` final source commit: `3056f5496411490cdfea2de7eab6f6bce4c8f35f`
- `apt-agent-standards` final source commit: `d5ab88f1ccc412f2f1a495435f9c3744fff143d2`
- `apt-principles-agents` evaluated commit: `6c9b3a3549f0945069b95b9ff53a0db1e9dcb505`

## Implemented cutover

- Full source-backed framework, Thinking, Design, Architecture, system standards, security/risk, AI, and five Execution hubs.
- First-class standards, checklists, governance, references, context packs, prompts, templates, examples, diagrams, Product Hubs, skills, agents, and platform adapters.
- Twenty-two constrained manifests covering minimal through full and custom product capabilities.
- One Node lifecycle implementation for detect, install, scan, sync, repair, uninstall, legacy migration, workspace audit, and parity, with Bash and PowerShell wrappers.
- `.apt/installation.json` as the only active installation record.
- Active metadata and provenance validation, canonical-depth and boilerplate audits, stablecoin maturity labels, Product Hub contracts, and complete source-ledger enforcement.
- One-time migration/scaffold tooling moved to `docs/archive/consolidation/`.
- Public publishing changed immediately to `id`, `title`, `kind`, `domain`, `sourcePath`, `publicPath`, `version`, `status`, `lastUpdated`, and `checksum`; no legacy aliases are emitted.

## Consumer evidence

Nine consumers have current installation records and clean managed scans:

| Consumer | Managed mappings | Scan |
|---|---:|---|
| applied-practical-thinking | 579 | current |
| apt-anet-integration-toolbox | 732 | current |
| apt-coach | 529 | current |
| apt-health | 529 | current |
| apt-commerce | 587 | current |
| apt-dream-to-reality | 464 | current |
| apt-novel-reviewer | 393 | current |
| apt-design-reference | 291 | current |
| crt-world | 395 | current |

Total: **4,499 current managed mappings**, zero changed or missing. Active downstream searches found no dependency on either old repository; remaining old names are provenance, migration/history, or artifact names nested under the new source root.

## Validation evidence

Passed:

- Repository validation: 934 active files, 142 skills, 75 agents, 505/505 ledger entries, zero warnings.
- All 22 manifest references and platform parity.
- Installer lifecycle on PowerShell: install, collision, drift-preserving sync, forced backup repair, uninstall preview, and legacy migration.
- AI readiness for representative targets; `apt-anet-integration-toolbox` scores 4/4.
- Project-profile validation for `apt-anet-integration-toolbox`.
- Public schema and doctrine-route contracts: 11/11 focused tests.
- Public lint and documentation governance.
- Public production build passed from 784 active artifacts; the final regeneration publishes 785 after adding this report.
- All nine managed-installation scans.

Pending or blocked:

- Full web tests have one existing unrelated failure: `apt-primitives-contract.test.ts` expects the `accent` button variant to contain `bg-accent`; the component and test were not changed by this cutover.
- `apt-anet-integration-toolbox` aggregate `validate:apt` reaches dependency verification but fails because pnpm rejects ignored dependency build scripts. Its cutover-specific AI validation passes.
- Bash is unavailable on this Windows host. Real Bash execution is defined in the new Ubuntu CI workflow but a completed CI run is not recorded here.
- Full local build/typecheck/test suites for every affected product repository are not yet recorded.

## Archive gate

- [x] Complete 505-file source classification.
- [x] New doctrine and operational capabilities active.
- [x] Downstream installations use `.apt/installation.json`.
- [x] No downstream `.agent-standards.json`.
- [x] Managed scans current.
- [x] Public schema, lint, and production build pass.
- [ ] Full public test suite passes.
- [ ] Linux Bash CI run passes.
- [ ] Every affected repository’s required local checks are recorded.
- [ ] Old repositories receive archival notices, final snapshot commits, tags, and disabled automation.

**Approval status: NOT APPROVED FOR ARCHIVAL.** The old repositories remain unchanged and available until the unchecked gates pass. Once they do, add archival notices pointing to `apt-principles-agents`, disable active automation, commit the final snapshots, and create final archival tags without deleting Git history.

## Manual review checklist

- [ ] Beginner can find framework, audience path, and first action from the root README.
- [ ] Documentation links distinguish canonical doctrine from procedures and adapters.
- [ ] API guidance covers contracts, errors, auth, idempotency, observability, and modernization.
- [ ] Payments guidance covers lifecycle, checkout, reconciliation, disputes, fraud, and migration.
- [ ] Stablecoin claims retain maturity and legal/compliance/risk-review labels.
- [ ] Platform adapters preserve `AGENTS.md` authority and behave consistently.
- [ ] Product Hub diagrams, demo plan, migration, troubleshooting, and launch readiness remain navigable.

## Recommended inspection commands

```powershell
node scripts/validate-repository.mjs
node scripts/apt-assets.mjs check-parity
npm test
node scripts/apt-assets.mjs audit-workspace --workspace-root ..
corepack pnpm --dir ../applied-practical-thinking/apps/web test
corepack pnpm --dir ../applied-practical-thinking/apps/web lint
corepack pnpm --dir ../applied-practical-thinking/apps/web build
```

Recommended commit message after reviewing the coordinated workspace changes:

`Initialize apt-principles-agents canonical standards repo`
