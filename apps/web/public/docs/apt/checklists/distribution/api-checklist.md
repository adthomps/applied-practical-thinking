---
title: "API Checklist"
kind: "checklist"
domain: "distribution"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/checklists/api-checklist.md"]
---

# API Checklist

Use this checklist for services, route handlers, webhooks, SDK contracts, and integration docs.

## Required Checks

- Routes use consistent naming, status codes, and error shapes.
- Request and response schemas are explicit.
- Auth and authorization boundaries are visible in code and docs.
- Writes and webhooks consider idempotency, retries, and duplicate delivery.
- Logs support debugging without exposing secrets or regulated data.
- API docs match current implementation.

## Mandatory

- Read exact route, schema, auth, and webhook source before final findings or edits.
- Treat payment, health, identity, and compliance paths as sensitive.
- Do not rely on compressed context for final validation.

## Recommended

- Add focused tests for contract changes.
- Include example requests and responses when they help integrators.
- Use `api-review` with `security` or `payments` profiles for sensitive integrations.
