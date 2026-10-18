---
title: APT Website Modernization Audit — Implementation Roadmap
version: v1
last_updated: 2026-10-18
owner: APT
status: draft
audience: internal
visibility: internal
source: manual
review_type: website-modernization-phase-1
---

# Implementation Roadmap

Phases are adjusted to the audit findings. Each phase needs explicit approval before it starts.

**Effort estimates** assume one developer working with AI assistance, and are indicative only:

- S ≈ ≤½ day
- M ≈ 1–3 days
- L ≈ 1–2 weeks

## Phase 2a — Foundation fixes

*Small, low-risk, no content decisions needed.*

| Item | Backlog |
|---|---|
| Per-route metadata, canonical from pathname | WEB-001 |
| Gate or rate-limit Worker chat/query; stop body logging | WEB-002 |
| `<h1>` via `SectionIntro` level prop; skip link | WEB-005 |
| 768 px header overflow | WEB-006 |
| Right-sized gallery thumbnails, lazy loading | WEB-007 |
| Static meta defaults, sitemap, alias redirects, 404 in layout | WEB-008a, 009, 014, 010 |
| Security headers (CSP Report-Only) | WEB-011 |
| CI: typecheck and build gates | WEB-017 |

**Estimated effort:** ~2–4 days.

**Exit criteria**

- On every inspected route, the title and canonical match the route.
- Every page has one h1.
- No horizontal overflow at 375, 768, or 1280 px.
- `/sitemap.xml` is served as XML.
- CI builds.

## Phase 2b — Core portfolio identity

*Needs Adam's input.*

| Item | Backlog |
|---|---|
| Employer-content review | WEB-024 |
| Verified career, education, and certification data | Input for WEB-004 |
| About rebuild: career phases, credentials, capabilities, philosophy, connect | WEB-004 |
| Homepage identity hero, who/what/why band, three pillars, Connect CTA | WEB-003 |
| Nav regroup and relabel (URLs unchanged) | WEB-013, 019 |
| Person JSON-LD | WEB-027 |

**Estimated effort:** ~4–6 days, plus time to gather content.

**Exit criteria**

- A first-time visitor passes all seven 30-second questions on Home.
- About shows verified career and credentials.

## Phase 3 — Experience, discovery, and quality

| Item | Backlog |
|---|---|
| Project presentation model and status normalization; CTA label | WEB-012 |
| Themes, filter chips, related rails | WEB-020 |
| Photography & drones refinements: real video or hide tab, grid and lightbox, mapping grouping | WEB-022, (007) |
| Reduced-motion handling; timeline in-view highlight (optional) | WEB-026 |
| Playwright smoke plus axe suite (approval to add dev dependencies) | WEB-018 |
| Homepage data resilience | WEB-021 |
| Media off git to R2 | WEB-023 |
| Worker hygiene | WEB-028 |

**Estimated effort:** ~6–10 days.

## Phase 4 — Optional expansion

- **Flagship case studies** (3–4) built on the project model: Payment Gateway POC, CRT World, APT Commerce, and this site as a modernization story.
- **Writing and learning cadence** inside the existing Insights routes.
- **Prerendering for SEO** (WEB-008b), decided on Search Console data after Phase 2a.
- **Tooling upgrades and refactors** (WEB-029, 030), plus dead-code cleanup (WEB-015).

**Estimated effort:** open-ended. Pick items individually.

## Recommended first milestone

**Phase 2a.** It fixes verified defects with small, reviewable changes. It needs no content decisions, so Adam can gather the career data for 2b in parallel. It also adds the CI build gate that later phases depend on.

## Open questions

1. Verified career phases, education, and certifications. LinkedIn wasn't readable, so this data has to come from Adam.
2. Is "Director of Service Experience" current and publishable? What does "Joined June 2006" refer to?
3. Are the employer-named articles (Visa design system) approved for public use?
4. Should the nav use plain labels (Projects / Writing / How I Work) or keep APT terms (Labs / Proof / Principles / Insights)?
5. Which projects have public repos that can be linked?
6. Should `/assistant` be hidden until the LLM step is implemented?
7. Is a future consulting offer in scope (`docs/project-identity.md` mentions a "future consulting site")? If so, how visible should it be? The current brief says the site should not become a consulting site.
