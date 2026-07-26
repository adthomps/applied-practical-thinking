---
title: APT Principles Index
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
kind: "principle"
domain: "quick-reference"
source_paths: ["apt-principles/principles/README.md"]
---

# APT Principles

This directory contains concise principle cards — one per APT lifecycle layer.

Each card is a quick-reference summary. The canonical source of truth for each principle lives in the root doctrine file listed under **Canonical doc** on every card. Read the canonical doc for full rules, examples, prompts, and checklists.

## Principle Cards

| Principle | Card | Canonical Doc |
|-----------|------|--------------|
| Outcomes | [outcomes.md](outcomes.md) | `apt-principles-agents.md` |
| Thinking | [thinking.md](../thinking/README.md) | `thinking.md` |
| Design | [design.md](../design/README.md) | `design.md` |
| Architecture | [architecture.md](../architecture/README.md) | `architecture.md` |
| Delivery | [delivery.md](delivery.md) | `execution.md`, `release-change-management.md` |
| Operations | [operations.md](operations.md) | `operations-support.md` |
| Security | [security.md](../security-risk/README.md) | `security.md` |
| AI & Agents | [ai.md](ai.md) | `ai-agent-framework.md` |
| Learning | [learning.md](learning.md) | `knowledge-system.md` |

## What a Principle Card Is Not

A principle card does not replace the canonical doc. It does not contain examples, prompts, or deep-dive rules. Use the canonical doc when:

- Reviewing a PR against APT standards
- Writing a checklist or prompt
- Deciding whether a pattern violates a rule
- Onboarding a new team member or AI agent

Use a principle card when:

- You need a 30-second reminder of the principle's core statement
- You are navigating the principles index
- You are linking to the principle from an overview doc
