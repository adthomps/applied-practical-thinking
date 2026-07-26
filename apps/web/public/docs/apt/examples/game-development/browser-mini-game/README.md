---
title: Browser Mini Game
kind: example
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/examples/game-development/browser-mini-game/README.md"]
---

# Browser Mini Game

## Scenario

Click or tap targets for thirty seconds and try to beat a local score.

## Audience

A web developer new to games who wants a shareable first build.

## Beginner Goal

Learn a frame/update loop, pointer input, spawning, score, timing, and deployment.

## Core Game Loop

Spot target → click/tap → receive score feedback → target moves → repeat until time ends.

## Minimum Playable Prototype

One page, one target, score, timer, end state, restart, responsive bounds, and no backend.

## Suggested Stack

Plain Canvas or React/Canvas for minimum setup; Phaser if scene/input helpers reduce risk.

## Relevant Principles

[Prototype First](../../../principles/game-development/prototype-first-development.md), [Input](../../../principles/game-development/input-and-controls.md), and [Testing](../../../principles/game-development/game-testing.md).

## Relevant Skills

[Web Game Stack Review](../../../skills/game-development/web-game-stack-review/SKILL.md) and [Game Test Plan](../../../skills/game-development/game-test-plan/SKILL.md).

## Relevant Agents

APT Prototype Planner, Game UI Reviewer, and Scope Guardian.

## Example Feature Roadmap

Target/input → score/timer → resize/focus → feedback → browser smoke test → static hosting.

## What To Cut If Scope Grows Too Large

Accounts, global leaderboards, multiplayer, complex effects, several modes, and backend services.

## Open Questions

- Which browsers and input types are actual targets?
- What happens when focus is lost?
