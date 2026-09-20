---
title: Applied Practical Thinking Completion Gate and Syntax Registry Review
version: v1
last_updated: 2026-08-16
owner: APT
status: complete
audience: internal
visibility: internal
source: manual
review_type: repository-completion-gate
---

# Applied Practical Thinking Completion Gate and Syntax Registry Review

## Outcome

The repository now owns the `check` completion gate described by its generated project context. The gate runs APT conformance, lint and documentation governance, the currently clean TypeScript project checks, tests, and the production build.

TypeScript is a root development dependency so all projects can use one compiler version and explicit project configurations. The Worker and shared UI project checks are enforced by the completion gate. `pnpm typecheck:web` is available as an explicit diagnostic command, but the first compiler run exposed pre-existing web type debt and it is not represented as passing or included in the completion gate.

Syntax highlighting retains its fenced-code-only loading boundary while replacing the full Prism renderer with `PrismLight` and an explicit registry for the verified authored language set: Bash, CSS, HTML/markup, JSON, Markdown, Python, TOML, TypeScript/TSX, and YAML. Common aliases are normalized, and missing or unsupported language labels remain readable through the semantic plain-code fallback without loading the optional highlighter.

The renderer, selected grammars, and One Dark theme are grouped behind one local dynamic resource boundary. This avoids turning the smaller implementation into a burst of per-language network requests.

## Build Evidence

| Measure | Before registry | After registry | Change |
|---|---:|---:|---:|
| Deferred syntax implementation | 636.19 kB | 88.14 kB | 86.1% smaller |
| Deferred syntax implementation, gzip | 228.89 kB | 27.35 kB | 88.1% smaller |
| Shared Markdown chunk | 9.22 kB / 3.42 kB gzip | 9.49 kB / 3.51 kB gzip | Loading boundary preserved |

The syntax resource remains absent from ordinary Markdown loading and is requested only for a supported fenced-code language.

## Commands

- `pnpm typecheck` checks the currently clean Worker and shared UI projects.
- `pnpm typecheck:web` exposes the remaining web compiler debt for a dedicated follow-up.
- `pnpm check` is the repository completion gate.

## Boundaries

- Mermaid remains a separate optional renderer.
- Plain and unsupported fenced code remains plain text rather than triggering or failing syntax highlighting.
- Adding a newly supported fenced-code language requires updating the registry and its loading contract.
- The Vite web build is transpile-only. A future type-debt stage must make `pnpm typecheck:web` pass before adding it to `pnpm typecheck`.

## Evidence

- `package.json`
- `apps/web/components/apt/CodeBlock.tsx`
- `apps/web/test/syntax-highlighting-loading-contract.test.ts`
- `docs/apt/reports/apt-syntax-highlighting-bundle-review-2026-08-16.md`

## Validation

- `pnpm check`: passed.
- APT root conformance and documentation governance: passed.
- Worker and shared UI TypeScript checks: passed.
- APT publication contracts: passed.
- Vitest: 21 test files and 51 tests passed.
- Vite production build: passed with 4,259 modules transformed.
