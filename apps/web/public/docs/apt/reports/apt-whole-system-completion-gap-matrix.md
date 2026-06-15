---
title: APT Whole-System Completion Gap Matrix
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# APT Whole-System Completion Gap Matrix

## Purpose

This matrix records the source-backed enhancement plan for the whole-system completion pass across APT doctrine, examples, checklists, prompts, and references.

It is evidence for the change set, not a new doctrine source. Canonical guidance remains in the root doctrine files and linked build-kit artifacts.

## Source Evidence

- `apt-principles/*.md` for canonical doctrine and required artifact contracts.
- `applied-practical-thinking/apps/web/data/aptPrinciples.ts` for lifecycle focus, outputs, examples, and prompt shapes.
- `applied-practical-thinking/apps/web/data/architecturePatterns.tsx` for architecture ownership, CI/CD, branch protection, and anti-patterns.
- `applied-practical-thinking/apps/worker/src/ai/docs/support-design-implementation.md` for telemetry, degraded AI fallback, and operator playbook guidance.
- `applied-practical-thinking/apps/worker/src/ai/docs/knowledge-engine-implementation.md` for ingest, query, feedback, provenance, and retention patterns.
- `apt-dream-to-reality/docs/DECISION_LOG.md` and `deployment.md` for decision-log and deployment/release patterns.
- `apt-coach/docs/apt/runbook-security.md` for health-adjacent AI, security, operations, and escalation criteria.

## Gap Matrix

| APT Layer | Current Gap | Enhancement Target |
|---|---|---|
| Outcomes | Framework says outcomes matter, but the outcome evidence loop is implicit. | Add outcome framing, baseline/target metrics, and support/operational impact guidance to `apt-principles.md` and thinking examples. |
| Thinking | Problem framing exists, but decision-log and outcome metrics are thin. | Add decision-log and measurable outcome examples; tighten thinking checklist evidence. |
| Architecture | Root doctrine is mature, but ownership, branch protection, and CI/CD patterns need stronger enforcement hooks. | Add architecture pattern ownership example and update architecture map/checklist. |
| System Standards | API standards exist, but shared contract ownership and command matrices can be clearer. | Add reference guidance for contract ownership and project-profile evidence. |
| Delivery | Execution and release are separate, but delivery increments and handoff evidence need a shared pattern. | Add delivery increment example and strengthen execution/release doctrine. |
| Quality | Validation plan exists, but command matrices and failed-check handling need explicit evidence rules. | Add validation matrix example and quality checklist/prompt alignment. |
| Release | Release notes exist as a concept, but reusable release-record shape is missing. | Add release notes example and metadata/versioning evidence rules. |
| Operations | Telemetry shape exists, but runbook, degraded mode, and first-response examples are thin. | Add operational runbook example and strengthen support checklist/prompt. |
| Learning | Knowledge contracts exist, but incident-to-knowledge and feedback lifecycle examples are thin. | Add incident-to-knowledge example and enrich knowledge contracts. |
| AI | Agent contract exists, but evaluation cases and degraded/fallback behavior need clearer standards. | Add AI evaluation case example and update AI review bundle/checklist. |
| Security | Auth/session rules exist, but threat/auth review and high-stakes AI boundaries need stronger examples. | Add threat/auth review example and strengthen security checklist/prompt. |

## Completion Criteria

- Root doctrine names the enhanced evidence expectations.
- Each enhanced area has at least one concrete example or updated existing example.
- Checklists and prompts enforce the new evidence requirements.
- Reference contracts capture reusable machine-readable expectations where appropriate.
- `npm run validate` passes with no errors or warnings.

## Related Documents

- `../apt-principles.md`
- `../thinking.md`
- `../architecture.md`
- `../execution.md`
- `../quality-testing.md`
- `../release-change-management.md`
- `../operations-support.md`
- `../knowledge-system.md`
- `../ai-agent-framework.md`
- `../security.md`
