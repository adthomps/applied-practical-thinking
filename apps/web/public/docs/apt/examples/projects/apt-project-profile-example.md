---
title: APT Project Profile Example
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# APT Project Profile Example

## Context

APT projects need a consistent way to describe what they are, which principles they demonstrate, how mature they are, and whether they should appear in the public Applied Practical Thinking portfolio.

## Problem

Without a profile standard, real projects and conceptual demos can blur together. That makes public storytelling weaker and makes it harder for future projects to reuse working patterns from `apt-coach`, `apt-dream-to-reality`, `apt-novel-reviewer`, `apt-payment-rpc-api`, `crt-world`, and future APT projects.

## APT Principles Applied

- Thinking: clarify the audience, purpose, and success criteria.
- Design: present the project honestly and consistently.
- Architecture: name the system shape and boundaries.
- Knowledge System: capture reusable learning.
- AI & Agent Framework: identify where AI is used and bounded.
- Release & Change Management: describe maturity without overstating readiness.

## Solution

Create a project profile for each APT project using the same fields. The profile can live in `docs/apt/project-profile.md`, be represented as JSON matching `references/project-profile.schema.json`, and feed the public portfolio view in `applied-practical-thinking`.

## Example Structure

```yaml
project: apt-coach
purpose: A coaching and guidance product that applies APT thinking to user goals.
audience:
  - builders
  - learners
  - project owners
adoption_mode: showcase
principles_demonstrated:
  - thinking
  - ai-agent-framework
  - knowledge-system
architecture_pattern: web app plus AI-assisted guidance layer
ai_agent_usage: bounded coaching prompts with source-aware responses
security_model: authenticated user sessions for private coaching state
learning_value: demonstrates how APT doctrine becomes an interactive product
reusable_artifacts:
  - coaching prompt contracts
  - onboarding flow patterns
  - validation reports
maturity: active
showcase:
  include: true
  summary: A real APT product example showing guided thinking, AI assistance, and reusable learning loops.
```

The same structure can describe `apt-dream-to-reality`, `apt-novel-reviewer`, `apt-payment-rpc-api`, `crt-world`, and future APT projects with project-specific evidence.

## Tradeoffs

A shared profile structure creates some upfront documentation work, but it prevents the portfolio site from relying on inconsistent marketing copy. Projects can still add richer case studies when needed.

## Common Mistakes

- Treating an idea as an active project without maturity evidence.
- Omitting security, AI, or architecture notes because they are uncomfortable.
- Copying a project profile into public content without checking current status.
- Rewriting APT doctrine inside a project profile instead of linking to canonical docs.

## Related Documents

- `../../apt-principles.md`
- `../../knowledge-system.md`
- `../../templates/project-adoption-template.md`
- `../../checklists/project-adoption-checklist.md`
- `../../references/project-profile.schema.json`
