# Validate

Run project validation and report results clearly. Do not change code unless fixing a small, obvious error uncovered by validation.

## Instructions

1. Identify which part of the repo changed (web, worker, packages, all).
2. Run the relevant validation commands.
3. Report each result: Passed / Failed / Not Run.
4. If a command fails, summarize the error and most likely cause.
5. Apply small fixes only when the error is clear and the fix is safe.
6. Do not make large refactors during validation.

## Command Order

```bash
# Always run for web changes
pnpm lint
pnpm test
pnpm build

# Content and design validation (web only)
pnpm --filter apt-web validation-report
pnpm --filter apt-web token-drift-check
pnpm --filter apt-web design-audit

# For worker changes (apt-worker has no test/typecheck scripts; use tsc directly)
cd apps/worker && npx tsc --noEmit

# Cloudflare deploy dry-run
cd apps/worker && npx wrangler deploy --dry-run
```

## Required Output

| Check | Command | Result | Notes |
|-------|---------|--------|-------|

Then list:
- Errors found and root cause
- Fixes applied (file + change)
- Commands skipped with reason
- Remaining risks
