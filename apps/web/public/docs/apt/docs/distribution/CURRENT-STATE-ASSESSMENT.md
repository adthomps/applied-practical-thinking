---
title: "Current-State Assessment"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/CURRENT-STATE-ASSESSMENT.md"]
---

# Current-State Assessment

This assessment captures the repository before the agent harness migration. It is an implementation inventory, not a replacement for canonical APT doctrine in `apt-principles-agents`.

## Repository Structure

| Area | Current role |
| --- | --- |
| `apt-core/` | Installable APT summaries, review checklists, and domain standards. |
| `standards/` | Source files mapped into target `AGENTS.md`, `.claude/CLAUDE.md`, and Copilot instructions. |
| `claude/agents/` | Claude subagent role definitions for reviews, architecture, audits, and migrations. |
| `codex/skills/` | Codex skill procedures for repeatable audits, reviews, modernization, docs, testing, and migrations. |
| `github-copilot/` | Copilot repository instructions and prompt equivalents for Codex skills. |
| `profiles/` | Composable capability manifests; `apt-core` is always included by installer logic. |
| `scripts/` | Dependency-free Node.js installer, sync, detection, workspace audit, path mapping, and parity checks. |
| `templates/` | Starter manifest template for legacy `.apt/installation.json`. |
| `docs/` | Operator-facing setup, install, sync, rollout, and validation guidance. |

## Agent Inventory

| Agent | Classification | Purpose | Overlap and gaps |
| --- | --- | --- | --- |
| `ai-output-auditor` | Auditor | Checks generated output for unsupported claims. | Overlaps with readiness and principles review; no routing role. |
| `api-experience-reviewer` | Reviewer | Reviews API contracts, auth, webhooks, errors, and docs. | Strong specialist; can be routed by future `apt-router`. |
| `apt-principles-agents-reviewer` | Reviewer | Reviews APT alignment and behavior preservation. | References doctrine; does not own doctrine. |
| `apt-readiness-auditor` | Auditor | Scores repository readiness. | Useful scan input, but not lifecycle repair tooling. |
| `cloudflare-*` agents | Specialist | Review Cloudflare architecture and modernization. | Three overlapping Cloudflare roles need clearer routing. |
| `documentation-*` agents | Reviewer/Specialist | Review docs structure and normalization. | Good docs coverage; no central prompt catalog. |
| `intent-ux-reviewer` | Reviewer | Reviews UI workflows and states. | Needs future harness route from UI tasks. |
| `lovable-*` agents | Specialist | Plan generated/Lovable migrations. | Good migration coverage; advisory detection can be noisy. |
| `repo-standardizer` | Coordinator | Plans repo standardization. | Closest existing coordinator; does not model-route. |
| `service-readiness-reviewer` | Reviewer | Reviews operational readiness for integrations. | Covers payments/health but could route through security. |

Gaps: formal router, model router, verifier, cost controller, installer, scanner, repair agent, and security reviewer were not first-class canonical agents.

## Skill Inventory

Codex skills exist for AI output review, API review, APT readiness, APT review, Cloudflare modernization, Cloudflare React/Hono, docs sync, documentation normalization, knowledge graph review, Lovable migrations, refactor safety, repo standardization, test generation, and UX review.

Each skill has a same-name Copilot prompt, and `scripts/check-ai-tool-parity.mjs` currently passes. The main gap is not skill coverage; it is orchestration, model selection, token budgeting, and lifecycle management.

## Prompt Inventory

Copilot prompts fall into two groups:

- same-name skill equivalents, such as `api-review.prompt.md` and `docs-sync.prompt.md`
- general review aliases, such as `review-api.prompt.md`, `review-diff.prompt.md`, `repo-standardize.prompt.md`, and `update-docs.prompt.md`

Consolidation opportunity: keep aliases for usability, but make the same-name skill prompts canonical for cross-tool parity.

## Script Inventory

| Script | Purpose |
| --- | --- |
| `install-agent-standards.mjs` | Installs selected profiles and writes legacy `.apt/installation.json`. |
| `sync-agent-standards.mjs` | Syncs only legacy managed files and preserves project context. |
| `detect-profiles.mjs` | Reads target repo signals and recommends profiles. |
| `audit-workspace-agent-standards.mjs` | Read-only multi-repo install status and profile detection audit. |
| `check-ai-tool-parity.mjs` | Validates Codex skill to Copilot prompt parity. |
| `path-mapping.mjs` | Maps source paths to target tool-native paths. |

Gaps: model detection, model-routing validation, new `.apt/installation.json` manifests, scan reports, repair plans, backup-aware repair, and harness sync reports.

## Governance Inventory

Existing governance centers on dry-run install, force-gated overwrites, managed-file sync, project-context preservation, profile composition, parity checks, post-operation validation, and release review. Missing governance areas are model routing, token budgets, verification gates, security review, repair approval, and human approval for material execution.
