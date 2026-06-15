---
title: APT Repository Maturity Model
version: v1
last_updated: 2026-05-31
owner: APT
status: draft
---

# APT Repository Maturity Model

## Overview

The APT Maturity Model provides a 5-level rubric for assessing how well a repository embodies Applied Practical Thinking principles. It is used during repository reviews, adoption assessments, and project profile validation.

## Maturity Levels

| Level | Name | Description |
|-------|------|-------------|
| 0 | Absent | No APT adoption. No canonical docs, no checklists, no structured process. |
| 1 | Initializing | Basic files present (AGENTS.md, README.md). No consistent doctrine or validation. |
| 2 | Structured | Core docs present (DESIGN.md, ARCHITECTURE.md, CONTRIBUTING.md). Some checklists adopted. Basic validation in place. |
| 3 | Practicing | All lifecycle layers covered. Checklists enforced. ADRs recorded. AI agent instructions configured. Validation automated. |
| 4 | Optimizing | Framework continuously improved from production feedback. Examples and prompts updated from real decisions. Project profile published. Governance reviewed quarterly. |

## Dimension Scoring

Score each dimension 0–4. Overall maturity is the median dimension score.

### Thinking & Design

| Score | Criteria |
|-------|---------|
| 0 | No problem statements, no design docs |
| 1 | Some informal problem framing |
| 2 | DESIGN.md present, basic state coverage |
| 3 | All states covered, DESIGN.md validated against checklist |
| 4 | Design decisions feed knowledge base; AI design review in use |

### Architecture

| Score | Criteria |
|-------|---------|
| 0 | No architecture doc |
| 1 | Informal architecture notes |
| 2 | ARCHITECTURE.md present, responsibility map exists |
| 3 | ADRs recorded for high-risk decisions, validated against checklist |
| 4 | Architecture review process in place, diagram current |

### Standards Compliance

| Score | Criteria |
|-------|---------|
| 0 | No API, coding, or security standards followed |
| 1 | Some standards informally applied |
| 2 | API standards documented and followed, security checklist completed |
| 3 | All standards validated (API, data, docs, testing, observability) |
| 4 | Standards validated automatically in CI; violations are PR blockers |

### Delivery & Release

| Score | Criteria |
|-------|---------|
| 0 | No release process |
| 1 | Informal PR review |
| 2 | Spec-driven development, PRs reviewed |
| 3 | Preview-first workflow, release readiness checklist enforced |
| 4 | Full CI/CD, automated validation, release notes generated |

### Operations & Support

| Score | Criteria |
|-------|---------|
| 0 | No observability, no runbook |
| 1 | Basic logging, no structured format |
| 2 | Structured logging with correlation IDs |
| 3 | Runbook present, alerts defined, failure modes documented |
| 4 | Support findings actively improve docs and UX |

### AI Agent Readiness

| Score | Criteria |
|-------|---------|
| 0 | No agent instructions |
| 1 | Basic AGENTS.md present |
| 2 | AGENTS.md + .github/instructions/ configured |
| 3 | Agent definitions, prompts, and validation commands in place |
| 4 | Agent prompts versioned, tested, and regularly reviewed |

### Knowledge & Governance

| Score | Criteria |
|-------|---------|
| 0 | No documentation system |
| 1 | README only |
| 2 | Canonical docs and examples present |
| 3 | Checklists, prompts, and templates in use; drift tracked |
| 4 | Project profile published, quarterly review conducted |

## Scoring Guidance

- Score each dimension based on evidence, not intent.
- Use `npm run validate` output as evidence for structural scoring.
- Dimension scores of 0 or 1 in any area indicate a gap requiring remediation before Level 3 can be claimed.

## Related Docs

- `governance/scorecard.md` — per-repository scoring template
- `governance/repository-review.md` — review process
- `scripts/validate-apt-principles.mjs` — automated validation
- `reports/` — validation outputs
