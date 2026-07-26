---
title: "Token Budgeting"
kind: "routing"
domain: "ai"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/routing/token-budgeting.md"]
---

# Token Budgeting

## Budget Classes

| Class | Recommended use |
| --- | --- |
| `tiny` | classify request, select skill, summarize one file. |
| `small` | inspect a focused diff, write task packet, validate manifest. |
| `medium` | review a feature area, update docs, generate focused tests. |
| `large` | architecture review, migration plan, scan report, multi-surface repair. |

## Context Loading Rules

- Load project context before architecture, install, or repair decisions.
- Load only relevant context packs.
- Prefer catalogs over reading every prompt or skill.
- Summarize inventories once and reuse the summary.
- Do not include long doctrine excerpts from `apt-principles-agents`; link or cite the relevant source.

## Escalation Control

Escalate only when local or mid-tier models lack sufficient capability, context, or confidence. Record the escalation reason in the task packet.
