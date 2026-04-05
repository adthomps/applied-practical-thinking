# APT AI Review Bundle

This bundle is the fastest public handoff for an AI reviewer, external collaborator, or working agent that needs to review APT work against the governing standards.

Start here, then open or download the linked doctrine documents that match the work under review.

Version metadata:

- Bundle version: `1.0.0`
- Design docs major: `1`
- Canonical public root: `/docs/design/v1/`
- Latest-stable alias root: `/docs/design/`

---

## Core Bundle

1. `APT-REVIEW-STANDARD.md`
   - The umbrella review contract for information architecture, design system usage, design architecture, systems framing, and content strategy.
2. `APT-DESIGN-THINKING.md`
   - Use when reviewing problem framing, constraints, tradeoffs, and decision quality.
3. `APT-DESIGN-SYSTEM.md`
   - Use when reviewing tokens, shared primitives, component structure, and visual consistency.
4. `APT-DESIGN-ARCHITECTURE.md`
   - Use when reviewing repo boundaries, deploy surfaces, API ownership, and AI prompt ownership.
5. `APT-CONTENT-STRATEGY.md`
   - Use when reviewing navigation, section roles, visitor intent, and content placement.
6. `APT-DESIGN-SYSTEMS.md`
   - Use when reviewing reference models, system framing, and how relationships are made visible.

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

### Reviewing New Design Doctrine or Taxonomy

- `APT-REVIEW-STANDARD.md`
- the target doctrine or IA change
- `APT-DESIGN-THINKING.md`
- `APT-CONTENT-STRATEGY.md`

---

## Expected Review Output

An AI reviewer should:

1. list concrete findings first
2. name the violated or mismatched standard
3. explain why it matters structurally
4. suggest the smallest correction that restores alignment

If the reviewer cannot point to a governing standard, the comment is probably preference rather than a defect.