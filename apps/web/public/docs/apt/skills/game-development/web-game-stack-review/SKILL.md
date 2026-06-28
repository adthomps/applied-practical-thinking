---
name: web-game-stack-review
description: Review browser game stack choices and delivery constraints.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
title: "Web Game Stack Review"
domain: "game-development"
source_paths: ["apt-principles-agents/skills/game-development/web-game-stack-review/SKILL.md"]
---

# Web Game Stack Review

## Purpose

Choose the lightest browser stack that supports the intended interaction and deployment.

## When to Use

Use for browser mini games, shareable prototypes, educational simulations, or web-first interactive experiences.

## Inputs

Game dimensionality, UI needs, target browsers/devices, performance budget, hosting, accessibility, offline needs, coding comfort, and maintenance owner.

## Process

1. Separate DOM-heavy interface needs from canvas or WebGL play.
2. Compare plain Canvas, React/Canvas, Phaser, and Three.js against the actual prototype.
3. Verify browser, asset, input, audio, and deployment constraints in current official sources.
4. Inspect bundle, startup, resize, focus, touch, and persistence behavior.
5. Remove libraries that do not reduce project risk.
6. Record tests, owner, rollout, rollback, and support expectations.

## Outputs

Stack recommendation, architecture sketch, browser matrix, performance risks, and cut list.

## Quality Bar

The choice has a runnable proof on the target browser and a maintainable ownership path.

## References

- [Game Architecture](../../../principles/game-development/game-architecture.md)
- [Release Checklist](../../../templates/game-development/release-checklist.md)
