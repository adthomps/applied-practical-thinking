---
title: AI & Agents Principle
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# AI & Agents

**Principle:** AI accelerates structured work without bypassing APT doctrine, security, or validation gates.

AI follows the system — it does not invent architecture, standards, or patterns outside defined rules.

## Core Rules

- Agents must use canonical docs and existing patterns, not invent new standards.
- Prompts must specify layer (thinking, design, architecture, build, validation, release, support, documentation).
- Good agent work requires explicit context: sources, constraints, expected artifacts, and output format.
- Agents may suggest alternatives; implementation must respect boundaries and review gates.
- Human approval is required for destructive actions, secrets access, production deploys, and security-sensitive changes.

## Agent Contract (required for durable prompts)

Every agent prompt must define:

- Role
- Task
- Canonical sources to read
- In-scope work
- Out-of-scope work
- Expected output format
- Validation requirements
- Escalation conditions

## Enforcement Points

- Agents must not bypass authentication, authorization, or validation gates.
- AI-generated code follows the same review process as human code.
- Prompts governing repeated work belong in `prompts/`.
- Agents must report assumptions, changed files, validation outcome, and residual risk.

## Canonical Doc

`ai-agent-framework.md` — full principles, agent contract, review bundle standard, health/finance domain safety, and examples.

## Related Build Kit

- `checklists/ai-agent-review-checklist.md`
- `examples/ai-agent/agent-prompt-contract-example.md`
- `examples/ai-agent/workspace-knowledge-example.md`
- `prompts/framework-review-prompt.md`
- `prompts/workspace-knowledge-prompt.md`
- `references/ai-review-bundle.json`
