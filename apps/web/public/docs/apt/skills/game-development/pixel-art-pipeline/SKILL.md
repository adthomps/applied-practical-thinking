---
name: pixel-art-pipeline
description: Define a small, consistent, rights-aware pixel-art workflow.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
title: "Pixel Art Pipeline"
domain: "game-development"
source_paths: ["apt-principles-agents/skills/game-development/pixel-art-pipeline/SKILL.md"]
---

# Pixel Art Pipeline

## Purpose

Keep 2D assets consistent, replaceable, correctly licensed, and efficient to integrate.

## When to Use

Use when a prototype needs sprites, tiles, animation, atlases, or AI-assisted pixel assets.

## Inputs

Visual goal, reference rights, target resolution, grid, palette, animation list, engine import rules, performance budget, and asset owner.

## Process

1. Define canvas, grid, scale, palette, origin, naming, and export format.
2. Inventory only core-loop assets and mark placeholders.
3. Create one representative asset and test it in game.
4. Normalize dimensions, pivots, frames, collision guidance, and import settings.
5. Record source, license, attribution, AI provenance, and replacement status.
6. Validate animation, scaling, packaging, owner, and rollback asset.

## Outputs

Asset specification, inventory, provenance register, import checklist, preview, and cut list.

## Quality Bar

Assets render consistently in the target build and have clear rights and replacement ownership.

## References

- [Audio and Feedback](../../../principles/game-development/audio-and-feedback.md)
- [Asset List](../../../templates/game-development/asset-list.md)
