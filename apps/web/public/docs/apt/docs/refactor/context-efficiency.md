---
title: Refactor Context Efficiency
kind: assessment
domain: ai
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/context-efficiency.md"]
---

# Context Efficiency

## Problem

The repository has many useful assets: principles, standards, skills, agents, prompts, context packs, adapters, examples, templates, generated catalogs, and archives. Loading all of them for every task would waste tokens and increase the chance that old examples, adapters, generated outputs, or archive content distract from canonical sources.

## Selective-Loading Model

1. Start with task intent and risk.
2. Load `AGENTS.md` for immediate repository behavior.
3. Load one context pack when available.
4. Load only the relevant canonical principle and standard.
5. Load one skill, workflow, and agent role if the task needs them.
6. Load target repository files or local evidence.
7. Consult generated knowledge only for navigation, then verify against source.

## Context Asset Roles

| Asset | Use | Limitation |
| --- | --- | --- |
| Context indexes | Find likely source files quickly. | Not proof of policy. |
| Compact repository summaries | Orient agents to structure. | Must be source-linked and fresh. |
| Metadata filtering | Select by domain, status, owner, audience, source path. | Metadata quality must be validated. |
| Task packets | Bundle the smallest useful context for one task. | Needs schema and review. |
| Directory-scoped instructions | Narrow local rules. | Cannot override higher authority. |
| Role-based context packs | Load source maps by work type. | Cannot replace exact source reads for final claims. |
| OKF traversal | Navigate concepts and relationships. | Generated projections are non-authoritative. |
| generated wiki tooling | Understand repo structure and relationships. | Treat as untrusted generated narrative. |

## Minimum Viable Context Packet

For the pilot, do not create a new task-packet schema or new asset type. Use a minimum viable context packet recorded as plain text in the pilot ADR or workflow documentation. It should include only:

- Task intent.
- Applicable principles.
- Applicable standards.
- Selected skills.
- Selected workflow.
- Agent role.
- Relevant repository scope.
- Security constraints.
- Expected output.
- Validation steps.

Possible future metadata, only after a named consumer exists:

```yaml
task_intent: <short statement>
risk_level: low|medium|high
source_files:
  principles: []
  standards: []
  skills: []
  workflows: []
  agents: []
scope_paths: []
excluded_paths: []
generated_context_allowed: false
validation: []
```

## Maximum Context Guidance

| Task type | Default context |
| --- | --- |
| Simple doc edit | `AGENTS.md`, target doc, nearest README, one relevant principle if needed. |
| Skill edit | `AGENTS.md`, target `SKILL.md`, `skills/README.md`, relevant principle/standard, tests. |
| Agent edit | `AGENTS.md`, target agent, `agents/README.md`, required skills, relevant AI standard. |
| Adapter edit | `AGENTS.md`, canonical source asset, target platform adapter docs, installer behavior. |
| Security/payment/API claim | Exact canonical principle, standard, target source, checklist, and human review notes. |
| Generated knowledge work | Authority hierarchy, generated-content controls, selected source paths, validation rules. |

Avoid loading:

- `docs/archive/` unless provenance is the task.
- All platform adapters when only one tool is involved.
- Generated catalogs as proof of behavior.
- All principles for a narrow domain task.
- All examples/templates unless comparing patterns.

## generated wiki tooling Consultation Rule

Use generated wiki tooling only when the question is about repository structure, relationships, or navigation and the generated output is fresh and reviewed enough for the risk level. Do not use generated wiki tooling to answer policy, security, compliance, or final architecture decisions without checking canonical sources.

## Validator Exclusion Gap

Independent review found that validation can report issues under gitignored temporary residue in a sandbox environment. This is not a repository content defect, but it indicates a validator scope/exclusion gap:

- Validation appears able to scan temporary or ignored content.
- This can create local false positives that differ from CI behavior.
- Cleanup may be blocked by sandbox ownership.
- Generated-output directories such as a future generated wiki tooling location need explicit inclusion or exclusion rules before being committed.

Until validator behavior is decided, agents should distinguish repository content failures from ignored local residue and should not delete sandbox-controlled temporary files as part of refactor assessment work.

## OKF Consultation Rule

Use OKF for concept relationship traversal, portable knowledge, and retrieval support. For any final claim, follow the OKF record back to the source path and verify the source.

## Direct Source Read Rule

Read canonical doctrine directly when:

- The answer claims compliance or readiness.
- The task touches security, privacy, compliance, payments, API contracts, production release, architecture, or generated policy.
- A generated summary conflicts with a source file.
- A stale or missing source path appears.

## Validation

Future validation should check:

- Task packets reference existing files.
- Generated context is marked and not loaded by default for high-risk tasks.
- Context packs cite exact sources.
- Archive content is excluded unless explicitly requested.
- Adapter generation does not embed unverified generated wiki tooling or OKF-generated claims.
