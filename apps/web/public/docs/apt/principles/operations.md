---
title: Operations Principle
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# Operations

**Principle:** Design for support from day one.

Systems must be observable, diagnosable, and recoverable in real production conditions.

## Core Rules

- Critical workflows must emit useful logs or telemetry.
- Actions must be traceable with correlation IDs and deployment records.
- Errors must be actionable without leaking sensitive implementation detail.
- Runbooks must exist and be kept close to the system.
- Support findings must feed back into quality, release, and knowledge docs.

## Minimum Telemetry Shape

```json
{
  "event": "support.event",
  "feature": "feature.name",
  "status": "success|failure|degraded",
  "correlationId": "req_123",
  "message": "short actionable context",
  "timestamp": "2026-05-31T00:00:00Z"
}
```

## Required Artifacts

- Runbook
- Alert or monitoring notes
- Incident response steps
- Escalation path
- Known failure modes
- Support-facing explanation of user-visible errors

## Enforcement Points

- New services without structured logging are blockers.
- Missing correlation IDs at service boundaries are blockers.
- No runbook for a production service is a release blocker.

## Canonical Doc

`operations-support.md` — full principles, telemetry contracts, runbook standards, and AI prompt.

## Related Build Kit

- `checklists/operations-support-checklist.md`
- `examples/workflows/preview-to-prod-flow.md`
- `prompts/operations-review-prompt.md`
