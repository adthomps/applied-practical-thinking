---
title: APT Lifecycle Diagram
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
kind: "guide"
domain: "documentation"
source_paths: ["apt-principles/docs/diagrams/apt-lifecycle.md"]
---

# APT Lifecycle Diagram

APT uses four pillars, five supporting lifecycle practices, and two cross-cutting overlays. Public navigation may present eleven sections, but those sections are not eleven equal or sequential pillars.

## Lifecycle Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     APT LIFECYCLE                               │
├──────────┬──────────────────────────────────┬───────────────────┤
│  Layer   │  Question                        │  Canonical Doc    │
├──────────┼──────────────────────────────────┼───────────────────┤
│  1  WHY  │  Why does this matter?           │  thinking.md      │
│  2  WHAT │  What should it communicate?     │  design.md        │
│  3  HOW  │  How should the system be built? │  architecture.md  │
│  4  RULE │  How do we stay consistent?      │  system-standards │
│  5  BUILD│  How do we build it safely?      │  execution.md     │
│  6  CHECK│  How do we validate it?          │  quality-testing  │
│  7  SHIP │  How do we promote it?           │  release-change-  │
│          │                                  │  management.md    │
│  8  RUN  │  How do we run and support it?   │  operations-      │
│          │                                  │  support.md       │
│  9  LEARN│  How do we capture learning?     │  knowledge-system │
│ OVERLAY  │  How does AI participate safely? │  ai/README.md     │
│ OVERLAY  │  How do we protect trust?        │  security-risk/   │
│          │                                  │  README.md        │
└──────────┴──────────────────────────────────┴───────────────────┘
```

## Lifecycle as a Flow

```
Idea
  │
  ▼
┌──────────┐     ┌──────────┐     ┌──────────────┐     ┌─────────────────┐
│ THINKING │────▶│  DESIGN  │────▶│ ARCHITECTURE │────▶│ SYSTEM STANDARDS│
│  (Why)   │     │  (What)  │     │    (How)     │     │  (Consistency)  │
└──────────┘     └──────────┘     └──────────────┘     └────────┬────────┘
                                                                 │
                 ┌───────────────────────────────────────────────┘
                 ▼
         ┌──────────────┐     ┌─────────────────┐     ┌──────────────────┐
         │  EXECUTION   │────▶│ QUALITY/TESTING │────▶│ RELEASE/CHANGE   │
         │   (Build)    │     │   (Validate)    │     │   (Promote)      │
         └──────────────┘     └─────────────────┘     └────────┬─────────┘
                                                                │
                 ┌──────────────────────────────────────────────┘
                 ▼
         ┌──────────────────┐     ┌─────────────────┐
         │    OPERATIONS    │────▶│ KNOWLEDGE SYSTEM │
         │  (Run & Support) │     │  (Learn & Scale) │
         └──────────────────┘     └─────────────────┘

  ┌────────────────┐   ┌──────────────────────┐
  │   AI & AGENTS  │   │  SECURITY (all layers)│
  │ (Augmentation) │   │  Auth · AuthZ · Input │
  └────────────────┘   └──────────────────────┘
```

Security and AI are cross-cutting overlays. They apply during framing, design, architecture, execution, validation, release, operations, and learning.

## Required Change Flow

When making any significant change, traverse the layers in order:

```
1. Frame with thinking.md
2. Design with design.md
3. Structure with architecture.md
4. Apply rules from system-standards.md
5. Check boundaries in security.md
6. Build using execution.md
7. Validate with quality-testing.md
8. Promote with release-change-management.md
9. Support with operations-support.md
10. Capture in knowledge-system.md
11. Apply the AI and security overlays throughout; record where either is not applicable.
```

## Related Docs

- `principles/framework.md` — full lifecycle map and operating rules
- `principles/` — canonical doctrine and specialist applications
- `references/apt-taxonomy.json` — structured taxonomy used by generated views
- `docs/diagrams/file-relationships.md` — how artifacts connect across layers
