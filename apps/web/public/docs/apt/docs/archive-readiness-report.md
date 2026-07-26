---
title: Archive readiness report
kind: report
domain: governance
status: active
owner: APT maintainers
last_updated: 2026-06-28
source_paths: ["apt-principles-agents/docs/migration/source-ledger.json", "apt-principles-agents/references/workspace-consumers.json", "apt-principles-agents/scripts/apt-assets.mjs"]
---

# Archive readiness report

## Decision

**Approved and completed.** `apt-principles-agents` is the private canonical
source for doctrine and distribution. Public users consume generated
[`/docs/apt/`](https://appliedpracticalthinking.com/docs/apt/README.md) pages.

- `apt-agent-standards` is archived on GitHub at final commit
  `7960ac67e3d0ae3e331daf2b7cee2bdf65f9c4a6`.
- `apt-principles` is a frozen, unarchived public mirror at final commit
  `bab2c0bc60f70a5ef21ede1421fae298778dd56e`.
- Both source repositories carry annotated tag `archive-final-2026-06-28`.
- Canonical release tag: `v1.0.0`.

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

The externally owned files remain in `apt-design-reference`, including its
eight unique guides. Working-tree captures, hashes, patches, and source
provenance remain under `docs/archive/source-provenance/`.

## Canonical result

- Full source-backed Thinking, Design, Architecture, system, security/risk,
  AI, and Execution doctrine.
- First-class standards, checklists, governance, references, context packs,
  prompts, templates, examples, diagrams, Product Hubs, skills, agents, and
  platform adapters.
- Twenty-two constrained manifests and one deterministic Node lifecycle
  implementation behind Bash and PowerShell wrappers.
- `.apt/installation.json` schema version 1 with current source provenance,
  managed mappings, installed hashes, local-context path, and last operation.
- Strict manifest, installation-record, traversal, cycle, catalog, metadata,
  boilerplate, stablecoin-label, Product Hub, and platform-link validation.
- A complete hypothetical ExamplePay Product Hub with executable examples,
  lifecycle, security boundaries, reconciliation, migration, support, demo,
  diagrams, and launch evidence.
- Version `1.0.0`, branch `main`, and no active legacy profile or installer
  interface.

## Consumer evidence

The canonical registry audit reports all nine consumers current, with matching
manifests and platforms and no legacy manifests.

| Consumer | Final cutover commit | Managed mappings |
|---|---|---:|
| applied-practical-thinking | `e128f5fd177252ba79a3aa2779c948ec79338837` | 583 |
| apt-anet-integration-toolbox | `ef87362c739cf5dde7b07971805835a70ed3e7bd` | 734 |
| apt-coach | `9c72e9904f9c78db89a5cd4c64c344f03d18b327` | 530 |
| apt-health | `84611f371a579fb57515a1ee59c635c14123d189` | 530 |
| apt-commerce | `0b0a634ed207f142abb64e1a8068dafbb7680055` | 587 |
| apt-dream-to-reality | `d5aeb1a422f775b170875431d008b2cad6f8e656` | 467 |
| apt-novel-reviewer | `92756f363fc93b8ab4f3fd89edd798906f63e041` | 393 |
| apt-design-reference | `a6580e095b0da1d7be9839a3c29c4f39a80f6f0d` | 291 |
| crt-world | `115aad28f2c668bb7825532754c7f8f6895b6898` | 395 |

Tracked `.apt-backups/` files were removed in forward commits and backup
directories are ignored. `apt-commerce` is a private Git repository on `main`.
The toolbox AcceptJS work and the coach local Claude setting were preserved
outside the cutover scope.

## Validation evidence

- Canonical `npm run check`: passed; 926 active files, 142 skills, 75 agents,
  and 505/505 ledger entries.
- Canonical GitHub Actions: [Ubuntu and Windows run
  28343173444](https://github.com/adthomps/apt-principles-agents/actions/runs/28343173444)
  passed at `9d310885d6f2691167d5a56eddb08e46ed2499d9`.
- Lifecycle tests cover install, sync, repair, uninstall, collision backups,
  invalid manifests, malformed installation records, drift, stale provenance,
  unsafe paths, and failure exit codes.
- Public site: 47/47 tests passed; lint, validation, and production build
  passed; 775 active public APT artifacts generated with the approved ten-field
  schema and public `/docs/apt/` links.
- Toolbox: AI readiness 4/4; lint, typecheck, design alignment, 26 tests, web
  build, and Worker dry-run build passed.
- Registry audit: all nine installations current; zero mismatched manifests,
  platform sets, or legacy manifests.
- Public archive-notice URL returned HTTP 200.

## Archive gate

- [x] Complete 505-file source classification.
- [x] Canonical doctrine and lifecycle capabilities active.
- [x] Consumers use current `.apt/installation.json` records.
- [x] Zero downstream `.agent-standards.json` records.
- [x] Managed scans, manifests, platforms, and provenance current.
- [x] Public schema, tests, lint, validation, and build pass.
- [x] Ubuntu Bash and Windows PowerShell CI pass.
- [x] Backup artifacts removed from version control.
- [x] Source notices, final commits, tags, and GitHub states applied.
- [x] `apt-agent-standards` archived and `apt-principles` visibly frozen.

**Approval status: APPROVED AND COMPLETED.**

## Manual review

Focused reviews confirmed root navigation, beginner entry points, canonical
versus procedural ownership, API contracts, payment lifecycle and
reconciliation, stablecoin maturity/review labels, security boundaries,
cross-platform authority, and Product Hub launch navigation.

## Inspection commands

```powershell
npm run check
node scripts/apt-assets.mjs audit-workspace --workspace-root .. --check
corepack pnpm --dir ../applied-practical-thinking/apps/web test
corepack pnpm --dir ../applied-practical-thinking/apps/web lint
corepack pnpm --dir ../applied-practical-thinking/apps/web build
```
