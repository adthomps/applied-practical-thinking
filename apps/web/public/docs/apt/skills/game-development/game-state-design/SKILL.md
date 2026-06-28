---
name: game-state-design
description: Model authoritative game state, ownership, lifetime, and transitions.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
title: "Game State Design"
domain: "game-development"
source_paths: ["apt-principles-agents/skills/game-development/game-state-design/SKILL.md"]
---

# Game State Design

## Purpose

Make runtime truth explicit enough to implement, reset, test, and observe.

## When to Use

Use when state is duplicated, global, difficult to reset, or unclear across scenes.

## Inputs

Core loop, entities, scenes, rules, UI needs, session boundaries, and persistence requirements.

## Process

1. Inventory state by frame, scene, run, profile, and account lifetime.
2. Assign one authoritative owner and permitted writers.
3. Define transitions, invariants, defaults, reset, and derived values.
4. Separate simulation truth from presentation and save data.
5. Trace one loop action and one scene transition.
6. Define tests, observability, owner, migration, and rollback.

## Outputs

State model, transition table, ownership rules, invariants, test cases, and open questions.

## Quality Bar

The same event cannot create conflicting truths, and reset behavior is predictable.

## References

- [Game State and Save Data](../../../principles/game-development/game-state-and-save-data.md)
- [Game State Model](../../../templates/game-development/game-state-model.md)
