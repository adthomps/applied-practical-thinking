---
title: File Relationships Diagram
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# File Relationships Diagram

This diagram shows how a single APT principle propagates through all artifact types — from canonical doctrine to machine-readable contract.

## The Artifact Chain

Every APT principle is documented in five artifact types. Each type serves a different audience and purpose.

```
                     ┌──────────────────────────────┐
                     │   CANONICAL DOC  (root/*.md)  │
                     │   Full principles, rules,      │
                     │   examples, AI prompts         │
                     │                                │
                     │   e.g. design.md               │
                     └───────────────┬────────────────┘
                                     │ referenced by
            ┌────────────────────────┼──────────────────────┐
            │                        │                       │
            ▼                        ▼                       ▼
┌───────────────────┐  ┌─────────────────────┐  ┌────────────────────┐
│  PRINCIPLE CARD   │  │     CHECKLIST        │  │      PROMPT        │
│  (principles/*.md)│  │  (checklists/*.md)  │  │  (prompts/*.md)   │
│                   │  │                     │  │                    │
│  Quick-reference  │  │  Enforcement gate   │  │  AI review input   │
│  30-second read   │  │  Pass/fail criteria │  │  Structured output │
│                   │  │                     │  │                    │
│  e.g.             │  │  e.g.               │  │  e.g.              │
│  principles/      │  │  checklists/        │  │  prompts/          │
│  design.md        │  │  design-review-     │  │  design-review-    │
│                   │  │  checklist.md       │  │  prompt.md         │
└───────────────────┘  └─────────────────────┘  └────────────────────┘
                                     │
                                     ▼
                     ┌──────────────────────────────┐
                     │      EXAMPLE  (examples/)     │
                     │   Concrete pattern or flow    │
                     │   Context, problem, solution  │
                     │   Tradeoffs, common mistakes  │
                     │                               │
                     │   e.g. examples/ui/           │
                     │   dashboard-layout-pattern.md │
                     └───────────────┬───────────────┘
                                     │
                                     ▼
                     ┌──────────────────────────────┐
                     │   REFERENCE  (references/)    │
                     │   Machine-readable contract   │
                     │   JSON schema or config       │
                     │                               │
                     │   e.g. references/            │
                     │   design-lint-gates.json      │
                     └──────────────────────────────┘
```

## Full Coverage Map (per principle)

| Principle | Canonical Doc | Principle Card | Checklists | Examples | Prompts | References |
|-----------|--------------|----------------|-----------|---------|---------|-----------|
| Thinking | thinking.md | principles/thinking.md | thinking-review | problem-framing | framework-review | — |
| Design | design.md | principles/design.md | design-review | ui/3 patterns | design-review | design-tokens, design-lint-gates |
| Architecture | architecture.md | principles/architecture.md | architecture-review | architecture/2 | architecture-review | architecture-map |
| Standards | system-standards.md | — | api-standards | api/3 | api-review | metadata-versioning |
| Execution | execution.md | principles/delivery.md | execution-readiness | workflows/spec-to-story | apt-one-shot | — |
| Quality | quality-testing.md | (in delivery) | quality-testing | quality/validation-plan | testing-review | design-lint-gates, ai-review-bundle |
| Release | release-change-management.md | (in delivery) | release-readiness | workflows/preview-to-prod | release-review | metadata-versioning |
| Operations | operations-support.md | principles/operations.md | operations-support | workflows/preview-to-prod | operations-review | — |
| Knowledge | knowledge-system.md | principles/learning.md | knowledge-system | knowledge/canonical-update | knowledge-review | knowledge-contracts, project-profile |
| AI/Agents | ai-agent-framework.md | principles/ai.md | ai-agent-review | ai-agent/3 | framework-review | ai-review-bundle |
| Security | security.md | principles/security.md | security-review | security/3 | security-review | — |

## How References Flow in Practice

```
Developer needs to review a PR against design standards:

  1. Read principles/design.md       ← "What is the principle?"
  2. Open checklists/design-review-  ← "What are the gates?"
     checklist.md
  3. Reference examples/ui/          ← "What does good look like?"
     dashboard-layout-pattern.md
  4. Run prompts/design-review-      ← "Let AI review it"
     prompt.md against the PR
  5. Check references/               ← Automated lint validation
     design-lint-gates.json
```

## Related Docs

- `apt-principles.md` — required documentation model (five layers)
- `knowledge-system.md` — how artifacts are kept in sync
- `docs/diagrams/apt-lifecycle.md` — which layer each artifact belongs to
