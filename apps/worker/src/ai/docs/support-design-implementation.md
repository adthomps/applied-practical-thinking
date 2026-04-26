---
title: Support Design Implementation
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---

# Support Design — Implementation Guide

This document maps the conceptual `APT Support Design` doctrine to worker-level implementation patterns: handlers, telemetry, feature-flag checks, and operator playbooks.

## Goals

- Surface actionable context for incidents (correlation IDs, user/session data).
- Provide safe fallbacks and graceful degradation at the API layer.
- Ensure idempotent server-side behavior and clear operator handoffs.

## Recommended telemetry event (minimum)

```json
{
  "event": "support.event",
  "category": "ingest|query|fallback",
  "feature": "string",
  "status": "success|failure|degraded",
  "ingestId": "optional",
  "queryId": "optional",
  "userId": "optional",
  "sessionId": "optional",
  "correlationId": "req-xxxx",
  "message": "short description",
  "timestamp": "2026-04-12T12:00:00Z"
}
```

## Example: Hono-style handler for degraded AI completion fallback (TypeScript-like pseudocode)

```ts
import { Hono } from 'hono';
import { captureTelemetry, generateFallbackResponse } from '../../utils/observability';

const app = new Hono();

app.post('/api/ai/complete', async (c) => {
  const correlationId = c.req.headers.get('x-correlation-id') || `req_${Date.now()}`;
  try {
    const body = await c.req.json();
    // Call downstream LLM service (wrap in try/catch)
    const result = await callLLM(body);
    if (!result || result.degraded) {
      // Telemetry
      captureTelemetry({ event: 'support.event', category: 'fallback', status: 'degraded', correlationId, feature: 'ai.complete' });
      // Conservative fallback: return safe UI guidance, avoid irreversible actions
      const fallback = generateFallbackResponse(body);
      return c.json({ ok: true, fallback }, 200);
    }
    captureTelemetry({ event: 'support.event', category: 'query', status: 'success', correlationId, feature: 'ai.complete' });
    return c.json({ ok: true, result }, 200);
  } catch (err) {
    captureTelemetry({ event: 'support.event', category: 'query', status: 'failure', correlationId, feature: 'ai.complete', message: String(err) });
    // Fast response: surface user-friendly error and operator link
    return c.json({ ok: false, error: 'The assistant is temporarily unavailable. Try again later.', operatorLink: `/ops/incident?cid=${correlationId}` }, 503);
  }
});
```

## Feature-flag and rollout guidance

- Gate risky automated behaviors behind feature flags.
- Require monitoring (SLO checks, alerting rules) before enabling for >5% of traffic.

## Operator playbook link

- On persistent degradation, open incident with `correlationId`, attach recent logs, and run the ingest/query replay tool in `apps/worker/scripts/` (or equivalent).

## Where to add code examples

- Add concrete handler examples in `apps/worker/src/ai/docs/` and reference `packages/knowledge` schemas for telemetry and ingest contracts.
