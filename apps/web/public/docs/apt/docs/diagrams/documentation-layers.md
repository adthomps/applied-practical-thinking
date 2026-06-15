---
title: APT Documentation Layers Diagram
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# APT Documentation Layers Diagram

APT documentation is organized into three layers. Each layer serves a different audience and has a different update cadence.

## The Three Layers

```
┌─────────────────────────────────────────────────────────────────────┐
│  LAYER 1: DOCTRINE  (root *.md files)                              │
│                                                                     │
│  What APT requires. Updated rarely. Changed by deliberate decision. │
│                                                                     │
│  apt-principles.md     thinking.md          design.md              │
│  architecture.md       system-standards.md  security.md            │
│  execution.md          quality-testing.md   release-change-        │
│  operations-support.md knowledge-system.md  management.md          │
│  ai-agent-framework.md                                             │
│                                                                     │
│  Audience: everyone — developers, agents, architects, reviewers    │
│  Update trigger: framework evolution, new principle, correction     │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ referenced by
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│  LAYER 2: BUILD KIT  (subdirectory files)                          │
│                                                                     │
│  How to apply doctrine. Updated when doctrine changes.             │
│                                                                     │
│  principles/   → Quick-reference principle cards                   │
│  checklists/   → Enforcement gates (review, release, adoption)     │
│  examples/     → Concrete pattern demonstrations                   │
│  prompts/      → AI review prompts aligned to each layer           │
│  templates/    → Starter scaffolding for downstream projects       │
│  governance/   → Review processes, maturity model, scorecard       │
│  standards/    → Domain-specific enforceable rules                 │
│                                                                     │
│  Audience: practitioners applying APT in daily work                │
│  Update trigger: doctrine change, new pattern, new example         │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ consumed by
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│  LAYER 3: MACHINE-READABLE  (references/ *.json)                  │
│                                                                     │
│  Contracts for tooling, AI agents, and public-site consumers.      │
│                                                                     │
│  ai-review-bundle.json          → AI review severity framework     │
│  architecture-map.json          → System boundaries contract       │
│  design-lint-gates.json         → Design system lint rules         │
│  design-tokens.json             → Visual language tokens           │
│  knowledge-contracts.json       → Knowledge artifact shapes        │
│  metadata-versioning-contract.json → Frontmatter requirements      │
│  project-profile.schema.json    → Portfolio profile structure      │
│                                                                     │
│  Audience: scripts, AI agents, CI pipelines, public site           │
│  Update trigger: contract versioning, new field, deprecation       │
└─────────────────────────────────────────────────────────────────────┘
```

## Update Cascade Rule

When doctrine changes, the update must cascade through all layers:

```
Doctrine change (e.g. new design rule)
  │
  ├──▶ Update canonical doc (design.md)
  │
  ├──▶ Update principle card (principles/design.md)
  │
  ├──▶ Update checklist (checklists/design-review-checklist.md)
  │
  ├──▶ Update or add example (examples/ui/*.md)
  │
  ├──▶ Update prompt (prompts/design-review-prompt.md)
  │
  └──▶ Update reference if machine-readable contract changes
       (references/design-lint-gates.json)
```

Failing to cascade creates drift. The `.github/skills/principle-change-sync/SKILL.md` documents this workflow.

## Governance and Operations (separate layer)

```
┌────────────────────────────────────────────────────────────────────┐
│  GOVERNANCE & AUTOMATION  (not doctrine, not build kit)           │
│                                                                    │
│  governance/    → Maturity model, review processes, scorecards    │
│  scripts/       → Validation and analysis automation              │
│  reports/       → Generated outputs from validation scripts        │
│  docs/          → Project-local documentation (ADRs, diagrams)    │
│  .github/       → Agent definitions, instructions, CI             │
│  .claude/       → Claude Code project configuration               │
└────────────────────────────────────────────────────────────────────┘
```

## Public vs. Internal Documentation

```
┌──────────────────────────────┐   ┌──────────────────────────────┐
│  apt-principles (this repo)  │   │  applied-practical-thinking   │
│                              │   │  (public website)             │
│  • Full doctrine             │   │  • Public-facing principles   │
│  • Build kit                 │   │  • Portfolio showcase         │
│  • Governance                │◀──│  • Learning surface           │
│  • Machine-readable refs     │   │                               │
│                              │   │  Sync via:                    │
│  SOURCE OF TRUTH             │   │  examples/workflows/          │
└──────────────────────────────┘   │  apt-principles-public-       │
                                   │  sync-flow.md                 │
                                   └──────────────────────────────┘

   Downstream project repos
   ┌────────────────────────┐
   │  apt-coach             │
   │  apt-dream-to-reality  │  All adopt from apt-principles
   │  apt-novel-reviewer    │  via: copy / sync / apply / showcase
   │  crt-world             │
   └────────────────────────┘
```

## Related Docs

- `README.md` — folder contract for every directory
- `apt-principles.md` — required documentation model (five artifact types)
- `knowledge-system.md` — how knowledge artifacts are kept current
- `docs/diagrams/file-relationships.md` — artifact chain per principle
