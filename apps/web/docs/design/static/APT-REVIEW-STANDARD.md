---
title: APT Review Standard
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---

# APT Review Standard

> Review should tell you what is structurally wrong, why it matters, and what standard it violates.

**[2026-04-04] NOTE:**
This is an external-first review doctrine document. It is written so a person, an outside collaborator, or an AI reviewer can be pointed to a single standards reference before reviewing APT work.

This document defines how APT reviews existing work and new builds across information architecture, design system usage, design architecture, systems thinking, and content strategy.

---

## Philosophy

APT review is not aesthetic policing. It is a structural check on whether the work expresses the governing model of the project.

Reviews should answer five questions:

1. **Is the problem framing clear?**
2. **Is the interface using the shared design system correctly?**
3. **Does the implementation respect architectural boundaries?**
4. **Does the content model match the user's intent and the source-of-truth rules?**
5. **Does the output make decisions visible rather than hiding them behind presentation?**

If a reviewer cannot answer those questions, the review is incomplete.

---

## Review Lenses

### 1. Design Thinking

Use the APT design-thinking lens to check whether the work starts from the problem instead of the artifact.

**Review for:**

- a clear problem or visitor intent
- visible constraints and tradeoffs
- decisions that can be explained, not only defended
- a structure that helps users orient before they commit

**Reject when:**

- the work leads with styling before framing
- calls to action are disconnected from user intent
- the page or feature introduces taxonomy without explaining how to use it

Reference: `APT-DESIGN-THINKING.md`

### 2. Design System

Use the design-system lens to check whether the interface is composed from stable APT primitives rather than route-level improvisation.

**Review for:**

- semantic tokens instead of raw colors
- correct use of shared APT primitives such as `AptButton`, `AptCard`, and `AptTag`
- consistent card composition using header, content, and footer regions where appropriate
- consistent action hierarchy, spacing ownership, and text hierarchy
- consistent tag semantics so area identity, item type, role/meta labels, status, and supporting taxonomy do not collapse into one visual treatment

**Reject when:**

- route code recreates component structure that already exists in the shared system
- cards own layout through ad hoc inner padding wrappers instead of the card contract
- headings, descriptions, and actions are visually similar but structurally inconsistent
- the same label category changes variant from page to page without a documented rule
- badge-like metadata is implemented as freehand uppercase text or custom pills where `AptTag` should carry the meaning

Reference: `APT-DESIGN-SYSTEM.md`

### 3. Design Architecture

Use the design-architecture lens to verify that code and content live in the correct layer.

**Review for:**

- UI-only behavior in `apps/web`
- API-only behavior in `apps/worker`
- shared presentational primitives in `packages/ui`
- shared contracts and tokens in `packages/config` and related packages
- prompt ownership in `apps/web/ai/prompts`

**Reject when:**

- business logic leaks into route components
- routes become a second service layer
- generated or copied content is edited as if it were authored source
- manifest-governed alias files drift from their latest version sources
- audited doctrine metadata/frontmatter contract is missing required keys
- prompts or standards drift into undocumented locations

Reference: `APT-DESIGN-ARCHITECTURE.md`
Reference (runtime): `APT-KNOWLEDGE-ENGINE.md`

### 4. Systems And Reference Models

Use the systems lens to verify that the work expresses relationships, not isolated screens.

**Review for:**

- explicit framing of how parts connect
- stable reference language for repeatable concepts
- separation between exploratory artifacts and governing doctrine
- patterns that can scale across multiple routes or content types

**Reject when:**

- the work explains one screen without locating it in the larger system
- proof-of-concept language is presented as stable doctrine
- reference-model pages and exploratory pages use the same framing without distinction

Reference: `Systems.tsx`

Reference (support): `APT-SUPPORT-DESIGN.md`

### 5. Content Strategy

Use the content-strategy lens to verify that content is placed, framed, and labeled according to user intent.

**Review for:**

- clear entry points for new visitors
- copy that explains what the user gets and when to use it
- canonical authored content in source locations, not generated runtime copies
- a stable distinction between public doctrine, internal operations, and generated output

**Reject when:**

- content categories exist for the team rather than for the visitor
- the user has to understand internal taxonomy before they can navigate
- public/source documents and generated/public copies drift apart

Reference: `ContentStrategy.tsx`

---

## Review Modes

### Review Existing Work

When reviewing an existing page, feature, or code path:

1. Identify the visitor intent or operational purpose.
2. Identify the governing design or architecture rule.
3. Compare the implementation against the shared primitives and source-of-truth files.
4. Report findings as structural issues first, polish issues second.

### Review A New Build

When reviewing a new build or proposal:

1. Confirm the problem framing before discussing implementation.
2. Check whether the design system and repo boundaries already provide the needed building blocks.
3. Reject unnecessary new patterns when an existing one already solves the problem.
4. Require documentation updates whenever the change alters doctrine, navigation, or ownership.

---

## Minimum Acceptance Rules

APT work is not ready when any of the following are true:

- the route or feature cannot explain its user intent in one sentence
- the UI bypasses existing APT primitives without a documented reason
- architecture boundaries are crossed for convenience
- generated/public copies are treated as the source of truth
- manifest-governed published aliases do not match the latest local published version sources
- required audited doctrine frontmatter metadata is missing
- copy introduces more ambiguity than orientation
- the work makes artifacts visible but leaves the reasoning invisible

---

## AI Reviewer Handoff

If an AI agent is reviewing APT work, give it this document first.

Then provide the smallest relevant set of supporting files:

1. the route, component, or doc being reviewed
2. the matching public doctrine document for the area under review
3. any shared primitive file the work depends on
4. internal repo rules only when architecture or workflow enforcement matters

**Recommended minimum bundle**

- `APT-REVIEW-STANDARD.md`
- one of `APT-DESIGN-THINKING.md`, `APT-DESIGN-SYSTEM.md`, or `APT-DESIGN-ARCHITECTURE.md`
 - optionally include `APT-SUPPORT-DESIGN.md` or `APT-KNOWLEDGE-ENGINE.md` when the review touches operational response or runtime behavior
- the target file or route under review

The AI should report:

1. concrete findings first
2. the violated or mismatched standard
3. the smallest correction that restores alignment

---

## What Good Review Output Looks Like

Strong APT review output is:

- specific instead of thematic
- standards-based instead of taste-based
- focused on root causes instead of cosmetic symptoms
- explicit about what belongs in doctrine, shared primitives, routes, and generated output

If the review cannot point to a violated standard, it is probably only a preference.
