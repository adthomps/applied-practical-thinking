---
title: APT AI & Agent Framework (Augmentation Layer)
version: v1
last_updated: 2026-04-24
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
- AI must not bypass authentication, authorization, validation, or release gates.
- AI routes and prompts in applications should be explicit, versioned, and reviewable.
- Agents must report assumptions, changed files, validation, and residual risk.
- Human approval is required for destructive actions, secrets, production deploys, and security-sensitive changes.

## Required Artifacts

- Prompt contract
- Source docs to read
- Allowed tools and boundaries
- Expected output format
- Validation criteria
- Review or approval requirements

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

## Review Bundle Standard

AI review should use a repeatable bundle of lenses: thinking clarity, design-system alignment, architecture boundaries, system standards, security, quality/testing, release readiness, operations, and knowledge capture.

Review output should prioritize findings by severity, cite evidence, name the violated standard, recommend correction, and call out residual risk. The portable reference is `references/ai-review-bundle.json`.

## Good Example

An architecture review prompt points to `architecture.md`, `system-standards.md`, and `security.md`, asks for findings by severity, and requires file/path evidence instead of generic advice.

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

## Related Documents

- `knowledge-system.md`
- `execution.md`
- `quality-testing.md`
- `security.md`

## Summary

The AI layer helps APT move faster while staying bounded by doctrine, evidence, and human accountability.
