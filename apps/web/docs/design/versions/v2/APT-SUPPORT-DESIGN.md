---
docId: support-design
slug: support-design
major: 2
semanticVersion: "2.0.0"
status: candidate
publishedAt: "2026-04-12"
title: APT Support Design
---
---


# APT Support Design (Decisions in Motion)

This doctrine documents how APT designs for reality — not just intention. It captures operational patterns, decision lifecycles, UX recovery, telemetry-driven responses, and governance for features that must behave correctly under failure, partial availability, or unexpected inputs.

Purpose
- Provide a repeatable handbook for designing systems and experiences that detect problems, respond safely, and learn from incidents.
- Define reviewable patterns and enforcement points that make non-happy-path behavior explicit and testable.

Scope
- Applies to UI flows, API interactions, background ingestion, and AI-assisted behaviors that may fail or require human handoff.
- Excludes low-risk cosmetic changes; includes any surface affecting user decision-making, data integrity, or operational stability.

Decision lifecycle
- Detect: instrument critical paths with signals (errors, latency, anomaly scores). Define minimum telemetry for each feature.
- Diagnose: provide actionable context (breadcrumbs, correlation IDs, relevant logs, recent user actions).
- Respond: map diagnosis to response strategies (graceful degradation, circuit-breaker, limited functionality, user-facing retry, silent fallback, or soft-disable).
- Learn: capture incident artifacts, attach postmortem tags, and route learnings into backlog tasks or dataset updates.

Operational patterns
- Graceful degradation: design reduced-capacity UX that preserves key value while disabling non-critical features.
- Progressive rollout & feature flags: gate new behavior behind verifiable metrics and rollback paths.
- Idempotent retries: ensure retries don't double-charge, recreate resources, or corrupt state.
- Human-in-loop escalation: provide clear handoff points and support tooling for operators.

UX recovery patterns
- Explicit error states: use clear copy, suggested actions, and telemetry capture affordances.
- Retry affordances: one-tap retry, exponential backoff guidance, and failure-to-succeed indicators.
- Safe defaults: default to conservative actions when inputs are ambiguous or partially available.

Observability & telemetry
- Define per-feature event schema (success, failure, degraded, fallback) and include correlation IDs for cross-service traces.
- SLOs & alerting: map key user journeys to SLOs and create operational alerts for SLO breaches.

Governance & review
- Review gates: require `Support Design` checklist items in PR description when changes touch runtime, ingestion, or error UX.
- Lint gates: add automated checks for missing telemetry, missing feature-flag coverage, and missing user-facing fallback copy.
- Decision log: record major support-design decisions in `docs/DECISION_LOG.md` with owner and rollback plan.

Implementation references
- Conceptual doctrine (canonical): `apps/web/docs/design/versions/v2/APT-SUPPORT-DESIGN.md`
- Worker implementation guides (runtime behavior): `apps/worker/src/ai/docs/` (create `support-design-implementation.md` for feature-level mapping)
- Schema & contracts: `packages/knowledge` for telemetry/event schema, and `packages/config` for tokens and runtime flags

Quick checklist (minimum)
- [ ] Telemetry events defined for key success/failure/fallback states
- [ ] User-facing fallback copy reviewed and accessible
- [ ] Feature flag gated with monitoring and rollback playbook
- [ ] Idempotent server-side operations or explicit compensation logic
- [ ] Post-incident learnings mapped to backlog or training datasets

Examples and notes
- When an AI completion degrades, prefer a conservative fallback that preserves privacy and avoids automated actions requiring irreversible changes.
- For ingestion failures, queue and surface an itemized retry dashboard rather than dropping data silently.
