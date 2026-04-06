---
docId: ai-review-bundle
slug: review-bundle
major: 2
semanticVersion: 2.4.0
status: candidate
publishedAt: 2026-04-06
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

- Bundle version: `2.4.0`
- Design docs majors: `1`, `2` (mixed-major rollout)
- Canonical public root pattern: `/docs/design/v{major}/`
- Latest-stable alias root: `/docs/design/`
- Validation snapshot (public-safe): surfaced in `/design/review-bundle` with downloadable `/docs/design/validation/LATEST.json` and `/docs/design/validation/LATEST.md`

---

## Core Bundle

1. `APT-REVIEW-STANDARD.md`
   - The umbrella review contract for information architecture, design system usage, design architecture, systems framing, and content strategy.
2. `APT-DESIGN-THINKING.md`
   - Use when reviewing problem framing, constraints, tradeoffs, and decision quality.
3. `APT-DESIGN-SYSTEM.md`
   - Use when reviewing tokens, shared primitives, component structure, and visual consistency.
4. `APT-TOKENS.md`
   - Human-readable token guide covering value/enforcement contract roles and update workflow.
5. `APT-DESIGN-ARCHITECTURE.md`
   - Use when reviewing repo boundaries, deploy surfaces, API ownership, AI prompt ownership, and the canonical Documentation Architecture section.
6. `APT-ARCHITECTURE-EXAMPLES.md`
   - Use when validating implementation against good/bad architecture examples and fast-fail boundary checks.
7. `APT-ARCHITECTURE-REFERENCE.json`
   - Machine-readable architecture rules/checklist for AI or tooling-driven enforcement.
8. `APT-ARCHITECTURE-DOC.md`
   - Compatibility shim entrypoint; canonical documentation architecture doctrine lives in `APT-DESIGN-ARCHITECTURE.md` (Documentation Architecture section).
9. `APT-ARCHITECTURE-DOC-EXAMPLES.md`
   - Good/bad documentation architecture examples and fast-fail patterns.
10. `APT-ARCHITECTURE-DOC-REFERENCE.json`
   - Machine-readable documentation architecture checks for policy and review tooling.
11. `APT-CONTENT-STRATEGY.md`
   - Use when reviewing navigation, section roles, visitor intent, and content placement.
12. `APT-DESIGN-SYSTEMS.md`
   - Use when reviewing reference models, system framing, and how relationships are made visible.
13. `APT-AI-INSTRUCTIONS-REFERENCE.md`
   - External strict AI instruction contract for collaborators and tool-driven handoffs.
14. `APT-DESIGN-SYSTEM-LINT-CHECKLIST.md`
   - Critical pass-gate checklist for validating design-system compliance before merge.
15. `/docs/design/validation/LATEST.md`
   - Public-safe validation snapshot in human-readable form for review-ready status checks.
16. `/docs/design/validation/LATEST.json`
   - Public-safe machine-readable validation snapshot for AI/tooling workflows.

---

## Recommended Handoff By Review Type

### Reviewing a Route or Page

- `APT-REVIEW-STANDARD.md`
- the target route or page
- `APT-DESIGN-SYSTEM.md`
- `APT-CONTENT-STRATEGY.md`

### Reviewing a Shared Component

- `APT-REVIEW-STANDARD.md`
- the target component
- `APT-DESIGN-SYSTEM.md`
- `APT-DESIGN-ARCHITECTURE.md`

### Reviewing Repo Structure or Service Boundaries

- `APT-REVIEW-STANDARD.md`
- the target files
- `APT-DESIGN-ARCHITECTURE.md`
- `APT-ARCHITECTURE-EXAMPLES.md`
- `APT-ARCHITECTURE-REFERENCE.json`
- `APT-DESIGN-ARCHITECTURE.md` (Documentation Architecture section)
- `APT-ARCHITECTURE-DOC-REFERENCE.json`
- `/docs/design/validation/LATEST.json`

### Reviewing New Design Doctrine or Taxonomy

- `APT-REVIEW-STANDARD.md`
- the target doctrine or IA change
- `APT-DESIGN-THINKING.md`
- `APT-CONTENT-STRATEGY.md`
- `APT-DESIGN-ARCHITECTURE.md` (Documentation Architecture section)
- `/docs/design/validation/LATEST.md`

---

## Expected Review Output

An AI reviewer should:

1. list concrete findings first
2. name the violated or mismatched standard
3. explain why it matters structurally
4. suggest the smallest correction that restores alignment

If the reviewer cannot point to a governing standard, the comment is probably preference rather than a defect.
