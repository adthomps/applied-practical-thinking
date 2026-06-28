---
title: Intent-Based UI Navigation Showcase
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "example"
domain: "showcases"
source_paths: ["apt-principles/examples/showcases/intent-based-ui-navigation.md"]
---

# Intent-Based UI Navigation

## Context

Use this showcase for React/Vite apps, public sites, documentation browsers, dashboards, and generated prototypes where navigation should help users act by intent rather than browse a vague pile of pages.

## Principle

APT design asks interfaces to communicate purpose, state, and next action clearly. Navigation should reflect user goals, not only internal file structure.

## Use When

- Users arrive with different jobs, such as learn, compare, configure, review, or ship.
- A site has principles, examples, prompts, and references that need clear entry points.
- A prototype is being prepared for public showcase or repeated operator use.

## Avoid When

- The surface is a tiny single-purpose tool with one obvious flow.
- The team has not yet named the audience or primary tasks.
- Navigation labels would imply capabilities the product does not have.

## Problem

Weak navigation often mirrors implementation folders. Users then need to infer what matters, which artifact to trust, and where to go next. That creates support load and makes public demos look less mature than the underlying work.

## APT Principles Applied

- Design: navigation reflects audience intent and complete states.
- Knowledge System: reusable artifacts stay discoverable.
- Quality & Testing: navigation is validated with real user tasks.

## Bad Example

```text
Home | Docs | Stuff | More | Misc
```

The labels hide purpose, collapse unrelated artifacts, and provide no clue which path is mandatory for review.

## Better Example

```text
Learn Principles | Apply To Repo | Review Checklists | Browse Examples | Use Prompts
```

The labels map to user intent and make the source-of-truth relationship easier to inspect.

## Solution

Start with user intents, map each intent to the canonical artifact type, and make the first screen expose the most common next action. Keep secondary navigation available for source browsing, but do not make folder names the main mental model unless the audience is explicitly maintainers.

## Implementation Notes

For a docs or principles browser, pair each navigation item with the governing source and the required checklist. Validate desktop and mobile states, active route styling, keyboard navigation, empty states, and broken-link behavior.

## Related Packs

- [APT UI Context Pack](../../context-packs/apt-ui-pack.md)
- [APT Docs Context Pack](../../context-packs/apt-docs-pack.md)
- [APT Core Context Pack](../../context-packs/apt-core-pack.md)

## Tradeoffs

Intent-based navigation requires more product thinking than folder-based navigation. It can hide implementation details from maintainers, so source links and search should remain available.

## Common Mistakes

- Naming navigation after internal folders instead of user goals.
- Adding marketing labels that obscure what the page actually contains.
- Claiming a public showcase is ready without testing navigation tasks.

## Related Documents

- `../../design.md`
- `../../knowledge-system.md`
- `../../checklists/design-review-checklist.md`
- `../../examples/ui/navigation-layout-pattern.md`
