---
name: scene-flow-planner
description: Map game screens, runtime scenes, and transitions.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
title: "Scene Flow Planner"
domain: "game-development"
source_paths: ["apt-principles-agents/skills/game-development/scene-flow-planner/SKILL.md"]
---

# Scene Flow Planner

## Purpose

Make start, play, pause, failure, success, and exit behavior explicit.

## When to Use

Use when scene ownership, transitions, loading, reset, or navigation is unclear.

## Inputs

Scene list, entry points, game states, controls, save behavior, target platforms, and failure cases.

## Process

1. List each scene’s single purpose and authoritative owner.
2. Map allowed transitions and their triggers.
3. Define data passed, retained, reset, or loaded.
4. Cover pause, restart, focus loss, errors, and unavailable saves.
5. Remove scenes that can be a state or reusable overlay.
6. Assign tests, owner, documentation, rollback, and next increment.

## Outputs

Scene-flow diagram, transition contract, state-lifetime notes, failure handling, and test checklist.

## Quality Bar

Every reachable scene has a clear entry, exit, recovery path, and state policy.

## References

- [Level and Scene Design](../../../principles/game-development/level-and-scene-design.md)
- [Scene Flow Template](../../../templates/game-development/scene-flow.md)
