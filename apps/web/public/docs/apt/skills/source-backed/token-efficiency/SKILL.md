---
name: token-efficiency
description: Use when reducing repeated context, selecting context packs, compressing prompts, setting token budgets, or deciding whether to escalate model tiers.
title: "Token Efficiency"
kind: "skill"
domain: "source-backed"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/skills/token-efficiency/SKILL.md"]
---

# Token Efficiency

## Purpose
Keep agent workflows local-first, context-aware, and cost controlled.

## Process

1. Classify the task and choose a budget class: `tiny`, `small`, `medium`, or `large`.
2. Load only the relevant context packs.
3. Prefer catalogs and manifests over rereading every tool-native file.
4. Summarize repeated context once and reuse that summary.
5. Escalate models only when capability, context, or risk requires it.
6. Record the context packs and escalation reason in the task packet.

## Output

Return token budget, selected context packs, skipped context, compression notes, and escalation recommendation.

## When to Use

Use when context size, repeated source loading, model cost, or long-running agent work needs a deliberate evidence-preserving context strategy.

## Inputs

Task, authoritative sources, context budget, risk classification, expected output, and verification requirements.

## Outputs

A compact context packet, omitted-source record, token/risk tradeoff, and verification plan.

## Quality Bar

Compression preserves decisive evidence, names omissions, and never substitutes for exact-source review in high-accuracy work.

## References

See the AI principles, token-efficiency standard, context-pack guidance, and model-routing policy.
