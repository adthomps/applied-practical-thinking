---
title: "Model Routing"
kind: "routing"
domain: "ai"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/routing/model-routing.md"]
---

# Model Routing

APT model routing selects the smallest sufficient model tier for the task packet.

## Tiers

| Tier | Use for | Avoid for |
| --- | --- | --- |
| Tier 1 local | classification, summaries, formatting, inventories, checklists, task packets | final approvals, complex architecture, security decisions |
| Tier 2 mid-tier | implementation, docs, tests, API generation, moderate refactors | high-risk security or major migration final review |
| Tier 3 frontier | architecture, security, complex debugging, migrations, final reviews | simple formatting or routine summaries |

## Routing Rule

```text
Local router
  -> Can answer locally?
    -> yes: local execution plus verifier
    -> no: mid-tier implementation
      -> frontier review only when risk or complexity requires it
```

## Required Decision Fields

- task type
- model tier
- candidate models
- local/cloud recommendation
- token budget
- context packs
- escalation reason
- verification agent or command

## Human Approval

Routing never replaces approval. Material changes, paid API calls, deployments, destructive repair, and overwrites require explicit human approval.
