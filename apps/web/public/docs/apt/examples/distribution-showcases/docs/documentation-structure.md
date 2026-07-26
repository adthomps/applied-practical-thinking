---
title: "Documentation Structure"
kind: "example"
domain: "distribution-showcases"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/showcases/docs/documentation-structure.md"]
---

# Documentation Structure

## Principle

Documentation should help a contributor find the current truth quickly and distinguish current behavior from planned work.

## Use When

Use this pattern for README updates, setup guides, architecture docs, project context, and operating runbooks.

## Avoid When

Avoid adding a new doc when an existing current doc can be updated without losing clarity.

## Bad Example

```text
README says npm install.
docs/setup.md says pnpm install.
docs/deploy.md references an old worker name.
```

## Better Example

```text
README links to docs/SETUP.md.
docs/SETUP.md lists the current package manager and commands.
docs/OPERATING.md owns recurring operator workflows.
docs/project-context.md owns local target-repo context.
```

## Implementation Notes

Keep the README as the map, not the whole manual. Update operating docs whenever command invocation, validation, install, sync, detection, or recovery behavior changes.

## Related Packs

Use `context/documentation/README.md`, `checklists/documentation-checklist.md`, and the `documentation` profile.
