---
title: APT Observability Standards
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# Observability Standards

Extracted from `operations-support.md` and `architecture.md`. See those files for full context.

## Purpose

Observability makes systems diagnosable in production. It is not optional for production services.

## Required for All Production Services

- Structured logging (JSON format)
- Correlation / request IDs at service boundaries
- Meaningful error messages (actionable, no internal detail leaked)
- Build and deployment records

## Structured Log Format

Every operationally meaningful event should log:

```json
{
  "event": "feature.action",
  "feature": "module.name",
  "status": "success | failure | degraded",
  "correlationId": "req_123",
  "message": "Short, actionable description",
  "timestamp": "2026-05-31T00:00:00Z"
}
```

Optional fields:

```json
{
  "userId": "user_abc",
  "duration_ms": 45,
  "errorCode": "UPSTREAM_TIMEOUT"
}
```

## Correlation IDs

- Assign a correlation ID at the entry point of every request.
- Pass the correlation ID through to all downstream calls.
- Include the correlation ID in all log lines for that request.
- Return the correlation ID in error responses (not in success responses by default).

## Log Levels

| Level | When to Use |
|-------|------------|
| ERROR | System failure, unrecoverable error |
| WARN | Degraded state, recoverable error, approaching a limit |
| INFO | Meaningful business events (user login, payment processed) |
| DEBUG | Developer-facing diagnostics (not in production by default) |

## What Not to Log

Never log:

- Passwords or authentication tokens
- Personal identifiable information (PII) beyond what is documented as permitted
- Full request bodies containing sensitive fields
- Stack traces in production error responses (log internally, not externally)

## Alerts

For critical workflows, define:

- Alert condition (threshold, error rate, latency)
- Escalation path (who gets paged)
- First-response steps (runbook link)

## Metrics

Preferred metrics for all production services:

- Availability (uptime %)
- Performance (p50, p95, p99 latency)
- Error rate
- Adoption / usage (key business events)

## Related

- `operations-support.md` — canonical source
- `architecture.md` — observability in architecture standards
- `checklists/operations-support-checklist.md`
- `prompts/operations-review-prompt.md`
