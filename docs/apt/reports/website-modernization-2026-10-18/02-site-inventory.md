---
title: APT Website Modernization Audit — Site and Route Inventory
version: v1
last_updated: 2026-10-18
owner: APT
status: draft
audience: internal
visibility: internal
source: manual
review_type: website-modernization-phase-1
---

# Site and Route Inventory

**Sources**

- Routes: `apps/web/App.tsx`
- Primary nav: `apps/web/data/site.ts`
- Header: `components/apt/AptNav.tsx`
- Footer: `components/apt/AptFooter.tsx`

**Live columns** were checked on 2026-10-18 in the built-in browser, by full page load and by client-side navigation. The "Own meta" column says whether the route calls `usePageMetadata` (source), confirmed live where it was tested. "h1" is the live count after render; "n/t" means not tested.

## 1. Repository context

- **pnpm monorepo:**
  - `apps/web` is the site: Vite 4.5, React 18.3, TS, Tailwind 3.4, shadcn/Radix, react-router 6.30 `BrowserRouter`.
  - `apps/worker` is a Hono API on Cloudflare Workers.
  - `packages/ui` holds `AptButton`, `AptCard`, `AptSection`, `AptTag`, `HeroCard`. `packages/config` holds the tokens. `packages/knowledge` holds the content types and schemas.
  - `packages/utils` is empty.
- **Content:** Markdown in `apps/web/content/{labs,demos,systems,blog,guides,podcasts,case-studies,design-reviews,videos}` is indexed into `data/*-index.json` and copied to generated `public/content`.
- **Content counts (files):**

| Type | Files |
|---|---|
| labs | 8 |
| demos | 8 |
| systems | 7 |
| blog | 11 |
| guides | 13 |
| podcasts | 5 |
| case-studies | 4 |
| design-reviews | 3 |
| videos | 0 |

- **Drafts:** 25 entries are marked `draft` and are excluded by `DRAFT_STATUSES` in `scripts/generate-content-index.cjs`.

## 2. Route inventory

| Route | Component | Purpose | Primary audience | Interactions | Own meta | h1 | Known issues | Potential improvement |
|---|---|---|---|---|---|---|---|---|
| `/` | `routes/Home.tsx` | APT overview, loop, core areas, featured work | All first-time visitors | CTA buttons, featured cards fetched from Worker feeds | Yes | 1 ("APT") | Never names the person. h1 is the acronym. Featured work depends on 3 runtime calls to `*.workers.dev/api/feed/*` | Identity hero, who/what/why band, themed featured work |
| `/about` | `routes/About.tsx` | Profile, bio, principles, site stats, outside of work | Recruiters, peers | Rotating role text, social links | Yes | 1 | No career, education or certs. "Joined June 2006" has no context. Internal gallery link shows an external icon | Career phases, credentials, philosophy |
| `/about/visual-gallery` | `routes/portfolio/VisualGallery.tsx` | Photos, video, drone, maps | Creative/personal visitors | Tabs, image cards | No (inherits previous page) | 0 | 3K–6K Flickr originals used as thumbnails. Video items use Unsplash placeholders (`data/gallery.ts`) | Photography & drones as a named identity area. Right-sized images |
| `/labs` | `routes/portfolio/Labs.tsx` | Labs index, 12 items | Developers, collaborators | Type tabs, 5 facet filters | No | 0 (title is h2) | Card CTA reads "Open proof" (`LabCard.tsx:42`). No repo links | Project model with why and learned. Theme filter |
| `/labs/concepts`, `/mocks`, `/prototypes` | `routes/portfolio/Experiments*.tsx` | Filtered Labs | Developers | Filters | No | n/t | Thin taxonomy: 1 concept, 4 mocks | Could be folded into the `/labs` tabs |
| `/labs/live-demos` | `routes/portfolio/LiveDemos.tsx` | Runnable demos | Developers, peers | Cards | No | 1 | Stale metadata on client nav (verified) | — |
| `/labs/live-demos/:slug` | `routes/DemoDetail.tsx` | Demo detail (e.g. `crt-world`) | Developers | Launch links | No | 1 | Generic title "Applied Practical Thinking" (verified) | Per-item meta |
| `/labs/:id` | `routes/portfolio/LabDetail.tsx` | Lab detail | Developers | Links | No | n/t | — | Per-item meta, related items |
| `/proof`, `/proof/:id` | `routes/Proof.tsx`, `ProofDetail.tsx` | Stable systems | Technical peers | Cards | Yes | 0 on index | Concept term "Proof" is opaque to newcomers | Label as "Shipped systems" or similar |
| `/design` (+ ~12 sub-routes) | `routes/Portfolio.tsx`, `routes/portfolio/Design*.tsx` | Design doctrine, docs, patterns, review bundle | APT practitioners | Docs, Mermaid | Partial (DesignDocs/Detail/Patterns only) | 0 on hub | In the footer, not in the primary nav. Very deep, internal-facing | Keep, but treat as secondary |
| `/principles`, `/principles/:section` | `routes/principles/*` | APT principles | APT practitioners | Section nav | No | 0 on index | `/principles` carried the Proof title and canonical (verified) | Add meta. Reposition as "How I work" |
| `/insights` | `routes/Insights.tsx` | Writing hub | Peers | Filters | Yes | 0 | — | Themes |
| `/insights/blog` (+ alias `/insights/articles`) | `routes/insights/Blog.tsx` | Articles | Peers | Filters | No | 1 | Alias renders a duplicate URL with status 200 (verified) | Redirect alias |
| `/insights/podcast` (+ alias `/podcasts`) | `routes/insights/Podcast.tsx` | Episodes | Peers | Audio | No | 1 | Duplicate alias | Redirect alias |
| `/insights/case-studies` (+ alias `/practice`) | `routes/insights/CaseStudies.tsx` | Case studies | Hiring managers, peers | Cards | Yes | n/t | Duplicate alias | Best place for flagship stories |
| `/insights/:id` | `routes/InsightDetail.tsx` | Article detail | Peers | Markdown, Mermaid | Yes | n/t | — | Related projects |
| `/assistant` | `routes/assistant.tsx` | AI assistant | Curious visitors | Chat → Worker `/api/chat` | No | 0 | Backend LLM step is a stub. The endpoint is unauthenticated | Hide or label as experimental until ready |
| `/design-playground` | `routes/DesignPlayground.tsx` | Sandbox | Internal | — | No | n/t | Publicly routable internal tool | `noindex` |
| `*` | `pages/NotFound.tsx` | 404 | — | Link home | Yes | 1 | Rendered **outside** `AptLayout`, so there's no nav or footer and no `<main>` (verified). HTTP status is 200 (soft 404, verified) | Wrap in layout, `noindex` |

## 3. Navigation map (verified)

**Header** (`site.ts` nav plus `AptNav` utility links)

```
Home | Labs ▾ (All, Concepts, Mocks, Prototypes, Live Demos) | Proof
     | Principles ▾ (All, Thinking, Design, Architecture, Execution, AI, Security)
     | Insights ▾ (All, Blog, Podcast, Case Studies) | About      [Gallery] [GitHub]
```

**Footer** (`AptFooter.tsx`)

- Navigation: Home, Labs, Proof, Principles, **Design**, Insights, About.
- Resources: Applied Visual Gallery, GitHub, LinkedIn.

**Navigation issues**

- **N1, Verified.** The primary nav is organized entirely by APT doctrine stages. No item maps to a person, career, or photography. LinkedIn appears only in the footer and on About.
- **N2, Verified.** At 768 px the header overflows (scrollWidth 870 px vs 768 px viewport). See `static/screenshots/about-tablet-768-overflow.jpg`. The elements past the right edge are the hidden dropdown panels (`absolute top-full … opacity-0 invisible`) and the trailing nav items.
- **N3, Verified.** `/design` appears in the footer only. The Gallery appears as a utility link labelled "Gallery", not as "Photography".
- **N4, Verified.** The footer's Gallery link uses an absolute production URL (`siteConfig.appliedGalleryUrl`) with `target="_blank"`, so an internal page opens in a new tab.
- **N5, Verified.** There is no skip-to-content link.

## 4. Duplicate, dead, or missing content

**Duplicate**

- Three alias routes render the same page under a second URL: `/insights/articles`, `/insights/podcasts`, `/insights/practice`.
- The blog and guides each have a "Designing AI-Ready Interfaces" variant (`content/blog/03-…`, `content/guides/03-…`). Whether both are intended needs Likely validation.

**Dead (Likely, by import search)**

- Unrouted files: `routes/Start.tsx`, `routes/Labs.tsx`, `routes/LabDetail.tsx`, `pages/Index.tsx`, `routes/portfolio/Principles.tsx`, `routes/portfolio/PrincipleDetail.tsx`.
- Leftover Lovable scaffold at the root: `vite.config.ts`, `tsconfig.json`.

**Missing (Verified)**

- Career history, education, certifications, skills/capabilities summary, a contact CTA, `sitemap.xml`, JSON-LD.
- `content/videos/` is empty while the gallery shows video cards with stock images.

**Doc drift (Verified)**

- `AGENTS.md` names `/experiments` as the primary Labs path, but no such route exists.
- `docs/DEPLOYMENT.md` references `/learn`, `/experiments`, and a `pages.dev` origin.
