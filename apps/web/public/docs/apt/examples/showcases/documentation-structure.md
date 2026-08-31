---
title: Documentation Structure Showcase
version: v2
last_updated: 2026-08-16
owner: APT
status: active
kind: "example"
domain: "showcases"
source_paths: ["apt-principles/examples/showcases/documentation-structure.md", "apt-agent-standards/showcases/docs/documentation-structure.md"]
---

# Documentation Structure

## Context

Use this showcase for README maps, setup guides, architecture docs, project context, operating runbooks, documentation sites, public APT pages, templates, examples, and local adoption folders where readers need to know what is canonical, current, planned, generated, local, or illustrative.

## Principle

APT knowledge-system work keeps one source of truth per topic and turns decisions into reusable artifacts. Documentation should link to canonical doctrine and keep project-specific exceptions visibly local.

## Use When

- A repo needs local APT adoption docs under `docs/apt/`.
- A public site imports or presents APT principles.
- A team is consolidating duplicated docs, prompts, or checklists.
- Contributors cannot quickly determine the current package manager, commands, runtime, deployment target, or operating workflow.

## Avoid When

- The content is a private scratch note that will not guide future work.
- The topic already has a canonical file and only needs a link.
- The document makes production or security claims without evidence.

## Problem

Documentation drift usually starts with helpful copies. Over time, copied rules diverge from canonical doctrine, examples lose their governing source, and agents cannot tell which file to trust.

## APT Principles Applied

- Knowledge System: learning and decisions become reusable artifacts.
- System Standards: documentation follows consistent structure.
- Release & Change Management: public docs require evidence before promotion.

## Bad Example

```text
docs/rules.md
docs/new-rules.md
docs/final-rules-revised.md
```

The structure suggests competing sources of truth and no clear owner.

## Better Example

```text
docs/apt/
  README.md
  adoption.md
  decisions/
  reports/
  references/

README.md                 # map and first-run entry point
docs/SETUP.md             # current package manager and setup commands
docs/OPERATING.md         # recurring operator workflows
docs/project-context.md   # target-owned local context and exceptions
```

The structure separates navigation, setup, operations, local context, adoption, decisions, evidence, and local reference copies.

## Solution

Name the canonical source, define the local purpose and status, link related checklists and prompts, and keep project-specific decisions in decision records. Public and generated pages should preserve source paths and generated notices so presentation aliases or copied outputs do not become doctrine names.

## Implementation Notes

Keep the README as a map and first-run entry point rather than duplicating the full manual. Use frontmatter where the repo contract expects it. Run link and validation checks before publishing. If a compressed context pack was used, cite exact source reads before final docs edits.

Update setup and operating documentation whenever package-manager commands, validation, installation, synchronization, detection, recovery, deployment, or recurring operator behavior changes. Document planned behavior as planned; do not phrase roadmap intent as current capability.

## Installed Distribution Assets

When the `documentation` manifest is installed into a target repository, use these local projections as review entry points:

- `.apt/context/documentation/README.md`
- `.apt/context-packs/apt-docs-pack.md`
- `.apt/checklists/documentation-checklist.md`
- `.apt/checklists/knowledge-system-checklist.md`

Installed documentation assets provide reusable structure. The target repository remains authoritative for its actual commands, architecture, runtime, integrations, deployment, operating procedures, and exceptions.

## Related Packs

- [APT Docs Context Pack](../../context-packs/apt-docs-pack.md)
- [APT Core Context Pack](../../context-packs/apt-core-pack.md)

## Tradeoffs

Strict source-of-truth structure can feel slower than copying text into every repo. The payoff is lower drift, clearer ownership, and easier agent review.

## Common Mistakes

- Copying doctrine into target docs without version or refresh rules.
- Mixing examples, local exceptions, and canonical standards in one page.
- Publishing public claims without validation evidence.

## Related Documents

- `../../knowledge-system.md`
- `../../standards/documentation/documentation-standards.md`
- `../../checklists/documentation-checklist.md`
- `../../templates/project-adoption-template.md`
