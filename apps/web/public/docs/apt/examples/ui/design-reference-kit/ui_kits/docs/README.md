---
title: Docs UI Kit Reference
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# Docs UI Kit Reference

## Context

This vendored kit demonstrates a three-column APT doctrine browser with topbar, document tree, article body, callouts, code blocks, and on-this-page navigation.

## Problem

Documentation surfaces can hide provenance, flatten canonical structure, or omit the navigation aids needed for long-form doctrine.

## APT Principles Applied

- Design: structure over decoration.
- Knowledge: preserve source clarity and canonical paths.
- System Standards: stable navigation labels reduce drift.

## Solution

Open `index.html` to inspect the docs browser. It demonstrates grouped doc navigation, active source treatment, metadata chips, anchored sections, callouts, tables, code blocks, and previous/next navigation.

Use `../../../docs-principles-browser-pattern.md` as the canonical example that interprets this kit.

## Tradeoffs

The three-column pattern is strong for docs and standards, but should collapse carefully on small screens so source and table-of-contents access remain available.

## Common Mistakes

- Treating generated docs as source without source path or status.
- Wrapping every article section in decorative cards.
- Omitting code labels, anchors, metadata, or previous/next paths.

## Related Documents

- `../../../docs-principles-browser-pattern.md`
- `../../../navigation-layout-pattern.md`
- `../../../../../design.md`
