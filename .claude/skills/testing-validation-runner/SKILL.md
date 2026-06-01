# Testing Validation Runner

Canonical source: `apt-principles/.claude/skills/testing-validation-runner/SKILL.md` — sync when updating.

## Purpose

Prove that changes work. Run validation commands, report results honestly, add targeted tests.

## Use this skill when

The user asks to:
- Validate a change before merging or deploying
- Run tests
- Fix failing tests
- Prepare a PR
- Confirm a build is clean
- Add regression tests for a bug fix

## Command discovery

Before running commands:
1. Inspect `package.json` scripts at repo root and in the changed app.
2. Identify the correct scope (`--filter apt-web`, `--filter apt-worker`, or root).
3. Prefer existing scripts. Do not invent scripts.

## Preferred validation order for this repo

```bash
# Web app
pnpm lint                                     # ESLint + doc governance
pnpm test                                     # Vitest unit tests
pnpm build                                    # Full build with prebuild pipeline

# Content/design validation
pnpm --filter apt-web validation-report
pnpm --filter apt-web token-drift-check
pnpm --filter apt-web design-audit

# Worker
pnpm --filter apt-worker typecheck
pnpm --filter apt-worker test
pnpm --filter apt-worker wrangler deploy --dry-run
```

## Reporting format

| Check | Command | Result | Notes |
|-------|---------|--------|-------|
| Lint | `pnpm lint` | Passed | — |
| Tests | `pnpm test` | Passed | 14 tests |
| Build | `pnpm build` | Passed | — |

## Rules

- Do not claim success unless commands passed.
- If a command was not run, state that explicitly and say why.
- If a command fails, summarize the error and the most likely root cause.
- Apply small, obvious fixes only — avoid large unrelated refactors.
- Add regression tests for bug fixes when practical using existing Vitest patterns.

## Completion language

Use clear language: Passed / Failed / Not Run / Blocked.

Do not use vague phrases like "should work" unless validation genuinely could not be run.
