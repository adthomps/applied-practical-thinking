---
title: APT Examples
version: v1
last_updated: 2026-05-31
owner: APT
status: draft
---

# APT Examples

Examples show APT doctrine applied to concrete situations.

Use examples when a principle needs a reusable pattern, sample contract, state map, workflow, or project profile. Do not add examples for one-off implementation details that belong only in a project ticket or local decision record.

## Categories

### Active

- `ai-agent/` - prompt contracts, agent boundaries, and evaluation cases
- `api/` - API contracts, errors, pagination
- `architecture/` - repo structure, deployment structure, ownership, and command matrices
- `knowledge/` - canonical documentation, drift-control, and incident-learning patterns
- `projects/` - real APT project profiles and showcase patterns
- `quality/` - validation plans, validation matrices, and evidence patterns
- `security/` - auth, sessions, MFA, trust boundaries, and threat review
- `thinking/` - problem framing, outcome evidence, and decision clarity
- `ui/` - layout and interaction patterns
- `workflows/` - spec, delivery increment, preview, release, and operations flows

### Planned (placeholder directories, no content yet)

- `api-service/` - planned: full-stack API service pattern (Hono + D1 + auth + observability)
- `cloudflare-hono/` - planned: Cloudflare Worker + Hono route with typed request/response
- `monorepo/` - planned: pnpm monorepo layout with apps/ and packages/ structure
- `react-vite/` - planned: React + Vite page with dark-first visual language and complete state coverage

## Rule

Examples are not canonical rules by themselves. They demonstrate rules from the principle docs and should link back to the relevant doctrine.

An example is ready when another APT project can copy the structure, adapt the context, and still understand which doctrine owns the underlying rule.

## Authoring Guidance

Each example should describe a practical situation, the problem being solved, the APT principles applied, and the resulting structure or flow. Keep examples concrete enough to guide implementation, but do not let them redefine standards that belong in the canonical doctrine docs.

When adding a new example, start from `../templates/example-template.md`, keep the scope narrow, and link to the principle docs, checklist, or prompt that governs the pattern.

Good examples include:

- realistic context and problem
- the APT principles being applied
- concrete request/response, flow, state map, or file structure
- tradeoffs and common mistakes
- links to governing docs, checklists, prompts, or references

Avoid examples that only restate a principle. If the artifact does not show what to build, review, validate, or document, it probably belongs in doctrine instead.
