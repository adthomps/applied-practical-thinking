---
title: APT Architecture Review Process
version: v1
last_updated: 2026-05-31
owner: APT
status: draft
---

# APT Architecture Review Process

## Purpose

The Architecture Review ensures that structural decisions are sound, well-documented, and aligned with APT principles before they are implemented or merged.

## When Required

An architecture review is required when a change involves:

- New services, packages, or applications
- Changes to API contracts (routes, request/response shape, versioning)
- Changes to authentication or authorization model
- Changes to data schema that affect existing records
- Changes to repository structure or monorepo layout
- Introducing new external dependencies with significant surface area
- Changes to CI/CD pipelines or deployment topology

Low-risk changes (UI copy, styling, documentation) do not require an architecture review.

## Participants

| Role | Responsibility |
|------|---------------|
| Author | Prepares proposal and ADR draft |
| Architecture reviewer | Evaluates against APT standards, approves or requests changes |
| Security reviewer | Reviews auth, data, and trust boundary changes |

## Review Steps

### 1. Prepare the ADR

Create an ADR in `docs/decisions/` using `templates/ADR-TEMPLATE.md`.

The ADR must include:
- Context: why this decision is needed now
- Decision: what is being changed
- Alternatives considered: at least two alternatives with tradeoffs
- Consequences: what becomes easier, harder, or newly constrained

### 2. Submit for Review

- Open a PR containing the ADR and any structural changes.
- Assign an architecture reviewer.
- Link to the relevant APT principle docs: `architecture.md`, `system-standards.md`, `security.md`.

### 3. Review Checklist

The reviewer evaluates against:

- [ ] Responsibility map: does the change assign clear ownership?
- [ ] Boundary integrity: does the change maintain layer separation?
- [ ] Risk level: is this a High-risk change? Is a staged rollout documented?
- [ ] API standards: OpenAPI, consistent errors, versioning
- [ ] Security: auth, authorization, input validation, secrets
- [ ] Observability: logging, correlation IDs
- [ ] Reversibility: is rollback documented?

### 4. Outcome

| Outcome | Meaning |
|---------|---------|
| Approved | ADR merged, change may proceed |
| Approved with conditions | Specific follow-up items required before merge |
| Needs revision | ADR requires changes before re-review |
| Rejected | Change does not align with APT principles; escalate |

### 5. Record

- Merge approved ADR to `docs/decisions/`.
- Update `ARCHITECTURE.md` if the responsibility map or system diagram changes.
- Note the review in the repository scorecard.

## Related Docs

- `architecture.md` — canonical architecture standards
- `templates/ADR-TEMPLATE.md` — ADR format
- `checklists/architecture-review-checklist.md` — review checklist
- `governance/scorecard.md` — track in scoring
