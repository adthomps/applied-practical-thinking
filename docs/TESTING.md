# Testing

## Strategy
- All business logic must be covered by unit tests in `packages/core`.
- Use integration tests for API endpoints in `apps/worker`.
- Use component tests for UI in `packages/ui`.

## Commands
- Run all tests: `pnpm test`
- Run tests per package: `pnpm test` in the package directory

## Coverage
- Ensure coverage for all critical paths and guardrails.# TESTING.md

## Testing Strategy

- All tests live in `apps/web/test/`
- Run all tests: `pnpm test`
- Add new tests for all new features/components
- Use Vitest for unit/integration tests
- Document all test changes in `apps/web/docs/design/decision-log.md`
