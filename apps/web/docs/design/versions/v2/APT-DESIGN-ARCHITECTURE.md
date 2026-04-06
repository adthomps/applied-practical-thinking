---
docId: design-architecture
slug: architecture
major: 2
semanticVersion: 2.4.0
status: candidate
publishedAt: 2026-04-05
---
# APT Design Architecture

> Structure exists to prevent failure, not to enable creativity.

This document defines enforceable architecture rules for APT delivery: repo boundaries, data flow ownership, deploy authority, AI prompt ownership, documentation architecture, and merge-gate checks.

It is the authoritative doctrine for both system architecture and documentation architecture.

---

## Architecture Guard Rails (MUST / NEVER)

### Boundary Ownership

**MUST**
- Keep frontend composition and route rendering in `apps/web`.
- Keep API, auth, and external integrations in `apps/worker`.
- Keep reusable presentational primitives in `packages/ui`.
- Keep shared contracts in `packages/config` and `packages/knowledge`.

**NEVER**
- Add backend execution logic to `apps/web` route/components.
- Add frontend rendering concerns to `apps/worker` handlers.
- Duplicate shared contracts across app-specific folders.

### Source-of-Truth Boundaries

**MUST**
- Treat authored doctrine in `apps/web/docs/design/` as source-of-truth for current public design guidance.
- Treat `public/docs/design` as generated output only.
- Record major architecture deviations in `docs/DECISION_LOG.md`.

**NEVER**
- Edit generated public docs as primary authored source.
- Ship architecture boundary changes without doctrine or decision-log alignment.

---

## Documentation Architecture (Canonical Section)

Documentation is an explicit architecture layer, not a byproduct.
This section is the canonical documentation architecture doctrine.
`APT-ARCHITECTURE-DOC.md` is a compatibility shim that points here.

### Current State (Today)

- Internal docs canonical: `docs/`
- External-first design/public doctrine canonical: `apps/web/docs/design/`
- Generated runtime output: `apps/web/public/docs/*`

### Design Doctrine File Structure (2-Zone Source Model)

Source model under `apps/web/docs/design/`:

```text
apps/web/docs/design/
├─ APT-DESIGN-DOCS-MANIFEST.json   # version routing/control plane
├─ versions/
│  ├─ v1/                          # immutable historical major
│  └─ v2/                          # active authored candidate/stable majors
└─ static/                         # authored support contracts (review/lint/tokens/instructions)
```

Rules:
- `versions/*` is the canonical authored doctrine source.
- `static/*` is the canonical authored support-contract source.
- `APT-DESIGN-DOCS-MANIFEST.json` maps per-doc latest majors and canonical paths.
- Source alias files are not stored at `apps/web/docs/design` root.
- Latest aliases are generated only during publish into `apps/web/public/docs/design/*`.

### Target State (Standard)

- Internal system documentation canonical: `docs/`
- External documentation app canonical: `apps/docs`
- API reference canonical source: OpenAPI specification, published as generated reference in docs app

Status:
- `apps/docs` and full OpenAPI-generated docs flow are defined standards but **not yet active** in this pass.
- This pass is definition-first to avoid structural migration risk.

### Documentation Guard Rails (MUST / NEVER)

**MUST**
- Keep one canonical source per context:
  - internal system understanding -> `docs/`
  - external/public guidance -> current governed design docs (`apps/web/docs/design/`) until `apps/docs` migration is activated
  - API contract truth -> OpenAPI specification (target-state authoritative)
- Separate internal vs external documentation by audience and safety.
- Require metadata for newly introduced documentation-architecture artifacts.
- Allow duplication only when purpose and audience differ.

**NEVER**
- Share one markdown source file as both internal and external truth.
- Blindly copy/paste between internal and public docs without explicit ownership.
- Expose internal-only operational/sensitive detail in external docs.

### Metadata Standard (New Artifacts: Strict)

For new documentation-architecture markdown docs, metadata MUST include:
- `title`
- `version`
- `status`
- `audience`
- `visibility`
- `source`

Recommended values:
- status: `draft | beta | candidate | stable | deprecated`
- audience: `public | customer | developer | internal`
- visibility: `public | protected | internal`
- source: `manual | generated-openapi | generated-json | hybrid`

Legacy docs migrate gradually to this metadata standard.

### Phased Metadata Enforcement Rollout

Repo-wide markdown metadata enforcement is intentionally phased:

- Wave 1 (enforce on 2026-04-20): `apps/web/docs/design/static/*.md`, `apps/web/ai/prompts/*.md`
- Wave 2 (enforce on 2026-05-15): `docs/*.md` plus root operational docs (`README.md`, `PROJECT_RULES.md`, `DOCUMENTATION_INDEX.md`, `AGENTS.md`, `QUICK_REFERENCE.md`)
- Wave 3 (enforce on 2026-06-15): `apps/worker/src/ai/docs/*.md`, `.github/*.md`

Current behavior:
- `frontmatter-report` runs in governance as report-only (non-blocking) until each wave reaches enforcement date.
- strict blocking remains active for governed design doctrine metadata contracts.
- unified governance reporting runs via `validation-report`, producing JSON/Markdown artifacts at `reports/validation/` (`LATEST.*` + timestamped history).

Rollout policy and exceptions are maintained in `docs/DOCUMENTATION_METADATA_ROLLOUT.md`.

### OpenAPI Contract Placeholder (Planned, Not Yet Active)

Authoritative model:

```text
OpenAPI spec
  -> Generate API reference
  -> Publish in target docs app API section
  -> Enhance with guides and examples
```

Ownership target:
- OpenAPI spec: API owner
- Generated reference output: docs/product owner with API owner review

This model is documented now and activated in a future migration phase.

---

## Service/Data Flow Reference

Use this flow as the default operating pattern:

```text
Route/Page (apps/web/routes)
  -> Service Adapter (apps/web/src/services)
  -> Worker Endpoint (/api/* in apps/worker)
  -> External System / Data Store
```

Rules:
- Components stay presentational whenever possible.
- Services own request shaping and error mapping.
- Worker routes own validation, authorization, and side effects.
- Cross-boundary contracts remain typed and version-aware.

---

## Deploy Authority Matrix

| Surface | Build/Deploy Authority | Primary Config Ownership | Rule |
|---|---|---|---|
| Web app (`apps/web`) | Cloudflare Pages | `VITE_API_BASE` in Pages env | Web deploy is static-first and independent. |
| Worker API (`apps/worker`) | Cloudflare Workers | `PUBLIC_SITE_ORIGIN` + Worker bindings | Worker deploy owns runtime API behavior. |
| Design docs publish | `copy-content-to-public.cjs` | `apps/web/docs/design` manifest/frontmatter | Manifest and metadata must match canonical contracts. |

Enforcement:
- Deploy order after runtime config changes: Worker first, Pages second.
- No manual dual-path deploy logic for the same surface.

---

## Anti-Patterns and Fail Conditions

### Boundary Erosion
- Signal: route code directly implements backend logic or contracts.
- Fail condition: web/worker responsibilities become mixed in same layer.

### Tooling Split-Brain
- Signal: two independent build/deploy paths produce conflicting artifacts.
- Fail condition: production state cannot be traced to one authoritative pipeline.

### Documentation Drift
- Signal: doctrine and repo behavior disagree on ownership/rules.
- Fail condition: architecture docs describe a system that is not what ships.

### Internal/External Leakage
- Signal: internal constraints or sensitive operational detail appears in external docs.
- Fail condition: audience boundary is broken.

---

## AI Prompt Ownership and Routing

Prompt ownership is architectural, not optional.

**MUST**
- Keep AI prompt assets versioned in `apps/web/ai/prompts/`.
- Map prompt usage to review and maintainer roles.
- Keep internal execution authority in `.github/copilot-instructions.md`.
- Keep external/public collaborator rules in `APT-AI-INSTRUCTIONS-REFERENCE.md`.
- Use documentation architecture artifacts when reviewing documentation-boundary changes.

**NEVER**
- Publish internal-only operational constraints in public handoff artifacts.
- Bypass architecture or documentation-boundary checks because output is AI-assisted.

---

## Architecture Lint / Review Checklist (Critical Gate)

A change is not review-complete if any critical architecture item fails.

Critical checks:
1. Boundary ownership remains explicit (`apps/web`, `apps/worker`, `packages/*`).
2. Service/data flow follows route -> service -> worker -> integration.
3. Deploy authority remains single-path and traceable.
4. Prompt ownership and audience split (internal vs external) are preserved.
5. Documentation architecture boundaries (canonical source + audience separation) are preserved.
6. No source-of-truth drift between doctrine and repo behavior.

Reviewer decision:
- `Pass` — Architecture-aligned.
- `Pass with fixes` — Non-critical issues only.
- `Fail` — Any critical item unresolved.

Merge policy:
- Unresolved critical architecture failures block merge unless a linked exception exists in `docs/DECISION_LOG.md`.

---

## Applied Examples and Reference Artifacts

Use these with this doctrine:

- `APT-ARCHITECTURE-EXAMPLES.md`
- `APT-ARCHITECTURE-REFERENCE.json`
- `APT-ARCHITECTURE-DOC.md`
- `APT-ARCHITECTURE-DOC-EXAMPLES.md`
- `APT-ARCHITECTURE-DOC-REFERENCE.json`

---

## v2 Changelog

- `2.4.0` (2026-04-05): updated doctrine file-structure guidance to strict 2-zone source model (`versions/` + `static/`) with manifest control plane and publish-generated aliases only.
- `2.3.0` (2026-04-05): consolidated documentation architecture doctrine authority into this file; `APT-ARCHITECTURE-DOC.md` is now a compatibility shim/reference entrypoint.
- `2.2.0` (2026-04-05): documentation architecture standard integrated (current vs target mapping, canonical-source rules, metadata standard, OpenAPI target placeholders, and doc-boundary gate checks).
- `2.1.0` (2026-04-05): strict guard rails, explicit flow/deploy matrices, fail-condition anti-patterns, architecture critical-gate checklist, and examples/reference artifact alignment.
- `2.0.0` (2026-04-05): v2 governance sync for strict doctrine enforcement with unchanged runtime boundaries.

---

## Related Doctrine

- `APT-ARCHITECTURE-DOC.md` (compatibility shim)
- `APT-DESIGN-THINKING.md`
- `APT-DESIGN-SYSTEM.md`
- `APT-REVIEW-STANDARD.md`
- `APT-AI-INSTRUCTIONS-REFERENCE.md`
