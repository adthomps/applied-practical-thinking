---
title: APT Framework Review Prompt
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# APT Framework Review Prompt

## Purpose

Review a proposed change across the full APT lifecycle.

## Input Expectations

- Change summary
- Files or systems affected
- Intended user/audience
- Validation already performed
- Known risks or open questions

## Prompt

```text
You are reviewing a change using the APT Principles Framework.

Read the relevant canonical docs:
- apt-principles.md
- thinking.md
- design.md
- architecture.md
- system-standards.md
- security.md
- execution.md
- quality-testing.md
- release-change-management.md
- operations-support.md
- knowledge-system.md
- ai-agent-framework.md

Review the change for:
1. Thinking: problem, audience, baseline, target outcome, decision log, tradeoffs
2. Design: complete states, UX clarity, interaction consistency
3. Architecture: boundaries, ownership, command matrix, contracts, deployment fit
4. System: naming, response shapes, config, shared package rules
5. Security: auth, authorization, validation, secrets, abuse controls
6. Execution: increment size, stop conditions, scope, implementation traceability
7. Quality: validation matrix, failed-check disposition, diagnostics
8. Release: release record, preview, changelog, rollback, support handoff
9. Operations: observability, degraded fallback, runbooks, incident readiness
10. Knowledge: canonical docs, examples, prompts, incident learning, drift risk
11. AI: prompt/tool boundaries, evaluation cases, fallback behavior, human approval points

Return:
- Findings first, ordered by severity
- Missing artifacts
- Required validation
- Recommended smallest corrective actions
- Residual risks
```

## Expected Output

Findings should be specific, evidence-based, and mapped to APT layers.

## Guardrails

- Do not give generic advice.
- Do not invent standards outside the canonical docs.
- If evidence is missing, call it out as missing rather than assuming.
- Treat "implemented" as activity evidence, not outcome evidence.

## Related Documents

- `../apt-principles.md`
- `../checklists/release-readiness-checklist.md`
- `../reports/apt-whole-system-completion-gap-matrix.md`
