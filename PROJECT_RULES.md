---
title: Project Rules
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# Project Rules

## Monorepo Structure

- `apps/web`: Vite + React SPA, routing, shell, page composition, content source
- `apps/worker`: Cloudflare Worker API/AI subsystem
- `packages/ui`: shared presentational APT primitives
- `packages/config`: shared design tokens/config contracts
- `packages/knowledge`: shared content/domain/assistant contracts
- `packages/utils`: framework-agnostic helpers only if actively used

## Boundaries

- No app may import from another app
- Shared code flows only from `packages/*` into apps
- No business logic in routes or presentational components
- Prompts are file-based and versioned in `apps/web/ai/prompts`
- No custom colors, fonts, or spacing; use shared token contracts from `packages/config`
- Dark-first only

## Data Flow

- Web runtime data may come from generated static assets in `apps/web/public/*` and from relative `/api/*` worker endpoints
- No direct fetches in React components; use services/modules
- Public API routes, if introduced, live under `/v1/*`

## Source vs Generated

- Source of truth:
  - `apps/web/content/`
  - `apps/web/docs/design/`
  - `apps/web/data/`
- Generated runtime copies:
  - `apps/web/public/content/`
  - `apps/web/public/docs/`
  - `apps/web/public/data/`

Do not edit copied markdown/docs in `public/` as authored source.

Doc placement rule:
- `docs/` is for internal repo/process/engineering docs
- `apps/web/docs/design/` is for external-first APT design doctrine and public design reference docs with 2 zones:
  - `versions/v*/` authored canonical doctrine versions
  - `static/` authored static support docs/contracts
  - `tokens.json` is generated from canonical `static/APT-TOKENS-CONTRACT.json`
- internal support docs such as review checklists or decision logs are source-only unless explicitly promoted to public docs
- Documentation architecture standard is defined in `apps/web/docs/design/versions/v2/APT-DESIGN-ARCHITECTURE.md` (Documentation Architecture section)
- Phased metadata enforcement schedule is defined in `docs/DOCUMENTATION_METADATA_ROLLOUT.md`
- Target-state public docs app location is `apps/docs` (planned, not yet active in this pass)
- OpenAPI is the target-state source of truth for API reference contracts (generation flow planned, not yet active)

APT root artifact proxy rule:
- Root `examples/`, `prompts/`, `checklists/`, `templates/`, and `references/` are canonical-link surfaces.
- Keep APT-wide doctrine artifacts in the sibling `apt-principles` repo; avoid duplicating canonical assets here.
- Repo-specific evidence and generated audit outputs belong under `docs/apt/reports/` and `docs/apt/reports/static/`.

APT doctrine mapping for reviews:
- Thinking: `apt-principles/thinking.md`, `apt-principles/apt-principles.md`
- Design: `apt-principles/design.md`, `apt-principles/checklists/design-review-checklist.md`, `apps/web/docs/design/static/APT-REVIEW-STANDARD.md`
- Architecture: `apt-principles/architecture.md`, `docs/ARCHITECTURE.md`
- System Standards: `apt-principles/system-standards.md`, `docs/apt/reports/`
- Security: `apt-principles/security.md`, `apt-principles/checklists/security-review-checklist.md`
- Execution: `apt-principles/execution.md`, `docs/apt/project-profile.md`
- Quality: `apt-principles/quality-testing.md`, `apt-principles/checklists/quality-testing-checklist.md`
- Release/Change: `apt-principles/release-change-management.md`, `docs/DEPLOYMENT.md`
- Operations: `apt-principles/operations-support.md`, `docs/MAINTENANCE.md`
- Knowledge: `apt-principles/knowledge-system.md`, root artifact proxy surfaces
- AI: `apt-principles/ai-agent-framework.md`, `apps/web/ai/README.md`

## Testing and Local Development

- Web: `pnpm --dir apps/web dev`
- Worker: `pnpm --dir apps/worker dev`
- Web tests: `pnpm --dir apps/web test`

## Review Requirements

- Design changes: check `apps/web/docs/design/static/APT-REVIEW-STANDARD.md` and `apt-principles/checklists/design-review-checklist.md`
- Security-sensitive changes: check `apt-principles/security.md` and `apt-principles/checklists/security-review-checklist.md`
- Testing/quality changes: check `apt-principles/quality-testing.md` and `apt-principles/checklists/quality-testing-checklist.md`
- Prompt or agent changes: check `apps/web/ai/README.md` and `apt-principles/ai-agent-framework.md`
- Deviations: document in `docs/DECISION_LOG.md`
