---
title: Refactor Distribution Model
kind: assessment
domain: distribution
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/distribution-model.md"]
---

# Distribution Model

## Current Distribution Base

The repository already has a managed asset lifecycle:

- `scripts/apt-assets.mjs install`: selects manifests, maps assets to `.apt/` and platform-specific targets, writes `.apt/installation.json`.
- `scan`: detects drift, missing targets, missing sources, and provenance currency.
- `sync` and `repair`: update managed files while preserving or backing up local drift.
- `uninstall`: removes managed files with drift safeguards.
- `detect`: recommends manifests from target-repo signals.
- `migrate-legacy`: maps old `.agent-standards.json` profiles to new manifests.
- `audit-workspace`: checks registered consumers.
- `installers/*.ps1` and `installers/*.sh`: wrapper UX and smoke-tested lifecycle entrypoints.

This is distribution and validation tooling, not a runtime agent platform. There is no evidenced service runtime, runtime orchestration state, or operational agent execution layer.

## Future Conceptual Commands

| Future command | Existing equivalent | Missing behavior | Inputs | Outputs | Mutates target | Validation | Rollback | Potential location |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `apt init` | `apt-assets.mjs install` | Friendlier repo bootstrap, guided manifest/platform selection. | target path, manifests, platforms. | Managed files and `.apt/installation.json`. | Yes. | Installer tests, record schema. | Backups and uninstall. | Future CLI wrapper over `apt-assets.mjs`. |
| `apt assess` | `detect`, `scan`, `audit-workspace` | Rich assessment report and risk classification. | target path or workspace. | Recommendation report. | No by default. | JSON schema for report. | N/A. | CLI or script. |
| `apt sync` | `sync` | Human-readable review summary and PR integration. | target path, installation record. | Updated managed files or preview. | Optional. | Scan after sync. | Backups and single revert. | CLI wrapper. |
| `apt validate` | `npm run check`, target validators | Unified target validation pack. | repo path, selected manifests. | Pass/fail report. | No. | Existing validators plus target-specific checks. | N/A. | Script or package later. |
| `apt knowledge build` | None complete; partial `knowledge-contracts.json`. | OKF projection generation and validation. | source paths, concept types. | OKF canonical/projection output. | Yes if committed. | OKF schema, provenance, review status. | Delete generated output or revert. | Future generator, not phase 1. |
| `apt generated-wiki update` | None. | generated wiki tooling invocation, staleness, failure-safe output. | source commit, include/exclude config. | Generated generated wiki tooling docs. | Yes if committed. | Generated metadata and safety scan. | Preserve last valid output and revert. | Future generator wrapper. |
| `apt doctor` | `scan`, `validate`, parity checks. | Cross-cutting health report: stale refs, adapter drift, generated freshness. | repo path. | Health report with actions. | No by default. | Existing checks plus new ref/adapters checks. | N/A. | CLI later. |

## Adoption Model Comparison

| Model | Strength | Weakness | Recommendation |
| --- | --- | --- | --- |
| Existing installer scripts | Already tested and cross-platform. | Lower-level UX. | Keep. |
| npm package | Easy install and versioning. | Needs public package lifecycle and semver promises. | Later, only for independent CLI/validator. |
| CLI installer | Good UX for `apt init/sync/doctor`. | Requires packaging and support. | Advanced phase after pilot. |
| GitHub Action | Good for validation and sync checks. | GitHub-specific. | Useful advanced managed model. |
| Template repository | Good for greenfield adoption. | Drifts from canonical source. | Secondary option, not default. |
| Git subtree | Preserves source in target. | Operationally heavy and conflict-prone. | Not default. |
| Git submodule | Clear source link. | Friction for downstream users. | Not default except expert teams. |
| Generated files | Tool-native and easy to consume. | Drift and authority risk. | Use with generated markers and installation records. |
| MCP server | Dynamic access and lower token load. | Runtime dependency and auth/security concerns. | Advanced managed model only. |
| Remote knowledge service | Centralized retrieval. | Vendor lock-in, privacy, availability. | Future optional, not default. |

## Recommended Default Lightweight Model

Use manifests plus existing installers:

1. Run detect or choose a manifest.
2. Preview install.
3. Apply selected canonical assets into `.apt/` plus only needed platform adapters.
4. Commit `.apt/installation.json`.
5. Use scan/sync for drift.

This preserves local ownership and avoids requiring a package, service, or submodule.

## Recommended Advanced Managed Model

For managed teams:

- Add a future CLI wrapper over `apt-assets.mjs`.
- Add a GitHub Action for `apt validate` and drift checks.
- Add optional OKF/generated wiki tooling generation with review gates.
- Add optional MCP or knowledge service only after a named consumer, security/privacy review, and generated-content controls are approved.

Premature packages, runtime orchestration, or service architecture are unnecessary while the repository remains a documentation and agent-asset repository with file-copy distribution tooling.

## Distribution Guardrails

- Preserve compatibility paths while consumers exist.
- Never install generated content as policy.
- Installation records must name source commit, source version, target path, artifact kind, and hashes.
- Sync must preserve local drift unless forced.
- Forced replacement must back up files.
- Tool adapters must remain downstream presentation, not doctrine.
