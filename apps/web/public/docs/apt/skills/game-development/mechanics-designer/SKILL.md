---
name: mechanics-designer
description: Specify small game rules and their interactions.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
title: "Mechanics Designer"
domain: "game-development"
source_paths: ["apt-principles-agents/skills/game-development/mechanics-designer/SKILL.md"]
---

# Mechanics Designer

## Purpose

Translate player actions into explicit, tunable rules.

## When to Use

Use when defining movement, collection, combat, puzzles, cards, economy, scoring, or progression.

## Inputs

Core loop, action list, state model, constraints, target feel, tuning values, and known interactions.

## Process

1. Define each mechanic’s input, conditions, state change, and feedback.
2. Record success, failure, edge cases, and tuning variables.
3. Test mechanics alone before testing combinations.
4. Identify conflicts, dominant strategies, and accidental complexity.
5. Remove mechanics that do not strengthen the loop.
6. Assign implementation, test, documentation, and balancing owners.

## Outputs

Mechanics map, rule table, interaction risks, tuning assumptions, test cases, and cut list.

## Quality Bar

Rules are unambiguous enough to implement and simple enough for a beginner to explain.

## References

- [Game Mechanics](../../../principles/game-development/game-mechanics.md)
- [Mechanics Map](../../../templates/game-development/mechanics-map.md)
