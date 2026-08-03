---
docId: pattern-insights-surface
slug: patterns/insights-surface
title: Insights Surface
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-08-03
description: Content browsing pattern for APT articles, guides, podcasts, case studies, filters, metadata, and reading views.
---

## Intent

Use the insights surface when APT needs to organize public learning material such as articles, guides, podcasts, case studies, design reviews, or proof narratives.

The pattern is grounded in `apt-design-reference/ui_kits/insights`, which demonstrates filtered browsing, content cards, cover treatments, metadata, and reading/detail views that preserve APT's calm technical voice.

## User Job

Readers should be able to:

- choose a content type or topic without learning internal taxonomy
- understand what each item teaches or proves
- see format, date, tags, and related concepts before opening
- move from browsing to reading without losing context
- distinguish learning material from product proof or doctrine

## Anatomy

- APT navigation with Insights as the active section.
- Intro section that explains the content surface in one or two precise sentences.
- Filter bar using content types or decision-useful topics.
- Content cards with type, date/freshness, title, short evidence-oriented summary, and tags.
- Cover treatment that supports scanning but does not carry the only meaning.
- Reading/detail view with back navigation, metadata, related content, and source context.
- Empty and no-results states inside the content region.

## Content Rules

- Summaries should say what the reader will learn, decide, or inspect.
- Tags must support browsing decisions; do not create decorative tags.
- Cover imagery should reinforce the topic without competing with the title and metadata.
- Do not write promotional content where the job is learning or evidence.
- Keep content type labels stable across cards, filters, and detail pages.

## Filter Rules

- Use a small set of durable filter categories.
- Keep the active filter visually clear with primary/selected token roles.
- Preserve filter state in the URL when shareability or back/forward navigation matters.
- Show no-results guidance that explains the filter condition and offers a recovery action.

## Asset Decision

No binary asset copy is required for this split pass. `profile.jpg` already exists in the public app, and public content cover assets for the relevant blog treatments are already represented under `apps/web/public/content/blogs/` as generated/public assets.

Future asset migration should happen only when an image is source-worthy, has clear provenance, and has an authored source location. Do not treat generated public assets as the editable origin.

## Source Evidence

- `apt-design-reference/ui_kits/insights/README.md`
- `apt-design-reference/ui_kits/insights/app.jsx`
- `apt-design-reference/ui_kits/insights/components.jsx`
- `apt-design-reference/preview/imagery.html`
- `apt-design-reference/preview/tags.html`
- `apt-design-reference/preview/tabs.html`
- `apt-design-reference/assets/profile.jpg`
- `apt-design-reference/assets/blog-*.webp`

## Common Mistakes

- Using cover imagery as the only information source.
- Creating tags that do not map to reader decisions.
- Mixing product demos, proof, doctrine, and learning without status labels.
- Writing marketing blurbs instead of evidence-oriented summaries.
- Letting filters hide all content without an inline recovery state.

## Validation

- Confirm each card has type, title, summary, date or freshness, and useful tags.
- Confirm active filters and no-results states are keyboard accessible.
- Confirm generated public assets are not edited as source.
- Run content index generation, design-doc validation, and build after changing public content structure.
