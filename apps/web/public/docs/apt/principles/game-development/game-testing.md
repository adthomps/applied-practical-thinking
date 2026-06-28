---
title: Game Testing
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/principles/game-development/game-testing.md"]
---

# Game Testing

## Principle

Game quality combines correctness with player experience. Automated checks find repeatable failures; playtests reveal understanding, feeling, and behavior.

## Test Layers

- Test rules, state transitions, saves, input mapping, and deterministic calculations automatically.
- Smoke-test start, play, pause, restart, scene transitions, failure, success, and exit on target builds.
- Playtest one research question at a time with representative players.
- Check performance, accessibility, compatibility, privacy, and platform requirements in proportion to scope.

## Playtest Discipline

Do not teach during observation unless the test explicitly evaluates instruction. Record behavior separately from interpretation. Ask neutral follow-up questions. Prioritize blockers to the core loop before preferences or feature requests.

Every finding needs evidence, severity, owner, decision, validation method, and status.
