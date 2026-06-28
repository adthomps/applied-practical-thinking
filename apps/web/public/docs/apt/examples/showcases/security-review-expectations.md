---
title: Security Review Expectations Showcase
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "example"
domain: "showcases"
source_paths: ["apt-principles/examples/showcases/security-review-expectations.md"]
---

# Security Review Expectations

## Context

Use this showcase for authentication, authorization, payment-adjacent work, sensitive data, secrets, abuse controls, production readiness, and AI agents that can affect privileged systems.

## Principle

APT security is built in. Security review requires exact source evidence, trust-boundary clarity, failure behavior, validation, and explicit residual risk.

## Use When

- A change touches identity, sessions, permissions, secrets, payments, webhooks, or user data.
- A repo wants to claim APT security alignment.
- Context compression was used during discovery and final review boundaries need to be restated.

## Avoid When

- Reviewers cannot access the affected code, configuration, tests, or operational evidence.
- The request asks for a compliance claim without a defined standard or evidence.
- The task is low-risk copy editing with no sensitive boundary.

## Problem

Security review fails when teams accept generic assurances such as "auth is handled" or "validation exists." Without exact files and test evidence, the claim cannot be reviewed or safely reused.

## APT Principles Applied

- Security: trust boundaries, access control, secrets, and abuse controls are explicit.
- Architecture: sensitive responsibilities have clear ownership.
- Quality & Testing: risk claims are backed by validation evidence.
- AI & Agents: compressed context is not enough for final high-risk work.

## Bad Example

```text
Looks secure. The agent summary says auth middleware is present.
```

The statement relies on summary instead of source evidence and names no failure modes.

## Better Example

```text
Reviewed src/auth/session.ts, src/routes/payments.ts, wrangler bindings, and security checklist. Authorization is enforced before mutation. Missing replay test remains a high-priority follow-up.
```

The statement names evidence, scope, finding, and residual risk.

## Solution

Security review should identify assets, actors, trust boundaries, controls, failure modes, tests, monitoring, rollback, and approval requirements. It must cite exact files and distinguish verified facts from assumptions.

## Implementation Notes

Use compression only to find likely files. Before final recommendations, read the relevant source, config, tests, and runbook. Record unavailable evidence as risk.

## Related Packs

- [APT Security Context Pack](../../context-packs/apt-security-pack.md)
- [APT API Context Pack](../../context-packs/apt-api-pack.md)
- [APT Agent Context Pack](../../context-packs/apt-agent-pack.md)

## Tradeoffs

Exact source review takes longer than summary review. The cost is justified when mistakes can affect users, money, access, privacy, or production operations.

## Common Mistakes

- Treating authentication presence as authorization proof.
- Skipping abuse, replay, and failure-state checks.
- Claiming compliance from generated summaries or incomplete file access.

## Related Documents

- `../../security.md`
- `../../checklists/security-review-checklist.md`
- `../../standards/ai/security-harness-standard.md`
- `../../prompts/security-review-prompt.md`
