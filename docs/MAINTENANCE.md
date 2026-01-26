# Maintenance

## Modifying Content
- Edit content in `apps/web/data/` for site, labs, systems, blog, and case studies.
- Update design tokens in `packages/config` and `apps/web/theme/aptTokens.ts`.
- Log all design deviations in `apps/web/docs/design/decision-log.md`.

## Modifying Guardrails
- Update guardrail docs in `docs/` as needed.
- Review and version all changes to AI prompts and agent contracts.

## Review
- All changes to guardrails, prompts, or business logic require review.# MAINTENANCE.md

## Maintenance Guide

- To update content, edit files in `apps/web/docs/`, `apps/web/ai/prompts/`, or `apps/web/components/apt/`
- All changes must be reviewed and logged in `apps/web/docs/design/decision-log.md`
- For new features, follow patterns in `PATTERNS.md` and `PROJECT_RULES.md`
- For dependency updates, use `pnpm update`
- For design changes, update tokens in `apps/web/theme/aptTokens.ts` and docs in `apps/web/docs/design/`
