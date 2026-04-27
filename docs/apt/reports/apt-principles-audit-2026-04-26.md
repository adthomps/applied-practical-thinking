---
title: APT Principles Audit - applied-practical-thinking
version: v1
status: draft
audience: developer
visibility: internal
source: manual
last_updated: 2026-04-26
canonical_source: ../../../../apt-principles
---

# APT Principles Audit - applied-practical-thinking

## Findings

| Severity | APT layer | Finding | Evidence | Recommended action |
|---|---|---|---|---|
| Minor | Knowledge | Local APT adoption/profile layer is now present and aligned to canonical doctrine; keep it synchronized with future principle updates. | `docs/apt/adoption.md`; `docs/apt/project-profile.md`; `docs/apt/references/project-profile.json`; `../apt-principles/checklists/project-adoption-checklist.md` | Revalidate `project-profile.json` in CI on each PR and refresh this report when doctrine-linked fields change. |
| Major | Release / Knowledge | The working tree already contains modified generated APT publication artifacts. That is acceptable if intentional, but audit/remediation work must not overwrite or normalize them accidentally. | `git status --short` showed modified `apps/web/data/generated/aptPrinciplesPublicManifest.ts`, `apps/web/public/docs/apt/**`, and `docs/DECISION_LOG.md` before this audit. | Keep generated public artifacts out of this audit pass; after doctrine sync work, run the normal APT Principles publication flow and commit deliberately. |
| Minor | Design | `About.tsx` still contains a few inline visual comments and decorative gradient/glow details. They use semantic tokens, so this is not a contract violation, but the page is more presentation-heavy than the current APT public-doc posture. | `apps/web/routes/About.tsx` | Leave as-is for this pass. In the next design polish pass, simplify comments and verify the hero/profile treatment against current public-site design doctrine. |
| Minor | Architecture / AI | Worker AI/content runtime has clear route grouping and contracts, but the local AI review evidence is scattered across docs, prompt files, and worker code rather than summarized as adoption evidence. | `apps/worker/src/index.ts`; `apps/worker/src/routes/*`; `apps/web/ai/prompts/*.md`; `docs/AI_AGENTS.md`; `docs/ASSISTANT.md` | Capture AI scope, allowed runtime surfaces, validation, and prompt ownership in the future local adoption/profile docs. |

## Rubric

Scores: `Pass`, `Partial`, `Gap`, `Not Applicable`.

| APT layer | Score | Evidence |
|---|---|---|
| Thinking | Pass | `README.md`, `docs/BRAND.md`, `docs/PATTERNS.md`, and public route copy describe APT purpose, audience, and intent. |
| Design | Partial | Strong design doctrine and UI primitives exist in `apps/web/docs/design/`, `packages/ui`, and routes such as `Start.tsx`; some pages still carry legacy presentation detail that should be reviewed during future polish. |
| Architecture | Pass | `docs/ARCHITECTURE.md`, `PROJECT_RULES.md`, `apps/web`, `apps/worker`, and `packages/*` show clear boundaries. |
| System Standards | Pass | Shared `@apt/config`, `@apt/knowledge`, `@apt/ui`, token contracts, and validation scripts are explicit. |
| Security | Partial | CORS and production API base rules are documented and implemented, but this audit did not deeply verify auth/abuse posture for all worker routes. |
| Execution | Pass | Repo scripts and docs describe safe source/generated flows and worker-first feed adoption. |
| Quality | Pass | Vitest contracts, validation reports, frontmatter checks, and doc-governance scripts are present. |
| Release | Partial | Deployment docs are present; current generated artifact drift needs intentional closeout outside this audit. |
| Operations | Partial | Deployment and maintenance docs exist, but observability/support evidence is lighter than design/doc validation evidence. |
| Knowledge | Partial | Canonical public doctrine sync is strong, but local APT adoption/profile artifacts are missing. |
| AI | Partial | Prompt files and worker AI docs exist; local AI-agent audit summary is not yet centralized. |

## Evidence Sampled

- Canonical APT source: `../apt-principles/apt-principles.md`, lifecycle docs, and review checklists.
- Project docs: `README.md`, `PROJECT_RULES.md`, `docs/ARCHITECTURE.md`, `docs/REVIEW_CHECKLIST.md`, `docs/DECISION_LOG.md`, `docs/DEPLOYMENT.md`, `docs/SECURITY.md`, `docs/TESTING.md`.
- UI/code: `apps/web/routes/About.tsx`, `apps/web/routes/Start.tsx`, `apps/web/pages/Index.tsx`, `apps/web/hooks/useFeedQueries.ts`.
- Worker/contracts: `apps/worker/src/index.ts`, `apps/worker/src/routes/*`, `packages/knowledge/src/content.ts`, `packages/ui/src/*`, `packages/config/src/*`.
- Validation/scripts: `apps/web/package.json`, `apps/web/test/*`, `apps/web/scripts/validation-report.cjs`, `apps/web/scripts/generate-apt-principles-public.cjs`.

## Remediation Recommendations

1. Keep `docs/apt/adoption.md` and `docs/apt/project-profile.md` updated whenever architecture, validation flow, or maturity posture changes.
2. Maintain schema-compatible `docs/apt/references/project-profile.json` and enforce validation in CI.
3. Add a short AI adoption note covering prompt ownership, worker route boundaries, and human-review expectations.
4. Keep any design cleanups to authored source routes and docs; do not edit `apps/web/public/**` as source.

## Validation Evidence

Validation commands run for this audit pass:

- `npm run validate` in `../apt-principles`: PASS. Scanned 64 files, 0 errors, 1 warning for unexpected top-level `.gitattributes`.
- `pnpm --dir apps/web run validation-report`: PASS. Recommendation: pass. Wrote validation snapshots under `reports/validation/`.
- `pnpm --dir apps/web test`: PASS. 17 test files, 46 tests passed.
- `pnpm --dir apps/web lint`: PASS. ESLint passed and `verify-doc-governance` reran validation-report successfully.

Validation side effects:

- `validation-report` and `lint` generated new `reports/validation/validation-20260426T183319Z.*` and `validation-20260426T183359Z.*` files and refreshed `reports/validation/LATEST*`.
- Existing dirty generated/public APT files were present before this audit and were not intentionally edited as source.

## Residual Risk

This was a representative audit, not a full line-by-line security or accessibility review. The highest confidence next step is to create the missing local adoption/profile layer, then run a focused release/operations review for worker observability and support readiness.
