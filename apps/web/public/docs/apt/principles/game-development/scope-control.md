---
title: Game Scope Control
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/principles/game-development/scope-control.md"]
---

# Game Scope Control

## Principle

Scope is the number of promises a project makes. Protect the smallest promise that proves the game can be played and enjoyed.

## Practice

Separate work into **must prove**, **useful next**, and **not now**. Cap the prototype by time, mechanics, scenes, assets, platforms, and session length. Replace custom content with placeholders; replace procedural systems with one authored example; support one input method and one target platform first.

## Scope Gate

Before accepting a feature, ask:

1. Which core-loop question does it answer?
2. What new code, content, assets, tests, and support burden does it create?
3. What will be cut or delayed to make room?
4. Can a simpler experiment answer the same question?

Every review must produce a cut list. A smaller finished prototype is stronger evidence than a large unfinished design.
