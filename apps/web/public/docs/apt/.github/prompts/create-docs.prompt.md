---
description: "Guided prompt for creating a new APT-structured documentation artifact: principle doc, checklist, standard, template, example, or prompt. Enforces frontmatter, required sections, and cross-reference contracts."
---

# Create Docs (APT)

## Purpose
Guide creation of a new APT-structured documentation artifact that meets structure contracts, frontmatter requirements, and cross-reference standards enforced by `scripts/validate-apt-principles.mjs`.

## Input Expectations
Provide:
- Artifact type: principle doc / checklist / standard / template / example / prompt
- Topic or domain (for example: release readiness, data quality, AI agent behavior)
- Canonical source doc(s) this artifact enforces or references
- Target folder path

If inputs are missing, state assumptions explicitly.

## Prompt
```text
You are creating a new APT documentation artifact.

Artifact type: [principle doc / checklist / standard / template / example / prompt]
Topic: [INSERT TOPIC]
Domain: [APT layer — Thinking / Design / Architecture / Security / AI / Execution / Knowledge / Operations / Quality / Release / System Standards]
Target path: [INSERT PATH]
Canonical source(s): [INSERT LINKS TO apt-principles DOCS]

Follow these structure contracts:

1. Frontmatter (required for all types):
   ---
   title: [TITLE]
   version: v1
   last_updated: [YYYY-MM-DD]
   owner: APT
   status: draft
   ---

2. Required sections by type:
   - Principle doc: Overview, Core Principles, Standards and Required Artifacts, Related Artifacts, Summary
   - Checklist: Purpose, Pre-conditions, Gates (each gate must be yes/no with evidence path), Sign-off
   - Standard: Purpose, Rules, Examples, Non-goals
   - Template: Purpose, Usage, Template body with [PLACEHOLDER] markers
   - Example: Context, Pattern, Implementation, Validation, Related Docs
   - Prompt: description (frontmatter only), Purpose, Input Expectations, Prompt block, Expected Output, Related Documents

3. Cross-reference contract:
   - Link to the canonical principle doc this artifact enforces.
   - Link to the checklist or prompt that activates this artifact (if applicable).
   - Use relative paths from the artifact's location.

4. No duplication rule:
   - Summarize and link; do not restate doctrine from canonical sources.
   - If a principle needs restating, it belongs in the canonical doc, not here.

Return the complete artifact ready to write to [TARGET PATH].
```

## Expected Output
- Complete artifact with valid frontmatter
- All required sections present
- Cross-references using correct relative paths
- No duplicated doctrine text

## Related Documents
- [scripts/validate-apt-principles.mjs](../../scripts/validate-apt-principles.mjs)
- [templates/principle-doc-template.md](../../templates/principle-doc-template.md)
- [templates/checklist-template.md](../../templates/checklist-template.md)
- [templates/prompt-template.md](../../templates/prompt-template.md)
