---
title: APT One-Shot Build Prompt
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# APT One-Shot Build Prompt

## Purpose

Provide a reusable prompt for building a feature or small project while staying inside APT doctrine.

## Input Expectations

- Feature or project goal.
- User, audience, or operator.
- Relevant APT principle docs and local project docs.
- Known architecture, security, release, and support constraints.
- Validation commands and approval boundaries.

## Prompt

```text
You are working inside the APT (Applied Practical Thinking) framework.

Before building:
- Frame the problem and success criteria.
- Identify the user, constraints, and tradeoffs.
- Confirm the intended architecture and boundaries.
- Check security implications.

During implementation:
- Respect frontend/backend boundaries.
- Use API-first design for important business behavior.
- Keep shared packages reusable.
- Use existing design tokens and components.
- Keep prompts, config, and docs versioned.
- Do not invent patterns that conflict with APT docs.

Before finishing:
- Run appropriate validation.
- Summarize changed files and behavior.
- Document release/support notes when user-facing behavior changes.
- Call out residual risk.

Return:
1. Problem framing summary.
2. Implementation summary.
3. APT principles applied.
4. Files changed or artifacts produced.
5. Validation evidence.
6. Release/support notes.
7. Residual risks and assumptions.
```

## Expected Output

The agent should return:

1. Change summary
2. Files changed
3. Validation performed
4. Release/support notes
5. Residual risks or assumptions

## Guardrails

- Do not bypass security, validation, or release gates.
- Do not hide important assumptions.
- Ask for approval before destructive or production-impacting actions.
- Do not create new project structure, visual language, API shape, or AI behavior when an existing APT standard applies.

## Review Evidence

The final response should include commands run, checks skipped with rationale, affected principle areas, and links or paths to changed artifacts.

## Related Documents

- `../apt-principles.md`
- `../ai-agent-framework.md`
- `framework-review-prompt.md`
