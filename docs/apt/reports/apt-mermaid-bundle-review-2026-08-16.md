---
title: Applied Practical Thinking Mermaid Bundle Review
version: v1
last_updated: 2026-08-16
owner: APT
status: complete
audience: internal
visibility: internal
source: manual
review_type: frontend-bundle-loading-boundary
---

# Applied Practical Thinking Mermaid Bundle Review

## Outcome

Mermaid is now loaded only when rendered Markdown contains a Mermaid diagram. Markdown pages without a Mermaid fence no longer have a static dependency on the former 2,258.12 kB minified, 643.34 kB gzip `vendor-mermaid` chunk.

The production build completes without the previous chunk-size warning. Mermaid remains a supported runtime feature and is split into an on-demand core plus parser and diagram-type chunks.

## Cause

`MarkdownContent.tsx` statically imports `MermaidRenderer.tsx`, which previously statically imported `mermaid`. Vite therefore attached the manually forced `vendor-mermaid` chunk to every route that used the shared Markdown renderer, whether or not the document contained a diagram.

Moving Mermaid behind `import("mermaid")` was necessary but not sufficient. The existing `manualChunks` rule forced Vite's dynamic-import preload helper into `vendor-mermaid`, creating a static back-edge from `MarkdownContent` to the same large chunk. Removing only the Mermaid-specific manual chunk rule allowed Rollup to preserve the dynamic boundary.

## Change

- Cache one dynamic Mermaid module promise in `MermaidRenderer.tsx`.
- Start that import only after the renderer confirms it has non-empty diagram code.
- Ignore asynchronous completion after the renderer unmounts.
- Remove the forced `vendor-mermaid` rule while retaining the other explicit vendor groups.
- Add a source contract test covering the dynamic import, the Mermaid-fence rendering gate, and the absence of the manual chunk regression.

## Build Evidence

| Measure | Before | After | Interpretation |
|---|---:|---:|---|
| Shared Markdown chunk | 8.23 kB minified | 8.50 kB minified | Small loader/cancellation overhead. |
| Static Mermaid dependency from shared Markdown | 2,258.12 kB / 643.34 kB gzip | None | Non-diagram Markdown avoids the Mermaid payload. |
| Mermaid core | Included in all-in-one vendor chunk | 446.70 kB / 123.38 kB gzip | Loaded through a dynamic import only for a diagram. |
| Mermaid parser core | Included in all-in-one vendor chunk | 356.63 kB / 89.78 kB gzip | Available as a split dependency when parsing requires it. |
| Largest emitted chunk | 2,258.12 kB | 649.41 kB | The build no longer crosses the configured 1,000 kB warning threshold. |

The post-change `MarkdownContent` bundle contains `import("./mermaid.core-...")` and has no static import of Mermaid core. Vite also emits Mermaid diagram definitions as separate chunks so unsupported diagram types are not all bundled into the shared Markdown path.

## Validation

- Focused Mermaid loading contract: passed.
- Vite production build: passed, 5,023 modules transformed.
- Emitted-bundle dependency inspection: passed; no static Mermaid core dependency from `MarkdownContent`.
- APT publication contract tests: passed.
- Vitest: 20 test files and 50 tests passed.
- ESLint and documentation governance: passed with validation recommendation `pass`.
- Root APT conformance and surface verification: passed.

## Measurement Boundary

This review uses source imports and deterministic Vite production output. It proves bundle composition and loading boundaries, but it does not claim measured improvements to LCP, INP, main-thread time, or network timing. Those require a browser trace against a deployed or locally served build.

## Follow-On Status

The syntax-highlighting boundary identified by this review was resolved separately in Stage 7. See `docs/apt/reports/apt-syntax-highlighting-bundle-review-2026-08-16.md` for the implementation, rejected alternatives, and build evidence.
