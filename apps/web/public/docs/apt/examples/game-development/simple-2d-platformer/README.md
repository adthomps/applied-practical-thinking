---
title: Simple 2D Platformer
kind: example
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/examples/game-development/simple-2d-platformer/README.md"]
---

# Simple 2D Platformer

## Scenario

Reach a flag by moving and jumping across one short level.

## Audience

A first-time developer learning input, collision, scenes, and feedback.

## Beginner Goal

Finish one level with responsive movement, restart, and an ending.

## Core Game Loop

Move and jump → avoid gaps → receive position/landing feedback → reach the flag or retry.

## Minimum Playable Prototype

One character, static platforms, one hazard, one checkpoint or quick restart, one goal, and placeholder shapes.

## Suggested Stack

Godot or Unity for an editor-led route; Phaser or Canvas for a web-first route. Choose through project constraints, not this example.

## Relevant Principles

[Game Loop](../../../principles/game-development/game-loop-design.md), [Scope](../../../principles/game-development/scope-control.md), and [Input](../../../principles/game-development/input-and-controls.md).

## Relevant Skills

[Prototype Planner](../../../skills/game-development/prototype-planner/SKILL.md) and [Input Control Design](../../../skills/game-development/input-control-design/SKILL.md).

## Relevant Agents

APT Game Development Coach, Gameplay Reviewer, and Scope Guardian.

## Example Feature Roadmap

Movement proof → one gray-box level → feedback/restart → playtest → optional second challenge.

## What To Cut If Scope Grows Too Large

Enemies, moving platforms, collectibles, animation sets, story, procedural levels, and multiple devices.

## Open Questions

- What movement feeling is intended?
- Which single target device and platform matter first?
