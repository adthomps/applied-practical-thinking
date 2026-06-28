---
title: Input and Controls
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/principles/game-development/input-and-controls.md"]
---

# Input and Controls

## Principle

Controls translate human intent into game actions. Design actions first, then map devices, so gameplay rules are not coupled to individual keys or buttons.

## Practice

Define action names, context, supported devices, press/hold/release behavior, timing, conflicts, and feedback. Start with one device and a small action set. Provide remapping when scope permits, sensible defaults, pause, and a way to recover from accidental input.

## Quality Checks

Test keyboard, pointer, touch, or controller only when each is an actual target. Check focus loss, repeated input, simultaneous actions, menus versus gameplay, different hand abilities, and instructions that match the active device.

Responsive controls require consistent simulation timing and immediate visible or audible acknowledgement.
