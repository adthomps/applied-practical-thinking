---
title: Game UI and HUD
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/principles/game-development/game-ui-and-hud.md"]
---

# Game UI and HUD

## Principle

Game UI helps players decide and act; the HUD shows information needed during play. Every element should earn its attention cost.

## Practice

Rank information by urgency and frequency. Keep the playfield visible. Show state changes near the cause when possible, use consistent symbols and language, and provide redundant cues for critical events. Design start, pause, failure, success, settings, and restart as one connected flow.

## Beginner Guardrails

Use simple layout rules and reusable components. Avoid building a complete design system before the loop works. Test common screen sizes and long text. Do not rely on color, sound, or animation alone.

## Evidence

Players can identify the goal, important state, available action, and recovery path quickly without the developer explaining the interface.
