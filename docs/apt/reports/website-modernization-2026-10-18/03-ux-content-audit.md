---
title: APT Website Modernization Audit — UX and Content
version: v1
last_updated: 2026-10-18
owner: APT
status: draft
audience: internal
visibility: internal
source: manual
review_type: website-modernization-phase-1
---

# UX and Content Audit

This file consolidates the brand, UX, and portfolio workstreams (A, B and E). Each workstream was completed in sequence by one reviewer, and duplicate findings were merged. Backlog IDs refer to `06-modernization-backlog.md`.

## 1. Identity and messaging: the 30-second test

The test was run against the live homepage at desktop and 375 px. See `static/screenshots/home-desktop.jpg` and `home-mobile-375.jpg`.

| Question a first-time visitor should answer | Result | Evidence |
|---|---|---|
| What is APT? | **Partial** | "A personal portfolio and demonstration brand…" (`siteConfig.description`). "Demonstration brand" reads as corporate |
| Who is behind it? | **Fail** | No name on the homepage. The hero avatar is a placeholder letter "A", and the h1 is "APT" |
| What professional experience is represented? | **Fail** | No career content on the homepage, and none in the repo |
| What types of projects are showcased? | Pass | Featured work cards: CRT World, Payment Gateway Signup, articles |
| Why do the projects exist? | **Partial** | The Think · Build · Prove · Share loop explains the method, not the motivation |
| How to explore further? | Pass | Explore Labs / Read Insights CTAs, plus core-area cards |
| How to connect professionally? | **Fail** | LinkedIn only in the footer and on About. No contact CTA |

On mobile, the entire first viewport is the acronym, a placeholder avatar, a tagline, and two buttons. Nothing personal appears above the fold.

**Assessment (Verified).** The homepage tells the story `Principles → Labs → Proof → Insights`, which is a methodology. The intended chain is `Professional experience → Technical capability → Practical experimentation → Personal curiosity`. It isn't established, because the first and last links in that chain are missing from the homepage.

**Generic or repetitive language (Verified)**

- "Systems over screens. Decisions over demos." appears in the hero, About's principles, and the footer description.
- "Demonstration brand", "operational portfolio and reference space", and "System note: Built as a practical, evolving operational reference" add abstraction without adding meaning.
- The About short bio ("Crafting digital experiences through code and capturing moments through the lens. Welcome to my creative journey.") is generic, and its tone is different from the rest of the site.

**Recommended positioning (Strategic, WEB-003).** Use the existing hero slots:

- **Eyebrow:** Applied Practical Thinking
- **H1:** *Experience. Curiosity. Practical Innovation.*
- **Support:** "Applied Practical Thinking is where professional experience meets curiosity, technology, and hands-on exploration." Then a one-line "I'm Adam Thompson — [verified role summary] in payments, commerce, and customer experience."
- **Three pillar cards:** *Professional experience* (→ About/career), *Building & experiments* (→ Labs/Proof), *Exploring* (→ Photography & drones).
- Keep "Systems over screens…" as the APT principle line on About and Principles. It is a good method statement, but it shouldn't serve as the site's identity.

## 2. Audiences

| Audience | What they need | Currently served? |
|---|---|---|
| Recruiters / hiring managers | Who, career arc, credentials, contact | No |
| Professional peers (payments/CX) | Domain expertise, writing, case studies | Partly: payments articles and labs exist but aren't grouped |
| Developers / collaborators | Projects, stack, source, demos | Partly: no repo links, unclear maturity |
| Creative / outdoor visitors | Photography, drone, maps | Weakly: gallery is buried, with placeholder videos |
| APT practitioners | Principles, design doctrine | Yes, very thoroughly |

**Balance (Verified structure, rough estimate of proportions).** There are 22 primary-nav entries (6 top-level, 16 dropdown children). Twenty are APT methodology or technical content; the other two are Home and About. There are no career entries. Photography appears only as a utility link. The target is about 60/40 professional to personal/technical/creative.

## 3. About and career (WEB-004)

**Current state (Verified, `routes/About.tsx`, `data/site.ts` `authorConfig`)**

- Shows the name, the title "Director of Service Experience", the location, "Joined June 2006" (joined what is unclear), a rotating role word (Engineer / Photographer / Product Leader / Systems Thinker), a generic bio, three principles, a "Site Snapshot" stats card, an Outside of Work card, and social links.
- **Missing:** career evolution, leadership scope, education, certifications, skills/capabilities, and an APT origin story.

**Timeline options**

| Option | Fit | Effort | Verdict |
|---|---|---|---|
| 1. Concise chronological list | Clear, but flat. Doesn't show evolution | S | Acceptable fallback |
| 2. Expandable career cards | Detail on demand, but heavier interaction | M | Over-built for the data volume |
| **3. Career phases with milestone highlights** | Shows evolution (e.g. engineering → payments → service experience → independent building). Reuses `AptCard`/`AptTag`. Works as a vertical list on mobile | **S–M** | **Recommended** |
| 4. Dedicated career page | Adds navigation. Splits the About story | M | Not justified yet |

**Recommended About order**

1. Hero: name, verified role, one-line identity.
2. "How I got here" career phases: 3–5 phases, each with years, role or theme, and 1–2 verified highlights.
3. Education & certifications (a compact list).
4. Capabilities: payments & commerce, CX/service, platform modernization, AI-assisted development.
5. APT philosophy (the existing principles card).
6. Outside work: photography, drones, mapping, linked to the gallery.
7. Connect: LinkedIn, GitHub, Flickr.

Move the "Site Snapshot" counts card lower or drop it. It describes the website, not the person.

**Data that must be supplied or verified by Adam (Blocking for WEB-004)**

- Employers, titles, and date ranges per phase.
- Education (institutions, degrees, years).
- Certifications (names, issuers, years).
- Approved, public-safe highlights. No confidential employer metrics.
- Confirmation that the current title "Director of Service Experience" is accurate and publishable.
- What "Joined June 2006" refers to.

LinkedIn could not be read (sign-in wall), and nothing has been inferred.

## 4. Projects and portfolio (WEB-012, WEB-020)

**Current state (Verified)**

- Lab front matter has `problem`, `type`, `status`, `technologies`, `platforms`, `tags`, `links{demo,figma,lovable,repo}`, and `thumbnail`. Live Labs shows 12 items with 5 filter facets (`static/screenshots/labs-mobile-375.jpg`).
- **No lab or demo has a `repo` link populated.** The field is empty in all 16 lab and demo files.
- There are no "why it exists" or "what I learned" fields.
- **Status values in use:** `active`, `live`, `working-proof`, `draft`, and `"draft"` (quoted). Maturity isn't legible to visitors.
- **The card CTA reads "Open proof"** for experiment-type items (`components/apt/LabCard.tsx:42`). Proof is a separate concept, so the label is confusing.
- Payments expertise is spread across `labs/payment-gateway-*`, `demos/payment-gateway-poc-v1`, `demos/anet-*` (drafts), and payments blog posts. Nothing groups them as a theme.

**Proposed light project model.** No case study is required. These are optional front-matter additions, rendered on cards and detail pages:

| Field | Card | Detail |
|---|---|---|
| `summary` (the idea, one line) | ✓ | ✓ |
| `why` (why it exists, one or two sentences) | — | ✓ |
| `built` (what was built) | — | ✓ |
| `technologies` (existing) | ✓ (top 3) | ✓ |
| `learned` (2–4 bullets) | — | ✓ |
| `status`, normalized to `experimental · active · live · archived` | ✓ | ✓ |
| `theme`, one of: payments-commerce, ai-development, platform-modernization, photography-mapping, creative | filter | ✓ |
| `links.repo` / `links.demo` (existing) | ✓ icons | ✓ |

**Flagship candidates** (best evidence of professional plus technical capability): Payment Gateway POC v1 (live), CRT World (live), APT Commerce / Health Compass (working-proof), and the Portfolio Website itself as a platform-modernization story.

## 5. Information architecture

See `05-proposed-site-structure.md`.

In short: keep every existing URL, regroup and relabel the nav around identity, and use themes for cross-links instead of new pages.

## 6. Visual design and interaction

**Strengths (Verified)**

- Consistent dark palette from semantic tokens.
- Coherent card system, comfortable reading measure on About and article pages, and system font stack.
- Visible focus ring on header links (`outline: auto 2px`, checked after a real Tab key press).

**Issues**

| ID | Finding | Type | Evidence |
|---|---|---|---|
| UX-1 | Seven index pages have no `<h1>`. The page title renders as `<h2>` because `components/apt/SectionIntro.tsx:35` hardcodes `h2` | Verified | Live DOM on `/labs`, `/proof`, `/principles`, `/insights`, `/design`, `/about/visual-gallery`, `/assistant` → WEB-005 |
| UX-2 | Horizontal scroll at 768 px from the header nav | Verified | `about-tablet-768-overflow.jpg` → WEB-006 |
| UX-3 | No skip link | Verified | DOM search → WEB-005 |
| UX-4 | 404 page has no site chrome or `<main>` | Verified | `/nope-404` live → WEB-010 |
| UX-5 | The rotating role text (`AnimatedRole`) and `CosmicBackground` are decorative motion. Some reduced-motion CSS exists in the bundle, but whether these JS-driven animations respect `prefers-reduced-motion` was not verified | Likely | WEB-026 |
| UX-6 | Ten interactive elements on mobile Home are smaller than 24 px in one dimension | Likely (needs review; may be inline text links, which are exempt) | JS measurement |
| UX-7 | Internal links shown with an external-link icon or opened in a new tab (About gallery button, footer gallery link) | Verified | `About.tsx` uses `ExternalLink` icon. `AptFooter.tsx` → WEB-019 |
| UX-8 | Dark-only theme: light tokens exist but are never applied, and `prefers-color-scheme` is ignored | Verified | `index.css` forces `dark`. Documented as intentional on the DesignSystem page → WEB-025 (keep) |

**Purposeful interaction opportunities.** None is decorative only.

- **Career phases:** a static vertical timeline. An optional in-view highlight of the current phase aids orientation. Must respect reduced motion.
- **Theme filter chips** on Labs and Insights. These extend the existing `ContentFilters` component.
- **Progressive disclosure on project detail:** "Why / Built / Learned" sections. A collapsible is only worth it when content is long.
- **Photography:** a right-sized grid with a lightbox. Group drone images with their mapping work.
- **"Related" rails** on detail pages, matching on theme.

## 7. Accessibility summary

**Verified issues:** missing h1 on index pages, no skip link, 404 without landmarks, tablet overflow.

**Not tested:** colour contrast beyond the existing `apt-contrast-contract.test.ts`, screen-reader announcement on SPA route change, dropdown keyboard operation, and the gallery lightbox.

Recommended: a one-off axe and keyboard pass in Phase 3 (WEB-018).

## 8. Sensitive content check (WEB-024)

Published articles name **Visa** ("Designing AI-Ready Interfaces with Visa Product Design System", `content/blog/03-…`, `content/guides/03-…`, `content/podcasts/01-…`). Demos also reference Authorize.net (drafts).

Adam should confirm that these are public-safe, compliant with employer policy, and not suggestive of official endorsement. This is a content-governance check, not a defect claim.
