---
title: Project Profile Validation Sweep 2026-04-27
version: v1
last_updated: 2026-04-27
owner: APT
status: draft
---

# Project Profile Validation Sweep 2026-04-27

## Summary

- Workspace root: `C:/Users/sanch/Documents/Github/Applied Practical Thinking`
- Repos scanned: 6
- Passed: 6
- Failed: 0
- Skipped: 0

## Principle Coverage (Rubric)

| APT Layer | Pass | Partial | Gap | Not Applicable |
|---|---|---|---|---|
| Thinking | 5 | 0 | 0 | 0 |
| Design | 0 | 5 | 0 | 0 |
| Architecture | 5 | 0 | 0 | 0 |
| Security | 1 | 4 | 0 | 0 |
| AI | 1 | 3 | 0 | 1 |
| Execution | 5 | 0 | 0 | 0 |
| Knowledge | 3 | 2 | 0 | 0 |
| Operations | 0 | 5 | 0 | 0 |
| Quality | 1 | 4 | 0 | 0 |
| Release | 0 | 5 | 0 | 0 |
| System Standards | 3 | 2 | 0 | 0 |

## Findings by Severity

- Blocking: 0
- Major: 6
- Minor: 14
- Other: 0

## Findings by APT Layer

- Design: 3
- Knowledge: 3
- Design / Quality: 2
- Quality: 2
- Security / Operations: 2
- AI: 1
- AI / Knowledge: 1
- Architecture: 1
- Architecture / AI: 1
- Operations: 1
- Release / Knowledge: 1
- System Standards: 1
- System Standards / Release: 1

## Repo Status

| Repo | Status | Notes |
|---|---|---|
| applied-practical-thinking | passed | Minor: Local APT adoption/profile layer is now present and aligned to canonical doctrine; keep it synchronized with future principle updates. / Major: The working tree already contains modified generated APT publication artifacts. That is acceptable if intentional, but audit/remediation work must not overwrite or normalize them accidentally. |
| apt-coach | passed | Major: D1 dev and production currently point to the same physical database. The README correctly warns that migrations and writes are production-impacting, but this remains the largest operational risk. / Minor: Local APT adoption/profile layer is present, linked to canonical doctrine, and validated in CI. |
| apt-dream-to-reality | passed | Minor: Local APT adoption/profile layer is now present and aligned to canonical doctrine; keep it current as workflow and maturity evolve. / Major: AI prompt source of truth is split between Markdown prompt files and an embedded TypeScript registry. Versions differ for generate-spec (1.1.0 in registry vs 1.0.0 in Markdown), creating drift risk. |
| apt-novel-reviewer | passed | Minor: Operational readiness evidence is lighter than implementation evidence for a desktop app with native and local-AI dependencies. / Minor: Automated coverage is strongest in packages/lib, while desktop UI and packaging paths still rely mostly on manual validation. |
| apt-payment-rpc-api | passed | Major: Workspace root lacks explicit validation scripts used by APT (e.g. check:design, test:contracts, typecheck). Running pnpm run check:design at the repo root failed with: "Missing script: check:design". |
| crt-world | passed | Minor: Deployment and auth configuration are documented, but this audit did not verify live Cloudflare secrets, JWT issuer/audience values, or D1 environment state. / Minor: Automated coverage is centered on the worker package; frontend UI behavior and editorial workflows still rely more on manual validation than repo-level tests. |

## Top Findings

### applied-practical-thinking

- Minor / Knowledge: Local APT adoption/profile layer is now present and aligned to canonical doctrine; keep it synchronized with future principle updates.
- Major / Release / Knowledge: The working tree already contains modified generated APT publication artifacts. That is acceptable if intentional, but audit/remediation work must not overwrite or normalize them accidentally.

### apt-coach

- Major / Security / Operations: D1 dev and production currently point to the same physical database. The README correctly warns that migrations and writes are production-impacting, but this remains the largest operational risk.
- Minor / Knowledge: Local APT adoption/profile layer is present, linked to canonical doctrine, and validated in CI.

### apt-dream-to-reality

- Minor / Knowledge: Local APT adoption/profile layer is now present and aligned to canonical doctrine; keep it current as workflow and maturity evolve.
- Major / AI / Knowledge: AI prompt source of truth is split between Markdown prompt files and an embedded TypeScript registry. Versions differ for generate-spec (1.1.0 in registry vs 1.0.0 in Markdown), creating drift risk.

### apt-novel-reviewer

- Minor / Operations: Operational readiness evidence is lighter than implementation evidence for a desktop app with native and local-AI dependencies.
- Minor / Quality: Automated coverage is strongest in packages/lib, while desktop UI and packaging paths still rely mostly on manual validation.

### apt-payment-rpc-api

- Major / System Standards: Workspace root lacks explicit validation scripts used by APT (e.g. check:design, test:contracts, typecheck). Running pnpm run check:design at the repo root failed with: "Missing script: check:design".

### crt-world

- Minor / Security / Operations: Deployment and auth configuration are documented, but this audit did not verify live Cloudflare secrets, JWT issuer/audience values, or D1 environment state.
- Minor / Quality: Automated coverage is centered on the worker package; frontend UI behavior and editorial workflows still rely more on manual validation than repo-level tests.


## Passed

- applied-practical-thinking
- apt-coach
- apt-dream-to-reality
- apt-novel-reviewer
- apt-payment-rpc-api
- crt-world

## Failed

- none

## Skipped

- none

## Portfolio Action Queue

- applied-practical-thinking: Keep docs/apt/adoption.md and docs/apt/project-profile.md updated whenever architecture, validation flow, or maturity posture changes.
- applied-practical-thinking: Maintain schema-compatible docs/apt/references/project-profile.json and enforce validation in CI.
- applied-practical-thinking: Add a short AI adoption note covering prompt ownership, worker route boundaries, and human-review expectations.
- apt-coach: Keep docs/apt/adoption.md and docs/apt/project-profile.md updated as constraints, maturity, and security posture evolve.
- apt-coach: Split dev/prod D1 databases when a production-safe replacement binding is available; until then, follow the temporary risk acceptance in docs/DECISION_LOG.md.
- apt-coach: Resolve duplicate migration prefix 0013 in a migration-safe pass that first confirms which migrations are already applied remotely.
- apt-dream-to-reality: Create docs/apt/adoption.md with adoption mode apply + showcase, canonical source, validation commands, and local exceptions.
- apt-dream-to-reality: Create docs/apt/project-profile.md describing Dream to Reality as an APT planning/spec workflow example.
- apt-dream-to-reality: Resolve prompt canonicality: either generate index.ts content from Markdown or mark Markdown files as reference-only and align versions.
- apt-novel-reviewer: Add a short desktop release/operations note for packaging, native dependency support, and Ollama runtime prerequisites.

## Notes

Use the sibling repo JSON summaries under `docs/apt/reports/static/` for local detail and this report for a fast portfolio-level view.
