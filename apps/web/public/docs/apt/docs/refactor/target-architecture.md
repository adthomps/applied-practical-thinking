---
title: Refactor Target Architecture
kind: assessment
domain: architecture
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/target-architecture.md"]
---

# Target Architecture

## Recommendation

Keep the current top-level structure mostly intact for now. It already expresses a useful documentation and agent-asset repository with distribution and validation tooling:

- `principles/` and `standards/` for canonical judgment and required practice.
- `skills/`, `agents/`, `routing/`, `context/`, and `context-packs/` for AI-assisted operation.
- `platforms/`, `manifests/`, `installers/`, and `scripts/` for distribution, validation, and tool integration.
- `docs/`, `examples/`, `templates/`, and `product-hubs/` for human adoption and reusable artifacts.
- `references/` for current machine-readable contracts and supporting specifications.

Do not add new top-level directories for symmetry. Create future directories only when there is a validated consumer, migration rule, ownership model, validation mechanism, and rollback path. Current evidence does not justify runtime orchestration, service architecture, or premature packages.

## Current Directory Responsibilities

| Directory | Responsibility | Canonical or derived | Manual or generated | Primary consumers | Validation |
| --- | --- | --- | --- | --- | --- |
| `principles/` | Durable APT doctrine. | Canonical. | Manual. | Humans, agents, adapters. | Repository validation and source-provenance checks. |
| `standards/` | Enforceable practice and compact installable summaries. | Canonical for standards, derived for summaries. | Manual today. | Reviewers, installers. | Repository validation. |
| `skills/` | Bounded reusable capabilities. | Canonical skill definitions. | Manual. | Agents and platform adapters. | Skill heading contract and manifest parity. |
| `agents/` | Accountable roles and review perspectives. | Canonical role definitions. | Manual. | Routers, reviewers, adapters. | Agent heading contract. |
| `routing/` | Task/model routing and token budgeting. | Operational policy support. | Manual. | Agents, future CLI. | Repository validation. |
| `references/` | Current contracts, schemas, vocabularies, tokens, and supporting specs. | Mixed. | Manual. | Scripts, validators, docs. | JSON consumers and repository checks. |
| `platforms/` | Tool-native adapter surfaces. | Derived/adapter. | Manual today, partially distribution-like. | Codex, Claude, Gemini, Copilot, local LLM, VS Code. | Manifest and link checks. |
| `docs/` | Human-authored repo documentation, generated catalogs, migration records. | Supporting docs; catalogs derived. | Mixed. | Maintainers and users. | Frontmatter, links, catalog row counts. |
| `prompts/` | Reusable model-facing instructions. | Prompt asset layer, not doctrine. | Manual. | Agents, humans, adapters. | Catalog and link checks. |
| `checklists/` | Verification sequences and gates. | Verification support. | Manual. | Humans, agents, reviewers. | Frontmatter and link checks. |
| `manifests/` | Distribution metadata and bundle selection. | Machine-readable distribution asset. | Manual. | Installers and downstream repos. | Manifest path and parity checks. |
| `context-packs/` | Curated context bundles and source maps. | Navigation/context support. | Manual. | Agents, humans, future retrieval. | Frontmatter and manifest checks. |

## Proposed Future Directories

### `workflows/`

- Responsibility: canonical workflow definitions that coordinate skills, agents, decisions, approval gates, and outputs.
- Why needed: workflow-like assets exist in `examples/workflows/` and planning prompts, but they are not canonical executable or semi-executable definitions.
- Possible migration sources: `examples/workflows/*`, `prompts/planning/*`, selected `prompts/distribution/*`, selected launch or release templates.
- Status: canonical workflow definitions; generated views may exist elsewhere.
- Maintenance: human-authored with optional generated adapters.
- Consumers: agents, future CLI, downstream adopters, task packets.
- Validation: frontmatter, workflow schema, skill/agent reference existence, approval-gate checks.
- Conditions before creation: approve workflow boundary, pilot one descriptive workflow under an existing path, define rollback and compatibility, and prove at least two workflows benefit from shared discovery or validation.
- Consequence of not creating: workflows remain scattered as examples/prompts and cannot be reliably selected or validated.

### Workflow Versus Playbook Rule

A workflow declares machine-checkable references and expected artifacts. It may include structured inputs, ordered stages, decision points, required outputs, participating skills, participating agents or roles, approval gates, validation criteria, and completion criteria. Workflows are documentation-only until an executable state model is separately approved.

A playbook is narrative operational guidance for a recurring situation. It may include situational judgment, optional branches, recommended actions, escalation guidance, examples, and checklists, but it does not need a reference contract.

Decision rule: if an asset must be validated for referenced skills, roles, gates, inputs, and outputs, classify it as a workflow. If it guides a human through judgment without a reference contract, classify it as a playbook. Playbooks may reference workflows, workflows may reference playbooks, and checklists may be embedded in either. A prompt may implement part of a skill without becoming a workflow.

### `schemas/`

- Responsibility: machine-validatable schemas.
- Why needed: `references/` currently contains schema files and non-schema contracts.
- Possible migration sources: `references/installation.schema.json`, `references/project-profile.schema.json`, future agent/skill/workflow/OKF schemas.
- Status: canonical validation schemas.
- Maintenance: manual with tests.
- Consumers: validators, adapter generator, OKF generator, CLI.
- Validation: schema self-validation and consumer tests.
- Conditions before creation: at least one approved trigger exists: two or more schemas require shared discovery and versioning; a validator loads schemas from a stable canonical path; installers or adapters consume schemas programmatically; schema ownership and compatibility policy are approved; schema files require tests independent of descriptive references; or external consumers need a stable machine-readable contract location.
- Consequence of not creating: `references/` remains mixed but stable; acceptable short term.

Schema files should remain colocated with the asset they validate when there is only one local consumer, no shared discovery need, or the file is primarily descriptive contract documentation rather than enforced validation.

### `adapters/`

- Responsibility: generator source and derived tool adapter outputs, if separated from `platforms/`.
- Why needed: current adapter content lives in `platforms/`; the request names adapter files as a conceptual category.
- Possible migration sources: `platforms/shared-source/*`, `platforms/*/source/*`, `platforms/*/distribution/*`.
- Status: generated or adapter-specific, not doctrine.
- Maintenance: mixed generated core, generated mapping, handwritten extension.
- Consumers: Codex, Claude, Gemini, Copilot, installers.
- Validation: generated markers, source hashes, adapter parity, platform smoke tests.
- Conditions before creation: decide whether to keep `platforms/` as adapter home. Do not create both without boundary.
- Consequence of not creating: `platforms/` can continue as active adapter home.

### `knowledge/`

- Responsibility: selected portable knowledge and generated non-authoritative knowledge products.
- Why needed: generated wiki tooling and OKF need clear boundaries from human docs and canonical doctrine.
- Possible migration sources: none by movement in phase 1; future projections from principles, skills, agents, workflows, ADRs, and selected examples.
- Status: mixed; `knowledge/okf/canonical/` would be reviewed source, `knowledge/okf/generated/` would be derived.
- Maintenance: human-authored for canonical knowledge; generated for projections.
- Consumers: retrieval, MCP, future CLI, agents.
- Validation: provenance, schema validation, staleness, generated safety controls.
- Conditions before creation: approve OKF model and first pilot concept set.
- Consequence of not creating: keep using `context-packs/` and `references/knowledge-contracts.json` for navigation.

### `packages/`

- Responsibility: independently useful, testable, versionable, and consumable runtime units.
- Why needed: only if tooling separates into real packages such as `apt-cli`, `apt-schema`, `apt-validator`, or `apt-adapter-generator`.
- Possible migration sources: `scripts/apt-assets.mjs`, validation scripts, future generator code.
- Status: runtime tooling.
- Maintenance: code packages with independent tests and versions.
- Consumers: npm users, CI, MCP servers, downstream repos.
- Validation: package tests, versioning, release checks.
- Conditions before creation: at least one component has independent consumption and lifecycle.
- Consequence of not creating: lower maintenance cost; repo remains a private documentation and asset toolkit.

## Packages Decision

Current classification: documentation and asset repository with tooling, plus a developing distributable toolkit. It is not yet a monorepo with independently versioned units.

Recommendation: do not create `packages/` in the first implementation phase. Revisit only when one component is independently useful, independently testable, independently versionable, and independently consumable.

## First-Phase Structure Rule

The first implementation phase should add minimal pilot documentation only if approved. It should not move existing content, create all future directories, add runtime orchestration, or convert existing assets into a new architecture wholesale.

## Revised Pilot Scope

Verified existing asset:

- `skills/product/voice-of-customer/SKILL.md`.
- `agents/product/apt-voice-of-customer-analyst.md`.

Existing content requiring later promotion, not pilot implementation:

- Working Backwards content currently appears in existing doctrine/context/checklist material rather than a first-class canonical principle file. Extraction is deferred.

Proposed new asset for the pilot:

- A minimal descriptive Market-to-Validated-Concept workflow specification under an existing approved path.

Architecture decision:

- A Canonical versus Generated Knowledge Boundary ADR, which also decides ADR home and indexing.

Future generated projection:

- None in the initial pilot. OKF, generated wiki tooling, and adapter generation remain deferred.
