---
title: Applied Practical Thinking Public Docs Source Audit
version: v1
last_updated: 2026-04-27
owner: APT
status: draft
audience: internal
visibility: internal
source: manual
review_type: docs-source-of-truth-audit
canonical_source: ../../../../apt-principles
---

# Applied Practical Thinking Public Docs Source Audit

## Findings

| Severity | Area | Finding | Evidence | Corrective action |
| --- | --- | --- | --- | --- |
| Minor | Knowledge | `apt-principles` is correctly established as the source of truth for APT doctrine, build-kit content, references, prompts, examples, and templates. | `../apt-principles/README.md`; `apps/web/scripts/generate-apt-principles-public.cjs`; `docs/apt/adoption.md` | Keep doctrine changes in `apt-principles`; publish into this repo through the generator. |
| Minor | Knowledge / Release | Public APT doctrine artifacts in this repo are generated publication outputs, not authored source. | `apps/web/public/docs/apt/manifest.json`; `apps/web/data/generated/aptPrinciplesPublicManifest.ts`; generator comment: "Do not edit by hand." | Do not hand-edit `apps/web/public/docs/apt/**` or `apps/web/data/generated/aptPrinciplesPublicManifest.ts`; regenerate them from `apt-principles`. |
| Minor | Design / Knowledge | Several v2 design docs overlap with canonical APT lifecycle areas. They are useful as public design-site companions, but should not read as alternate canonical doctrine. | `apps/web/docs/design/versions/v2/APT-PRINCIPLES-FRAMEWORK.md`; `APT-EXECUTION-MODEL.md`; `APT-QUALITY-TESTING.md`; `APT-RELEASE-CHANGE-MANAGEMENT.md`; `APT-OPERATIONS-SUPPORT.md`; `APT-SYSTEM-STANDARDS.md`; `APT-AI-AGENT-FRAMEWORK.md` | Added companion/source notes that point to the canonical `/docs/apt/...` publication paths. In a later pass, shorten duplicated framework prose if it drifts. |
| Info | Design | Local design-system docs remain valid local source for public site design behavior, token usage, design docs versioning, UI patterns, and site-specific docs architecture. | `apps/web/docs/design/APT-DESIGN-DOCS-MANIFEST.json`; `apps/web/docs/design/static/*`; `apps/web/docs/design/versions/v2/APT-DESIGN-SYSTEM.md`; pattern docs | Keep these local; cross-link to `apt-principles` only when they summarize framework-level doctrine. |
| Info | Operations | The repo was clean before this pass, so there were no pre-existing generated-doc changes to preserve during the audit. | `git status --short` before edits returned no paths. | Continue checking dirty state before running generation commands, because publication scripts intentionally rewrite generated outputs. |

## Ownership Model

| Ownership group | Source paths | Purpose | Edit rule |
| --- | --- | --- | --- |
| Canonical APT source | `../apt-principles/**` | Doctrine, build kit, references, prompts, examples, templates, validation tooling | Edit here when changing APT-wide principles or reusable standards. |
| Generated public APT artifacts | `apps/web/public/docs/apt/**`; `apps/web/data/generated/aptPrinciplesPublicManifest.ts` | Public-site copy of canonical `apt-principles` docs and route data | Do not hand-edit; regenerate with `pnpm --dir apps/web run generate-apt-principles-public`. |
| Local APT adoption evidence | `docs/apt/adoption.md`; `docs/apt/project-profile.md`; `docs/apt/references/project-profile.json`; `docs/apt/reports/**` | Repo-specific adoption, profile, audits, validation evidence | Edit locally; link back to canonical checklists and schemas. |
| Public site docs | `docs/*.md`; route copy under `apps/web/routes/**`; content indexes | Site operations, deployment, platform IDs, local architecture, visitor-facing summaries | Edit locally when describing this repo or the public site. |
| Local design docs | `apps/web/docs/design/**` | Site design system, token companion docs, pattern docs, design-doc publishing model | Edit locally for site/design behavior; add source notes when summarizing APT-wide doctrine. |

## Canonical To Public Mapping

| Canonical source | Generated public path | Public role |
| --- | --- | --- |
| `apt-principles/README.md` | `/docs/apt/README.md` | Public index for APT doctrine/build-kit ownership and workflow. |
| `apt-principles/apt-principles.md` | `/docs/apt/apt-principles.md` | Canonical framework and lifecycle map. |
| `apt-principles/thinking.md` | `/docs/apt/thinking.md` | Thinking doctrine. |
| `apt-principles/design.md` | `/docs/apt/design.md` | Design doctrine. |
| `apt-principles/architecture.md` | `/docs/apt/architecture.md` | Architecture doctrine. |
| `apt-principles/system-standards.md` | `/docs/apt/system-standards.md` | System standards doctrine. |
| `apt-principles/security.md` | `/docs/apt/security.md` | Security doctrine. |
| `apt-principles/execution.md` | `/docs/apt/execution.md` | Execution doctrine. |
| `apt-principles/quality-testing.md` | `/docs/apt/quality-testing.md` | Quality and testing doctrine. |
| `apt-principles/release-change-management.md` | `/docs/apt/release-change-management.md` | Release and change doctrine. |
| `apt-principles/operations-support.md` | `/docs/apt/operations-support.md` | Operations and support doctrine. |
| `apt-principles/knowledge-system.md` | `/docs/apt/knowledge-system.md` | Knowledge-system doctrine. |
| `apt-principles/ai-agent-framework.md` | `/docs/apt/ai-agent-framework.md` | AI and agent doctrine. |
| `apt-principles/apt-principles-framework-audit.md` | `/docs/apt/apt-principles-framework-audit.md` | Framework consolidation audit. |
| `apt-principles/checklists/**` | `/docs/apt/checklists/**` | Public review gates and adoption checklists. |
| `apt-principles/examples/**` | `/docs/apt/examples/**` | Public applied examples. |
| `apt-principles/prompts/**` | `/docs/apt/prompts/**` | Public reusable AI/operator prompts. |
| `apt-principles/references/**` | `/docs/apt/references/**` | Public machine-readable reference contracts. |
| `apt-principles/templates/**` | `/docs/apt/templates/**` | Public authoring templates. |

Current generated manifest evidence shows 75 public APT documents: 13 doctrine docs, 1 audit doc, 12 checklists, 20 examples, 12 prompts, 7 references, 4 support docs, and 6 templates.

## Overlap Review

These local v2 design docs overlap with canonical APT framework areas and now include source notes that define them as public companion summaries:

| Local design doc | Canonical source | Status after this pass |
| --- | --- | --- |
| `apps/web/docs/design/versions/v2/APT-PRINCIPLES-FRAMEWORK.md` | `apt-principles/apt-principles.md` | Companion summary; no longer labels itself canonical. |
| `apps/web/docs/design/versions/v2/APT-EXECUTION-MODEL.md` | `apt-principles/execution.md` | Companion summary with canonical public path. |
| `apps/web/docs/design/versions/v2/APT-QUALITY-TESTING.md` | `apt-principles/quality-testing.md` | Companion summary with canonical public path. |
| `apps/web/docs/design/versions/v2/APT-RELEASE-CHANGE-MANAGEMENT.md` | `apt-principles/release-change-management.md` | Companion summary with canonical public path. |
| `apps/web/docs/design/versions/v2/APT-OPERATIONS-SUPPORT.md` | `apt-principles/operations-support.md` | Companion summary with canonical public path. |
| `apps/web/docs/design/versions/v2/APT-SYSTEM-STANDARDS.md` | `apt-principles/system-standards.md` | Companion summary with canonical public path. |
| `apps/web/docs/design/versions/v2/APT-AI-AGENT-FRAMEWORK.md` | `apt-principles/ai-agent-framework.md` | Companion summary with canonical public path. |

Local docs that should remain local include `APT-DESIGN-SYSTEM.md`, `APT-TOKENS.md`, `APT-DESIGN-ARCHITECTURE.md`, `APT-CONTENT-NAMING-AND-MESSAGING.md`, design review bundle/static contracts, and UI pattern docs. Those files describe how this public site designs, validates, and publishes its own design materials.

## Remediation Recommendations

1. Keep all APT-wide doctrine edits in `apt-principles`.
2. Treat `applied-practical-thinking` as the public presentation and publication layer for that doctrine.
3. When local docs need to explain APT-wide concepts, label them as companion summaries and link to `/docs/apt/...`.
4. If local companion docs grow beyond summary/detail needs, replace duplicated doctrine sections with short excerpts, local interpretation, and canonical links.
5. Add a future validation guard that searches local design docs for phrases like "Canonical reference" when the file is not generated from `apt-principles`.

## Validation Results

Canonical validation:

- `npm run validate` in `../apt-principles`: PASS. Scanned 68 files, 0 errors, 1 warning for unexpected top-level `.gitattributes`.

Public publication and web validation:

- `pnpm --dir apps/web run generate-apt-principles-public`: PASS. Generated 75 public APT docs from `../apt-principles`.
- `pnpm --dir apps/web run validation-report`: PASS after APT docs metadata cleanup.
- `pnpm --dir apps/web run build-content-index`: PASS.
- `pnpm --dir apps/web run copy-content-to-public`: PASS.
- `pnpm --dir apps/web run token-drift-check`: PASS.
- `pnpm --dir apps/web lint`: PASS.
- `pnpm --dir apps/web test`: PASS. 17 files, 46 tests.

This pass intentionally did not hand-edit `apps/web/public/**`. Public artifacts changed only through the requested generation and copy commands.

## Residual Risk

- The public design docs still contain summarized framework content. That is acceptable for public education, but they can drift if canonical doctrine changes and the summaries are not reviewed.
- Generation commands rewrite public artifacts by design. Review `git status --short` before and after running them.
- `apps/web/docs/design/APT-DESIGN-DOCS-MANIFEST.json` describes design-doc canonical paths inside the public design-doc system. That remains correct locally, but future wording should avoid implying APT-wide doctrine ownership outside `apt-principles`.
