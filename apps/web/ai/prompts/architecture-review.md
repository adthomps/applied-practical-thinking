---
title: Architecture Review Prompt
version: v1
status: draft
audience: internal
visibility: internal
source: apt-principles/prompts/architecture-review-prompt.md
---

# Architecture Review Prompt

Review structure, boundaries, deployment fit, and ownership before implementing or releasing a change.

## Required Reading Before Reviewing

1. `AGENTS.md` — project structure and boundary rules
2. `apps/web/docs/design/versions/v2/APT-DESIGN-ARCHITECTURE.md` — project-specific MUST/NEVER boundary rules and source-of-truth map
3. `apps/web/docs/design/versions/v2/APT-ARCHITECTURE-EXAMPLES.md` — concrete boundary examples for this repo
4. `apt-principles/architecture.md` — canonical doctrine that the local doc defers to
5. `apt-principles/system-standards.md` — API style, response shapes, naming rules (no substantive local version)
6. `apt-principles/security.md` — auth, input validation, abuse protection (no substantive local version)
7. The files and packages under review

## Prompt

```text
You are reviewing architecture in the applied-practical-thinking repo using APT Architecture Standards.

Use in this order:
- AGENTS.md (project working rules and common task patterns)
- apps/web/docs/design/versions/v2/APT-DESIGN-ARCHITECTURE.md (project-specific MUST/NEVER boundary rules — primary reference)
- apps/web/docs/design/versions/v2/APT-ARCHITECTURE-EXAMPLES.md (concrete examples of correct boundary patterns)
- apt-principles/architecture.md (canonical doctrine authority the local doc defers to)
- apt-principles/system-standards.md (API style, response shapes, naming — no substantive local version)
- apt-principles/security.md (auth, validation, abuse protection — no substantive local version)
- apt-principles/checklists/architecture-review-checklist.md

Review for:
1. Clear responsibility placement:
   - apps/web — rendering, routing, content presentation
   - apps/worker — API, BFF, content normalization, AI subsystem
   - packages/ui — shared presentational primitives (no business logic)
   - packages/config — shared token/config contracts
   - packages/knowledge — shared content/domain type contracts
2. Boundary safety:
   - UI components do not import from apps/worker
   - Business logic is not trapped in route glue or presentational components
   - Shared reusable logic lives in packages/, not duplicated across apps
3. API and data contract clarity:
   - Response shapes use APT standard: { success: true, data: T } or { success: false, error: { code, message } }
   - Shared types defined in packages/knowledge, not duplicated
4. Deployment fit:
   - Frontend: Cloudflare Pages (VITE_API_BASE env var required)
   - Worker: Cloudflare Workers (wrangler.toml, PUBLIC_SITE_ORIGIN env var)
   - Preview environments: Cloudflare Pages preview builds
5. Failure, rollback, and observability readiness
6. AI prompt/handler ownership when AI features are involved

Return:
- Findings by severity (critical, high, medium, low)
- Boundary violations with file evidence
- Required artifacts or missing contracts
- Smallest architecture-safe correction
- Decision records needed for high-risk changes
```

## Output Shape

```
System/change:
Boundary map:
Findings by severity:
  critical:
  high:
  medium:
  low:
Required artifacts:
Smallest safe correction:
Deployment impact:
Decision records needed:
```

## Guardrails

- Do not suggest new architecture when an existing APT pattern solves the problem.
- Do not move business logic into UI components or route glue.
- Do not accept undocumented ownership for a changed boundary.
- Prefer backwards-compatible API changes; flag breaking changes explicitly.
- Secrets and credentials must not appear in source, prompts, examples, or logs.

## Related Documents

Local (project-specific, primary):
- `apps/web/docs/design/versions/v2/APT-DESIGN-ARCHITECTURE.md`
- `apps/web/docs/design/versions/v2/APT-ARCHITECTURE-EXAMPLES.md`
- `AGENTS.md`
- `docs/DECISION_LOG.md`

Canonical (doctrine authority):
- `apt-principles/architecture.md`
- `apt-principles/system-standards.md`
- `apt-principles/security.md`
- `apt-principles/checklists/architecture-review-checklist.md`
