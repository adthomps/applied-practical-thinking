# TESTING.md

## Testing Strategy

- Web tests live in `apps/web/test/`
- Worker verification currently centers on route/runtime checks as they are added
- Shared packages should add tests when they gain behavior worth verifying

## Commands

- Web tests: `pnpm test`
- Web build verification: `pnpm build`
