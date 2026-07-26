---
title: "Intent-Based UI Navigation"
kind: "example"
domain: "distribution-showcases"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/showcases/ui/intent-based-navigation.md"]
---

# Intent-Based UI Navigation

## Principle

Navigation should reflect what users are trying to accomplish, not the internal implementation or database model.

## Use When

Use this pattern for apps with dashboards, repeated workflows, operational tools, onboarding flows, or multi-step tasks.

## Avoid When

Avoid it when the UI is a simple static page or when a technical navigation label is required for an expert-only tool.

## Bad Example

Navigation labels mirror implementation details:

```text
Tables
Records
Sync Jobs
Payloads
```

## Better Example

Navigation labels mirror user intent:

```text
Customers
Orders
Reviews
Imports
```

## Implementation Notes

Start with the top user tasks. Group related screens by workflow, keep repeated actions reachable, and make empty, loading, error, and success states part of the navigation review.

## Related Packs

Use `context/ui/README.md`, `checklists/ui-checklist.md`, and the `ux-review` profile.
