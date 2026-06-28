---
title: APT Agent Standards Crosswalk Example
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "example"
domain: "ai-agent"
source_paths: ["apt-principles/examples/ai-agent/apt-agent-standards-crosswalk-example.md"]
---

# APT Agent Standards Crosswalk Example

## Context

`apt-principles-agents` implements the agent harness and repository lifecycle platform for APT. It contains agents, routing docs, context packs, profile manifests, lifecycle scripts, model-routing files, and install reports. `apt-principles-agents` defines the standards those implementation artifacts must satisfy.

## Problem

If `apt-principles-agents` copies APT Agent catalogs, manifests, or scripts, the two repositories will drift. If `apt-principles-agents` is too abstract, the implementation cannot prove standards conformance. A crosswalk gives reviewers traceability without moving implementation ownership.

## APT Principles Applied

- AI: APT Agent implements the harness standards instead of redefining them.
- Knowledge: canonical doctrine and implementation evidence stay in separate homes.
- Quality: conformance is reviewable through linked evidence and validation.
- Repository lifecycle: install, scan, repair, sync, and manifest behavior stay outside doctrine.
- System Standards: contracts identify stable fields without freezing runtime implementation.

## Solution

Use a crosswalk table whenever APT Agent implementation is reviewed:

| APT Agent layer | Implementation artifact | APT Principles standard | Validation evidence | Owning repo | Boundary notes |
|---|---|---|---|---|---|
| Orchestration layer | `docs/HARNESS-ARCHITECTURE.md`, `agents/apt-router.md` | `standards/ai/agent-harness-standard.md`, `standards/ai/ai-orchestration-standard.md` | Task packet shape, stage gates, approval gates | `apt-principles-agents` | `apt-principles-agents` defines stages only. |
| Role router | `agents/apt-router.md`, `docs/AGENT-CATALOG.md` | `standards/ai/ai-orchestration-standard.md` | Role boundaries and handoff evidence | `apt-principles-agents` | Do not copy catalog into doctrine. |
| Model router | `routing/model-routing.md`, `routing/model-registry.json` | `standards/ai/model-routing-standard.md`, `standards/ai/local-first-ai-standard.md` | Routing validation and local model check | `apt-principles-agents` | Model names are implementation config, not doctrine. |
| Cost controller | `agents/apt-cost-controller.md`, `routing/token-budgeting.md`, `context/` | `standards/ai/token-efficiency-standard.md` | Context pack list and token-budget guidance | `apt-principles-agents` | Doctrine defines sufficient-context rules. |
| Verification layer | `agents/apt-verifier.md`, validation scripts | `standards/ai/verification-standard.md` | Dry-run output, check results, residual-risk notes | `apt-principles-agents` | Verification evidence is portable; runners are implementation. |
| Security harness | `agents/apt-security-reviewer.md` | `standards/ai/security-harness-standard.md` | Prompt injection, secret handling, and approval review | `apt-principles-agents` | Security standards remain canonical in `apt-principles-agents`. |
| Install/scan/repair/sync | lifecycle scripts and `.apt/installation.json/` reports | `standards/ai/repository-lifecycle-standard.md` | Install, scan, repair, and sync reports | `apt-principles-agents` | Runtime reports and manifests are not doctrine. |

## Example Structure

```text
Intent:
Review APT Agent implementation without duplicating it in doctrine.

Owner:
APT standards maintainer and APT Agent implementation maintainer.

Inputs:
APT Principles standards, APT Agent architecture docs, catalogs, routing files, manifests, scripts, and dry-run evidence.

Flow:
Map implementation layer -> standard -> evidence -> owner -> boundary note.

Artifacts:
Crosswalk table, findings, validation summary, residual risk.

Validation:
npm run validate in apt-principles-agents, plus dry-run or read-only checks in apt-principles-agents when implementation behavior is under review.

Risks:
Doctrine duplication, stale model names, missing approval evidence, target-context overwrite.

Related APT docs:
ai-agent-framework.md, references/ai-harness-contract.json.
```

## Tradeoffs

A crosswalk is lighter than a copied catalog but still requires maintenance when implementation layers change. That is the right tradeoff: reviewers can see whether APT Agent implements the standards while each repository keeps its proper ownership.

## Common Mistakes

- Copying `docs/AGENT-CATALOG.md` from `apt-principles-agents` into `apt-principles-agents`.
- Treating `routing/model-registry.json` model entries as canonical doctrine.
- Reviewing install or repair behavior without dry-run evidence.
- Forgetting that target repositories own `docs/project-context.md` and local overrides.
- Updating APT Agent implementation after doctrine changes without adding standards links.

## Implementation Notes

APT Agent can generate a crosswalk report from its own manifests and catalogs later. `apt-principles-agents` should keep this as an example of the review shape, not the runtime report generator.

## Related Documents

- `../../ai-agent-framework.md`
- `../../standards/ai/agent-harness-standard.md`
- `../../standards/ai/model-routing-standard.md`
- `../../standards/ai/repository-lifecycle-standard.md`
- `../../prompts/apt-agent-conformance-review-prompt.md`
- `../../references/ai-harness-contract.json`
