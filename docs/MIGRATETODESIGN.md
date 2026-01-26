# Migration to Design System

## Steps
- Move all presentational components to `packages/ui`.
- Use only tokens from `packages/config`.
- Refactor UI to use Apt* components from `apps/web/components/apt`.
- Document any deviations in `apps/web/docs/design/decision-log.md`.# MIGRATETODESIGN.md

## How to Migrate Features to APT Design System

1. Move all design-related code to `apps/web/components/apt/`
2. Use only semantic tokens from `apps/web/theme/aptTokens.ts`
3. Document all design changes in `apps/web/docs/design/decision-log.md`
4. Add new components to the design playground (`apps/web/routes/DesignPlayground.tsx`)
5. Update docs in `apps/web/docs/design/` as needed
