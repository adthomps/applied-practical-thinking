---
title: Applied Practical Thinking Syntax Highlighting Bundle Review
version: v1
last_updated: 2026-08-16
owner: APT
status: complete
audience: internal
visibility: internal
source: manual
review_type: frontend-bundle-loading-boundary
---

# Applied Practical Thinking Syntax Highlighting Bundle Review

## Outcome

Syntax highlighting now loads only after rendered Markdown contains a non-Mermaid fenced code block. Ordinary Markdown no longer has a static dependency on the former 649.41 kB minified, 230.61 kB gzip `vendor-syntax` chunk.

Code remains readable while the optional highlighter loads or if its chunk cannot load. The existing Prism renderer and One Dark presentation are preserved.

## Cause

`MarkdownContent.tsx` statically imports `CodeBlock.tsx`, which previously statically imported the Prism renderer and a theme barrel. Vite therefore attached the complete syntax-highlighting dependency to every route using the shared Markdown renderer, even when the document had no fenced code.

The syntax-specific `manualChunks` rule also risked the same preload-helper back-edge found during the Mermaid review. Removing that rule allows Rollup to preserve the dynamic boundary.

## Final Change

- Keep the lightweight `CodeBlock` component in the route-scoped Markdown chunk.
- Cache a shared promise that dynamically imports the direct Prism implementation and direct One Dark theme entry.
- Render a plain semantic `pre` and `code` fallback until highlighting is available.
- Keep the plain fallback if the optional chunk fails to load and ignore completion after unmount.
- Remove the syntax-specific Vite manual chunk rule while retaining unrelated vendor groups.
- Add a contract test for the direct dynamic imports, fallback, Markdown integration, and Vite configuration.

## Rejected Intermediate Shapes

| Shape | Build evidence | Decision |
|---|---|---|
| `React.lazy` around `CodeBlock` | Moved the shared Markdown renderer into the initial app chunk, adding about 3 kB gzip globally. | Rejected. |
| Dynamic import of the package root | Disabled useful tree-shaking, emitted every language wrapper, and created a 1,611.01 kB chunk. | Rejected. |
| Dynamic import of the Prism theme barrel | Deferred all Prism themes in a 149.07 kB chunk even though only One Dark is used. | Rejected. |
| Direct Prism and direct One Dark entry imports | Preserved the route chunk and deferred only the existing implementation and selected theme. | Accepted. |

## Build Evidence

| Measure | Before | After | Interpretation |
|---|---:|---:|---|
| Shared Markdown chunk | 8.50 kB / 3.16 kB gzip | 9.22 kB / 3.42 kB gzip | Small loader and resilient-fallback overhead. |
| Static syntax dependency from shared Markdown | 649.41 kB / 230.61 kB gzip | None | Markdown without code avoids the highlighter payload. |
| Prism implementation | Included in `vendor-syntax` | 636.19 kB / 228.89 kB gzip | Loaded through a dynamic import only for fenced code. |
| One Dark theme | Included in `vendor-syntax` | 12.39 kB / 1.82 kB gzip | Direct theme entry avoids bundling unused themes. |
| Largest emitted chunk | 649.41 kB | 636.19 kB | Production remains below the configured 1,000 kB warning threshold. |

The post-change `MarkdownContent` bundle contains dynamic imports for `prism-...` and `one-dark-...` and no static import of either. The application entry does not preload those chunks.

## Validation

- Focused Mermaid and syntax loading contracts: passed.
- Vite production build: passed, 4,535 modules transformed.
- Emitted-bundle dependency inspection: passed; Prism and One Dark are dynamic dependencies of the route-scoped Markdown chunk.
- APT publication contract tests: passed.
- Vitest: 21 test files and 51 tests passed.
- ESLint and documentation governance: passed with validation recommendation `pass`.
- Root APT conformance and surface verification: passed.

## Measurement Boundary

This review proves source and production-bundle loading boundaries. It does not claim measured LCP, INP, main-thread, or network improvements without a browser trace.

## Remaining Performance Candidate

The deferred Prism implementation still includes the full supported language set. Current authored content and design docs use Bash, CSS, HTML, JSON, Markdown, Python, TOML, TypeScript/TSX, YAML, and plain text in addition to Mermaid. A separate review can compare the current behavior with `PrismLight` plus an explicit registry and aliases for that verified set. That change has a broader compatibility surface and should not be folded into this conditional-loading stage.
