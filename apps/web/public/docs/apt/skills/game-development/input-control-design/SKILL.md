---
name: input-control-design
description: Define action-based controls and device behavior.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
title: "Input Control Design"
domain: "game-development"
source_paths: ["apt-principles-agents/skills/game-development/input-control-design/SKILL.md"]
---

# Input Control Design

## Purpose

Translate player intent into consistent, testable game actions.

## When to Use

Use when selecting controls, adding a device, supporting remapping, or diagnosing poor control feel.

## Inputs

Game actions, target devices, contexts, timing needs, accessibility constraints, and current mappings.

## Process

1. Name semantic actions before keys or buttons.
2. Define contexts, press/hold/release behavior, conflicts, and feedback.
3. Choose one prototype device and sensible defaults.
4. Specify pause, focus loss, simultaneous input, and accidental-action recovery.
5. Test instructions against the active device.
6. Record mappings, owner, evidence, deferred devices, and rollback.

## Outputs

Action map, device mappings, edge cases, accessibility notes, tests, and cut list.

## Quality Bar

Controls are responsive, teachable, context-safe, and decoupled from gameplay rules.

## References

- [Input and Controls](../../../principles/game-development/input-and-controls.md)
- [Input Controls Template](../../../templates/game-development/input-controls.md)
