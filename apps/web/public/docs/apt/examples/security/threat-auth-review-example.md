---
title: Threat Auth Review Example
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# Threat Auth Review Example

## Context

A workflow touches authentication, authorization, external integrations, sensitive data, payment, health, AI-costly endpoints, or account recovery.

## Problem

Security reviews can stay too general unless they name trust boundaries, authorization decisions, abuse paths, data authority, and escalation criteria.

## APT Principles Applied

- Security: trust is enforced server-side.
- Architecture: boundaries and enforcement points are explicit.
- Operations: failures and abuse signals must be traceable.
- AI: high-stakes guidance requires conservative escalation.

## Solution

Use a compact trust-boundary and authorization matrix.

```text
Workflow: connected health-data sync

Boundary: third-party webhook -> worker route
Subject: integration provider
Action: send sync event
Resource: user's health-data import queue
Condition: valid signature, replay window, known integration account
Enforcement point: worker webhook middleware
Audit event: integration.webhook.accepted or integration.webhook.rejected
Abuse control: rate limit and idempotency key
Data authority: provider payload is source input, not final coaching advice
Retention/redaction: store only approved fields; redact provider secrets
Escalation: signature failures spike, data mismatch, retention change, AI advice concern
```

## Example Structure

```text
Workflow:
Boundary:
Subject:
Action:
Resource:
Condition:
Enforcement point:
Audit event:
Abuse control:
Data authority:
Retention/redaction:
Escalation:
Tests:
```

## Tradeoffs

Threat/auth matrices take more effort than a simple checklist. Use them for sensitive workflows where the cost of ambiguity is high.

## Common Mistakes

- Treating authentication as authorization.
- Trusting client-side role or provider data without server validation.
- Missing replay, signature, idempotency, or retry behavior for webhooks.
- Allowing AI to infer high-impact health, financial, or identity facts beyond validated inputs.

## Related Documents

- `../../security.md`
- `../../architecture.md`
- `../../operations-support.md`
- `login-session-flow.md`
- `magic-link-flow.md`
