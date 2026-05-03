---
title: APT Operations & Support Thinking (Run & Support)
version: v1
last_updated: 2026-05-01
owner: APT
status: draft
---

# APT Operations & Support Thinking

## Overview

APT Operations & Support Thinking defines how systems are monitored, diagnosed, supported, and improved after release.

Operations answers:

- How do we know the system is healthy?
- How do we diagnose failure?
- What can support safely do?
- When do we escalate?
- How do incidents become learning?

## Purpose

Operations keeps systems usable in real conditions. Support thinking makes failure observable, explainable, and recoverable.

## Core Principles

### 1. Design for support from day one

Support needs clear states, errors, logs, and recovery paths.

### 2. Everything important must be observable

Critical workflows should emit useful telemetry or logs.

### 3. Actions must be traceable

Use request IDs, correlation IDs, user/session context where appropriate, and deployment records.

### 4. Support feedback drives improvement

Incidents and repeated questions should improve docs, UX, tests, and runbooks.

### 5. Systems should explain themselves

Errors should be actionable without leaking sensitive implementation detail.

## Standards / Rules

- Add correlation IDs to service boundaries where practical.
- Log operationally meaningful events, not noisy internal trivia.
- Define fallback behavior for critical degraded states.
- Keep runbooks close to the system or canonical docs.
- Treat support findings as input to quality, release, and knowledge docs.
- Preserve the canonical `operations-support` source path when a product route or navigation group shortens the label to Operations.

## Required Artifacts

- Runbook
- Alert or monitoring notes
- Incident response steps
- Escalation path
- Known failure modes
- Support-facing explanation of user-visible errors

## Minimum Telemetry Shape

```json
{
  "event": "support.event",
  "feature": "docs.search",
  "status": "success|failure|degraded",
  "correlationId": "req_123",
  "message": "short actionable context",
  "timestamp": "2026-04-24T12:00:00Z"
}
```

## Good Example

A failed knowledge query returns a user-safe message, logs a correlation ID, records degraded status, and links support to the relevant runbook.

## Bad Example

Swallowing an API error, showing a generic failure, and leaving no trace that connects the user report to service logs.

## AI Prompt Example

```text
Create an operations starter for this feature.

Input:
- Feature/service:
- Known failure modes:
- Available telemetry:
- Support responsibilities:

Return:
1. Alert conditions
2. First-response steps
3. Escalation path
4. User-facing support notes
```

## Related Checklists

- `checklists/operations-support-checklist.md`

## Related Examples

- `examples/workflows/preview-to-prod-flow.md`

## Related Prompts

- `prompts/operations-review-prompt.md`

## Related Documents

- `release-change-management.md`
- `knowledge-system.md`

## Summary

Operations and support thinking make production behavior observable, diagnosable, and improvable.
