# Repo Structure

## Root
- Monorepo with all code, docs, and prompts under version control.

## apps/
- `web`: Vite + React SPA
- `worker`: Cloudflare Worker API

## packages/
- `ui`: Presentational components
- `config`: Design tokens/config
- `core`: Business/data logic

## docs/
- Project documentation and guardrails# REP_STRUCTURE.md

## Repository Structure

- All code in `apps/` and `packages/`
- Web app: `apps/web/`
- Worker: `apps/worker/`
- Shared: `packages/`
- Docs: `apps/web/docs/`
- AI prompts: `apps/web/ai/prompts/`
- No code at root except config/docs
- See `DOCUMENTATION_INDEX.md` for all docs
