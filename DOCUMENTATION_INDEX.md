
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
  - Authored external-first APT design doctrine and public design/system reference docs
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

- [APT-AI-REVIEW-BUNDLE.json](apps/web/docs/design/APT-AI-REVIEW-BUNDLE.json)
- [APT-AI-REVIEW-BUNDLE.md](apps/web/docs/design/APT-AI-REVIEW-BUNDLE.md)
- [APT-DESIGN-THINKING.md](apps/web/docs/design/APT-DESIGN-THINKING.md)
- [APT-DESIGN-SYSTEM.md](apps/web/docs/design/APT-DESIGN-SYSTEM.md)
- [APT-DESIGN-ARCHITECTURE.md](apps/web/docs/design/APT-DESIGN-ARCHITECTURE.md)
- [APT-REVIEW-STANDARD.md](apps/web/docs/design/APT-REVIEW-STANDARD.md)
- [APT-DESIGN-CORE.md](apps/web/docs/design/APT-DESIGN-CORE.md) - Foundational design principles and system intent
- [APT-DESIGN-SITE.md](apps/web/docs/design/APT-DESIGN-SITE.md) - Site-specific design patterns and application details
- [APT-DESIGN-DEMOS.md](apps/web/docs/design/APT-DESIGN-DEMOS.md) - Patterns and examples for demo-oriented pages
- [APT-VPDS-ALIGNMENT.md](apps/web/docs/design/APT-VPDS-ALIGNMENT.md) - Visual and product design alignment guidance

## Public content source (`apps/web/content/`)

- Articles, guides, podcasts, experiments, case studies, and related authored markdown that powers the site
- Add new public content here, not in `apps/web/docs/` and not in `apps/web/public/`

## Additional guidance

- Structural or design changes should be reflected in [README.md](README.md), [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md), and the relevant design doctrine doc
- Design deviations belong in [docs/DECISION_LOG.md](docs/DECISION_LOG.md)
