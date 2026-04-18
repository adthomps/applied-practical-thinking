---
docId: ai-agent-framework
slug: ai-agent-framework
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-18
title: APT AI & Agent Framework
---

# APT AI & Agent Framework (Augmentation Layer)

## Focus

- Define agent contracts, prompts, and augmentation patterns
- Describe AI integration points across the lifecycle
- Guardrails and evaluation for agent behavior

## Principles

- Keep prompts file-based and versioned
- Agents augment decisions and execution, not replace them
- Deterministic inputs lead to reliable outputs

## Outputs

- Agent runbooks and prompt templates
- Evaluation frameworks and metrics
- Integration contracts for knowledge engine and tooling


Draft candidate for AI & Agent Framework.

## Integration Patterns

- File-based prompts stored under `apps/web/ai/prompts` and versioned with docs
- Agents call deterministic services (knowledge index, evaluation sandbox) with signed inputs
- Human-in-the-loop approvals for high-impact outputs

## Evaluation & Guardrails

- Define evaluation metrics: correctness, hallucination rate, latency, safety violations
- Keep evaluation pipelines reproducible and attach results to review bundles
- Use throttles, rate limits, and permissioned access for sensitive operations

## Checklist

- [ ] Prompts stored and versioned in `apps/web/ai/prompts`
- [ ] Integration contracts are defined for agent inputs/outputs
- [ ] Evaluation harness exists for automated checks

## Roles

- AI Owners: own prompt updates and evaluation thresholds
- Engineers: implement agent integrations and instrument telemetry
- Reviewers: validate outputs during preview and release

