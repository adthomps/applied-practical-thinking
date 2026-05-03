---
title: APT Principles Framework Audit
version: v1
last_updated: 2026-05-01
owner: APT
status: draft
---

# APT Principles Framework Audit

## Purpose

This audit reviews the `apt-principles` documentation set against the desired APT principles framework and identifies reusable material from `applied-practical-thinking`.

The goal is to turn the existing skeleton into a complete, governed doctrine system:

1. APT Principles Framework
2. APT Thinking Principles (Why)
3. APT Design Principles (What)
4. APT Architecture Standards (How)
5. APT System Standards (Consistency)
6. APT Execution Model (Build)
7. APT Quality & Testing (Validate)
8. APT Release & Change Management (Promote)
9. APT Operations & Support Thinking (Run & Support)
10. APT Knowledge System (Learn & Scale)
11. APT AI & Agent Framework (Augmentation Layer)
12. APT Security & Authentication Standard

## Current State Summary

`apt-principles` has been consolidated into a mixed doctrine and build kit. It includes the core framework index, individual principle documents, templates, checklists, examples, and reusable AI prompts.

The strongest current documents are:

- `apt-principles.md`
- `architecture.md`
- `system-standards.md`
- `security.md`
- `thinking.md`
- `design.md`
- `execution.md`
- `quality-testing.md`
- `release-change-management.md`
- `operations-support.md`
- `knowledge-system.md`
- `ai-agent-framework.md`

The important discovery remains: `applied-practical-thinking/apps/web/data/aptPrinciples.ts` contains a complete lifecycle model for all APT principle groups. That file should remain a useful comparison source if the site data is later synced from Markdown doctrine.

## Reusable Source Material

### From `apt-principles`

Use these as current doctrine foundations:

- `apt-principles.md`: framework overview, operating rules, and documentation model.
- `architecture.md`: baseline architecture standards, Cloudflare orientation, app/package boundaries.
- `system-standards.md`: API naming, response shape, validation, structured errors.
- `security.md`: auth/session defaults, trust boundaries, bot/abuse protection.
- `thinking.md`: problem framing, tradeoffs, constraints, and success criteria.
- `design.md`: UI/UX state doctrine, visual language, token discipline, component usage rules.
- `execution.md`: spec-driven increments and validation checkpoints.
- `quality-testing.md`: layered validation and diagnostics.
- `release-change-management.md`: release notes, preview, support handoff, rollback.
- `operations-support.md`: observability, support response, telemetry shape.
- `knowledge-system.md`: canonical knowledge, metadata, examples, drift control.
- `ai-agent-framework.md`: prompt ownership, agent contract, approvals, evaluation gates.
- `templates/principle-doc-template.md`: best available structure for every core principle document.

Use these as supporting materials:

- `checklists/*`: review and release gates.
- `examples/*`: starter examples for API, security, UI, architecture, and workflows.
- `prompts/*`: reusable review and build prompts.

Historical source/reference material has been saved outside this active package. It includes generated design guides, Lovable themes, portfolio one-shots, repository framework notes, and Copilot prompt drafts that were harvested into active doctrine.

### From `applied-practical-thinking`

Use these as developed content sources:

- `apps/web/data/aptPrinciples.ts`: complete principle group definitions, focus areas, outputs, examples, and AI prompt examples.
- `apps/web/data/architecturePatterns.tsx`: concrete architecture patterns: monorepo layout, frontend/backend split, AI prompt ownership, CI/CD, branch protection, code ownership.
- `apps/web/data/designSections.ts`: information architecture for design/principles/docs/support/knowledge surfaces.
- `apps/web/data/systems.ts`: system reference examples for APT site, auth patterns, data pipeline, and shadcn UI Builder.
- `apps/worker/src/ai/docs/design-thinking.md`: concise design thinking summary.
- `apps/worker/src/ai/docs/design-system.md`: concise design system summary.
- `apps/worker/src/ai/docs/design-architecture.md`: concise architecture summary.
- `apps/worker/src/ai/docs/support-design-implementation.md`: operational support implementation patterns and telemetry example.
- `apps/worker/src/ai/docs/knowledge-engine-implementation.md`: ingest/query/feedback examples for the knowledge layer.

## Gap Matrix

| Framework Area | Current Coverage | Best Source to Reuse | Gap |
|---|---:|---|---|
| APT Principles Framework | High | `apt-principles.md`, `prompts/framework-review-prompt.md` | Add visual lifecycle diagram when this becomes a rendered site page. |
| Thinking (Why) | High | `thinking.md`, thinking checklist, thinking example | Add deeper decision-log examples when real decisions accumulate. |
| Design (What) | High | `design.md`, design checklist, UI examples, design prompt | Add richer component/state examples when UI patterns mature. |
| Architecture (How) | High | `architecture.md`, architecture checklist, architecture examples, architecture prompt | Add diagrams when needed. |
| System Standards (Consistency) | High | `system-standards.md`, API checklist, API examples, API prompt | Add project-specific naming matrices when a target repo requires them. |
| Execution (Build) | High | `execution.md`, execution checklist, workflow examples, one-shot prompt | Add PR/story templates when teams standardize issue tooling. |
| Quality & Testing (Validate) | High | `quality-testing.md`, quality checklist, validation example, testing prompt | Add command matrices per repo later. |
| Release & Change Management (Promote) | High | `release-change-management.md`, release checklist, workflow example, release prompt | Add changelog template when release format is standardized. |
| Operations & Support (Run & Support) | High | `operations-support.md`, operations checklist, operations prompt | Add project-specific runbooks per deployed system. |
| Knowledge System (Learn & Scale) | High | `knowledge-system.md`, knowledge checklist, knowledge example, knowledge prompt | Add frontmatter schema if docs are consumed by a renderer. |
| AI & Agent Framework | High | `ai-agent-framework.md`, AI checklist, AI example, framework/one-shot prompts | Add evaluation-case examples when agent workflows become runnable. |
| Security & Authentication | High | `security.md`, security checklist, security examples, security prompt | Add threat-model examples when a target app requires deeper auth design. |

## Remaining Gaps

### 1. Deeper principle examples

The core docs now have full bodies and each principle area has related checklist/example/prompt coverage. Future passes can add longer examples, diagrams, and repo-specific command matrices.

### 2. Canonical source decision

Right now the principle model exists in both Markdown and TypeScript data. That creates drift risk.

Recommended direction:

- Use `apt-principles/*.md` as the canonical doctrine source.
- Use `applied-practical-thinking/apps/web/data/aptPrinciples.ts` as the current content seed and site rendering model.
- Add a sync or validation step later so site navigation and doctrine docs cannot drift.

### 3. Consistent naming

Some names differ across files and routes:

- Knowledge doc slug is canonical as `knowledge-system`; public routes may use Knowledge or legacy aliases only when they point back to `knowledge-system.md`.
- Operations doc slug is canonical as `operations-support`; route/group IDs may shorten this to Operations if generated views preserve the source path.
- Security is a formal lifecycle layer and should remain represented in both canonical doctrine and public principle data.

Recommended direction:

- Keep user-facing labels descriptive.
- Keep file slugs stable and explicit.
- Preserve source-path metadata in generated public views so route aliases do not become competing doctrine sources.

### 4. Required artifacts per principle

The framework now defines required artifacts in each principle doc. Future project-specific extensions can make those artifacts more concrete. Examples:

- Thinking: problem statement, success criteria, decision log.
- Design: UX state map, interaction rules, acceptance criteria.
- Architecture: boundary map, API contract, responsibility matrix.
- System: naming rules, shared package contract, config/env contract.
- Execution: spec, implementation plan, task breakdown, PR checklist.
- Quality: validation plan, test evidence, failure diagnostics.
- Release: changelog, release notes, rollback plan, deployment record.
- Operations: runbook, alert rules, incident template, support escalation path.
- Knowledge: canonical doc, frontmatter metadata, reuse links, ingestion notes.
- AI/Agent: prompt contract, allowed tools, review criteria, evaluation cases.
- Security: auth model, authorization rules, secrets policy, threat review.

### 5. Review checklists can become repo-specific

The checklists now contain scope, required checks, failure conditions, evidence, and related docs. Future project-specific versions can add exact commands, owners, and CI gate names.

### 6. Examples can keep growing

The example stubs have been replaced with real starter examples across API, architecture, security, UI, workflow, thinking, quality, knowledge, and AI-agent categories. Future passes can add code-level examples once a target repo or implementation language is selected.

## Recommended Build-Out Order

### Phase 1: Canonical framework cleanup

1. Expand `apt-principles.md` into the official framework overview.
2. Keep Security as a formal lifecycle area while also reviewing it as a cross-cutting concern.
3. Normalize doc slugs and labels across `apt-principles` and `applied-practical-thinking`.
4. Add a lifecycle map showing:
   - Why: Thinking
   - What: Design
   - How: Architecture
   - Consistency: System Standards
   - Build: Execution
   - Validate: Quality & Testing
   - Promote: Release & Change Management
   - Run & Support: Operations
   - Learn & Scale: Knowledge
   - Augment: AI & Agent
   - Protect: Security

### Phase 2: Continue strengthening core docs

Use `apps/web/data/aptPrinciples.ts` and the principle template to keep expanding:

1. `thinking.md`
2. `design.md`
3. `execution.md`
4. `quality-testing.md`
5. `release-change-management.md`
6. `operations-support.md`
7. `knowledge-system.md`
8. `ai-agent-framework.md`

### Phase 3: Keep mature docs aligned

Keep richer material aligned in:

1. `architecture.md` and `architecturePatterns.tsx`.
2. `system-standards.md`.
3. `security.md` from `systems.ts` auth patterns and security examples.

### Phase 4: Keep support artifacts aligned

1. Keep checklists aligned with principle docs.
2. Keep examples realistic and narrow.
3. Keep prompts mapped to the principle docs they enforce.
4. Keep the framework-level review prompt aligned with all APT layers.

### Phase 5: Wire into `applied-practical-thinking`

1. Decide whether Markdown docs feed the app or TypeScript data remains the render source.
2. Add validation that every principle group has:
   - a route
   - a doc
   - a checklist or review prompt
   - at least one example
3. Keep AI docs in `apps/worker/src/ai/docs` short and implementation-focused, pointing back to canonical doctrine.

## Recommended Definition of Done

The APT principles framework is complete when:

- Every framework area has a full principle doc.
- Every principle doc has required artifacts and examples.
- Every principle area has at least one checklist, example, or prompt.
- The app/site navigation matches the canonical docs.
- Security is clearly positioned as either a cross-cutting standard or a formal lifecycle layer.
- The framework can be used by both humans and AI agents without relying on unstated context.

## Immediate Next Step

Use the validator as the baseline gate before future expansion:

```bash
npm --prefix apt-principles run validate
```

The next useful content pass should focus on depth rather than missing structure: decision-log examples, rendered lifecycle diagrams, repo-specific command matrices, and richer runbook/evaluation examples.
