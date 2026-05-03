---
title: APT Knowledge System (Learn & Scale)
version: v1
last_updated: 2026-05-01
owner: APT
status: draft
---

# APT Knowledge System

## Overview

APT Knowledge System defines how documentation, examples, decisions, and reusable patterns are captured, maintained, and used by humans and AI agents.

Knowledge answers:

- What is canonical?
- Who is the audience?
- How is knowledge reused?
- How is drift prevented?
- What should AI agents read before acting?

## Purpose

The knowledge system converts work into reusable understanding. It prevents decisions, standards, and implementation lessons from becoming hidden memory.

## Core Principles

### 1. Document once, reuse everywhere

Each topic should have one canonical source and references should point to it.

### 2. Separate internal and external knowledge

Public docs, internal runbooks, and AI agent instructions may overlap, but they serve different audiences.

### 3. Structure knowledge for humans and AI

Use clear headings, frontmatter, examples, and stable paths.

### 4. Keep knowledge versioned

Important doctrine, prompts, examples, and standards belong in version control.

### 5. Avoid duplication

Duplicate guidance creates drift unless there is a sync or validation process.

## Standards / Rules

- Use frontmatter for canonical docs and build-kit files.
- Keep historical exports out of active guidance unless explicitly linked.
- Update related examples, prompts, and checklists when doctrine changes.
- Record decisions that alter architecture, security, release, or AI behavior.
- Keep AI-ingestible docs concise, structured, and source-aware.
- Preserve canonical source paths when public sites use shorter route labels or legacy aliases.

Canonical doctrine uses `knowledge-system` for this layer. Public routes may use shorter labels such as Knowledge, but aliases such as `knowledge-engine` should point back to `knowledge-system.md` rather than becoming a second doctrine source.

## Required Artifacts

- Canonical doc
- Related examples
- Related checklists or prompts
- Decision log entry for durable changes
- Historical-source note when replacing older guidance

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

## Runtime Knowledge Contracts

When APT knowledge is used by a search, retrieval, assistant, or public documentation system, it should preserve source, audience, status, and confidence. The portable baseline contracts are:

- `KnowledgeChunk` for source-aware chunks
- `IngestReport` for ingestion and indexing outcomes
- `QueryResponse` for grounded responses with sources and confidence

Project profiles are also knowledge artifacts. They bridge real implementation, portfolio storytelling, and reusable learning for projects such as `apt-coach`, `apt-dream-to-reality`, `apt-novel-reviewer`, `apt-payment-rpc-api`, `crt-world`, and future APT projects.

## Good Example

A new API standard is added to `system-standards.md`, demonstrated in `examples/api/rest-api-example.md`, enforced in `checklists/api-standards-checklist.md`, and referenced by `prompts/api-review-prompt.md`.

## Bad Example

The same API rule is described differently in a README, a prompt, a one-shot file, and a route comment.

## AI Prompt Example

```text
Turn these project learnings into APT knowledge artifacts.

Input:
- Decision or incident:
- Affected doctrine:
- Audience:
- Reuse goal:

Return:
1. Canonical doc update
2. Example/checklist/prompt updates
3. Historical-source or drift notes
4. Links to related artifacts
```

## Related Checklists

- `checklists/knowledge-system-checklist.md`

## Related Examples

- `examples/knowledge/canonical-doc-update-example.md`

## Related Prompts

- `prompts/knowledge-review-prompt.md`

## Related References

- `references/knowledge-contracts.json`
- `references/project-profile.schema.json`

## Related Documents

- `apt-principles.md`
- `ai-agent-framework.md`
- `operations-support.md`

## Summary

Knowledge turns decisions and outcomes into durable, reusable, versioned assets.
