---
title: Refactor Current-State Inventory
kind: assessment
domain: architecture
status: active
owner: APT
last_updated: 2026-07-11
source_paths: ["apt-principles-agents/docs/refactor/current-state-inventory.md"]
---

# Current-State Inventory

## Assessment Basis

Evidence inspected in this phase:

- `npm run check` passes through repository validation, metadata validation, manifest parity, and installer lifecycle tests.
- `docs/migration/source-ledger.json` classifies 505 of 505 former source files.
- Top-level file counts show substantial active areas: `principles` 140 files, `skills` 144, `agents` 80, `platforms` 103, `prompts` 84, `templates` 93, `examples` 75, `docs` 72.
- `scripts/validate-repository.mjs` validates frontmatter, required top-level directories, skill/agent headings, manifest paths, source-ledger integrity, generated catalogs, active broken links, and banned retired interfaces.
- `scripts/apt-assets.mjs` already implements install, scan, sync, repair, uninstall, detect, legacy migration, workspace audit, and parity checks.

Conclusion: the repository is mechanically healthy and partly coherent. It is not merely two raw repositories colocated, but some active docs and adapters still carry old names, root-doctrine assumptions, and overlapping instruction surfaces.

## Asset Taxonomy Used

| Asset | Responsibility |
| --- | --- |
| Policy | Mandatory constraint that is not merely a design principle; includes security, legal, regulatory, privacy, compliance, and explicit repository constraints. |
| Principle | Governs judgment, values, and tradeoffs. |
| Standard | Defines required or expected practice. |
| Skill | Performs one bounded, reusable capability. |
| Workflow | Coordinates multiple skills, stages, decisions, or roles toward an outcome. |
| Agent | Owns a role, responsibility, decision boundary, or orchestration function. |
| Playbook | Human-oriented guidance for a recurring operational situation. |
| Prompt | Reusable model-facing instruction or interaction fragment. |
| Checklist | Human or agent verification sequence with explicit completion criteria. |
| Template | Provides a reusable output or project structure. |
| Adapter | Presents canonical content or behavior to a specific tool. |
| Manifest | Machine-readable inventory, registration, capability, or installation metadata. |
| Context pack | Curated task- or role-specific context bundle. |
| Routing definition | Rules for selecting agents, skills, workflows, tools, models, or context. |
| Evaluation | Test or scoring asset used to assess behavior or output. |
| Schema | Defines machine-validatable structure. |
| Contract | Machine- or human-consumed interface expectation that may or may not be expressed as a schema. |
| Reference | Documents a contract, vocabulary, example, or supporting specification. |
| ADR | Records an approved architectural decision. |
| Guide | Human-oriented explanatory documentation. |
| Example | Non-authoritative demonstration of usage. |

Generated, canonical, derived, installable, archived, and tool-specific are properties that can apply to many asset types. They are not separate kinds by themselves.

## Taxonomy Classification Decisions

| Asset type | Classification | Reason |
| --- | --- | --- |
| Policy | First-class governance asset. | Mandatory constraints outrank doctrine and execution instructions. |
| Principle | First-class canonical asset. | `principles/` is a major source directory. |
| Standard | First-class canonical asset. | `standards/` is a major source directory. |
| Skill | First-class agent asset. | `skills/` is validated by required `SKILL.md` structure. |
| Workflow | Future first-class asset after pilot. | Workflow-shaped assets exist, but no canonical workflow model exists yet. |
| Agent | First-class agent asset. | `agents/` is validated by required agent structure. |
| Playbook | Subtype of guide unless validated workflow references are added. | Many docs are human-operational guidance without a workflow contract. |
| Prompt | First-class reusable model-facing asset. | `prompts/` is top-level and cataloged. |
| Checklist | First-class verification asset. | `checklists/` is top-level and used as review gates. |
| Template | First-class reusable output asset. | `templates/` is top-level and installable. |
| Adapter | First-class delivery-format asset, currently implemented under `platforms/`. | Tool-specific files are substantial and installable. |
| Manifest | First-class distribution metadata asset. | `manifests/` drives installer selection. |
| Context pack | First-class selective-context asset. | `context-packs/` is top-level and directly supports token reduction. |
| Routing definition | First-class operational policy asset. | `routing/` selects models, tasks, agents, skills, and context. |
| Evaluation | First-class validation asset when it defines a test or score; otherwise supporting doc. | Existing scripts and checklists evaluate behavior in different formats. |
| Schema | Future first-class machine-validation asset when trigger criteria are met. | Current schema-like files are mixed into `references/`. |
| Contract | First-class reference asset when consumed by humans or machines. | JSON contracts exist even when not schemas. |
| Reference | First-class supporting specification. | `references/` is top-level. |
| ADR | Future first-class decision asset after DR-013. | Templates exist, but active home is not yet approved. |
| Guide | Supporting documentation asset. | Many docs explain use without enforcing policy. |
| Example | First-class demonstration asset, non-authoritative. | `examples/` is top-level and cataloged. |

## Top-Level Inventory

| Area | Current purpose | Likely origin | Primary consumers | Authority | Maintained state | Overlap | Existing validation | Disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `principles/` | Canonical APT doctrine by pillar and domain. | Mostly former `apt-principles`, enriched by agent standards. | Humans, agents, context packs, prompts, adapters. | High: canonical principles. | Manual. | Some quick-reference and old root-name references overlap with current hubs. | Canonical hub depth, frontmatter, duplicate-body check, broken-link check. | Keep. Normalize stale internal references later. |
| `standards/` | Required practice and installable summaries. | Both former repos. | Reviewers, validators, installers, target repos. | High for enforceable rules; standards constrain practice but must remain consistent with principles. | Manual. | `standards/installable-summaries/` overlaps with canonical domain standards. | Frontmatter, links, manifest path checks. | Keep, then classify summaries as derived or installable compact views. |
| `governance/` | Reviews, maturity, scorecards, service readiness. | Former `apt-principles`. | Maintainers, reviewers, downstream adoption. | High when approved as governance decision, otherwise guide. | Manual. | Some docs still cite old root doctrine names. | Frontmatter and broken-link checks. | Keep, repair stale references later. |
| `skills/` | Tool-portable repeatable procedures. | Both former repos, with many agent-standard skills promoted. | Codex, Claude, Copilot, Gemini, humans. | Canonical workflow capability definitions. | Manual. | Platform-specific copies exist under `platforms/*/source/skills`. | Required `SKILL.md` headings and manifest parity. | Keep. Use as canonical skill source where equivalent adapters exist. |
| `agents/` | Accountable roles and review perspectives. | Mostly former `apt-agent-standards`, aligned to APT doctrine. | Routers, review workflows, humans. | Canonical role definitions. | Manual. | Platform-specific agent files under `platforms/claude` and `platforms/github-copilot`. | Required agent headings. | Keep. Introduce generation strategy before adapter cleanup. |
| `routing/` | Task classification, model routing, token budgeting, model registry. | Former agent standards plus APT AI doctrine. | Agents, installers, future CLI. | Operational guidance, below canonical principles and approved governance. | Manual. | Overlaps with `principles/ai` and `standards/ai`. | Frontmatter and link checks. | Keep, clarify as routing policy and runtime configuration support. |
| `references/` | JSON contracts, schema-like files, vocabulary, design tokens, and supporting specifications. | Both former repos. | Validators, installers, docs, future knowledge systems. | Mixed: some files are consumed contracts, some are supporting references, and some are schema-like but not confirmed as enforced. | Manual. | Overlaps with a possible future `schemas/` directory. | Some JSON files are read by scripts; `installation.schema.json` exists but no confirmed script consumer was found in this assessment. | Keep. Decide schema/reference split before moving anything. |
| `platforms/` | Tool adapters for Codex, Claude, Gemini, Copilot, VS Code, local LLM, shared-source. | Mostly former `apt-agent-standards` plus old Copilot surfaces from `apt-principles`. | Tool users and installers. | Adapter layer, not doctrine. | Mixed manual and distribution/source copies. | Root `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `GEMINI.md`, `platforms/shared-source`, and Copilot source/distribution all overlap. | Manifest parity and link checks; not full adapter-generation validation. | Keep. Treat as adapter home until a future `adapters/` decision is approved. |
| `adapters/` | Not present as a top-level directory. | Proposed future concept only. | Future adapter generator and installers. | Would be derived/adapter layer. | N/A. | Current responsibility lives in `platforms/`. | None. | Do not create now. Decide whether to rename or alias `platforms/` later. |
| `installers/` | Bash and PowerShell wrappers for asset installation. | Consolidated from former lifecycle installers. | Downstream repos, CI smoke tests. | Runtime tooling, not doctrine. | Manual. | Overlaps with `scripts/apt-assets.mjs` command behavior. | CI exercises wrappers on Linux and Windows. | Keep. Consider wrappers as compatibility UX over script core. |
| `scripts/` | Validation, metadata, installer lifecycle, catalog generation, audits. | Merged and rationalized from both repos. | Maintainers, CI, future CLI. | Runtime tooling. | Manual. | Some future conceptual commands map to `apt-assets.mjs`. | `npm run check`, CI, installer tests. | Keep. Do not create packages until components need independent versioning. |
| `examples/` | Concrete demonstrations and pattern examples. | Both former repos. | Humans, agents, downstream adopters. | Supporting evidence, not policy. | Manual. | Some examples are workflow-like and may inform future `workflows/`. | Frontmatter and link checks. | Keep. Classify workflow candidates before moving. |
| `templates/` | Reusable starter artifacts. | Mostly former `apt-principles`. | Humans, installers, downstream repos. | Template layer, not doctrine. | Manual. | Includes instruction templates that could be confused with root policy. | Frontmatter and link checks. | Keep. Mark installed/generated variants clearly in future. |
| `product-hubs/` | Audience-layered product documentation model and example hub. | Former APT principles plus consolidation work. | Product, docs, support, agents. | Product documentation pattern, not global doctrine except template rules. | Manual. | Overlaps with templates and examples. | Product Hub completeness checks. | Keep. No migration needed for this assessment. |
| `docs/` | Local repo documentation, operations, diagrams, distribution catalogs, migration records. | Both former repos. | Maintainers, users, agents. | Supporting docs unless an ADR/governance decision is approved. | Mixed manual and generated catalogs. | Some diagrams and guides still describe obsolete root doctrine layout. | Frontmatter, link checks, catalog row counts. | Keep. Update stale docs in a later phase after authority model approval. |
| `docs/archive/` | Historical source provenance, consolidation scripts, legacy distribution material. | Both former repos. | Maintainers and auditors. | Historical only. | Preserved, not active. | Contains old terms by design. | Excluded from active validation. | Keep. Never treat as active policy. |
| `manifests/` | YAML asset bundles for installation and adoption profiles. | Former profiles rationalized into manifests. | `apt-assets.mjs`, installers, downstream repos. | Distribution selection, not doctrine. | Manual. | Legacy `apt-core` naming remains in context-pack names and compatibility logic. | Manifest path and extension checks. | Keep. Avoid renaming until compatibility plan exists. |
| `context/` | Installable context snippets for specific domains. | Former agent standards. | Agents and downstream repos. | Curated context support. | Manual. | Overlaps with `context-packs/`, standards summaries, prompts. | Frontmatter and manifest checks. | Keep. Clarify context vs context-pack. |
| `context-packs/` | Curated source maps and role/task context bundles for selective loading. | Former APT principles with agent use added. | Agents, humans, future retrieval. | Navigation support, not replacement for source reads. | Manual. | Overlaps with OKF future summaries. | Frontmatter and manifest checks. | Keep. Use as context-efficiency anchor. |
| `checklists/` | Review and readiness gates with explicit completion criteria. | Both former repos. | Humans, agents, validators. | Verification support, below policies, principles, and standards. | Manual. | Some entries cite old root doctrine paths. | Frontmatter and link checks. | Keep. Stale references are cleanup candidates. |
| `prompts/` | Reusable model-facing instructions and interaction fragments. | Both former repos. | Agents and humans. | Prompt layer, not doctrine. | Manual. | Some prompts are workflow-like; platform prompt copies exist. | Catalog generation and link checks. | Keep. Classify workflow candidates before moving. |
| Root instructions | `AGENTS.md`, `CODEX.md`, `CLAUDE.md`, `GEMINI.md` give immediate tool behavior. | Consolidation output. | Local agents and humans. | Immediate operational instruction; conceptually below principles and policy. | Manual. | Overlap with `platforms/shared-source` and platform adapters. | Required root file check. | Keep. Later generate shared core from canonical definitions. |
| Root package files | `package.json`, `.gitignore`, `CONTRIBUTING.md`, `README.md`. | Consolidation output plus former repo content. | Maintainers, CI, users. | Repo operations and entrypoint documentation. | Manual. | `CONTRIBUTING.md` still references former root doctrine names. | Required root file check and `npm run check`. | Keep. Stale reference cleanup later. |
| `.github/` | CI workflow. | Consolidated active repo behavior. | GitHub Actions. | CI enforcement. | Manual. | Tool adapter content is under `platforms/github-copilot`, not root `.github` except CI. | CI runs `npm run check` and installer smoke tests. | Keep. No changes in this phase. |
| `.agents/`, `.codex/`, `.tmp/` | Local tool/workspace support folders. | Local environment. | Local tools only. | Not repository architecture authority. | Tool-managed. | Could be mistaken for repo source if not ignored by readers. | Not part of active docs package. | Ignore for architecture decisions unless committed consumers emerge. |

## Stale Names And Paths

Observed active references include:

- Former root doctrine names such as `apt-principles-agents.md`, `thinking.md`, `design.md`, `architecture.md`, `system-standards.md`, `quality-testing.md`, `release-change-management.md`, `operations-support.md`, `knowledge-system.md`, and `ai-agent-framework.md`.
- Old repo names in provenance metadata, which are appropriate when used in `source_paths` and migration records.
- Retired distribution interface names appear in explicit compatibility or retirement contexts. Exact retired names are intentionally preserved in migration records and reference contracts, not repeated here as active guidance.
- `apt-core` in context-pack naming, legacy migration aliases, installer tests, and distribution checklists. This is not necessarily wrong, but it needs an explicit compatibility story if renamed.

Recommended disposition: keep provenance references, classify active old-path references by consumer, then update only after source-of-truth rules and compatibility requirements are approved.
