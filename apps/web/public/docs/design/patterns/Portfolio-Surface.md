---
docId: pattern-portfolio-surface
slug: patterns/portfolio-surface
title: Portfolio Surface
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-08-03
description: Public portfolio pattern for APT identity, proof-oriented project browsing, and stable Labs/Proof separation.
---

## Intent

Use the portfolio surface when APT needs to show public identity, current work, stable proof, and reusable patterns without turning the page into generic marketing.

The pattern is grounded in `apt-design-reference/ui_kits/portfolio`, which demonstrates the APT public shell: cosmic background, AptEmblem identity, route-aware navigation, Labs and Proof cards, detail views, and a compact footer.

## User Job

Visitors should be able to answer:

- What is Applied Practical Thinking?
- What is experimental versus proven?
- Which project or reference is worth inspecting next?
- What evidence supports each public claim?

## Anatomy

- APT top navigation with Home, Labs, Proof, Principles, Insights, and About.
- Hero identity section with AptEmblem, concise value statement, and one primary path.
- Labs area for experiments, concepts, mocks, prototypes, and live demos.
- Proof area for stable systems, shipped references, or maintained implementations.
- Project cards with status, domain, tags, date or freshness, short evidence-oriented description, and explicit next action.
- Detail view that carries source context, related patterns, status, and proof links.
- Compact footer with identity, useful routes, and public status/disclaimer language.

## Content Rules

- Hero copy should name the actual public offer or identity.
- Project cards should distinguish concept, prototype, demo, proof, and maintained system.
- Avoid decorative claims such as "innovative" or "next generation" unless backed by a public artifact.
- Use short paired identity statements sparingly, such as "Systems over screens. Decisions over demos."
- Public proof should link to evidence: docs, repo, demo, case study, validation report, or maintained system page.

## Visual Rules

- Use the dark-first APT shell with restrained cosmic treatment.
- Use blue for primary action, focus, links, active route, and high-frequency emphasis.
- Use teal only for support semantics such as tags, selected support states, charts, or success.
- Keep glow limited to the emblem, hero identity, or selected evidence moments.
- Cards frame individual projects only; do not wrap whole page sections in decorative cards.

## States

- Loading: preserve hero and grid dimensions; use skeleton cards for project collections.
- Empty: explain why no Labs or Proof items are available and provide the closest public route.
- Error: show a recoverable message with request/context ID where available.
- Stale: identify old project data with a freshness note rather than hiding it.
- External link unavailable: keep the card visible and show the current known status.

## Source Evidence

- `apt-design-reference/ui_kits/portfolio/README.md`
- `apt-design-reference/ui_kits/portfolio/app.jsx`
- `apt-design-reference/ui_kits/portfolio/components.jsx`
- `apt-design-reference/preview/cosmic-background.html`
- `apt-design-reference/preview/emblem.html`
- `apt-design-reference/preview/nav-header.html`
- `apt-design-reference/preview/nav-footer.html`
- `apt-design-reference/preview/card-anatomy.html`

## Common Mistakes

- Treating Labs and Proof as interchangeable portfolio cards.
- Hero copy that says what APT values but not what the visitor can inspect.
- Project cards without status, source, freshness, or next action.
- Overusing glass, glow, or accent color as decoration.
- Using a marketing landing-page structure for a proof-oriented portfolio.

## Validation

- Confirm route labels and active state match public navigation.
- Confirm every card has status, source context, and one clear next action.
- Confirm generated/public content was copied from authored source, not edited directly.
- Run design-doc validation and build after changing public pattern docs.
