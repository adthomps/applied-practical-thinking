---
title: API Principles
kind: index
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "api"
source_paths: ["apt-principles-agents/principles/api/README.md"]
---

# API Principles

Canonical guidance for select API styles from audience and behavior, then make contracts predictable, secure, observable, evolvable, and usable by humans and agents.

- [Modern API Design.md](modern-api-design.md)
- [JSON First Design.md](json-first-design.md)
- [Rest API Design.md](rest-api-design.md)
- [JSON RPC Design.md](json-rpc-design.md)
- [GraphQL Review.md](graphql-review.md)
- [Webhook Design.md](webhook-design.md)
- [HTTP Query Method Review.md](http-query-method-review.md)
- [API Versioning.md](api-versioning.md)
- [API Errors.md](api-errors.md)
- [API Auth.md](api-auth.md)
- [API Idempotency.md](api-idempotency.md)
- [API Observability.md](api-observability.md)
- [AI Consumable Apis.md](ai-consumable-apis.md)
- [Human Consumable Apis.md](human-consumable-apis.md)

## Applied by

- [apt-ai-consumable-api-reviewer](../../agents/api/apt-ai-consumable-api-reviewer.md) — Use when an API will be called primarily by AI agents rather than human-written client code, to confirm it's structured for reliable agent consumption.
- [apt-api-bridge-reviewer](../../agents/api/apt-api-bridge-reviewer.md) — Use when a bridge or adapter layer sits between a legacy API and a modern one, to confirm it preserves correct behavior on both sides.
- [apt-api-migration-planner](../../agents/api/apt-api-migration-planner.md) — Use when a decision or deliverable must select API styles from audience and behavior, then make contracts predictable, secure, observable, evolvable, and usable by humans and agents, especially when it affects multiple audiences or high-accuracy domains.
- [apt-modern-api-designer](../../agents/api/apt-modern-api-designer.md) — Use when designing a new API from scratch, to confirm it follows current best practice (REST/GraphQL/JSON-RPC as appropriate) rather than replicating legacy patterns.
- [glyph](../../agents/api/glyph.md) — Use when a decision or deliverable must select API styles from audience and behavior, then make contracts predictable, secure, observable, evolvable, and usable by humans and agents, especially when it affects multiple audiences or high-accuracy domains.

