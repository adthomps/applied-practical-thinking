---
title: "Agent Catalog"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/AGENT-CATALOG.md"]
---

# Agent Catalog

## Harness Agents

| Agent | Class | Primary use |
| --- | --- | --- |
| `apt-router` | Router | Classify requests, select skills/context, and build task packets. |
| `apt-model-router` | Router | Pick local, mid-tier, or frontier model execution. |
| `apt-architect` | Specialist | Review architecture, repo structure, and migration strategy. |
| `apt-docs-reviewer` | Reviewer | Review documentation quality and information architecture. |
| `apt-ui-reviewer` | Reviewer | Review UI intent, workflow, states, and accessibility. |
| `apt-code-reviewer` | Reviewer | Review code for regressions, maintainability, and missing tests. |
| `apt-cloudflare-builder` | Specialist | Build or review Cloudflare Workers, Pages, Hono, and bindings. |
| `apt-security-reviewer` | Reviewer | Review prompt injection, secrets, permissions, and sensitive workflows. |
| `apt-cost-controller` | Auditor | Manage token budgets, context loading, and escalation control. |
| `apt-verifier` | Auditor | Validate outputs, manifests, reports, and standards compliance. |
| `apt-installer` | Utility | Install selected APT agent repository assets. |
| `apt-repo-scanner` | Utility | Detect install state, drift, missing files, and repair needs. |
| `apt-repair-agent` | Utility | Repair installations while preserving local customizations. |

## Existing Claude Agents

Claude agents remain tool-native role files in `claude/agents/`. Use the harness router to select among them:

- Cloudflare work routes to `cloudflare-architect`, `cloudflare-modernization-architect`, or `cloudflare-react-hono-architect`.
- API work routes to `api-experience-reviewer`.
- Documentation work routes to `documentation-architect` or `documentation-normalizer`.
- Generated-output review routes to `ai-output-auditor`.
- Repository adoption routes to `apt-readiness-auditor`, `apt-principles-agents-reviewer`, or `repo-standardizer`.
- UI work routes to `intent-ux-reviewer`.
- Generated/Lovable migration routes to `lovable-to-apt-architect` or `lovable-to-cloudflare-architect`.
- Payment, health, webhook, or integration readiness routes to `service-readiness-reviewer` and `apt-security-reviewer`.
