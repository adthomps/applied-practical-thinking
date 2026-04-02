
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
- [DESIGN.md](DESIGN.md) - root pointer to canonical APT design doctrine
- [PATTERNS.md](PATTERNS.md) - short pointer to the detailed engineering patterns handbook in `docs/`

## Root-adjacent repo metadata

- [.github/CODEOWNERS](.github/CODEOWNERS) - active ownership rules
- [.github/copilot-instructions.md](.github/copilot-instructions.md) - GitHub/Copilot-specific instructions

## Internal repo docs (`docs/`)

- [AI_AGENTS.md](docs/AI_AGENTS.md)
- [AI_PROMPT.md](docs/AI_PROMPT.md)
- [AI.md](docs/AI.md)
- [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [assistant.md](docs/assistant.md)
- [BRAND.md](docs/BRAND.md)
- [DEPLOYMENT.md](docs/DEPLOYMENT.md)
- [evals.md](docs/evals.md)
- [LOCAL_DEV.md](docs/LOCAL_DEV.md)
- [MAINTENANCE.md](docs/MAINTENANCE.md)
- [MIGRATETODESIGN.md](docs/MIGRATETODESIGN.md)
- [PATTERNS.md](docs/PATTERNS.md)
- [PLATFORM_IDS.md](docs/PLATFORM_IDS.md)
- [REP_STRUCTURE.md](docs/REP_STRUCTURE.md)
- [SECURITY.md](docs/SECURITY.md)
- [TESTING.md](docs/TESTING.md)

## Design doctrine (`apps/web/docs/design/`)

- [APT-DESIGN-THINKING.md](apps/web/docs/design/APT-DESIGN-THINKING.md)
- [APT-DESIGN-SYSTEM.md](apps/web/docs/design/APT-DESIGN-SYSTEM.md)
- [APT-DESIGN-ARCHITECTURE.md](apps/web/docs/design/APT-DESIGN-ARCHITECTURE.md)
- Supporting design references in the same folder such as `design-core.md`, `design-site.md`, `design-demos.md`, and `vpds-alignment.md`

## Internal design support docs

- [decision-log.md](apps/web/docs/design/decision-log.md) - internal deviation and decision record
- [review-checklist.md](apps/web/docs/design/review-checklist.md) - internal design review checklist
- These may live next to the design doctrine source, but they are not part of the default public docs export

## Public content source (`apps/web/content/`)

- Articles, guides, podcasts, experiments, case studies, and related authored markdown that powers the site
- Add new public content here, not in `apps/web/docs/` and not in `apps/web/public/`

## Additional guidance

- Structural or design changes should be reflected in [README.md](README.md), [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md), and the relevant design doctrine doc
- Design deviations belong in [apps/web/docs/design/decision-log.md](apps/web/docs/design/decision-log.md)
