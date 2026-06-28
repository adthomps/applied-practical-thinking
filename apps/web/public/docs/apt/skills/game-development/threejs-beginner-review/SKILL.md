---
name: threejs-beginner-review
description: Review whether Three.js fits a beginner 3D web experience.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
title: "Three.js Beginner Review"
domain: "game-development"
source_paths: ["apt-principles-agents/skills/game-development/threejs-beginner-review/SKILL.md"]
---

# Three.js Beginner Review

## Purpose

Evaluate Three.js for a focused 3D browser experience without assuming it supplies a full game engine.

## When to Use

Use for web-first 3D exploration, visualization, or simple gameplay when direct scene control is desired.

## Inputs

Concept, target browsers/devices, JavaScript comfort, models, camera/control needs, gameplay systems, performance budget, and current [Three.js documentation](https://threejs.org/docs/).

## Process

1. Verify current renderer, loader, browser, and deployment requirements.
2. List systems the project must provide around rendering: loop, input, collision, state, UI, audio, and saves.
3. Build or inspect one interaction with a representative asset.
4. Check loading, disposal, resize, controls, frame timing, and fallback behavior.
5. Compare with Phaser or an engine if game systems dominate.
6. Record evidence, owner, tests, rollout, rollback, and cuts.

## Outputs

Fit assessment, runtime map, missing-system inventory, performance risks, and prototype plan.

## Quality Bar

The plan accounts for both rendering and required game systems, with a tested device target.

## References

- [Web Game Stack Review](../web-game-stack-review/SKILL.md)
- [Game Architecture Template](../../../templates/game-development/game-architecture.md)
