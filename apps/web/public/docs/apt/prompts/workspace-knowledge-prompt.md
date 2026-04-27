---
title: Workspace Knowledge Prompt
version: v1
last_updated: 2026-04-26
owner: APT
status: draft
---

# Workspace Knowledge Prompt

## Purpose

Provide copy-paste-ready workspace knowledge for AI-assisted product tools such as Lovable, Figma Make, code assistants, and design generators.

Use this prompt when a tool offers shared workspace rules or project-wide instructions that should apply across all future generated work.

## Input Expectations

- Target tool or workspace name.
- Project type, audience, and maturity.
- Relevant canonical APT docs from this repository.
- Local project stack, libraries, and validation commands.
- Approved brand or design-system layer.
- Known non-goals, forbidden patterns, and approval boundaries.

## Prompt

```text
Workspace Knowledge: Applied Practical Thinking (APT)

Canonical source:
- APT principles repository: https://github.com/adthomps/apt-principles
- Use APT doctrine as the source of truth for thinking, design, architecture, system standards, security, execution, quality, release, operations, knowledge, and AI behavior.

Core behavior:
- Start with the user, problem, constraints, and success criteria before proposing implementation.
- Prefer clear, structured, reusable systems over clever one-off screens or components.
- Follow existing project architecture, naming, tokens, and component patterns before inventing new ones.
- Make assumptions explicit. If a decision affects users, data, auth, public messaging, or production behavior, call out required review and validation.

Design rules:
- Use APT visual tokens and shared components instead of raw colors, spacing, radius, shadows, or motion.
- Keep the experience dark-first unless the project has an approved brand exception.
- Treat blue as the primary brand/action color and muted teal as a restrained accent for selected states, interactive highlights, badges, large callouts, charts, and success states.
- Keep UI calm, structured, accessible, and non-marketing. Define loading, empty, success, error, disabled, permission, offline, and degraded states where applicable.
- Do not create nested cards, decorative section cards, unsupported gradients, or one-off visual treatments without a design decision record.

Architecture and coding rules:
- Keep UI components presentational unless the project explicitly defines a different boundary.
- Keep business logic out of route glue and presentational UI.
- Put reusable logic in shared packages or project-approved modules.
- Keep prompts, config, contracts, schemas, and generated artifacts explicit and versioned.
- Use semantic names that describe user intent and system responsibility.

Security and quality rules:
- Do not bypass authentication, authorization, validation, release, or approval gates.
- Do not store secrets in source, prompts, examples, browser storage, generated docs, or logs.
- Validate trusted behavior server-side where applicable.
- Before considering work complete, identify tests, checks, screenshots, or review evidence needed to prove the result.

Output expectations:
- Return concise, implementation-ready recommendations.
- Name APT principles applied.
- List files, components, routes, states, or artifacts affected when known.
- Include validation evidence or explicitly state what remains unvalidated.
- Call out residual risks, assumptions, and decisions needed.
```

## Expected Output

The tool should consistently produce:

- user/problem framing before implementation
- APT-aligned design and architecture choices
- explicit assumptions and non-goals
- token/component-aware UI recommendations
- validation or review evidence requirements
- concise residual risk notes

## Guardrails

- Do not paste project secrets, private customer data, or production credentials into workspace knowledge.
- Do not treat generated examples as canonical if they conflict with APT doctrine.
- Do not use this as a replacement for project-specific adoption docs when a project has local stack, deployment, or brand rules.
- Keep tool-specific copies short enough that maintainers can review them before reuse.
- Update this prompt when canonical APT color, design, architecture, or AI-agent doctrine changes.

## Review Evidence

Workspace knowledge is ready when a maintainer can trace each durable rule to a canonical APT doc, a local project decision, or an approved project adoption note.

## Related Documents

- `../apt-principles.md`
- `../thinking.md`
- `../design.md`
- `../architecture.md`
- `../system-standards.md`
- `../security.md`
- `../quality-testing.md`
- `../knowledge-system.md`
- `../ai-agent-framework.md`
- `../templates/project-adoption-template.md`
