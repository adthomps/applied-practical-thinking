---
title: APT Service Readiness Review
version: v1
last_updated: 2026-05-31
owner: APT
status: draft
---

# APT Service Readiness Review

## Purpose

The Service Readiness Review is a structured pre-launch gate that confirms a service meets APT production standards before it goes live. It is not a rubber stamp — it is a structured checklist requiring evidence.

## When to Conduct

- Before the first production release of any new service.
- Before re-enabling a previously disabled production service.
- Before any major version release that changes external API contracts, auth model, or data schema.

## Participants

| Role | Responsibility |
|------|---------------|
| Service owner | Prepares evidence, completes checklist |
| APT reviewer | Reviews evidence, confirms pass/fail |
| Security reviewer | Reviews auth, input handling, secrets |

---

## Readiness Checklist

### Thinking & Design

- [ ] Problem statement documented
- [ ] Success criteria defined and measurable
- [ ] User flows designed with all states covered (loading, empty, success, error, denied)
- [ ] DESIGN.md present and reviewed
- [ ] Acceptance criteria documented and met

### Architecture

- [ ] ARCHITECTURE.md present and current
- [ ] Responsibility map defined
- [ ] High-risk decisions recorded as ADRs in `docs/decisions/`
- [ ] Architecture checklist completed

### Security

- [ ] Auth model documented
- [ ] Authorization enforced server-side
- [ ] Input validation at all boundaries
- [ ] Secrets excluded from code, logs, and error messages
- [ ] Rate limiting and abuse protection in place
- [ ] Security review checklist completed

### API & Standards

- [ ] API documented (OpenAPI or equivalent)
- [ ] Consistent error response shape
- [ ] Pagination implemented for list endpoints
- [ ] API standards checklist completed

### Quality & Testing

- [ ] Unit tests in place for critical paths
- [ ] API/integration tests in place
- [ ] All acceptance criteria validated
- [ ] Quality testing checklist completed

### Operations & Support

- [ ] Structured logging with correlation IDs
- [ ] Alert conditions defined
- [ ] Runbook available
- [ ] Known failure modes documented
- [ ] Support escalation path defined
- [ ] Operations support checklist completed

### Release

- [ ] Release notes prepared
- [ ] Rollback path identified
- [ ] Preview validated before production
- [ ] Release readiness checklist completed

### AI & Agents (if applicable)

- [ ] AGENTS.md configured
- [ ] Agent prompts reviewed and versioned
- [ ] AI agent review checklist completed

### Knowledge & Documentation

- [ ] README.md current and accurate
- [ ] CONTRIBUTING.md present
- [ ] Post-launch monitoring plan documented
- [ ] Knowledge system checklist completed

---

## Pass / Fail Criteria

**Pass:** All critical items checked, no open blockers, reviewer sign-off obtained.

**Conditional Pass:** Non-critical items incomplete with documented timeline and owner. Reviewer sign-off required.

**Fail:** Any critical item unchecked, open security finding, or unresolved blocker.

---

## Evidence Record

| Section | Evidence Provided | Status |
|---------|-----------------|--------|
| Thinking & Design | | |
| Architecture | | |
| Security | | |
| API & Standards | | |
| Quality & Testing | | |
| Operations & Support | | |
| Release | | |

---

## Sign-off

| Role | Name | Date | Decision |
|------|------|------|---------|
| Service owner | | | |
| APT reviewer | | | Pass / Conditional / Fail |
| Security reviewer | | | |

---

## Related Docs

- `governance/maturity-model.md` — maturity scoring
- `governance/scorecard.md` — repository scorecard
- `checklists/` — all individual review checklists
