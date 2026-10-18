---
title: APT Website Modernization Audit — Prioritized Backlog
version: v1
last_updated: 2026-10-18
owner: APT
status: draft
audience: internal
visibility: internal
source: manual
review_type: website-modernization-phase-1
---

# Prioritized Modernization Backlog

**Legend**

- **Priority:** P0 critical, P1 high value, P2 useful, P3 optional.
- **Effort:** S localized, M multiple components or pages, L structural.
- **Evidence:** V verified, L likely, S strategic, O optional.

Paths are relative to `apps/web/` unless prefixed with `apps/worker/` or `docs/`.

## Quick wins

These are P0/P1 items with S effort: WEB-001, 002, 005, 006, 007, 008a, 009, 011, 024.

## Strategic investments

WEB-003, 004, 012, 013, 020, and optionally 008b.

## P0 — Critical

| ID | Route / component | Problem | Evidence | Proposed improvement | Impact | Effort | Dependencies | Risks |
|---|---|---|---|---|---|---|---|---|
| WEB-001 | All routes; `hooks/usePageMetadata.ts`, `components/apt/AptLayout.tsx` | Title, description, OG and canonical carry over from the previous route. Canonical uses `location.href` | V: live, `/labs` canonical → `/about`, `/principles` shows the Proof title. Only 11 files call the hook | Reset to defaults on every pathname change. Require metadata on every route, including detail pages from front matter. Canonical = `origin + pathname` | Discoverability, credibility | S–M | — | Low. Regression test via WEB-018 |
| WEB-002 | `apps/worker` `/api/chat`, `/api/query` | Unauthenticated, no rate limit, and each call costs an OpenAI embedding. Full bodies are logged | V (source). Not exercised | Disable chat until the LLM step exists, or add a Workers rate-limit binding plus optional Turnstile. Remove body logging | Security, cost | S | Cloudflare rate-limit binding | `/assistant` needs an "unavailable" state |

## P1 — High value

| ID | Route / component | Problem | Evidence | Proposed improvement | Impact | Effort | Dependencies | Risks |
|---|---|---|---|---|---|---|---|---|
| WEB-003 | `/`; `routes/Home.tsx`, `HeroSection`, `data/site.ts` | The homepage doesn't say who is behind APT or show any professional experience. The avatar is a placeholder "A" | V: live 30-second test (`03` §1) | Identity hero ("Experience. Curiosity. Practical Innovation."), named intro line, three pillar cards, Connect CTA. Keep the APT loop lower on the page | Comprehension, credibility | M | WEB-004 data for the role line | Copy needs Adam's approval |
| WEB-004 | `/about`; `routes/About.tsx`, `authorConfig` | No career, education, certifications or capabilities. "Joined June 2006" has no context. The bio is generic | V: source and live | Career-phases timeline (option 3), credentials list, capabilities, philosophy, outside-work, connect. Data in a typed `data/career.ts` | Credibility | M | **Adam supplies verified career data** | Inaccurate claims, so publish only verified facts |
| WEB-005 | Labs, Proof, Principles, Insights, Design, Gallery, Assistant; `components/apt/SectionIntro.tsx:35`; layout | No `<h1>` on 7 index pages (hardcoded `h2`). No skip link | V: live DOM | Add an `as`/`level` prop to `SectionIntro` (default h2, page-title use h1). Add a skip link in `AptLayout` | Accessibility, SEO | S | — | Visual unchanged if classes are kept |
| WEB-006 | Header; `components/apt/AptNav.tsx` | Horizontal scroll at 768 px (scrollWidth 870) | V: `static/screenshots/about-tablet-768-overflow.jpg` | Raise the desktop-nav breakpoint to `lg`, and/or `display:none` the closed dropdown panels | Mobile/tablet usability | S | WEB-013 may change item count | Low |
| WEB-007 | `/about/visual-gallery`; `data/gallery.ts`, gallery cards | Thumbnails load 3K–6K originals (6048×6048 at 254×191) | V: live `naturalWidth` | Flickr `_w`/`_c` sizes for the grid, originals for the lightbox only. Add `loading="lazy"`, `decoding="async"`, width/height | Performance | S | — | None |
| WEB-008a | `index.html` | Generic static description, no OG, Twitter or canonical defaults. Link previews show "APT Portfolio and Demos" | V: live HTML fetch | Static default meta plus a default OG image | Discoverability | S | — | None |
| WEB-009 | Build; `public/robots.txt` | No sitemap. `/sitemap.xml` returns the HTML shell with status 200 | V: live fetch | Build-time generator from the route list plus content indexes. Add the `Sitemap:` line | Discoverability | S | WEB-014 (final URL set) | Must exclude drafts and internal routes |
| WEB-011 | `public/_headers` | No CSP, HSTS, frame-ancestors or Permissions-Policy | V: live headers | Add headers. Ship the CSP as Report-Only first | Security | S | — | A tight CSP breaks Mermaid, Flickr or Worker calls |
| WEB-012 | Labs, demos, systems; `LabCard.tsx`, detail pages, content front matter | No why or learned fields. No repo links in any of 16 lab and demo files. 5 status spellings. "Open proof" CTA on experiments | V: source and live | Light project model (`03` §4): optional `why/built/learned`, normalized status, `theme`. Fix the CTA label. Populate repo links where public | Discoverability, credibility | M | — | Content effort. Optional fields keep old entries valid |
| WEB-013 | Header and footer nav; `data/site.ts`, `AptFooter.tsx` | Nav is doctrine-first, with no path for professional visitors | V: nav map (`02` §3), S | Regroup and relabel per `05` §2. URLs unchanged | Comprehension | M | Adam's labeling decision | Familiar APT terms move down a level |
| WEB-024 | `content/blog/03-…`, `content/guides/03-…`, `content/podcasts/01-…` | Published content names a current or former employer's design system | V (content), S | Adam to confirm the content is public-safe and policy-compliant, or reword it neutrally | Credibility, compliance | S | — | None |

## P2 — Useful

| ID | Route / component | Problem | Evidence | Proposed improvement | Impact | Effort | Dependencies | Risks |
|---|---|---|---|---|---|---|---|---|
| WEB-010 | `*`; `pages/NotFound.tsx`, `App.tsx` | 404 outside layout (no nav, no `<main>`). Soft 404s return status 200 | V: live | Render inside `AptLayout`, and confirm `noindex` | Accessibility, SEO | S | — | A true 404 status needs prerender or Pages Functions (out of scope) |
| WEB-014 | `/insights/articles`, `/podcasts`, `/practice` | Duplicate URLs | V | `<Navigate replace>` | SEO | S | — | None |
| WEB-016 | `AGENTS.md`, `docs/DEPLOYMENT.md` | Docs reference `/experiments`, `/learn`, and the `pages.dev` origin | V | Correct the docs | Maintainability | S | — | None |
| WEB-017 | `.github/workflows/worker.yml` | CI doesn't run lint, typecheck or the web build | V | Add `typecheck`, `typecheck:web`, `build`. Unify `checkout@v4` | Maintainability | S | — | May surface existing type errors |
| WEB-018 | Tests | No render, e2e or a11y tests. jsdom and testing-library are configured but not installed | V | Playwright smoke plus axe over ~8 routes: h1, title/canonical, overflow at 3 widths | Accessibility, maintainability | M | Approval to add dev dependencies | Flaky tests if they hit live Worker data. Stub feeds |
| WEB-019 | `AptFooter.tsx`, `About.tsx` | Internal gallery link is absolute, opens in a new tab, and shows an external icon | V | Relative path, same tab, internal icon | UX | S | — | None |
| WEB-020 | Labs, Insights, detail pages; `ContentFilters` | Expertise isn't connected to projects and writing | V, S | `theme` field, theme chips, "Related" rails (`05` §5) | Discoverability | M | WEB-012 | Taxonomy drift. Keep to ≤5 themes |
| WEB-021 | `/`; feed calls to `*.workers.dev` | Featured work needs 3 runtime cross-origin calls. Behaviour on Worker failure is untested | V (network), L (failure) | Read the static `public/data/*-index.json` first and use the Worker as enhancement, or verify the fallback | Performance, resilience | M | — | Keep a single source of truth |
| WEB-022 | Gallery videos; `data/gallery.ts` | 3 video items use Unsplash placeholder images. `content/videos/` is empty | V (source) | Replace with real media, or hide the Video tab until there is content | Credibility | S | Adam's media | None |
| WEB-023 | `public/content/podcasts/*` | ~141 MB of media in git. Largest file ~24 MB, near the 25 MiB Pages file limit | V (sizes), L (limit risk) | Move to R2 (custom domain) or an external host | Maintainability, performance | M | R2 bucket | URL migration for existing episodes |
| WEB-026 | `AnimatedRole`, `CosmicBackground` | JS animations may ignore `prefers-reduced-motion` | L | Respect reduced motion. Consider replacing the rotating role with static text | Accessibility | S | — | None |
| WEB-027 | `index.html` | No structured data | V | Person plus WebSite JSON-LD (static), with `sameAs` LinkedIn, GitHub, Flickr | Discoverability | S | WEB-004 (verified title) | None |
| WEB-028 | `apps/worker` | `err.message` in 500s, non-constant-time token compare, fabricated `/api/report` response, unreachable redirect middleware | V (source) | Generic errors, `timingSafeEqual`, remove or flag the report stub, remove dead middleware | Security, maintainability | S | — | None |

## P3 — Optional

| ID | Route / component | Problem | Evidence | Proposed improvement | Impact | Effort | Dependencies | Risks |
|---|---|---|---|---|---|---|---|---|
| WEB-008b | Build | SPA ships empty HTML. Crawlers and previews rely on JS | V | Build-time prerender of top routes | Discoverability | L | WEB-001, 008a, 009 | Build complexity. Hydration mismatches |
| WEB-015 | 6 unrouted route files, root `vite.config.ts` and `tsconfig.json`, `package.json` `main` | Dead code and scaffold | L (import search) | Remove after confirming they aren't imported | Maintainability | S | — | Accidental removal. Verify with build |
| WEB-025 | Theme | Dark-only. Light tokens unused | V | **Keep dark-only** (documented intent). Revisit only if visitors ask | — | — | — | — |
| WEB-029 | Tooling | Vite 4 and Vitest 0.34 are old. zod v3/v4 split | V | Upgrade together | Maintainability | M | WEB-017 | Plugin breakage |
| WEB-030 | Various | `DesignSystem.tsx` 982 lines, `AptNav.tsx` 577 lines, unused shadcn components, filename typo `portoflio-website.png`, loose web TS config | V | Opportunistic refactors when those files are touched | Maintainability | S–M | — | Scope creep |
