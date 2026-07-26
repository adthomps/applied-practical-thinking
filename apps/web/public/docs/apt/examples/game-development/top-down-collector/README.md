---
title: Top-Down Collector
kind: example
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/examples/game-development/top-down-collector/README.md"]
---

# Top-Down Collector

## Scenario

Collect five objects in a small room before time expires.

## Audience

A beginner learning movement, triggers, counters, state, and scene completion.

## Beginner Goal

Build a complete start-to-success/failure loop.

## Core Game Loop

Navigate → find and collect → update count/time feedback → choose the next object → finish or retry.

## Minimum Playable Prototype

One room, one player, five identical collectibles, a timer, counter, and restart.

## Suggested Stack

Godot, Unity, Phaser, or React/Canvas depending on target and coding comfort.

## Relevant Principles

[Mechanics](../../../principles/game-development/game-mechanics.md), [State](../../../principles/game-development/game-state-and-save-data.md), and [UI/HUD](../../../principles/game-development/game-ui-and-hud.md).

## Relevant Skills

[Mechanics Designer](../../../skills/game-development/mechanics-designer/SKILL.md) and [Game State Design](../../../skills/game-development/game-state-design/SKILL.md).

## Relevant Agents

APT Game Designer, Game UI Reviewer, and Beginner Game Dev Reviewer.

## Example Feature Roadmap

Movement → collection/state → timer/endings → feedback → one observed playtest.

## What To Cut If Scope Grows Too Large

Inventory, multiple maps, enemy AI, item types, upgrades, online scoreboards, and save profiles.

## Open Questions

- Is exploration or time pressure the intended feeling?
- What feedback makes collection unmistakable?
