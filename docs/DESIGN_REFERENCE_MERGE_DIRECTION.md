---
title: APT Design Reference Merge Direction
version: v1
status: draft
audience: developer
visibility: internal
source: manual
---
# APT Design Reference Merge Direction

## Goal

Merge the needed elements from `../apt-design-reference` into `applied-practical-thinking` so the public APT site becomes the primary living home for APT visual reference, public design examples, and brand/wording guidance.

This is a direction-setting merge, not a blind repository import. The outcome should make `applied-practical-thinking` better at showing and governing the APT design system while preserving `apt-principles-agents` as the canonical source for reusable doctrine, standards, rubrics, prompts, skills, and agent contracts.

## Target Ownership

| Material | Target owner | Notes |
| --- | --- | --- |
| Public design reference pages, visual examples, kit previews, brand examples, and showcase copy | `applied-practical-thinking` | These belong with the public APT portfolio and design publication surface. |
| Canonical design doctrine, design review rules, reusable agent instructions, lint standards, and governance contracts | `apt-principles-agents` | Promote only generalized material using `apt-principles-agents/docs/design-reference-intake.md`; do not make the public site the doctrine source of truth. |
| Runtime UI primitives and token contracts used by the public site | `applied-practical-thinking/packages/ui` and `packages/config` | Only move code when it becomes maintained runtime source, not static reference output. |
| Temporary standalone previews, generated bundles, screenshots, and one-off exported files | Usually do not merge | Keep only if they become intentional public examples or authored source assets. |

## Needed Elements To Evaluate

- `apt-design-reference/README.md`: extract visual signature, content fundamentals, brand voice, iconography rules, and source-of-truth explanation into authored public design docs.
- `apt-design-reference/colors_and_type.css`: compare against `apps/web/index.css`, `packages/config/src/aptTokens.ts`, and `apps/web/docs/design/static/APT-TOKENS-CONTRACT.json`; merge only missing semantic intent, not duplicate raw token definitions.
- `apt-design-reference/assets/`: evaluate profile and blog-cover assets for public site use; copy only source-worthy assets with clear ownership and usage.
- `apt-design-reference/preview/`: convert useful previews into public design examples or discard if they only support the old standalone package.
- `apt-design-reference/ui_kits/*`: migrate durable kit guidance into `apps/web/docs/design/versions/v2/patterns/` or a future `apps/web/docs/design/versions/v2/kits/` area.
- `apt-design-reference/SKILL.md`, `.codex/`, `.claude/`, `.gemini/`: promote reusable agent-facing rules to `apt-principles-agents`; do not bury them inside the public site.
- `apt-design-reference/_ds_bundle.js`, `_ds_manifest.json`, screenshots, uploads, and standalone HTML exports: treat as generated/reference artifacts unless a specific authored source use is identified.

## Merge Direction

1. Establish `applied-practical-thinking` as the public APT design reference home.
   - Add or update public-facing design docs under `apps/web/docs/design/versions/v2/`.
   - Keep authored source in `apps/web/docs/design/`; never edit generated copies under `apps/web/public/`.
   - Preserve the current v2 design docs manifest and versioning model.

2. Convert design-reference content into maintained authored docs.
   - Do not copy the old README wholesale.
   - Split content into stable topics: visual identity, content and wording, foundations, iconography, UI kits, imagery, and examples.
   - Align wording with the accepted APT voice: precise, technical, calm, non-marketing, and public-proof oriented.

3. Reconcile tokens and runtime behavior before publishing claims.
   - Confirm every promoted token claim matches runtime CSS, Tailwind/config contracts, and the static token contract.
   - If `apt-design-reference` contains a better rule than the runtime app, update the runtime token source and document the decision.
   - Avoid creating a second design-token source inside the public site.

4. Promote reusable doctrine upstream.
   - If a rule should guide all APT projects, move or copy it into `apt-principles-agents` as doctrine, standard, checklist, prompt, or skill source.
   - Use `apt-principles-agents/docs/design-reference-intake.md` to decide the canonical destination.
   - Regenerate public APT Principles docs into `applied-practical-thinking` only through the existing sync flow.

5. Decommission or freeze the standalone design-reference repo after extraction.
   - Keep `apt-design-reference` only if it remains a portable asset bundle with a distinct consumer.
   - Otherwise replace it with a short README pointing to `applied-practical-thinking` for public design reference and `apt-principles-agents` for canonical doctrine.

## Non-Goals

- Do not merge generated public docs, generated bundles, screenshots, or old standalone HTML as maintained source.
- Do not make `applied-practical-thinking` the canonical doctrine source.
- Do not move app runtime primitives unless they are adopted into `packages/ui` or `packages/config` with validation.
- Do not collapse `apt-principles-agents` design doctrine into the public site.

## Validation

After each implementation slice:

```powershell
pnpm --dir apps/web run verify-doc-governance
pnpm --dir apps/web run validation-report
pnpm --dir apps/web lint
pnpm --dir apps/web build
```

When canonical APT doctrine changes in `apt-principles-agents`, refresh public generated docs through the existing sync flow:

```powershell
pnpm --dir apps/web run generate-apt-principles-agents-public
pnpm --dir apps/web run copy-content-to-public
```
