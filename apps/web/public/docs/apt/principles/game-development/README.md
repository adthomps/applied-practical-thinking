---
title: Game Development Principles
kind: index
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/principles/game-development/README.md"]
---

# Game Development Principles

APT game development applies **Thinking, Design, Architecture, and Execution** to small games and interactive experiences.

> Start small. Build the core loop first. Make it playable before making it big.

## APT Pillar Crosswalk

| Pillar | Game-development decision | Start with | Evidence and exit criteria |
|---|---|---|---|
| [Thinking](../thinking/README.md) | What player, problem, feeling, learning goal, and constraint justify this game? | [Beginner Game Development](beginner-game-development.md) and [Scope Control](scope-control.md) | A one-sentence player promise, verified constraints, explicit assumptions, prototype question, owner, and cut list. Exit when the smallest useful idea is chosen. |
| [Design](../design/README.md) | What does the player repeatedly do, understand, and experience? | [Game Loop Design](game-loop-design.md), [Game Mechanics](game-mechanics.md), and [Player Experience](player-experience.md) | A complete action → state change → feedback → next choice cycle, readable controls, and a focused playtest question. Exit when the loop can be explained and observed. |
| [Architecture](../architecture/README.md) | What boundaries let the prototype change safely without premature complexity? | [Game Architecture](game-architecture.md), [Game State and Save Data](game-state-and-save-data.md), and [Input and Controls](input-and-controls.md) | A startup/core-loop trace, authoritative state owner, scene and asset boundaries, failure behavior, and proportionate tests. Exit when the next playable increment has a safe structure. |
| [Execution](../execution/README.md) | How will the team build, validate, release, support, and learn in small increments? | [Prototype-First Development](prototype-first-development.md), [Game Testing](game-testing.md), and [Game Documentation](game-documentation.md) | A runnable build, smoke-test evidence, observed playtest findings, documented decisions, rollout/rollback, and the next smallest increment. Exit when the prototype question has a recorded answer. |

## Beginner Start Path

1. [Beginner Game Development](beginner-game-development.md): choose one understandable idea.
2. [Scope Control](scope-control.md): define the smallest playable promise.
3. [Game Loop Design](game-loop-design.md) and [Game Mechanics](game-mechanics.md): describe what the player repeatedly does and why it matters.
4. [Prototype-First Development](prototype-first-development.md): prove the uncertain and enjoyable parts quickly.
5. [Player Experience](player-experience.md), [Level and Scene Design](level-and-scene-design.md), [Input and Controls](input-and-controls.md), and [Game UI and HUD](game-ui-and-hud.md): make play understandable.
6. [Game Architecture](game-architecture.md), [Game State and Save Data](game-state-and-save-data.md), and [Audio and Feedback](audio-and-feedback.md): keep the prototype coherent.
7. [Game Testing](game-testing.md), [Game Documentation](game-documentation.md), and [AI-Assisted Game Development](ai-assisted-game-development.md): learn, improve, and preserve decisions.

New terms are explained in the [Game Development Glossary](../../docs/game-development-glossary.md). Principles guide decisions; use [game-development skills](../../skills/game-development/README.md) for procedures and [game-development agents](../../agents/game-development/README.md) for review perspectives. Phase-one evidence and accepted limitations are recorded in the [Game Development Phase-One Readiness Review](../../docs/game-development-phase-1-readiness.md).
