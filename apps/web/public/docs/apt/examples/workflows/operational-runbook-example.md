---
title: Operational Runbook Example
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# Operational Runbook Example

## Context

A production workflow depends on an external provider, AI route, auth flow, data ingest, or deployment path that can degrade.

## Problem

Support cannot respond well when symptoms, owners, telemetry, fallback behavior, and escalation criteria are not documented before failure.

## APT Principles Applied

- Operations: systems should explain themselves.
- Security: sensitive workflows need safe escalation.
- Knowledge: incidents should produce durable learning.
- Release: support notes belong with production-impacting changes.

## Solution

Use a short runbook for critical workflows.

```text
Workflow: AI completion route
Owner: Platform maintainer
Normal behavior: request returns grounded response with sources
Degraded behavior: route returns deterministic fallback guidance
User message: The assistant is temporarily unavailable. Try again later.
Telemetry: support.event category=fallback feature=ai.complete status=degraded
First response: collect correlationId, check provider status, inspect worker logs
Escalation: provider failure over 15 minutes, repeated auth failures, or sensitive-data concern
Containment: disable risky automated behavior behind feature flag
Recovery: restore provider/config, run smoke test, update incident note
Learning follow-up: add test, runbook update, or accepted non-action
```

## Example Structure

```text
Workflow:
Owner:
Normal behavior:
Known failure modes:
Telemetry:
First response:
Escalation:
Containment:
Recovery:
User-facing message:
Learning follow-up:
```

## Tradeoffs

Runbooks can become stale if they are too long. Keep them short, close to the system, and tied to validation or release evidence.

## Common Mistakes

- Writing only a troubleshooting table with no owner.
- Omitting user-facing fallback text.
- Logging provider details that should not be exposed to users.
- Ending the incident without a learning artifact or explicit non-action.

## Related Documents

- `../../operations-support.md`
- `../../security.md`
- `../../knowledge-system.md`
- `preview-to-prod-flow.md`
