---
title: APT Website Modernization Audit — Proposed Site Structure
version: v1
last_updated: 2026-10-18
owner: APT
status: draft
audience: internal
visibility: internal
source: manual
review_type: website-modernization-phase-1
---

# Proposed Site Structure

**Principle:** keep every existing URL, improve the existing routes, and change labels and grouping before adding pages. No new top-level routes are proposed. The only new URL is `/sitemap.xml`.

## 1. Current sitemap (Verified, `apps/web/App.tsx`)

```
/                         Home (APT loop, core areas, featured)
├─ /labs                  Labs index  ─ /concepts /mocks /prototypes /live-demos(/:slug)  /:id
├─ /proof                 Proof index ─ /:id
├─ /principles            Principles  ─ /:section (12 sections)
├─ /insights              Insights    ─ /blog /podcast /case-studies /:id   (+3 duplicate aliases)
├─ /design                Design hub  ─ ~12 doctrine/doc routes   (footer only)
├─ /about                 About       ─ /visual-gallery
├─ /assistant             AI assistant (unlisted)
├─ /design-playground     Sandbox (unlisted)
└─ *                      404 (outside layout)
```

## 2. Proposed sitemap (same URLs, regrouped)

```
/                         Home — identity hero, who/what/why, three pillars, themed featured work
├─ About ▾
│   ├─ /about             Profile · career phases · education & certifications · capabilities · philosophy · connect
│   └─ /about/visual-gallery   "Photography & Drones" (photos, drone, maps)
├─ Projects ▾             (label for the existing Labs + Proof)
│   ├─ /labs              "Experiments" — all, filterable by type, theme, status
│   ├─ /labs/live-demos   "Live demos"
│   └─ /proof             "Shipped systems"
├─ Writing ▾              (label for the existing Insights)
│   ├─ /insights/blog · /insights/case-studies · /insights/podcast
├─ How I Work ▾           (label for the existing Principles; Design moves here as a child)
│   ├─ /principles
│   └─ /design
└─ Utility: GitHub · LinkedIn (header), Photography moved into About
```

**Header order (proposed):** Home · About · Projects · Writing · How I Work · [LinkedIn] [GitHub]

**Why this order**

- About comes second because the professional anchor carries 60% of the identity.
- Projects and Writing are the evidence for it.
- The methodology stays fully available, but it is no longer the first thing a visitor meets.

**Alternatives considered**

- Keeping the current labels and only adding "Career": rejected, because it adds a page without fixing the doctrine-first framing.
- A dedicated `/career` page: deferred. See `03` §3, option 4.

**Validation needed**

- Whether "Projects / Writing / How I Work" or the existing APT vocabulary should appear in the nav is a brand decision for Adam. URLs don't change either way.
- The Labs sub-routes `/labs/concepts`, `/mocks`, `/prototypes` can remain as deep links but should be removed from the dropdown. The type tabs on `/labs` already cover them.

## 3. Navigation recommendations

| ID | Recommendation | Backlog |
|---|---|---|
| NAV-1 | Regroup and relabel as above. URLs unchanged | WEB-013 |
| NAV-2 | Fix the 768 px header overflow. Switch to the mobile menu below `lg`, or constrain the hidden dropdown panels | WEB-006 |
| NAV-3 | Add a skip link. Wrap the 404 page in `AptLayout` | WEB-005, WEB-010 |
| NAV-4 | Convert the alias routes to `<Navigate replace>` | WEB-014 |
| NAV-5 | Make internal links internal: the footer gallery uses a relative path in the same tab, and drop the external icon on About | WEB-019 |
| NAV-6 | Add a "Connect" CTA (LinkedIn) to the Home hero and to the About end | WEB-003, WEB-004 |

## 4. Page responsibilities

| Page | Single job |
|---|---|
| Home | Answer the seven 30-second questions, and route visitors to About, Projects, Photography |
| About | The professional story and credentials, plus the personal context |
| Labs | Browse experiments by theme, type, and status |
| Live demos / Proof | Show working, runnable or shipped evidence |
| Insights | Explain thinking and lessons learned |
| Principles / Design | The APT method for practitioners |
| Gallery | Photography, drones, mapping |

## 5. Content relationships and cross-links (WEB-020)

Introduce a single `theme` value on labs, demos, systems, and insights. It reuses the existing front matter and `ContentFilters`. Then render "Related" rails and theme chips.

| Career expertise | → Projects | → Writing |
|---|---|---|
| Payments & commerce | Payment Gateway POC v1, Payment Gateway Signup/Concept v1, APT Commerce, Authorize.net toolkits (when published) | "Future of Payments & AI", "AI System Instructions for Transaction Analysis" |
| Customer / service experience | AI Dream to Deliver, APT Health Compass | "Designing AI-Ready Interfaces…" (after the WEB-024 review) |
| Platform modernization | Portfolio Website / APT Site, Cloudflare architecture | "AI-Powered Cloud Development with React, Hono, and Cloudflare", "Repository dump → governed library" |
| AI-assisted development | APT Novel Reviewer, Grey Rain, the assistant | "AI & Developer's Journey", "Decision-Driven Development" |
| Photography, drones, mapping | Gallery (photos, drone, maps) | "Photography for Technologists" |
| Education & certifications (About) | → link each to the projects that demonstrate it | — |

Theme-to-item assignments in this table are **proposals** and should be confirmed by Adam.
