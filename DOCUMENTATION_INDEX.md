---
title: Documentation Index
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---

# Documentation Index

This file maps each documentation type to its canonical location so markdown does not drift across the repo.

Thin-root rule:

- root markdown should stay brief and directional
- `docs/` holds the fuller internal handbooks and operating manuals
- root files should point to depth, not duplicate it

## Canonical placement

- `README.md`
  - Repo entrypoint, current monorepo shape, setup, and operating overview
- `docs/`
  - Internal engineering, process, deployment, maintenance, and agent-facing repo docs
- `apps/web/docs/design/`
  - External-first APT design doctrine source using a 2-zone model:
    - `versions/v*/` authored canonical doctrine versions (manifest-governed)
    - `static/` authored static support docs/contracts
- `apps/docs` (target state, planned)
  - Future canonical public docs app for help/developer/api/tutorial/reference surfaces
- `apps/web/content/`
  - Authored public learning/content markdown
- `apps/web/public/`
  - Generated runtime copies only:
    - `apps/web/public/content/`
    - `apps/web/public/docs/`
    - `apps/web/public/data/`

Do not edit copied markdown or docs under `apps/web/public/` as authored source.

## Root docs

- [README.md](README.md) - repo overview and setup
- [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - canonical doc placement map
- [PROJECT_RULES.md](PROJECT_RULES.md) - guardrails and source-vs-generated rules
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - short operational cheatsheet

## Root-adjacent repo metadata

- [.github/CODEOWNERS](.github/CODEOWNERS) - active ownership rules
- [.github/copilot-instructions.md](.github/copilot-instructions.md) - GitHub/Copilot-specific instructions
- [.github/workflows/worker.yml](.github/workflows/worker.yml) - worker deployment automation; frontend Pages deploy is Cloudflare-managed

## Internal repo docs (`docs/`)

- [AI_AGENTS.md](docs/AI_AGENTS.md) - AI agent contract: prompt governance, auth rules, package contracts
- [AI_PROMPT.md](docs/AI_PROMPT.md) - AI prompt authoring standards
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - monorepo structure, data flow, boundaries, source/generated split
- [ASSISTANT.md](docs/ASSISTANT.md) - APT Design Assistant full spec
- [BRAND.md](docs/BRAND.md) - brand quick reference
- [DECISION_LOG.md](docs/DECISION_LOG.md) - design deviation and decision record
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Cloudflare deploy contracts, env vars, redeploy order
- [DOCUMENTATION_METADATA_ROLLOUT.md](docs/DOCUMENTATION_METADATA_ROLLOUT.md) - phased markdown metadata/frontmatter enforcement plan
- [EVALS.md](docs/EVALS.md) - AI assistant evaluation prompts and criteria
- [LEARN_CONTENT_INVENTORY.md](docs/LEARN_CONTENT_INVENTORY.md) - editorial inventory of Learn content
- [LOCAL_DEV.md](docs/LOCAL_DEV.md) - local development setup and commands
- [MAINTENANCE.md](docs/MAINTENANCE.md) - how to add/edit content and pages
- [MIGRATE_TO_DESIGN.md](docs/MIGRATE_TO_DESIGN.md) - component ownership migration history
- [PATTERNS.md](docs/PATTERNS.md) - engineering patterns: UI, API, shared, integration
- [PLATFORM_IDS.md](docs/PLATFORM_IDS.md) - Cloudflare bindings documentation
- [REVIEW_CHECKLIST.md](docs/REVIEW_CHECKLIST.md) - design review checklist
- [SECURITY.md](docs/SECURITY.md) - security practices and guardrails
- [TESTING.md](docs/TESTING.md) - testing strategy and commands

## Design doctrine (`apps/web/docs/design/`)

- [APT-DESIGN-THINKING.md](apps/web/docs/design/versions/v2/APT-DESIGN-THINKING.md)
- [APT-DESIGN-SYSTEM.md](apps/web/docs/design/versions/v2/APT-DESIGN-SYSTEM.md)
- [APT-TOKENS.md](apps/web/docs/design/versions/v2/APT-TOKENS.md)
- [APT-DESIGN-ARCHITECTURE.md](apps/web/docs/design/versions/v2/APT-DESIGN-ARCHITECTURE.md)
- [APT-ARCHITECTURE-DOC.md](apps/web/docs/design/versions/v2/APT-ARCHITECTURE-DOC.md) - compatibility shim; canonical doctrine is in Design Architecture
- [APT-ARCHITECTURE-DOC-EXAMPLES.md](apps/web/docs/design/versions/v2/APT-ARCHITECTURE-DOC-EXAMPLES.md) - compatibility stub; canonical doctrine is in Design Architecture
- [APT-ARCHITECTURE-DOC-REFERENCE.json](apps/web/docs/design/versions/v2/APT-ARCHITECTURE-DOC-REFERENCE.json) - compatibility stub metadata; canonical doctrine is in Design Architecture
- [APT-REVIEW-STANDARD.md](apps/web/docs/design/static/APT-REVIEW-STANDARD.md)
- [APT-DESIGN-CORE.md](apps/web/docs/design/versions/v1/APT-DESIGN-CORE.md) - Foundational design principles and system intent
- [APT-DESIGN-SITE.md](apps/web/docs/design/versions/v1/APT-DESIGN-SITE.md) - Site-specific design patterns and application details
- [APT-DESIGN-DEMOS.md](apps/web/docs/design/versions/v1/APT-DESIGN-DEMOS.md) - Patterns and examples for demo-oriented pages
- [APT-VPDS-ALIGNMENT.md](apps/web/docs/design/versions/v1/APT-VPDS-ALIGNMENT.md) - Legacy v1 visual/product alignment reference (kept for historical/canonical compatibility)
- [static/APT-AI-REVIEW-BUNDLE.json](apps/web/docs/design/static/APT-AI-REVIEW-BUNDLE.json)
- [static/APT-AI-REVIEW-BUNDLE.md](apps/web/docs/design/static/APT-AI-REVIEW-BUNDLE.md)
- [static/APT-AI-INSTRUCTIONS-REFERENCE.md](apps/web/docs/design/static/APT-AI-INSTRUCTIONS-REFERENCE.md)
- [static/APT-DESIGN-SYSTEM-LINT-CHECKLIST.md](apps/web/docs/design/static/APT-DESIGN-SYSTEM-LINT-CHECKLIST.md)
- [static/APT-DESIGN-SYSTEM-LINT-CHECKLIST.json](apps/web/docs/design/static/APT-DESIGN-SYSTEM-LINT-CHECKLIST.json)
- [static/APT-REVIEW-STANDARD.md](apps/web/docs/design/static/APT-REVIEW-STANDARD.md)
- [static/APT-DESIGN-VERSIONING.md](apps/web/docs/design/static/APT-DESIGN-VERSIONING.md)
- [static/APT-TOKENS.json](apps/web/docs/design/static/APT-TOKENS.json)
- [static/APT-TOKENS-CONTRACT.json](apps/web/docs/design/static/APT-TOKENS-CONTRACT.json)
- `tokens.json` is generated compatibility output from `static/APT-TOKENS-CONTRACT.json` during publish.
- Source aliases are not stored in `apps/web/docs/design`; aliases are generated in `apps/web/public/docs/design` at publish time.

How to edit safely:
1. Edit versioned doctrine in `apps/web/docs/design/versions/v*/...`.
2. Run `pnpm --dir apps/web run verify-doc-governance` (writes validation reports to `reports/validation/`).
3. Run `pnpm --dir apps/web run validation-report:full` when you also want test outcomes in the same report.
4. Public validation snapshot publishes to:
   - `/docs/design/validation/LATEST.json`
   - `/docs/design/validation/LATEST.md`
   - route: `/design/validation`
5. Use `pnpm --dir apps/web run validation-frontmatter-autofix -- --wave=wave1` for preview-only metadata autofix proposals.
6. Use `pnpm --dir apps/web run validation-frontmatter-autofix -- --wave=wave1 --apply` to apply Wave 1 metadata fixes.
7. Run `pnpm --dir apps/web run copy-content-to-public`.

## Public content source (`apps/web/content/`)

- Articles, guides, podcasts, experiments, case studies, and related authored markdown that powers the site
- Add new public content here, not in `apps/web/docs/` and not in `apps/web/public/`

## Additional guidance

- Structural or design changes should be reflected in [README.md](README.md), [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md), and the relevant design doctrine doc
- Design deviations belong in [docs/DECISION_LOG.md](docs/DECISION_LOG.md)
- Documentation architecture changes should follow the Documentation Architecture section in `apps/web/docs/design/versions/v2/APT-DESIGN-ARCHITECTURE.md` plus the supporting examples/reference artifacts.
