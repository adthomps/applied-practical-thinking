---
name: game-architecture-review
description: Review a small game architecture for clear boundaries and safe change.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
title: "Game Architecture Review"
domain: "game-development"
source_paths: ["apt-principles-agents/skills/game-development/game-architecture-review/SKILL.md"]
---

# Game Architecture Review

## Purpose

Check whether project structure supports the next playable increments without unnecessary complexity.

## When to Use

Use after prototype planning, before expansion, or when scenes, state, assets, and scripts are tangled.

## Inputs

Repository tree, architecture map, core-loop trace, scenes, entities/components, input, saves, assets, tests, and constraints.

## Process

1. Trace startup and one complete core-loop action.
2. Review boundaries for input, simulation, state, presentation, UI, audio, persistence, assets, and services.
3. Inspect scene transitions, authority, failure behavior, and configuration.
4. Identify coupling, premature patterns, and missing tests.
5. Recommend the smallest safe changes and explicit non-changes.
6. Assign owner, evidence, rollout, rollback, documentation, and support effects.

## Outputs

Findings by impact, architecture decision, validation matrix, risks, cut list, and approval status.

## Quality Bar

Recommendations are source-backed, beginner-explainable, and proportionate to current scope.

## References

- [Game Architecture](../../../principles/game-development/game-architecture.md)
- [Game Architecture Template](../../../templates/game-development/game-architecture.md)
