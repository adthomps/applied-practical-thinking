# APT Content Strategy

Content strategy at APT is the information architecture that helps people understand what they are looking at, why it exists, and how to move from learning to reference to working proof.

---

## Purpose

APT content strategy exists to reduce ambiguity. It organizes the site around visitor intent before content format, and it keeps doctrine, experiments, learning content, and reference models from collapsing into one undifferentiated structure.

---

## Core Principles

1. **Organize by visitor intent before content format**
2. **Keep stable references under Design while exploratory proof lives in Experiments**
3. **Treat demos as supporting proof, not the primary taxonomy**
4. **Make the reasoning behind the information architecture visible**

---

## When To Use Formal Content Strategy

Use the content-strategy layer when:

- labels could mislead people about what a section is for
- content types overlap and need clearer roles
- navigation decisions materially affect discoverability
- internal content organization does not match public understanding

Do not overcomplicate simple structures. The strategy should create clarity, not bureaucracy.

---

## Section Roles

### Learn

Articles, podcasts, guides, design reviews, and systems that help people understand and apply the ideas.

### Experiments

Concepts, mocks, prototypes, and live demos that make proof visible before it becomes a stable reference.

### Design

The operating doctrine behind APT: thinking, system, architecture, content strategy, and systems.

### Systems

Stable system references inside Design with architecture, decisions, constraints, and tradeoffs.

---

## Content Lifecycle

1. **Learn** when the job is explanation or instruction
2. **Experiments** when the job is proof or exploration
3. **Design** when the job is doctrine or standards
4. **Systems** when the work has matured into a reusable reference model

---

## Working Artifacts

Good content strategy leaves behind:

- a top-level IA that separates learning, experiments, doctrine, and stable references
- section names that communicate intent without insider language
- cross-links that connect related material without collapsing it together
- a clear authored-source model so public content, doctrine, and internal docs do not drift

Labels and badges are part of that IA, not decorative garnish. A visitor should be able to distinguish area identity, content type, meta role, and status at a glance. If a badge changes color or treatment arbitrarily between routes, the IA has already started to drift.

Use labels to clarify role:

- section or area identity should read as a stable framing cue
- content type should read as what the user is opening
- meta role labels such as `Entry Point` or `Doctrine` should explain how to interpret the card
- supporting taxonomy should stay visually quieter than type and role labels

---

## Audience Paths

### I want to understand the ideas

Start in **Learn**, then move into Guides when a practical path is needed.

### I want reusable patterns

Start in **Design > Systems** when architecture, tradeoffs, and reference-model thinking matter more than raw proof.

### I want to see proof-of-work

Start in **Experiments**, then move into Live Demos when interacting with the work matters.

---

## Failure Modes

- **Format-first taxonomy**: grouping everything by media type instead of visitor intent
- **Everything is a portfolio piece**: treating learning, experiments, and references like they all do the same job
- **Navigation by internal vocabulary**: using labels that only make sense to the builders

---

## Related Documents

- [APT Design Overview](./APT-DESIGN-OVERVIEW.md)
- [APT Design Thinking](./APT-DESIGN-THINKING.md)
- [APT Design Architecture](./APT-DESIGN-ARCHITECTURE.md)
