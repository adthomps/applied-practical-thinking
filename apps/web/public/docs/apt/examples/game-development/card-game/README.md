---
title: Card Game
kind: example
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/examples/game-development/card-game/README.md"]
---

# Card Game

## Scenario

Play one of three cards to beat a predictable opponent over five turns.

## Audience

A beginner learning turn state, explicit rules, UI selection, and deterministic tests.

## Beginner Goal

Implement and explain one complete turn-based match.

## Core Game Loop

Read state → choose a card → resolve both actions → receive outcome feedback → draw/continue.

## Minimum Playable Prototype

Three card types, fixed small decks, one opponent rule, five turns, score, and end screen.

## Suggested Stack

React for interface-heavy play, Phaser for canvas presentation, or Godot/Unity if engine learning is the goal.

## Relevant Principles

[Mechanics](../../../principles/game-development/game-mechanics.md), [Architecture](../../../principles/game-development/game-architecture.md), and [Testing](../../../principles/game-development/game-testing.md).

## Relevant Skills

[Mechanics Designer](../../../skills/game-development/mechanics-designer/SKILL.md) and [Game Test Plan](../../../skills/game-development/game-test-plan/SKILL.md).

## Relevant Agents

APT Game Designer, Game Architect, and Game Testing Reviewer.

## Example Feature Roadmap

Rule model/tests → basic hand UI → opponent turn → match ending → playtest wording.

## What To Cut If Scope Grows Too Large

Deck building, collectible rarity, animation, networking, accounts, economy, and many card effects.

## Open Questions

- What choice makes each turn meaningful?
- Which rules must be visible before selection?
