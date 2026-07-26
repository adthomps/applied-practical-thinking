---
title: "Security Review Expectations"
kind: "example"
domain: "distribution-showcases"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/showcases/security/security-review-expectations.md"]
---

# Security Review Expectations

## Principle

Security review must be source-backed, scoped to real sensitive behavior, and explicit about unresolved risk.

## Use When

Use this pattern for secrets, auth, payment flows, health data, webhooks, MCP permissions, deploy credentials, and external integrations.

## Avoid When

Avoid declaring security readiness from summaries, generated docs, or compressed context alone.

## Bad Example

```text
Looks secure because there is an auth middleware file.
```

## Better Example

```text
Auth middleware, route handlers, webhook verification, environment bindings, logs, and deployment docs were checked. Findings list evidence, remaining uncertainty, and validation commands.
```

## Implementation Notes

Read exact source for sensitive paths. Check both implementation and docs. Mark anything that needs owner review, production credential knowledge, or compliance interpretation.

## Related Packs

Use `context/security/README.md`, `checklists/security-checklist.md`, and the `security` profile.
