---
title: Refactor Required Revisions
kind: assessment
domain: architecture
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/required-revisions.md"]
---

# Required Revisions

Categorized revisions from `docs/refactor/independent-review.md`. Reference numbers point to its findings.

## Required Before Implementation (Phase 1 sign-off)

| # | Revision | Source finding |
| --- | --- | --- |
| R1 | Add principle-vs-standard precedence and the ADR-cannot-override-doctrine-but-triggers-amendment rule to `canonical-source-hierarchy.md`; replace the "Depends on layer" conflict row with a decidable rule. | 2 |
| R2 | Extend the asset taxonomy to cover Prompt, Checklist, Manifest, Context Pack, and Routing Policy (or adopt the kind-plus-properties model); remove "Generated knowledge" as a kind and make generated a marked property. | 3 |
| R3 | Add the workflow/playbook discriminator: workflows carry machine-checkable references (skills, roles, gates, inputs, outputs); playbooks are narrative. State that workflows are documentation-only until an executable state model is separately approved, and that agents do not own workflows. | 4 |
| R4 | Re-scope the pilot: use existing `skills/product/voice-of-customer/SKILL.md` and existing `agents/product/apt-voice-of-customer-analyst.md`; author Market-to-Validated-Concept as the single net-new workflow; keep the boundary ADR; defer Working Backwards principle extraction. Resolve DR-011 accordingly. | 9 |
| R5 | Add DR-013: ADR home location (decided by or within the pilot's boundary ADR). | 10 |
| R6 | Record the concrete `schemas/` trigger rule in DR-003: CI-enforced schema against one asset class, two schemas with independent consumers, and compatibility stubs specified. Correct the inaccurate "direct validator use" claim for `installation.schema.json`. | 5 |
| R7 | Reclassify the repository in Phase 1 approval text as a documentation and asset repository with distribution tooling; mark "platform" as aspiration. | 1 |
| R8 | Cut the pilot-facing OKF concept set to at most five types (Principle, Skill, Agent, Workflow, Decision); park the remaining ~21 types as an unapproved appendix; require a named consumer before any OKF generation. Amend DR-008. | 8 |

## Required During The Pilot (Phase 2)

| # | Revision | Source finding |
| --- | --- | --- |
| P1 | Define measurable pilot exit criteria before starting (see `implementation-readiness.md` Validation Requirements). | 9, 10 |
| P2 | Keep the pilot to one commit or one tightly grouped set; verify single-revert rollback actually works before merge. | 9 |
| P3 | Either wire `.apt/installation.json` validation to `references/installation.schema.json` (script or test) or relabel that file as a reference contract. | 5 |
| P4 | Produce the scoped-instruction inventory (root files, `platforms/*/source/instructions`, templates) as a pilot deliverable. | 2 |
| P5 | Use the minimum viable context packet: `AGENTS.md` + one existing context pack + pilot canonical files, listed in the pilot ADR. No task-packet schema. | 11 |

## Recommended After The Pilot

| # | Revision | Source finding |
| --- | --- | --- |
| A1 | Targeted micro-cleanup of `CONTRIBUTING.md` (stale root-doctrine instructions, incl. line 156) and `docs/diagrams/repository-structure.md` (obsolete tree presented as current). Two files, no path changes, single revert. May also be done alongside Phase 1 if approved. | 10 |
| A2 | Phase 4 must open with an explicit generator-vs-thin-pointer comparison before any adapter generator is built; require generated markers, source hashes, and a never-touch-unmarked-files rule; document the Copilot source-editable/distribution-generated split. | 6 |
| A3 | Add Phase 5 security preconditions: named secret-scanning tool, validator exclusion/inclusion rule for generated output paths, generated-marker check in `validate-repository.mjs`, written injection-handling rule for generators. | 12 |
| A4 | If generated wiki tooling is pursued at all, trial in an isolated branch with a named consumer; rejection remains a live option. | 7 |
| A5 | Adopt the Maximum Context Guidance table from `context-efficiency.md` into active agent guidance. | 11 |

## Deferred Intentionally

| Item | Rationale |
| --- | --- |
| `schemas/` creation | Gated by the R6 trigger rule; current paths are stable and consumers are few. |
| Top-level `workflows/` | One pilot workflow does not justify a directory; promote only after the workflow contract survives the pilot. |
| Adapter generation pipeline | Phase 4, and only after the A2 comparison. |
| OKF generation and `knowledge/` tree | No consumer exists; front matter is sufficient for the pilot. |
| Task-packet schema | No consumer; minimum viable packet suffices. |
| CLI packaging, npm publication, MCP server, knowledge service | Correctly gated in the assessment on independent consumption; nothing changes that. |
| Bulk stale-reference cleanup (89 files) | Phase 6 with compatibility review, except the A1 two-file micro-cleanup. |

## Rejected As Unnecessary

| Item | Rationale |
| --- | --- |
| generated wiki tooling implementation in the pilot | Fifth navigation surface with no consumer; boundary ADR alone settles the authority question. Assessment already leans this way; make it explicit. |
| OKF 26-type concept model | Premature schema governance; contradicts the design's own selectivity principle. Replaced by R8. |
| New Product Discovery Agent for the pilot | `apt-voice-of-customer-analyst` already fits the pilot slice; creating a new agent tests nothing the existing one cannot. |
| Working Backwards principle extraction inside the pilot | Content authoring, not model validation; defer to later content work. |
| `packages/`, `adapters/`, `knowledge/` directories now | Assessment already rejects these; concur — creation conditions stand. |
| A separate Routing top-level taxonomy concept beyond a Routing Policy type | Routing is operational policy; a type label suffices. |
