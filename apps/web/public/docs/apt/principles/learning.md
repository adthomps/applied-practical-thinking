---
title: Learning Principle
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
---

# Learning

**Principle:** Convert decisions and outcomes into durable, reusable, versioned knowledge.

The knowledge system prevents decisions, standards, and implementation lessons from becoming hidden memory.

## Core Rules

- Document once, reuse everywhere — each topic has one canonical source.
- Keep knowledge versioned in source control.
- Update related examples, prompts, and checklists when doctrine changes.
- Separate internal runbooks, AI agent instructions, and public documentation by audience.
- Convert incidents, failed validation, support findings, and release outcomes into reusable artifacts or explicit non-actions.
- Preserve provenance, status, confidence, retention, and audience when knowledge is used by retrieval or AI systems.
- Avoid duplication — duplicate guidance creates drift.

## Knowledge Artifact Types

- Principle docs
- Examples
- Checklists
- Prompts
- Templates
- References
- Runbooks
- Decision records
- Project profiles
- Release notes
- Ingest reports
- Query responses
- Feedback labels

## Required Artifacts

- Canonical doc for each topic
- Related examples, checklists, and prompts updated when doctrine changes
- Decision log entry for durable changes
- Historical-source note when replacing older guidance

## Enforcement Points

- Same guidance described differently in multiple places requires consolidation.
- Doctrine changes without corresponding example/checklist/prompt updates are incomplete.
- AI-ingestible docs must be concise, structured, and source-aware.
- Incident learning is incomplete until the durable artifact or accepted non-action is linked.

## Canonical Doc

`knowledge-system.md` — full principles, knowledge contracts, artifact types, runtime contracts, and AI prompt.

## Related Build Kit

- `checklists/knowledge-system-checklist.md`
- `examples/knowledge/canonical-doc-update-example.md`
- `prompts/knowledge-review-prompt.md`
- `references/knowledge-contracts.json`
