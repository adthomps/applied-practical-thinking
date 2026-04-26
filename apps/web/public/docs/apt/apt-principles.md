---
title: APT Principles Framework
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# APT Principles Framework

## Overview

APT (Applied Practical Thinking) is a structured framework for turning ideas into clear decisions, well-designed systems, scalable architecture, and production-ready delivery.

APT is a working model for:

- thinking
- designing
- architecting
- standardizing
- building
- validating
- releasing
- operating
- learning
- augmenting work with AI
- protecting systems and users

## Purpose

APT creates a repeatable system for moving from concept to execution without losing clarity, consistency, quality, security, or long-term reuse.

## Lifecycle Map

| Layer | Question | Canonical Doc |
|---|---|---|
| Thinking | Why does this matter? | `thinking.md` |
| Design | What should the solution communicate and do? | `design.md` |
| Architecture | How should the system be structured? | `architecture.md` |
| System Standards | How do we keep behavior consistent? | `system-standards.md` |
| Execution | How do we build it safely? | `execution.md` |
| Quality & Testing | How do we validate it? | `quality-testing.md` |
| Release & Change Management | How do we promote it? | `release-change-management.md` |
| Operations & Support | How do we run and support it? | `operations-support.md` |
| Knowledge System | How do we learn and scale understanding? | `knowledge-system.md` |
| AI & Agent Framework | How does AI augment the work? | `ai-agent-framework.md` |
| Security & Authentication | How do we protect trust boundaries? | `security.md` |

## Core Operating Rules

### Rule 1: Think before building

Do not implement before the problem, audience, constraints, and success criteria are understood.

### Rule 2: Design complete behavior

Define user flows, states, interaction rules, and acceptance criteria before implementation spreads design decisions across code.

### Rule 3: Structure before speed

Fast delivery without boundaries creates technical and operational debt.

### Rule 4: One canonical source per topic

Each rule should live in one primary location. Other docs may reference it, but should not redefine it.

### Rule 5: API-first where functionality matters

Important business behavior should be defined at the API and contract layer, not trapped inside UI code.

### Rule 6: Security is built in

Authentication, authorization, input validation, session control, secrets, and abuse protection are part of the architecture.

### Rule 7: AI must follow the system

AI can accelerate work, but it must not invent architecture, standards, or patterns outside defined rules.

### Rule 8: Validate before release

Every meaningful change needs evidence: tests, builds, preview checks, review notes, or explicit risk acceptance.

### Rule 9: Learn once, reuse everywhere

Decisions, examples, prompts, and support findings should become reusable knowledge instead of hidden memory.

## Required Documentation Model

APT is maintained in five active layers:

1. Core principle docs
2. Examples
3. Checklists
4. Prompts
5. References

Templates are provided for creating new items in each layer.

## Project Adoption Model

APT projects should apply this framework without duplicating and drifting the doctrine. Supported adoption modes are:

- Copy: vendor selected APT assets into the project.
- Sync: periodically refresh local assets from `apt-principles`.
- Apply: treat `apt-principles` as the external source of truth while local docs describe implementation.
- Showcase: publish a profile that can feed the public Applied Practical Thinking portfolio.

Downstream projects should keep local adoption records under `docs/apt/` or an equivalent folder. Local records should name principle coverage, project-specific decisions, validation reports, and public showcase readiness.

`applied-practical-thinking` is the public APT site: portfolio, demo hub, learning surface, principles browser, and showcase for real APT projects such as `apt-coach`, `apt-dream-to-reality`, `apt-novel-reviewer`, `apt-payment-rpc-api`, `crt-world`, and future projects.

## Required Change Flow

1. Frame the problem with `thinking.md`.
2. Define behavior with `design.md`.
3. Place responsibilities with `architecture.md`.
4. Apply consistency rules from `system-standards.md`.
5. Check security boundaries with `security.md`.
6. Build using `execution.md`.
7. Validate with `quality-testing.md`.
8. Promote with `release-change-management.md`.
9. Support with `operations-support.md`.
10. Capture reusable learning with `knowledge-system.md`.
11. Use `ai-agent-framework.md` when AI participates.

## Related Build Kit

- `checklists/`
- `examples/`
- `prompts/`
- `templates/`
- `references/`
- `checklists/project-adoption-checklist.md`
- `prompts/project-adoption-prompt.md`
- `templates/project-adoption-template.md`
- `examples/projects/apt-project-profile-example.md`
- `references/project-profile.schema.json`

## Summary

APT is a doctrine and build kit for practical systems work: clear thinking, coherent design, safe architecture, consistent execution, validated release, durable operations, reusable knowledge, bounded AI, and explicit security.
