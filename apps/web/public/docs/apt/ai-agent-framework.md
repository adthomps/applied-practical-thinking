---
title: APT AI & Agent Framework (Augmentation Layer)
version: v1
last_updated: 2026-05-01
owner: APT
status: draft
---

# APT AI & Agent Framework

## Overview

APT AI & Agent Framework defines how AI is used as an augmentation layer across thinking, design, architecture, build, validation, release, operations, and knowledge.

AI answers:

- What sources should the agent trust?
- What is the allowed scope?
- Which tools may be used?
- What output format is required?
- Which human approvals are needed?

## Purpose

AI should accelerate structured work without bypassing APT doctrine, repo boundaries, security, or validation gates.

## Core Principles

### 1. AI follows the system

Agents must use canonical docs, repo structure, and existing patterns rather than inventing new standards.

### 2. Prompts map to APT layers

Prompts should specify whether they are framing, designing, architecting, building, validating, releasing, supporting, or documenting.

### 3. Deterministic inputs produce better outputs

Good agent work depends on explicit context, sources, constraints, expected artifacts, and output format.

### 4. Guardrails over creativity in production

Agents may suggest alternatives, but implementation must respect boundaries, security, and review gates.

### 5. AI enhances execution, not direction

AI can help reason, draft, refactor, test, and document. It should not silently decide product direction or mutate production systems.

## Standards / Rules

- Prompts that govern repeated work belong in `prompts/`.
- Project-specific AI instructions should name commands, paths, boundaries, and validation expectations.
- `apt-principles` owns canonical AI doctrine, review criteria, prompts, examples, and reference contracts.
- `apt-agent-standards` owns cross-project installation, profile manifests, `.agent-standards.json`, tool-native file distribution, and sync behavior.
- Installed tool-native files such as `AGENTS.md`, `.claude/`, `.codex/`, and `.github/` should not become competing doctrine sources.
- AI must not bypass authentication, authorization, validation, or release gates.
- AI routes and prompts in applications should be explicit, versioned, and reviewable.
- AI workflows should define deterministic fallback behavior for provider failure, missing context, low confidence, or policy-sensitive input.
- Reusable prompts should include evaluation cases or dry-run examples that prove the output can be reviewed.
- High-stakes domains such as health, finance, legal, safety, security, payments, and identity require explicit escalation, refusal, or referral rules.
- Agents must report assumptions, changed files, validation, and residual risk.
- Human approval is required for destructive actions, secrets, production deploys, and security-sensitive changes.

## Required Artifacts

- Prompt contract
- Source docs to read
- Allowed tools and boundaries
- Expected output format
- Validation criteria
- Review or approval requirements
- Evaluation cases or dry-run outputs for reusable prompts
- Fallback and escalation behavior for low-confidence, unavailable, or high-risk AI paths

## Agent Contract

Every durable agent prompt should define:

- role
- task
- canonical sources
- in-scope work
- out-of-scope work
- output format
- validation requirements
- escalation conditions

Health, fitness, biometric, finance, legal, safety, and other high-stakes or high-confidence-risk domains require stricter contracts. Prompts in those areas must name the data boundary, identify whether guidance is informational or professional advice, define referral/escalation conditions, and preserve a deterministic fallback when AI refinement fails.

## Review Bundle Standard

AI review should use a repeatable bundle of lenses: thinking clarity, design-system alignment, architecture boundaries, system standards, security, quality/testing, release readiness, operations, and knowledge capture.

Review output should prioritize findings by severity, cite evidence, name the violated standard, recommend correction, and call out residual risk. The portable reference is `references/ai-review-bundle.json`.

AI evaluation cases should cover at least:

- normal successful output
- missing or ambiguous source context
- forbidden action or out-of-scope request
- security-sensitive or destructive action
- provider failure or degraded fallback
- domain-specific escalation when applicable

## Agent Standards Distribution

APT agent standards are distributed through `apt-agent-standards`, not by merging installer behavior into this repository.

Use this ownership split:

- `apt-principles`: doctrine, review rules, canonical prompts, examples, references, and validation expectations
- `apt-agent-standards`: installer scripts, profile detection, profile manifests, path mapping, `.agent-standards.json`, dry-run install/sync, and cross-tool parity checks
- target repositories: local `docs/project-context.md`, local decisions, and any intentional deviations from managed installed files

When doctrine changes here, update or review `apt-agent-standards` only if installed agent files, profiles, or tool-specific prompts must change. When installed standards reveal a reusable doctrine gap, bring the improvement back to `apt-principles`.

## Good Example

An architecture review prompt points to `architecture.md`, `system-standards.md`, and `security.md`, asks for findings by severity, and requires file/path evidence instead of generic advice.

A health coaching prompt for APT Coach states that it may use only request-scoped, validated training and approved health-context inputs; it refines deterministic recommendations into non-medical coaching language; it refers users to qualified professionals for clinical concerns; and it never claims hidden data access.

## Bad Example

An inline prompt says "make this better" with no doctrine source, no boundaries, no tests, and no required evidence.

## AI Prompt Example

```text
Create an APT-aligned agent prompt.

Input:
- Task:
- Canonical sources:
- Allowed tools:
- Forbidden actions:
- Expected artifacts:

Return:
1. Prompt text
2. Guardrails
3. Validation criteria
4. Human approval points
```

## Related Checklists

- `checklists/ai-agent-review-checklist.md`

## Related Examples

- `examples/ai-agent/agent-prompt-contract-example.md`
- `examples/ai-agent/ai-evaluation-case-example.md`
- `examples/ai-agent/health-coaching-prompt-boundary-example.md`
- `examples/ai-agent/workspace-knowledge-example.md`

## Related Prompts

- `prompts/framework-review-prompt.md`
- `prompts/apt-one-shot-build-prompt.md`
- `prompts/workspace-knowledge-prompt.md`
- `prompts/architecture-review-prompt.md`
- `prompts/api-review-prompt.md`
- `prompts/security-review-prompt.md`
- `prompts/testing-review-prompt.md`

## Related References

- `references/ai-review-bundle.json`
- `references/agent-standards-contract.json`

## Related Documents

- `knowledge-system.md`
- `execution.md`
- `quality-testing.md`
- `security.md`

## Summary

The AI layer helps APT move faster while staying bounded by doctrine, evidence, and human accountability.
