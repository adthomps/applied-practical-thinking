---
title: Payment API Simulation Game
kind: example
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
domain: "game-development"
source_paths: ["apt-principles-agents/examples/game-development/payment-api-simulation-game/README.md"]
---

# Payment API Simulation Game

## Scenario

Process fictional sandbox transactions, interpret outcomes, and choose the next safe support action.

## Audience

Developers, support learners, and product teams studying payment lifecycle concepts.

## Beginner Goal

Learn that authorization, capture, decline, refund, dispute, settlement, and funding are distinct states and that provider behavior must be verified.

## Core Game Loop

Read a fictional order/event → choose an action → receive a simulated state transition and explanation → inspect evidence → continue.

## Minimum Playable Prototype

Five authored scenarios, a small fictional state machine, three actions per scenario, feedback, score/explanation, and reset. No live credentials, money movement, or provider claims.

## Suggested Stack

React for text/state-heavy learning, Phaser for a game-like canvas, or a simple web prototype.

## Relevant Principles

[Game State](../../../principles/game-development/game-state-and-save-data.md), [Payments](../../../principles/payments/README.md), and [AI-Assisted Development](../../../principles/game-development/ai-assisted-game-development.md).

## Relevant Skills

[Game State Design](../../../skills/game-development/game-state-design/SKILL.md), [Mechanics Designer](../../../skills/game-development/mechanics-designer/SKILL.md), and existing payment/API review skills.

## Relevant Agents

APT Game Designer, Game Testing Reviewer, payment/API specialists, and a beginner reviewer.

## Example Feature Roadmap

Fictional lifecycle model → one scenario → feedback/explanation → five cases → beginner/payment review.

## What To Cut If Scope Grows Too Large

Live APIs, real credentials, provider branding, real fraud decisions, money values tied to users, accounts, multiplayer, and exhaustive payment behavior.

## Open Questions

- Which learning outcomes and verified sources own each scenario?
- Which payment expert approves the fictional model and disclaimers?
