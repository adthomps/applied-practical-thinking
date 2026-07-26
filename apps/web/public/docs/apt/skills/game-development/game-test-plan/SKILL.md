---
name: game-test-plan
description: Build a layered correctness, compatibility, and playtest plan.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
title: "Game Test Plan"
domain: "game-development"
source_paths: ["apt-principles-agents/skills/game-development/game-test-plan/SKILL.md"]
---

# Game Test Plan

## Purpose

Define proportionate evidence that the game works and the core experience is understandable.

## When to Use

Use before a prototype review, milestone, playtest, release, or risky system change.

## Inputs

Build, loop, mechanics, state, saves, inputs, target devices, quality risks, acceptance criteria, and release owner.

## Process

1. Rank risks by player impact and likelihood.
2. Add automated checks for rules and transitions.
3. Define smoke paths for start, play, pause, restart, failure, success, save/load, and exit.
4. Add target-device, performance, accessibility, privacy, and recovery checks as applicable.
5. Define one-question playtests and neutral observation.
6. Assign evidence, owner, triage, retest, rollout, rollback, and support handoff.

## Outputs

Test matrix, playtest plan, environments, severity rules, evidence location, and release gate.

## Quality Bar

Tests cover the complete playable path and failures, not merely happy-path features.

## References

- [Game Testing](../../../principles/game-development/game-testing.md)
- [Playtest Plan](../../../templates/game-development/playtest-plan.md)
