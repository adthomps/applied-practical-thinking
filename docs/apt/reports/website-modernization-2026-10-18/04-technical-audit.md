---
title: APT Website Modernization Audit — Technical
version: v1
last_updated: 2026-10-18
owner: APT
status: draft
audience: internal
visibility: internal
source: manual
review_type: website-modernization-phase-1
---

# Technical Audit

This file covers workstreams C (technical architecture) and D (SEO). Every proposed change lists the problem, evidence, solution, benefit, effort, and risk; the full entries are in `06-modernization-backlog.md`. No builds, installs, or deploys were run.

## 1. Architecture summary (Verified)

| Layer | Implementation |
|---|---|
| Package manager | pnpm workspaces (`pnpm-workspace.yaml`). CI uses pnpm 10 on Node 20 |
| Web | `apps/web`: Vite 4.5.14, React 18.3.1, react-router-dom 6.30.3 (`BrowserRouter`), Tailwind 3.4.19, shadcn/Radix (~27 packages), TanStack Query 4, mermaid 11 (dynamic import) |
| API | `apps/worker`: Hono 4.11, zod 4, wrangler 4.60, Vectorize binding, OpenAI embeddings |
| Hosting | Cloudflare Pages built through the Cloudflare Git integration (`wrangler.toml` `pages_build_output_dir = "apps/web/dist"`). The Worker is on `*.workers.dev` |
| Content pipeline | `apps/web/content/**` → `scripts/generate-content-index.cjs` → `data/*-index.json` plus generated `public/{content,data,docs}` |
| Tokens | `packages/config/src/aptTokens.ts` → `.apt/design/generated/apt-tokens.css` |

**Assessment.** The architecture fits a personal portfolio and experimental lab. No technology replacement is recommended.

## 2. Dependencies

- **Current majors:** React 18, Router 6, Tailwind 3. Vite 4 is two majors behind, and Vitest 0.34 is old.
- **zod is split:** v3 in web, v4 in the worker.
- None of this is urgent. Upgrade Vite and Vitest together as one maintenance item (WEB-029, P3), only after the CI build gate (WEB-017) exists.
- **Unused shadcn components (Likely):** calendar, carousel, input-otp, menubar and others. Tree-shaking limits the runtime cost; the main cost is maintenance noise.

## 3. SEO and discoverability

| # | Finding | Type | Evidence |
|---|---|---|---|
| S1 | **Metadata carries over between routes.** Routes that don't call `usePageMetadata` keep the previous route's title, description, OG and canonical | **Verified (live)** | After navigating `/about` → `/labs`, the canonical was `…/about` and the title was "About \| …". After `/proof` → `/principles`, the title and canonical were Proof's. After `/insights` → `/design` and `/assistant`, they were Insights' |
| S2 | Ten of 15 inspected routes set no metadata. Only 11 route files call the hook | Verified | `grep usePageMetadata`. Missing on `routes/portfolio/*`, `routes/principles/*`, Blog, Podcast, DemoDetail, VisualGallery, assistant |
| S3 | Canonical built from `window.location.href` (`hooks/usePageMetadata.ts:133`), so query strings and hashes leak into it | Verified (source) | — |
| S4 | Static `index.html` has a generic description ("APT Portfolio and Demos") and no OG, Twitter, or canonical tags. The HTML is 763 bytes and contains no content | Verified (live fetch) | Crawlers and link-preview bots that don't run JS see only this |
| S5 | No sitemap. `/sitemap.xml` returns **200 text/html**, the SPA shell | Verified (live) | `robots.txt` has no `Sitemap:` line |
| S6 | Soft 404s: unknown URLs and alias URLs return 200 | Verified (live) | `/definitely-not-a-page` → 200, `/insights/articles` → 200 |
| S7 | Heading hierarchy: no h1 on seven index pages. The Home h1 is "APT" | Verified | See `03` UX-1 |
| S8 | No JSON-LD (Person, WebSite, CreativeWork) | Verified | — |
| S9 | Homepage featured content arrives from 3 cross-origin calls to `applied-practical-thinking.apt-account.workers.dev/api/feed/*` | Verified (live network) | Not present in the HTML. If the Worker fails, home loses its featured work. Fallback behaviour not tested (Likely) |

**Recommended approach, lowest cost first**

1. Make metadata **mandatory per route**. Use a route-level wrapper or reset the metadata in `AptLayout` on each `location.pathname` change. Build canonical from `origin + pathname`. (WEB-001)
2. Put sensible **static defaults** in `index.html`: description, OG and Twitter tags with a default image, and Person and WebSite JSON-LD. (WEB-008a, WEB-027)
3. **Generate `sitemap.xml` at build time** from the route list plus the content indexes, and add the `Sitemap:` line to robots. (WEB-009)
4. **Optional:** build-time **prerendering** of the top routes so they ship real HTML and meta, for example with a Vite prerender plugin or a post-build static render. Do this only if search and social previews matter after steps 1–3. (WEB-008b, L)

## 4. Performance (single-run browser observations, not lab scores)

| Metric | Observation | Notes |
|---|---|---|
| Home TTFB / DOMContentLoaded | 49 ms / 60 ms | Warm cache and edge cache. Not representative of first visits |
| Home JS (decoded) | ~446 KB across 4 files | Route-level splitting works. Transfer size was 0 because of the warm cache |
| CLS (home) | 0 | Buffered observer |
| LCP | Not captured | The observer returned no entry in this browser pane |
| Gallery thumbnails | Natural size **6048×6048**, **3072×1529**, **4032×3024** shown at **254×191** | Verified. The `?w=400&fit=crop` query is ignored by Flickr's static CDN. Byte sizes are hidden by cross-origin timing. Images have no `loading="lazy"` and no width/height |
| Largest built chunks | mermaid.core ~448 KB, cytoscape ~442 KB, katex ~265 KB | From the existing `dist/`. Loaded only when Markdown includes Mermaid (`docs/apt/reports/apt-mermaid-bundle-review-2026-08-16.md`) |
| Media in git | ~141 MB of podcast audio and video under `public/content`. The largest file is ~24 MB | Likely risk: the Cloudflare Pages per-file limit is 25 MiB |

**Fixes**

- Use Flickr size suffixes (`_w` 400 px, `_c` 800 px) for thumbnails, and keep the originals for the lightbox. Add `loading="lazy"`, `decoding="async"`, and width/height to images. (WEB-007)
- Move large media to R2 or an external host. (WEB-023)

## 5. Security

| # | Finding | Type | Evidence | Priority |
|---|---|---|---|---|
| X1 | `/api/chat` and `/api/query` are unauthenticated and unrate-limited, and each call makes a paid OpenAI embedding request | Verified (source). Not exercised | `apps/worker/src/routes/*` | **P0** (cost abuse) |
| X2 | `/api/chat` logs full request and response bodies | Verified (source) | Privacy: visitor input in logs | P0 (folded into X1) |
| X3 | No CSP, HSTS, `frame-ancestors`/`X-Frame-Options`, or Permissions-Policy. The live response carries only `x-content-type-options: nosniff` and `referrer-policy`, both added by the platform | Verified (live headers, `public/_headers`) | — | P1 |
| X4 | 500 responses include `err.message`. The ingest token is compared with `!==`. `/api/report` returns a fabricated issue ID. The www→apex redirect middleware can't fire on workers.dev | Verified (source) | — | P2 |
| X5 | Secrets handling: env var names only in tracked files. `.env` files are gitignored, with `.example` files tracked | Verified | No secret values were opened | OK |

**Recommended changes**

- **X1:** Add a Cloudflare Workers rate-limiting binding, or a Turnstile check, in front of chat and query. Better still, disable `/api/chat` until the LLM step exists, since it is currently a stub. Remove the body logging. Effort S. Risk: low; the assistant page needs a "temporarily unavailable" state.
- **X3:** Add security headers to `public/_headers`. Ship the CSP as `Content-Security-Policy-Report-Only` first, because Mermaid, Flickr images, and Worker fetches need explicit allowances. Effort S. Risk: a CSP that is too tight breaks rendering, hence starting in Report-Only.

## 6. Maintainability

**Verified**

- Six unrouted route files (`02` §4) and leftover scaffold files at the root (`vite.config.ts` with `lovable-tagger`, root `tsconfig.json`).
- `apps/web/package.json` `"main"` points to the nonexistent `src/main.tsx`.
- Code is mixed between the app root and `apps/web/src/`.
- Large files: `routes/portfolio/DesignSystem.tsx` (982 lines), `components/apt/AptNav.tsx` (577 lines), `apps/worker/src/routes/publicContent.ts` (773 lines).
- Loose TS in web (`strictNullChecks: false`, `noImplicitAny: false`). The worker is `strict`.
- Doc drift: `AGENTS.md` `/experiments`; `docs/DEPLOYMENT.md` `/learn` and `pages.dev` origin.

None of these block Phase 2. Cleanup belongs in WEB-015, WEB-016, and WEB-030.

## 7. Testing gaps

**Verified**

- `npx vitest run` in `apps/web` passed **22 files and 93 tests** in 8.4 s, and the working tree stayed unchanged.
- The tests are content, manifest, and contract checks.

**Gaps**

- No component render tests. `jsdom` and `@testing-library/*` are referenced in the root `vitest.config.ts` and `test/setup.ts`, but they are not in the lockfile.
- No browser, e2e, or accessibility tests (no Playwright or axe).
- No test would catch S1 (metadata carry-over), the 768 px overflow, or missing h1s.

**Recommendation (WEB-018).** Add a small Playwright smoke suite over about 8 key routes: h1 count, title and canonical match the route, no horizontal overflow at 375, 768 and 1280 px, plus an axe scan. This adds dev dependencies, so it needs explicit approval at implementation time.

## 8. Deployment considerations

**Verified**

- Pages builds through the Cloudflare Git integration. GitHub Actions (`.github/workflows/worker.yml`) runs conformance, design checks and tests, and deploys the Worker only when `vars.ENABLE_GHA_DEPLOY == 'true'`.
- CI does **not** run lint, typecheck, or the web build. It mixes `actions/checkout@v3` and `@v4`, and uses the `production` environment on PRs.

**Recommendations**

- Add `pnpm typecheck`, `pnpm typecheck:web`, and `pnpm build` to CI (WEB-017, S).
- Keep the Pages Git-integration deploy; no infrastructure change is recommended.
- The Worker runs on `workers.dev` without a custom route. That's acceptable. Optionally route it as `api.appliedpracticalthinking.com` later.
