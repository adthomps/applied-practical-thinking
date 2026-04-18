---
docId: ai-review-bundle
slug: review-bundle
major: 2
semanticVersion: 2.5.0
status: candidate
publishedAt: 2026-04-18
title: APT AI Review Bundle
version: v2
audience: developer
visibility: public
source: manual
---
# APT AI Review Bundle

This bundle is the fastest public handoff for an AI reviewer, external collaborator, or working agent that needs to review APT work against the governing standards.

Start here, then open or download the linked doctrine documents that match the work under review.

Version metadata:

- Bundle version: `2.5.0`
- Design docs majors: `1`, `2` (mixed-major rollout)
- Canonical public root pattern: `/docs/design/v{major}/`
- Latest-stable alias root: `/docs/design/`
- Validation snapshot (public-safe): surfaced in `/design/review-bundle` with downloadable `/docs/design/validation/LATEST.json` and `/docs/design/validation/LATEST.md`

---

## Core Bundle

1. `APT-REVIEW-STANDARD.md`
   - The umbrella review contract for information architecture, design system usage, design architecture, systems framing, and content strategy.
2. `APT-PRINCIPLES-FRAMEWORK.md`
   - Canonical 10-group principles model and lifecycle map.
3. `APT-DESIGN-THINKING.md`
   - Use when reviewing problem framing, constraints, tradeoffs, and decision quality.
4. `APT-DESIGN-SYSTEM.md`
   - Use when reviewing tokens, shared primitives, component structure, and visual consistency.
5. `APT-TOKENS.md`
   - Human-readable token guide covering value/enforcement contract roles and update workflow.
6. `APT-DESIGN-ARCHITECTURE.md`
   - Use when reviewing repo boundaries, deploy surfaces, API ownership, AI prompt ownership, and the canonical Documentation Architecture section.
7. `APT-ARCHITECTURE-EXAMPLES.md`
   - Use when validating implementation against good/bad architecture examples and fast-fail boundary checks.
8. `APT-ARCHITECTURE-REFERENCE.json`
   - Machine-readable architecture rules/checklist for AI or tooling-driven enforcement.
9. `APT-ARCHITECTURE-DOC.md`
   - Compatibility shim entrypoint; canonical documentation architecture doctrine lives in `APT-DESIGN-ARCHITECTURE.md` (Documentation Architecture section).
10. `APT-ARCHITECTURE-DOC-EXAMPLES.md`
   - Good/bad documentation architecture examples and fast-fail patterns.
11. `APT-ARCHITECTURE-DOC-REFERENCE.json`
   - Machine-readable documentation architecture checks for policy and review tooling.
12. `APT-CONTENT-STRATEGY.md`
   - Use when reviewing navigation, section roles, visitor intent, and content placement.
13. `APT-DESIGN-SYSTEMS.md`
   - Use when reviewing reference models, system framing, and how relationships are made visible.
14. `APT-AI-INSTRUCTIONS-REFERENCE.md`
   - External strict AI instruction contract for collaborators and tool-driven handoffs.
15. `APT-DESIGN-SYSTEM-LINT-CHECKLIST.md`
   - Critical pass-gate checklist for validating design-system compliance before merge.
16. `/docs/design/validation/LATEST.md`
   - Public-safe validation snapshot in human-readable form for review-ready status checks.
17. `/docs/design/validation/LATEST.json`
   - Public-safe machine-readable validation snapshot for AI/tooling workflows.

---

## Starter Packs (Primary)

### Route Review

- `APT-REVIEW-STANDARD.md`
- the target route or page
- `APT-DESIGN-SYSTEM.md`
- `APT-CONTENT-STRATEGY.md`

### Component Review

- `APT-REVIEW-STANDARD.md`
- the target component
- `APT-DESIGN-SYSTEM.md`
- `APT-DESIGN-ARCHITECTURE.md`

### Architecture Review

- `APT-REVIEW-STANDARD.md`
- the target files
- `APT-DESIGN-ARCHITECTURE.md`
- `APT-ARCHITECTURE-EXAMPLES.md`
- `APT-ARCHITECTURE-REFERENCE.json`
- `APT-DESIGN-ARCHITECTURE.md` (Documentation Architecture section)
- `APT-ARCHITECTURE-DOC-REFERENCE.json`
- `/docs/design/validation/LATEST.json`

### Doctrine Review

- `APT-REVIEW-STANDARD.md`
- the target doctrine or IA change
- `APT-DESIGN-THINKING.md`
- `APT-PRINCIPLES-FRAMEWORK.md`
- `APT-CONTENT-STRATEGY.md`
- `APT-DESIGN-ARCHITECTURE.md` (Documentation Architecture section)
- `/docs/design/validation/LATEST.md`

### Principles Review

- `APT-REVIEW-STANDARD.md`
- the target principle-guided change
- `APT-PRINCIPLES-FRAMEWORK.md`
- `APT-DESIGN-THINKING.md`
- `APT-DESIGN-ARCHITECTURE.md`

Long-tail artifacts remain available in the full bundle index on `/design/review-bundle`.

---

## Expected Review Output

An AI reviewer should:

1. list concrete findings first
2. name the violated or mismatched standard
3. explain why it matters structurally
4. suggest the smallest correction that restores alignment

If the reviewer cannot point to a governing standard, the comment is probably preference rather than a defect.
