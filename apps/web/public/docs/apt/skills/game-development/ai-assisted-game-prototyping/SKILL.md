---
name: ai-assisted-game-prototyping
description: Coordinate bounded AI help for a safe, reviewable game prototype.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
title: "AI-Assisted Game Prototyping"
domain: "game-development"
source_paths: ["apt-principles-agents/skills/game-development/ai-assisted-game-prototyping/SKILL.md"]
---

# AI-Assisted Game Prototyping

## Purpose

Use AI to accelerate learning and implementation while retaining human ownership and playable validation.

## When to Use

Use for framing, alternatives, scaffolding, explanation, small code changes, asset experiments, tests, or documentation.

## Inputs

Approved concept, exact project sources, constraints, chosen stack, prototype question, asset/license policy, secrets policy, and human owner.

## Process

1. Give the agent one bounded outcome and exact evidence.
2. Require assumptions, exclusions, output contract, and validation.
3. Request small reviewable increments and beginner explanations.
4. Run generated code; inspect dependencies, state, security, rights, and failure behavior.
5. Playtest the resulting experience rather than accepting code completion.
6. Record decisions, provenance, owner, cuts, rollout, rollback, and escalation.

## Outputs

Agent work plan, reviewed increments, prompt/decision record, validation evidence, risks, and next playable step.

## Quality Bar

No generated claim or asset is treated as verified; the human can explain, test, and maintain the result.

## References

- [AI-Assisted Game Development](../../../principles/game-development/ai-assisted-game-development.md)
- [Prototype Plan](../../../templates/game-development/prototype-plan.md)
