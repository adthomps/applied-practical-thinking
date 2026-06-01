# CLAUDE.md

Refer to:
- /AGENTS.md
- /apt-principles/AGENTS.md (doctrine working rules)

These files define project standards and must be followed.

## Repo type

This is the public **Applied Practical Thinking (APT) portfolio and showcase site** — a pnpm monorepo with a Vite + React frontend and a Cloudflare Worker API/AI backend.

It is a **consumer** of `apt-principles` doctrine, not the doctrine authority itself.

## Package manager

pnpm. Run scripts from workspace root with `pnpm <script>` or from within `apps/web` with `pnpm --filter apt-web <script>`.

## Monorepo structure

```
apps/web/        # Vite + React 18 public site (routes, components, content, scripts)
apps/worker/     # Cloudflare Worker (Hono API, AI/vector subsystem)
packages/ui/     # @apt/ui — shared presentational primitives (AptButton, AptCard, etc.)
packages/config/ # @apt/config — shared design token contracts
packages/knowledge/ # @apt/knowledge — shared content/domain type contracts
docs/            # Internal engineering, deployment, and maintenance docs
```

## Key validation commands

```bash
pnpm build                          # Full build with prebuild validation
pnpm lint                           # ESLint + doc governance
pnpm test                           # Vitest unit tests
pnpm --filter apt-web validation-report    # Content structure check
pnpm --filter apt-web design-audit         # Token drift check
pnpm --filter apt-web token-drift-check    # Token contract alignment
pnpm --filter apt-web verify-worker-api-config  # API config guard
```

## Working rules

1. Read AGENTS.md before making changes — it defines agent routing and working rules.
2. Use semantic design tokens (`bg-background`, `text-foreground`, `border-border`) — never raw colors.
3. APT design system components (`@apt/ui`, `components/apt/`) must be used for UI — do not introduce new UI libraries without a decision record.
4. Content is authored in `apps/web/content/` and `apps/web/docs/design/`. The `public/` folder is generated — do not edit it directly.
5. Shared logic belongs in `packages/`; UI cannot import worker internals.
6. Run `pnpm build` after any structural change to verify no regressions.
7. Log design deviations in `docs/DECISION_LOG.md`.
8. APT doctrine lives in `apt-principles/` (canonical) and is mirrored at `apps/web/public/docs/apt/` (generated). Do not edit the generated mirror.

## Active agents for this repo

See `.claude/agents/` for specialized agents:

- **APT Auditor** — read-only repo audit, gap analysis, structure review
- **Frontend Implementer** — React TypeScript UI pages and components
- **API Architect** — Cloudflare Worker route and contract design
- **Test Engineer** — validation, test coverage, regression checks

## Slash commands

See `.claude/commands/` for reusable command prompts:

- `/review-repo` — inspect structure and produce an improvement plan
- `/build-ui-page` — build or update a React TypeScript UI page
- `/add-api-route` — add or update a Cloudflare Worker API route
- `/validate` — run validation commands and report results

## Skills

See `.claude/skills/` for domain skills:

- `cloudflare-hono-worker-builder` — Worker route and middleware patterns
- `api-first-openapi-designer` — API contract design before implementation
- `docs-kb-maintainer` — developer documentation standards
- `testing-validation-runner` — validation command execution and reporting

## Design doctrine entrypoints

For design system work, read in this order:
1. `apps/web/docs/design/static/APT-REVIEW-STANDARD.md`
2. `apps/web/docs/design/versions/v2/APT-DESIGN-SYSTEM.md`
3. `apps/web/docs/design/versions/v2/APT-DESIGN-THINKING.md`
4. `apps/web/docs/design/static/APT-DESIGN-SYSTEM-LINT-CHECKLIST.md`

For APT framework doctrine, read:
- `apt-principles/apt-principles.md`
- `apt-principles/ai-agent-framework.md`
- The relevant domain doc: `thinking.md`, `design.md`, `architecture.md`, etc.
