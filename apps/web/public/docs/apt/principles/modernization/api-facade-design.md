---
title: API Facade Design
kind: principle
status: active
owner: APT
last_updated: 2026-08-16
source: apt-principles and apt-agent-standards
domain: "modernization"
source_paths: ["apt-principles-agents/principles/modernization/api-facade-design.md"]
---

# API Facade Design

## Purpose

Use a facade to present an intentional, supportable contract while isolating consumers from legacy implementation constraints. A facade is a migration boundary, not permission to conceal unsupported behavior or preserve every historical accident.

## Principles

- Design the facade from consumer intentions and target outcomes, then map those operations to verified legacy capabilities.
- Keep translation logic explicit for fields, authentication, errors, state, idempotency, pagination, rate limits, and side effects.
- Define which system owns policy, orchestration, data, and audit evidence; do not split authority accidentally across facade and legacy layers.
- Return honest unsupported or partial-capability responses instead of fabricating parity.
- Make observability correlate the public request, facade decision, downstream call, and final outcome without exposing secrets.
- Treat bypass, dual-run, cutover, rollback, and eventual facade retirement as designed lifecycle states.

## Required Artifacts

At minimum, produce: consumer-intent map, public contract, legacy capability map, translation and ownership matrix, parity exceptions, contract/replay tests, correlated telemetry, failure and retry policy, rollout stages, rollback path, and retirement criteria.

## Tradeoffs And Failure Modes

Review for a facade that merely renames legacy operations, hidden lossy translation, duplicated business rules, retry amplification, authentication downgrade, ambiguous error ownership, permanent dual writes, and a new layer with no retirement condition.

## Review Questions

1. Which consumer intentions become stable facade operations, and which legacy details remain deliberately hidden?
2. Where does every field, policy decision, error, and side effect originate and remain authoritative?
3. Which capabilities are full, partial, transformed, unsupported, or deferred?
4. How do contract, replay, fault, load, security, and rollback tests prove the boundary?
5. What signals authorize traffic shifts, fallback, cutover, and eventual retirement?

## Topic-Specific Guidance

- Publish one intentional consumer contract rather than exposing the legacy system's resource and workflow shape.
- Maintain an operation-level mapping from facade behavior to verified downstream calls, translations, and owners.
- Specify authentication delegation, authorization enforcement, sensitive-data handling, and audit boundaries.
- Classify parity per capability and make unsupported behavior machine-readable and documented.
- Correlate facade and downstream telemetry so retries, partial failures, and reconciliation gaps are diagnosable.
- Require explicit rollout, rollback, bypass, and retirement criteria before the facade becomes a production dependency.

See the [Modernization canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
