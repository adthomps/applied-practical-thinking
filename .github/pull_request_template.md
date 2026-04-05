## Summary

Describe what changed and why.

## APT Design System Lint Checklist

Reviewer decision:
- [ ] Pass
- [ ] Pass with fixes
- [ ] Fail

Fast-fail checks:
- [ ] No excessive decorative gradients
- [ ] Spacing is consistent
- [ ] Typography usage is limited and consistent
- [ ] UI does not look like default Bootstrap/Tailwind/shadcn
- [ ] Loading, empty, error, and edge states are present

Critical failures:
- [ ] No unresolved critical failures

If any critical item failed, include the required exception link:
- Decision log link (`docs/DECISION_LOG.md` entry): <!-- required when any critical item fails -->
- Exception rationale: <!-- required when any critical item fails -->

## Validation

- [ ] Local checks executed (tests/build as applicable)
- [ ] Docs and metadata updated (if standards/contracts changed)
