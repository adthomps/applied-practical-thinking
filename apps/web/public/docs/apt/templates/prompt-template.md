---
title: {{TITLE}}
version: v1
last_updated: {{DATE}}
owner: APT
status: draft
---

# {{TITLE}}

## Purpose

State what this prompt helps a human or AI agent accomplish. Name the APT layer it supports, such as thinking, design, architecture, security, validation, release, operations, knowledge, or project adoption.

Use this section to make the prompt reusable. A reader should understand when to use it, what kind of decision or artifact it produces, and what risk it reduces.

## Input Expectations

List the context the prompt needs before it can produce a useful result.

- Project or feature name.
- Relevant canonical APT docs.
- Current artifact, code path, design, API, or workflow being reviewed.
- Known constraints, assumptions, and non-goals.
- Required output format or downstream consumer.

If an input is missing, the prompt should ask for it or explicitly mark the output as assumption-based.

## Prompt

```text
You are applying APT (Applied Practical Thinking) doctrine to the following task.

Task:
- [INSERT TASK]

Canonical sources:
- [INSERT APT DOCS OR PROJECT DOCS]

Context:
- [INSERT PROJECT / FEATURE CONTEXT]

Constraints:
- [INSERT CONSTRAINTS, NON-GOALS, OR APPROVAL RULES]

Return:
1. Findings or recommendations ordered by importance.
2. APT principle areas applied.
3. Required artifacts, evidence, or decisions.
4. Risks, assumptions, and open questions.
5. Concrete next actions.
```

## Expected Output

Define the shape of the response so it can be reviewed. Prefer sections, tables, or numbered findings over open-ended prose.

Expected output should include:

- summary of the result
- principle alignment notes
- evidence or source references
- required follow-up artifacts
- validation or acceptance criteria
- residual risks

## Guardrails

- Do not invent doctrine that is not present in canonical APT sources.
- Do not hide assumptions.
- Do not produce implementation steps that bypass security, validation, release, or approval gates.
- Do not treat examples as canonical rules unless they link back to doctrine.
- If the task affects users, production, data, auth, or public positioning, call out review and evidence requirements.

## Related Documents

- `../apt-principles.md`
- `../ai-agent-framework.md`
- `../templates/principle-doc-template.md`
