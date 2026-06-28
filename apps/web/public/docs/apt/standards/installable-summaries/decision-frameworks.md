---
title: "Decision Frameworks"
kind: "standard"
domain: "installable-summaries"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/apt-core/decision-frameworks.md"]
---

# Decision Frameworks

## Change Safety

1. Identify the behavior being preserved.
2. Identify the smallest useful change.
3. Document assumptions.
4. Verify with tests, builds, or manual checks.
5. Record follow-up risks without expanding scope unnecessarily.

## Profile Selection

Choose profiles based on capabilities needed by the project:

- `cloudflare` for Workers, Pages, Hono, D1, KV, R2, Vite, and React guidance.
- `documentation` for docs structure, normalization, and sync.
- `api-review` for endpoint design and developer experience.
- `ux-review` for intent-driven user experience review.
- `migration` and `lovable` for generated or conversion-heavy projects.
- `governance` for readiness and AI-output review.
