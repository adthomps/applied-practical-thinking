---
title: Game State and Save Data
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/principles/game-development/game-state-and-save-data.md"]
---

# Game State and Save Data

## Principle

Game state is the current truth needed to run play. Save data is a deliberate, versioned subset that survives a session. Do not treat them as the same object.

## Practice

List state by lifetime: frame, scene, run, profile, and account. Name its owner, valid transitions, reset behavior, and consumers. Save only durable player progress and settings. Add a schema version, defaults, validation, atomic writes where available, and a recovery path for missing or corrupt data.

## Safety

Never place secrets in client saves. Treat externally supplied or synchronized data as untrusted. For online games, explicitly define client and server authority.

## Evidence

Test new game, save, load, restart, reset, partial/corrupt data, incompatible version, and interrupted write. The player receives a safe, understandable outcome.
