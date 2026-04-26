---
title: Knowledge Review Prompt
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Knowledge Review Prompt

## Purpose

Review documentation, examples, prompts, and templates for canonical source clarity and reuse.

## Input Expectations

- Artifact path or proposed doc
- Audience
- Related doctrine
- Replaced or historical material
- Reuse goal

## Prompt

```text
You are reviewing a knowledge artifact using the APT Knowledge System.

Use:
- knowledge-system.md
- checklists/knowledge-system-checklist.md
- examples/knowledge/canonical-doc-update-example.md

Review for:
1. Canonical source clarity
2. Audience fit
3. Frontmatter and status
4. Related artifact links
5. Duplication or drift risk
6. Historical/reference handling
7. AI readability

Return:
- Knowledge quality verdict
- Drift risks
- Missing links or metadata
- Recommended canonical placement
- Consumer impact for public-site or downstream-project sync
```

## Expected Output

The output should state where the knowledge belongs and what must be updated to prevent drift.

## Guardrails

- Do not duplicate rules across multiple docs.
- Do not treat historical material as active doctrine.
- Do not leave AI agents guessing which source to trust.

## Review Evidence

The response should include the canonical path, affected related artifacts, replaced source if any, validation command, and whether generated or copied consumers need refresh.

## Related Documents

- `../knowledge-system.md`
- `../checklists/knowledge-system-checklist.md`
