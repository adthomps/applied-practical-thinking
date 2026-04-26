---
title: Operations Review Prompt
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Operations Review Prompt

## Purpose

Review operational readiness, supportability, observability, and incident response for a system or feature.

## Input Expectations

- Service or workflow description
- Known failure modes
- Current telemetry or logs
- Support responsibilities
- Release or deployment context

## Prompt

```text
You are reviewing operations and support readiness using APT Operations & Support Thinking.

Use:
- operations-support.md
- release-change-management.md
- checklists/operations-support-checklist.md

Review for:
1. Known failure modes
2. User-safe error behavior
3. Correlation and traceability
4. Monitoring or alert signals
5. First-response steps
6. Escalation path
7. Feedback loop into docs, tests, or product work

Return:
- Operational readiness verdict
- Missing runbook or telemetry gaps
- First-response checklist
- Escalation and support notes
- User-facing degraded-state guidance
```

## Expected Output

The output should be usable as the start of a runbook or support handoff.

Use this shape:

```text
Feature/service:
Known failure modes:
Signals/logs:
First response:
Escalation:
User-facing guidance:
Feedback loop:
```

## Guardrails

- Do not expose secrets or internal-only details in user-facing guidance.
- Do not treat logging noise as observability.
- Do not omit ownership or escalation.
- Do not release a critical workflow without a support-safe explanation for common failures.

## Review Evidence

The response should cite runbook path, alert or log signal, correlation ID strategy, first responder, escalation owner, and knowledge follow-up.

## Related Documents

- `../operations-support.md`
- `../checklists/operations-support-checklist.md`
