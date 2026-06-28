---
title: "Skill Catalog"
kind: "guide"
domain: "documentation"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/docs/SKILL-CATALOG.md"]
---

# Skill Catalog

## Codex Skills

| Skill | Purpose | Reuse notes |
| --- | --- | --- |
| `ai-output-review` | Audit generated output for unsupported claims. | Pair with verifier for final checks. |
| `api-review` | Review routes, schemas, auth, errors, and webhooks. | Reused by `api-review`, `payments`, and `health` profiles. |
| `apt-readiness-audit` | Score repo readiness and rollout priorities. | Useful before install, scan, or repair. |
| `apt-review` | Review APT alignment. | Use as general standards review. |
| `cloudflare-modernization` | Plan safe Cloudflare modernization. | Overlaps with Cloudflare React/Hono for runtime details. |
| `cloudflare-react-hono` | Review React, Vite, Hono, Workers, and Pages. | Use for implementation-specific Cloudflare work. |
| `docs-sync` | Sync docs with code and behavior. | Use after implementation or lifecycle changes. |
| `documentation-normalization` | Consolidate stale or duplicated docs. | Use before deleting or moving docs. |
| `knowledge-graph-review` | Review graph participation and graph hygiene. | Keeps graph outputs non-canonical. |
| `lovable-to-apt` | Convert Lovable-style repos to APT conventions. | Pair with migration profile. |
| `lovable-to-cloudflare` | Convert generated frontend projects toward Cloudflare. | Pair with modernization and Cloudflare profiles. |
| `refactor-safety` | Preserve behavior during refactors. | Use before large code movement. |
| `repo-standardization` | Align repo structure and agent files. | Closest existing coordinator skill. |
| `test-generator` | Add focused regression tests. | Pair with code changes and repairs. |
| `ux-review` | Review UI workflows and accessibility. | Pair with screenshots when possible. |

## New Shared Skill

`skills/token-efficiency/` defines model-agnostic token reduction, context-pack loading, and escalation controls. It is not tool-specific; agents and prompts may reference it when preparing task packets.

## Duplication Notes

Same-name Copilot prompts are intentional equivalents for Codex skills. Alias prompts such as `review-api`, `repo-standardize`, and `update-docs` should remain convenience entry points but should not replace the canonical same-name skill prompts.
