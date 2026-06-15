---
title: Repository Structure Diagram
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# Repository Structure Diagram

This diagram shows the complete folder and file structure of `apt-principles` and explains the purpose of every directory.

## Full Directory Tree

```
apt-principles/
│
│  ── ROOT DOCTRINE (canonical principle files) ──
│
├── README.md                          Navigation map and structure contract
├── AGENTS.md                          AI agent working rules for this repo
├── CONTRIBUTING.md                    Contribution guidelines
├── apt-principles.md                  Master APT framework overview
├── thinking.md                        Layer 1: Why (problem framing)
├── design.md                          Layer 2: What (behavior and UX)
├── architecture.md                    Layer 3: How (system structure)
├── system-standards.md                Layer 4: Consistency rules
├── execution.md                       Layer 5: Build process
├── quality-testing.md                 Layer 6: Validation
├── release-change-management.md       Layer 7: Promotion
├── operations-support.md              Layer 8: Run and support
├── knowledge-system.md                Layer 9: Learning
├── ai-agent-framework.md              Layer 10: AI augmentation
├── security.md                        Layer 11: Trust boundaries
│
│  ── PRINCIPLES (concise principle cards) ──
│
├── principles/
│   ├── README.md                      Index and usage guide
│   ├── outcomes.md                    Outcome-first card
│   ├── thinking.md                    Thinking card
│   ├── design.md                      Design card
│   ├── architecture.md                Architecture card
│   ├── delivery.md                    Delivery card
│   ├── operations.md                  Operations card
│   ├── security.md                    Security card
│   ├── ai.md                          AI & agents card
│   └── learning.md                    Learning card
│
│  ── BUILD KIT (enforcement artifacts) ──
│
├── checklists/                        Review and release gates (12 files)
├── examples/                          Concrete pattern demonstrations (22 files)
├── prompts/                           Reusable AI review prompts (12 files)
├── templates/                         Starter scaffolding for new repos (13 files)
│
│  ── STANDARDS (domain-specific rules) ──
│
├── standards/
│   ├── api/api-standards.md
│   ├── coding/coding-standards.md
│   ├── data/data-standards.md
│   ├── documentation/documentation-standards.md
│   ├── observability/observability-standards.md
│   └── testing/testing-standards.md
│
│  ── GOVERNANCE (reviews and maturity) ──
│
├── governance/
│   ├── maturity-model.md              5-level rubric
│   ├── scorecard.md                   Per-repo scoring template
│   ├── repository-review.md           Quarterly review process
│   ├── service-readiness-review.md    Pre-launch gate
│   ├── architecture-review.md         ADR-gated review process
│   └── design-review.md               Design approval process
│
│  ── MACHINE-READABLE (JSON contracts) ──
│
├── references/                        7 JSON schema and contract files
│
│  ── DOCUMENTATION (local project docs) ──
│
├── docs/
│   ├── decisions/                     Architecture Decision Records (ADRs)
│   └── diagrams/                      Structure and system diagrams (this dir)
│
│  ── AUTOMATION ──
│
├── scripts/                           10 Node.js validation and analysis scripts
├── reports/                           Generated validation outputs and history
│
│  ── AGENT CONFIGURATION ──
│
├── .github/
│   ├── agents/                        4 scoped agent definitions
│   ├── instructions/                  Context-specific editing instructions
│   ├── prompts/                       Standard audit prompt
│   ├── skills/                        Principle-change-sync workflow
│   └── copilot-instructions.md        GitHub Copilot instructions
│
└── .claude/
    └── CLAUDE.md                      Claude Code project instructions
```

## Layer Separation Principle

```
┌─────────────────────────────────────────────────────┐
│  DOCTRINE  (root *.md)                              │
│  What APT says is true and required                 │
├─────────────────────────────────────────────────────┤
│  BUILD KIT  (checklists/ examples/ prompts/)        │
│  How to apply doctrine to real work                 │
├─────────────────────────────────────────────────────┤
│  MACHINE-READABLE  (references/ *.json)             │
│  Contracts for tooling and public-site consumers    │
└─────────────────────────────────────────────────────┘
```

## Related Docs

- `README.md` — complete folder contract description
- `docs/diagrams/documentation-layers.md` — three-layer model detail
- `docs/diagrams/apt-lifecycle.md` — lifecycle layer map
