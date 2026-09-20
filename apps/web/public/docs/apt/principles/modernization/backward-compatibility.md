---
title: Backward Compatibility
kind: principle
status: active
owner: APT
last_updated: 2026-08-16
source: apt-principles and apt-agent-standards
domain: "modernization"
source_paths: ["apt-principles-agents/principles/modernization/backward-compatibility.md"]
---

# Backward Compatibility

## Purpose

Preserve the observable behaviors on which supported consumers rely while enabling deliberate evolution. Compatibility is a time-bounded product and operational commitment, not a requirement to retain undocumented defects forever.

## Principles

- Define compatibility from observed consumer contracts: syntax, semantics, ordering, timing, errors, side effects, and operational limits.
- Distinguish documented commitments from relied-upon behavior discovered through code, traffic, support history, and replay evidence.
- Prefer additive changes and explicit version negotiation; use breaking changes only with measured consumer impact and an approved migration path.
- Preserve security and correctness boundaries even when an insecure or ambiguous legacy behavior exists.
- Make compatibility exceptions owned, observable, tested, documented, and scheduled for review or retirement.
- Validate both old and new consumers through contract, replay, conformance, and rollback tests.

## Required Artifacts

At minimum, produce: consumer/version inventory, observable-behavior contract, compatibility matrix, exception register, negotiation and sunset policy, contract/replay suite, adoption telemetry, migration communications, and rollback criteria.

## Tradeoffs And Failure Modes

Review for schema-compatible but semantically breaking changes, changed defaults or ordering, new required permissions, error-shape drift, altered idempotency, silent coercion, security regressions justified as compatibility, and deprecation based on guesses rather than usage evidence.

## Review Questions

1. Which observable behaviors are contractual, relied upon, accidental, unsafe, or unknown?
2. Which consumers and versions use each behavior, and how was that verified?
3. Is the proposed change additive, negotiated, translated, deprecated, or breaking?
4. What tests and production signals prove old and new paths remain supportable?
5. Who owns exceptions, consumer migration, sunset approval, and rollback?

## Topic-Specific Guidance

- Evaluate compatibility across semantics, errors, side effects, performance limits, authentication, and authorization—not schema alone.
- Bind every protected behavior to known consumers and evidence; label traffic or dependency blind spots as unknown.
- Use explicit versions, feature negotiation, adapters, or additive fields rather than silent behavior switches.
- Refuse compatibility that perpetuates exploitable, noncompliant, or financially incorrect behavior; provide a governed exception or migration instead.
- Track adoption and error telemetry by consumer/version and establish objective sunset thresholds.
- Give each exception an owner, rationale, review date, test, support note, and removal plan.

See the [Modernization canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
