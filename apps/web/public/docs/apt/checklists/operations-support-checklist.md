---
title: Operations & Support Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Operations & Support Checklist

## Scope

Use this checklist for production-facing services, support workflows, incidents, degraded states, and user-visible operational behavior.

Run it for production systems, public docs, AI flows, payment or auth workflows, and portfolio/showcase surfaces where confusing failure states can create trust or support issues.

## Required Checks

- [ ] Known failure modes are documented.
- [ ] User-facing errors are safe and actionable.
- [ ] Correlation or trace context exists where practical.
- [ ] Alerts or monitoring signals are identified.
- [ ] First-response steps are clear.
- [ ] Escalation path is defined.
- [ ] Support feedback has a path back into docs, tests, or product work.

## Failure Conditions

- Support cannot tell what failed or who owns it.
- Errors leak internal details or hide all useful context.
- No runbook or first-response path exists for a critical workflow.
- Incident learning is not captured anywhere durable.

## Evidence Required

- Runbook or support note.
- Telemetry/logging notes.
- Escalation path.
- Known failure modes.
- User-facing recovery or contact guidance where appropriate.
- Evidence that repeated support findings have a path back into docs, tests, or product work.

## Pass Standard

Support can identify the affected feature, understand normal versus degraded behavior, find diagnostic evidence, and know the first response. If support would discover behavior from users first, the checklist fails.

## Related Documents

- `../operations-support.md`
- `../examples/workflows/preview-to-prod-flow.md`
- `../prompts/operations-review-prompt.md`
