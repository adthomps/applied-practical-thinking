---
title: APT Lifecycle Diagram
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# APT Lifecycle Diagram

The APT lifecycle defines 11 sequential layers that move a concept from raw idea to production-ready, continuously-improved software. Each layer has one canonical doctrine file that owns it.

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
│ 10  AI   │  How does AI participate safely? │  ai-agent-        │
│          │                                  │  framework.md     │
│ 11  SAFE │  How do we protect trust?        │  security.md      │
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

Security and AI are not sequential — they apply across all layers.

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
11. Agent work follows ai-agent-framework.md
```

## Related Docs

- `apt-principles.md` — full lifecycle map with canonical doc table
- `principles/` — concise principle cards per layer
- `docs/diagrams/file-relationships.md` — how artifacts connect across layers
