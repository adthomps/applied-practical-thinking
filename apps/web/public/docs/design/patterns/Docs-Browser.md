---
docId: pattern-docs-browser
slug: patterns/docs-browser
title: Docs Browser
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-08-03
description: Documentation browser pattern for provenance-heavy APT doctrine, source clarity, and long-form navigation.
---

## Intent

Use the docs browser pattern when APT needs to publish doctrine, standards, reference contracts, or long-form guidance where provenance and navigation matter.

The pattern is grounded in `apt-design-reference/ui_kits/docs`, which demonstrates a three-column doctrine browser with top navigation, grouped document tree, article body, callouts, code blocks, metadata, and on-this-page navigation.

## User Job

Readers should be able to:

- understand whether a document is doctrine, reference, example, checklist, or generated mirror
- see the source path, status, version, and freshness of the document
- navigate nearby doctrine without losing context
- scan long-form content through headings, callouts, tables, and code blocks
- distinguish canonical source from public generated output

## Anatomy

- Top navigation with product/site identity and search affordance.
- Left document tree grouped by doctrine area or task.
- Main article region with metadata, title, summary, sections, callouts, tables, and code examples.
- Right on-this-page navigation for long documents.
- Previous/next navigation or related documents block.
- Source/provenance row that names canonical owner, generated status, version, and source path.

## Content Rules

- Preserve source clarity. Do not hide whether content is canonical, mirrored, generated, or deprecated.
- Keep article headings descriptive and scannable.
- Use metadata chips for status, version, audience, and source owner when useful.
- Callouts should explain risk, exception, migration status, or validation requirements.
- Code blocks need language/file labels and copy behavior where supported.

## Responsive Behavior

- Desktop can use a three-column layout.
- Tablet may collapse the right table of contents before the document tree.
- Mobile should keep document navigation and page anchors accessible through a drawer, sheet, or compact disclosure.
- Anchor links, focus order, and back/forward navigation should remain predictable.

## States

- Loading: preserve layout regions and show article skeletons.
- Empty: explain whether the source has no documents, the filter is empty, or content is not published.
- Error: name the document or route that failed and provide a retry or fallback route.
- Deprecated: keep the page reachable, but direct readers to canonical replacement.
- Generated mirror: show source owner and warning against editing generated output.

## Source Evidence

- `apt-design-reference/ui_kits/docs/README.md`
- `apt-design-reference/ui_kits/docs/app.jsx`
- `apt-design-reference/preview/code-block.html`
- `apt-design-reference/preview/pagination.html`
- `apt-design-reference/preview/nav-header.html`
- `apt-design-reference/preview/tabs.html`
- `apt-design-reference/preview/alerts-inline.html`

## Common Mistakes

- Treating generated public docs as authored source.
- Flattening doctrine into one ungrouped article list.
- Omitting source paths, document status, version, or previous/next routes.
- Wrapping every article section in a decorative card.
- Hiding search and navigation on small screens instead of adapting them.

## Validation

- Confirm source path, status, version, and audience metadata render when available.
- Confirm heading anchors and on-this-page navigation match document content.
- Confirm public docs are regenerated from authored source.
- Run design-doc validation and build after changing docs browser behavior or docs manifest entries.
