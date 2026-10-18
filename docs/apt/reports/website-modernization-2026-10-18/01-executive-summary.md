---
title: APT Website Modernization Audit — Executive Summary
version: v1
last_updated: 2026-10-18
owner: APT
status: draft
audience: internal
visibility: internal
source: manual
review_type: website-modernization-phase-1
---

# APT Website Modernization Audit — Executive Summary

Phase 1 is an audit only. No application code, content, configuration, or dependencies were changed. The only new files are those in this folder.

## Package contents

| File | Purpose |
|---|---|
| `01-executive-summary.md` | This summary |
| `02-site-inventory.md` | Verified route inventory and navigation map |
| `03-ux-content-audit.md` | Messaging, IA, About/career, projects, visual, accessibility |
| `04-technical-audit.md` | Architecture, SEO, performance, security, testing, deployment |
| `05-proposed-site-structure.md` | Current vs proposed sitemap and cross-links |
| `06-modernization-backlog.md` | Prioritized backlog (`WEB-001` … `WEB-030`) |
| `07-implementation-roadmap.md` | Phases 2–4 |
| `static/screenshots/` | Browser captures referenced in the findings |

## How evidence was gathered

- **Source review** of `apps/web`, `packages/*`, the public surface of `apps/worker`, CI, and the Cloudflare config, at commit `cf3603c`.
- **Live review on 2026-10-18** of https://appliedpracticalthinking.com in the Claude built-in browser at desktop, 768 px (tablet) and 375 px (mobile). This covered DOM inspection of title, meta, canonical and headings on 15 routes, response headers, one keyboard-focus check, and Performance API timing.
- **Local tests:** `vitest run` in `apps/web` passed 22 files / 93 tests. The working tree was unchanged afterward.

**Limitations**

- No Lighthouse or axe run, because neither tool is available here. Performance numbers are single-run browser observations from a warm cache, not lab scores. LCP could not be captured.
- The LinkedIn profile is behind a sign-in wall and was not read. No career facts have been taken from it.
- Screenshots were captured at reduced scale.

**Evidence labels used throughout**

- **Verified:** observed in source or in the browser.
- **Likely:** strong indication, but needs validation.
- **Strategic:** a recommendation, not a defect.
- **Optional:** a design idea.

## Overall assessment

The site is technically solid and carefully governed. It has a coherent dark design system, lazy-loaded routes, contract tests, and a well-structured content pipeline.

The problem is what the site is about. It currently represents the **APT method**, not the **person behind APT**:

- Every primary nav item except Home and About is a doctrine concept (Labs → Proof → Principles → Insights).
- The homepage never names Adam Thompson.
- No career history, education, or certifications exist anywhere in the codebase.

For the intended identity ("Experience. Curiosity. Practical Innovation.", about 60/40 professional/personal), the professional 60% is almost absent. The creative and technical 40% exists but is hidden: the photography gallery is two levels deep, under About.

## Strengths (keep)

- **Design system:** semantic tokens (`packages/config/src/aptTokens.ts`), dark-first theme, consistent `AptCard`/`AptTag`/`AptButton` usage, and visible keyboard focus (verified on header links).
- **Content model:** Markdown front matter with `problem`, `status`, `technologies`, `links` (`apps/web/content/labs/*.md`), plus filters on Labs (Type/Topics/Platform/Tech/Status).
- **Performance hygiene:** route-level code splitting (`lib/lazyWithRetry.ts`), on-demand Mermaid, no webfonts. The home page loaded about 446 KB of decoded JS.
- **Real substance in the content:** payments work (Payment Gateway labs, Authorize.net toolkits), live demos (CRT World, Payment Gateway POC), AI and Cloudflare articles, and a photography-for-technologists article.
- **Responsive mobile layout:** no horizontal overflow at 375 px, and a working hamburger menu.

## Major weaknesses

1. **Identity gap.** The hero is "APT / Systems over screens. Decisions over demos." with a placeholder "A" avatar. A first-time visitor can't tell who is behind the site or what their professional background is (`03`, §1).
2. **SEO metadata defect (P0).** Client-side navigation keeps the previous page's title and canonical. Observed live: on `/labs` the canonical pointed to `/about`, and `/principles` carried the Proof metadata. Ten of the 15 inspected routes set no metadata of their own (`04`, §3).
3. **Worker cost and abuse exposure (P0).** `/api/chat` and `/api/query` are unauthenticated and unrate-limited, and each call makes a paid OpenAI embedding request (`04`, §5).
4. **Accessibility and layout defects.**
   - Seven index pages have no `<h1>`, because `components/apt/SectionIntro.tsx` hardcodes `<h2>`.
   - At 768 px the page scrolls horizontally (scrollWidth 870 px) because of the header nav.
   - There is no skip link.
5. **Photography performance.** Gallery thumbnails display at 254×191 but download 3K–6K Flickr originals (6048×6048 verified).
6. **Project storytelling.** Lab cards don't say why a project exists or what was learned. No lab has a repo link. Status vocabulary is inconsistent, and the card CTA "Open proof" appears on Experiment cards.

## Strategic opportunities

- Reframe the homepage around **Experience → Capability → Experimentation → Curiosity**, and use the existing Labs/Proof/Insights as evidence for it.
- Turn About into the professional anchor. A compact **career-phases timeline** with education and certifications fits the existing `AptCard` patterns.
- Introduce cross-cutting **themes**: Payments & Commerce, AI-assisted development, Platform modernization, Photography & mapping. These connect career expertise to projects and writing through tags and filters that already exist, without new pages.
- Promote Photography from a buried utility link to a named part of the identity.

## Top five recommendations

| # | Recommendation | Backlog | Priority |
|---|---|---|---|
| 1 | Fix per-route metadata (title, description, canonical from pathname) for all routes, and add static OG defaults, a sitemap, and JSON-LD | WEB-001, WEB-008, WEB-009, WEB-027 | P0/P1 |
| 2 | Rate-limit or gate the Worker chat/query endpoints and stop logging request bodies | WEB-002 | P0 |
| 3 | Reposition the homepage hero and add a "who / what / why" band that names Adam and links to About | WEB-003 | P1 |
| 4 | Rebuild About with a verified career-phases timeline, education and certifications, and an APT philosophy statement | WEB-004 | P1 |
| 5 | Fix the structural a11y and layout defects (h1 on index pages, 768 px overflow, skip link) and gallery thumbnail sizes | WEB-005, WEB-006, WEB-007 | P1 |

## Verdict: incremental modernization, not a redesign

There is no evidence that a rebuild is needed. The stack (Vite + React 18 + Tailwind + Cloudflare Pages/Workers), design tokens, components, and content pipeline are all fit for purpose. The gaps are in content, IA labeling, metadata, and a handful of localized defects.

All of them can be closed incrementally on the existing routes. The only optional structural investment is build-time prerendering for SEO (`WEB-008b`), and it should be treated as a Phase 3 decision.
