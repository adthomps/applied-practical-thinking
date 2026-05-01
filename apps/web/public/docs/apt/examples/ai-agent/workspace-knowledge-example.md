---
title: Workspace Knowledge Example
version: v1
last_updated: 2026-04-28
owner: APT
status: draft
---

# Workspace Knowledge Example

## Context

A project team wants reusable workspace rules for tools such as Lovable and Figma Make. These tools can generate UI, copy, components, and code-like artifacts across multiple projects, so they need shared APT boundaries before generation starts.

## Problem

Without workspace knowledge, tools may invent visual language, ignore architecture boundaries, use raw colors, skip states, create marketing-heavy copy, or produce work that cannot be validated against APT doctrine.

## APT Principles Applied

- Thinking: start with user, problem, constraints, and success criteria.
- Design: use tokens, complete states, calm motion, and consistent interaction patterns.
- Architecture: keep ownership and boundaries explicit.
- System standards: use shared naming, contracts, and reusable patterns.
- Security: do not expose secrets or bypass validation.
- Knowledge: point tools to canonical sources instead of relying on hidden memory.
- AI: define scope, sources, output format, and approval boundaries.

## Solution

Paste a compact workspace knowledge block into the tool and adapt only the project-specific placeholders.

Lovable or Figma Make workspace knowledge example:

```text
Use Applied Practical Thinking (APT) as the governing framework.

Canonical source:
https://github.com/adthomps/apt-principles

Default behavior:
- Frame the user, problem, constraints, and success criteria before proposing screens or implementation.
- Use existing project structure, tokens, components, naming, and patterns before inventing new ones.
- Keep assumptions visible and call out decisions that need human review.

Design:
- Use token-based styling only.
- Keep the experience dark-first unless a project decision says otherwise.
- Use blue for brand identity, primary calls to action, links, focus rings, and high-frequency action emphasis.
- Use the restricted accent only for explicit support semantics such as section identity, selected support states, badges, callouts, charts, and success treatment.
- Use neutral surfaces for default navigation, secondary actions, inactive tabs, cards, panels, and disabled surfaces.
- Use danger, warning, and success colors only for semantic feedback, not decoration.
- Include loading, empty, success, error, disabled, permission, offline, and degraded states when relevant.
- Keep copy concise, precise, and non-marketing.

Architecture:
- Keep UI presentational unless the project defines a different boundary.
- Do not put business logic, API contracts, auth decisions, or secrets in visual components.
- Prefer reusable components and documented patterns over one-off screens.

Quality:
- Identify validation evidence needed before work is considered done.
- Call out accessibility, contrast, responsive layout, keyboard/focus, and state coverage.
- Do not claim production readiness without tests, review evidence, or explicit approval.

Output:
- Give a concise recommendation or implementation plan.
- Name the APT principles applied.
- List assumptions, risks, and validation still needed.
```

## Tradeoffs

A short workspace block is easier to paste into tools, but it cannot contain every APT rule. It should point to the canonical repository and preserve only the highest-impact behavior that prevents drift.

## Common Mistakes

- Copying the entire doctrine into a tool until the important rules are buried.
- Omitting the canonical repository link.
- Letting generated UI introduce raw colors or unsupported styling.
- Treating teal as the default CTA color instead of a restrained accent.
- Using danger, warning, or success colors as decoration instead of semantic feedback.
- Asking the tool to build without naming states, validation, or project boundaries.
- Mixing project-specific stack rules into canonical APT doctrine.

## Implementation Notes

Keep tool workspace knowledge separate from local project adoption docs. If a project needs stack-specific rules, store them in that project and point back to `https://github.com/adthomps/apt-principles` as the APT source of truth.

When a tool produces reusable rules that improve APT itself, promote them back into `prompts/`, `examples/`, or the relevant canonical doctrine file instead of leaving them hidden in a tool setting.

## Related Documents

- `../../prompts/workspace-knowledge-prompt.md`
- `../../ai-agent-framework.md`
- `../../knowledge-system.md`
- `../../design.md`
- `../../architecture.md`
- `../../system-standards.md`
- `../../checklists/ai-agent-review-checklist.md`
