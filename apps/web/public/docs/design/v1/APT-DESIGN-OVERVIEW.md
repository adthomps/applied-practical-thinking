---
docId: design-overview
slug: overview
major: 1
semanticVersion: 1.0.0
status: stable
publishedAt: 2026-04-05
---
# APT Design Overview

The Design area is the public operating model for APT. It explains how problems are framed, how the system is expressed, how architecture enforces the boundaries, and where stable reference models live after exploratory work matures.

---

## Purpose

Design exists to make the doctrine behind APT legible. It is not the place for every artifact. It is the place where standards, reasoning, and reusable references are documented clearly enough to inspect and reuse.

---

## Design Areas

### Design Thinking

Problem framing, assumption testing, constraint analysis, decision trees, iteration cycles, and systems mapping.

Use it when the right move is not obvious yet and the cost of being wrong is meaningful.

### Design System

Tokens, semantics, component patterns, spacing, responsive behavior, and motion guidance.

Use it when the goal is visual consistency, calm interaction, and a reusable UI language.

### Design Architecture

Repo layout, package boundaries, deployment contracts, API ownership, and enforcement rules.

Use it when structure must prevent delivery drift and accidental coupling.

### Systems

Stable reference models and reusable patterns with documented purpose, decisions, tradeoffs, and related proof.

Use it when exploratory work has converged into something coherent enough to teach or reuse.

### Content Strategy

Information architecture, section naming, visitor paths, and content maturity rules.

Use it when labels, structure, and content relationships determine whether the system is understandable.

---

## Governing Principle

APT Design separates:

- **method** from implementation
- **standards** from experiments
- **reference models** from transient artifacts
- **visitor intent** from internal team vocabulary

That separation keeps the site legible and prevents everything from collapsing into one generic portfolio bucket.

---

## Content Maturity Model

1. **Learn** explains ideas and helps people apply them.
2. **Experiments** shows concepts, mocks, and proof before the work settles.
3. **Design** defines doctrine, standards, and operating rules.
4. **Systems** preserves the stable models that survive exploration.

---

## What Good Design Doctrine Produces

- A clear public vocabulary for how APT is organized
- Durable standards for how design and delivery decisions are made
- Reusable reference material instead of isolated examples
- Cross-links between learning, experimentation, doctrine, and reference models

---

## Failure Modes

- Treating every artifact like a portfolio piece with the same job
- Letting internal team language leak into public navigation
- Mixing exploratory proof and stable references without distinction
- Documenting a design model that no longer matches the live system

---

## Related Documents

- [APT Design Thinking](./APT-DESIGN-THINKING.md)
- [APT Design System](./APT-DESIGN-SYSTEM.md)
- [APT Design Architecture](./APT-DESIGN-ARCHITECTURE.md)
- [APT Content Strategy](./APT-CONTENT-STRATEGY.md)
- [APT Systems Reference Models](./APT-DESIGN-SYSTEMS.md)
- [APT Design Versioning](./APT-DESIGN-VERSIONING.md)

