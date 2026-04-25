---
title: Knowledge System Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Knowledge System Checklist

## Scope

Use this checklist when adding, changing, replacing, or publishing doctrine, examples, prompts, templates, references, project profiles, or operational knowledge.

It protects the source-of-truth model for both humans and AI agents. Run it when a change could create drift between canonical guidance, copied project docs, generated public views, or historical source material kept outside this package.

## Required Checks

- [ ] Canonical source is identified.
- [ ] Audience is clear: public, internal, support, AI, or mixed.
- [ ] Frontmatter is present and current.
- [ ] Related docs, examples, prompts, or checklists are linked.
- [ ] Duplicated guidance is removed or intentionally cross-referenced.
- [ ] Historical/reference content is not treated as active doctrine.
- [ ] AI-ingestible docs are structured with stable headings.

## Failure Conditions

- Same rule is redefined in multiple places.
- A new artifact has no owner, status, or version.
- Historical content is referenced as active guidance.
- AI agents must infer which source is canonical.

## Evidence Required

- Canonical doc path.
- Related artifact links.
- Drift or historical-source notes when replacing older material.
- Validation result.
- Public-site or downstream-project consumers affected by the change.
- Decision record when source-of-truth ownership changes.

## Pass Standard

The change has one canonical home, related artifacts point to it, copied or generated consumers have a refresh path, and historical material is clearly non-canonical. If two active files now teach the same rule differently, the checklist fails.

## Related Documents

- `../knowledge-system.md`
- `../examples/knowledge/canonical-doc-update-example.md`
- `../prompts/knowledge-review-prompt.md`
