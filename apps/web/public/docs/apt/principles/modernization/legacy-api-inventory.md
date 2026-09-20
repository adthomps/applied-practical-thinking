---
title: Legacy API Inventory
kind: principle
status: active
owner: APT
last_updated: 2026-08-16
source: apt-principles and apt-agent-standards
domain: "modernization"
source_paths: ["apt-principles-agents/principles/modernization/legacy-api-inventory.md"]
---

# Legacy API Inventory

## Purpose

Build an evidence-backed record of what a legacy API actually exposes, does, owns, and supports before proposing parity, facade, migration, or retirement decisions. An inventory records verified current state and uncertainty; it is not a desired-state design.

## Principles

- Enumerate externally callable and internally relied-upon operations, versions, events, jobs, files, and administrative paths.
- Capture request, response, state transition, error, idempotency, authentication, authorization, rate, and side-effect behavior separately.
- Trace each claim to code, configuration, contract, traffic, test, log, support record, or accountable owner.
- Identify consumers, data ownership, downstream dependencies, operational owners, and support commitments.
- Record observed, documented, inferred, conflicting, and unknown behavior distinctly.
- Snapshot verification scope and date so later change can be detected rather than silently absorbed.

## Required Artifacts

At minimum, produce: operation/version catalog, consumer and dependency map, field/error/auth/state tables, side-effect and data-ownership map, operational constraints, evidence links, uncertainty/conflict register, and prioritized verification gaps.

## Tradeoffs And Failure Modes

Review for documentation-only inventories, omitted batch or admin paths, assumed consumers, conflated current and target state, secrets copied into evidence, unverified provider claims, missing negative/error behavior, and stale snapshots presented as current truth.

## Review Questions

1. What complete set of interfaces and behaviors is in scope, including non-HTTP and privileged paths?
2. Which evidence verifies each behavior, consumer, dependency, owner, and constraint?
3. Where do documentation, implementation, traffic, tests, and operator knowledge disagree?
4. Which unknowns can change parity, safety, cost, or migration decisions?
5. Who verifies the inventory, and when must it be refreshed?

## Topic-Specific Guidance

- Inventory synchronous APIs, asynchronous events, files, batch jobs, callbacks, operator actions, and undocumented but supported paths.
- Capture behavior at operation and version level, including negative cases, state transitions, retry semantics, and side effects.
- Map consumers and downstream dependencies using repository, configuration, telemetry, and owner evidence.
- Label every record as verified, inferred, conflicting, unknown, or out of scope, with source and verification date.
- Keep current-state facts separate from target mappings, recommendations, and deprecation plans.
- Prioritize evidence gaps by their effect on security, financial correctness, parity, rollback, and customer disruption.

See the [Modernization canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
