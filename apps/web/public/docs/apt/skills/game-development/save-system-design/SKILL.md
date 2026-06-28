---
name: save-system-design
description: Design small, versioned, recoverable save data.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
title: "Save System Design"
domain: "game-development"
source_paths: ["apt-principles-agents/skills/game-development/save-system-design/SKILL.md"]
---

# Save System Design

## Purpose

Preserve intended progress and settings without coupling saves to transient runtime objects.

## When to Use

Use when a prototype must survive restart, support profiles, or evolve stored data.

## Inputs

Durable fields, state model, storage platform, privacy/security constraints, versions, and recovery expectations.

## Process

1. Decide whether the prototype needs saving at all.
2. Select the smallest durable data set and schema version.
3. Define defaults, validation, write timing, and atomicity where available.
4. Plan missing, corrupt, old, partial, and interrupted data behavior.
5. Define migration, reset, backup, privacy, and player messaging.
6. Assign tests, owner, support documentation, rollout, and rollback.

## Outputs

Save contract, lifecycle, migration/recovery policy, tests, risks, and open questions.

## Quality Bar

Save failures are safe and understandable; secrets and unnecessary personal data are excluded.

## References

- [Game State and Save Data](../../../principles/game-development/game-state-and-save-data.md)
- [Save System Template](../../../templates/game-development/save-system.md)
