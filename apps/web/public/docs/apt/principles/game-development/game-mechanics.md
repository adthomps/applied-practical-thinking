---
title: Game Mechanics
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/principles/game-development/game-mechanics.md"]
---

# Game Mechanics

## Principle

A mechanic is a rule that connects player input to game-state change. Prefer a few mechanics that interact clearly over many disconnected features.

## Practice

For each mechanic, state its input, preconditions, state change, feedback, success value, failure behavior, and interactions. Test one mechanic alone before combining it with another. Use numbers that are easy to tune and record why defaults changed.

## Quality Checks

- The rule is explainable in one or two sentences.
- Inputs and outcomes are predictable enough to learn.
- Feedback reveals what happened.
- Interactions create useful choices rather than accidental complexity.
- Removing the mechanic would noticeably change the core loop.

Keep cosmetic variation, progression systems, crafting, economies, and meta-systems out of the prototype unless they are the idea being tested.
