---
title: Generate APT Context Pack Prompt
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "prompt"
domain: "generate-context-pack"
source_paths: ["apt-principles/prompts/generate-context-pack.md"]
---

# Generate APT Context Pack Prompt

## Purpose

Use this prompt to create or refresh a compact context pack from APT principles, standards, examples, prompts, checklists, and references. It supports token-efficient discovery and cross-repo alignment while preserving exact-read requirements for final work.

The output should be a source map, not a doctrine rewrite. A generated pack tells agents what to load and when exact source reads are mandatory.

## Input Expectations

Provide the repo type or workflow, intended audience, canonical APT sources, related standards, relevant examples, required checks, target token budget if any, and known high-risk areas such as security, compliance, payments, auth, production deploys, or public claims.

## Prompt

```text
Generate an APT context pack for this repo type or workflow.

Context-pack purpose:
- Repo type or workflow:
- Audience:
- Target use:
- Token budget or compression goal:
- High-risk areas:

Canonical APT sources to consider:
- apt-principles-agents/apt-principles-agents.md
- apt-principles-agents/context-packs/README.md
- apt-principles-agents/standards/
- apt-principles-agents/checklists/
- apt-principles-agents/examples/
- apt-principles-agents/prompts/
- apt-principles-agents/references/

Instructions:
1. Create a source map with purpose, use cases, avoid cases, source docs, required checks, examples, prompts, exact-read requirements, and mandatory versus recommended artifacts.
2. Link to canonical sources instead of copying long doctrine blocks.
3. Mark where compression is allowed for discovery, planning, summarization, and cross-repo alignment.
4. Mark where exact source reads are mandatory before final edits or claims.
5. Do not make Headroom or any compression tool mandatory.

Return:
1. Context-pack markdown.
2. Source files referenced.
3. Exact-read requirements.
4. Validation or review steps.
5. Assumptions and omitted sources.
```

## Expected Output

- A reusable markdown context pack with frontmatter.
- Clear use and avoid cases.
- Links to governing docs, checklists, examples, prompts, and references.
- Explicit compression boundaries.
- Exact-read requirements for security, compliance, payments, auth, final validation, and code edits.

## Guardrails

- Do not summarize away required security, privacy, or validation context.
- Do not duplicate canonical doctrine when a link and short purpose statement are enough.
- Do not present compressed output as proof of compliance.
- Do not create empty placeholder packs.
- Keep the pack tool-neutral; Headroom or similar systems are optional consumers.

## Related Documents

- `../context-packs/README.md`
- `../standards/ai/token-efficiency-standard.md`
- `../examples/ai-agent/token-efficient-context-pack-example.md`
- `../ai-agent-framework.md`
- `../knowledge-system.md`
