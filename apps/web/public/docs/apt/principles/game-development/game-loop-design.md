---
title: Game Loop Design
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/principles/game-development/game-loop-design.md"]
---

# Game Loop Design

## Principle

The core game loop is the repeated cycle of player action, game response, feedback, and a reason to continue. Build and test that cycle before adding breadth.

## Practice

Describe the loop as: **player does → game changes → player learns or earns → next choice**. Define its frequency, success and failure signals, and how difficulty or variety changes over time. Prototype the shortest complete cycle with placeholder art and sound.

## Questions

- Can a player understand the next useful action?
- Does the game respond immediately and consistently?
- Is repetition producing mastery, discovery, tension, expression, or progress?
- Which step can be removed without losing the experience?

## Evidence

Observe players completing several cycles without coaching. Record confusion, time-to-first-action, completion, and whether they voluntarily repeat the loop.
