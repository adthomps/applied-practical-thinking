---
title: "API Standards"
kind: "standard"
domain: "installable-summaries"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/apt-core/api-standards.md"]
---

# API Standards

APIs should be predictable, observable, and kind to both users and developers.

## Checklist

- Endpoints use consistent naming, status codes, and error shapes.
- Auth and authorization boundaries are explicit.
- Request and response schemas are documented.
- Idempotency and retries are considered for writes and webhooks.
- Logs include enough context to debug without exposing secrets.
