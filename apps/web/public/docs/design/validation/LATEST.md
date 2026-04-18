# APT Validation Report (Public)

- Timestamp: 2026-04-15T03:56:13.021Z
- Duration: 29ms
- Recommendation: pass_with_fixes

## Section Outcomes

### designSystem
- Status: pass
- audited-doctrine-metadata: pass (low) - verify-audited-doctrine-metadata passed
- frontmatter-wave1: pass (low) - Wave 1 missing metadata files: 0

### architecture
- Status: pass
- design-doc-alias-policy: pass (low) - verify-design-doc-alias-sync passed
- frontmatter-wave2: pass (low) - Wave 2 missing metadata files: 0

### docsGovernance
- Status: warn
- frontmatter-report: warn (medium) - Frontmatter gaps in scoped docs: 2

### tests
- Status: pass
- apps-web-tests: not_run (low) - tests not requested

## Severity Summary

- critical: 0
- high: 0
- medium: 2
- low: 0

## Findings

- [medium] docsGovernance: Missing frontmatter metadata: apps/worker/src/ai/docs/knowledge-engine-implementation.md
- [medium] docsGovernance: Missing frontmatter metadata: apps/worker/src/ai/docs/support-design-implementation.md

## Exception Summary

- [wave2] Historical log format is preserved; frontmatter rollout deferred.
- [wave3] GitHub PR template structure is preserved; metadata rollout deferred.

## Wave Progress

- wave1 (Design static + AI prompts): passed=10/10, missing=0, exceptions=0, complete=100%
- wave2 (Internal operational docs): passed=23/24, missing=0, exceptions=1, complete=95.8%
- wave3 (Worker AI docs + .github docs): passed=7/10, missing=2, exceptions=1, complete=70%

