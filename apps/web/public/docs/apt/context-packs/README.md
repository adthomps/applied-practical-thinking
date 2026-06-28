---
title: APT Context Packs
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "context-pack"
domain: "ai"
source_paths: ["apt-principles/context-packs/README.md"]
---

# APT Context Packs

Context packs are curated source maps for agents and humans applying APT doctrine to another repository. They are not generated caches, compressed summaries, or replacements for the canonical docs. Each pack tells a reviewer which doctrine, standards, examples, prompts, checklists, and references to load for a specific repo type or workstream.

Use these packs for discovery, planning, summarization, repo alignment, and cross-repo comparison. They help agents avoid reading unrelated material while still staying anchored to the source of truth.

Do not use a pack alone for security, compliance, payment handling, authentication, final validation, or exact code edits. In those cases, agents must read the exact source files named by the pack and the target repository files being changed or reviewed.

Tools such as Headroom may compress these packs for navigation or planning. Compression is optional support only. A compressed view can guide what to inspect next, but it cannot prove APT compliance or replace final source verification.

## Pack Index

| Pack | Use For | Exact Source Reads Required Before |
|------|---------|------------------------------------|
| [APT Core Pack](apt-core-pack.md) | Any APT adoption or alignment task | final compliance claim, release recommendation |
| [APT UI Pack](apt-ui-pack.md) | React/Vite UI apps, public sites, design systems | UI edits, design review, public showcase approval |
| [APT API Pack](apt-api-pack.md) | APIs, gateways, contracts, integrations | route edits, schema edits, payment or auth behavior |
| [APT Agent Pack](apt-agent-pack.md) | agent instructions, prompts, harnesses, AI readiness | tool-native instruction changes, managed agent install recommendations |
| [APT Docs Pack](apt-docs-pack.md) | docs sites, knowledge systems, repo documentation | canonical doc edits, public docs release |
| [APT Cloudflare Pack](apt-cloudflare-pack.md) | Cloudflare Workers, Pages, Hono, edge services | deployment, auth, secrets, observability changes |
| [APT Security Pack](apt-security-pack.md) | auth, trust boundaries, sensitive data, abuse controls | security signoff, compliance claims, high-risk remediation |

## Agent Use

Agents should cite the pack used, then cite the exact source files checked. A pack is enough to start a review, but it is not enough to finish one. If the target work touches production systems, user data, payments, authentication, authorization, security controls, or public claims, the final response must name the exact files and checklist evidence used.

For repo alignment work, start with the core pack, classify the repo type, add the domain pack, then run the matching checklist. If the repo spans multiple domains, combine packs and identify which checks are mandatory versus recommended.

## Related Documents

- [APT Principles Framework](../principles/framework.md)
- [APT AI & Agent Framework](../principles/ai/README.md)
- [APT Project Adoption Checklist](../checklists/project-adoption-checklist.md)
- [APT Repo Alignment Checklist](../checklists/repo-alignment-checklist.md)
- [APT Application Model](../references/apt-application-model.json)
