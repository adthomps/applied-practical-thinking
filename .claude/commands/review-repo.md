# Review Repo

Inspect the applied-practical-thinking repository and produce a practical improvement plan before making any changes.

## Instructions

1. Read `CLAUDE.md`, `AGENTS.md`, and `apt-principles/AGENTS.md`.
2. Identify the app type, monorepo layout, package manager, framework, and deployment targets.
3. Read key files:
   - `apps/web/package.json`
   - `apps/web/App.tsx`
   - `apps/web/data/site.ts`
   - `apps/worker/wrangler.toml` (if present)
   - `apps/web/docs/design/static/APT-REVIEW-STANDARD.md`
   - `docs/` folder overview
4. Do not modify files during this command.
5. Produce a concise report.

## Report Format

Return:

1. Project summary
2. Current architecture (apps, packages, deployment)
3. Strengths with file evidence
4. Risks ordered by severity
5. APT principle coverage gaps
6. Missing or outdated docs
7. Validation commands to run next
8. First three safe next steps
