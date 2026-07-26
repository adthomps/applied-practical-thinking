---
title: Game Architecture
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/principles/game-development/game-architecture.md"]
---

# Game Architecture

## Principle

Architecture should make the next playable change safe and understandable. Begin with clear boundaries; add patterns only when repeated pressure appears.

## Core Boundaries

Separate input intent, simulation rules, game state, presentation, audio, persistence, assets, and platform services. Scenes organize runtime flow. Entities represent game things; components hold focused capabilities or data when composition is useful. Keep configuration outside deeply embedded logic so values can be tuned.

## Beginner Structure

Use a small project tree for scenes, scripts, assets, UI, audio, data, and tests. Establish one owner for authoritative state. Avoid global mutable state, frame-rate-dependent rules, hidden scene coupling, and save formats tied directly to transient objects.

## Review

Trace start-up, one core-loop action, scene transition, pause/restart, failure, and save/load. Record tradeoffs, failure behavior, observability, migration needs, and the simplest rollback.
