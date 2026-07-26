---
title: "Generate Context Pack Prompt"
kind: "prompt"
domain: "distribution"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/prompts/generate-context-pack.md"]
---

# Generate Context Pack Prompt

Create a compact context pack from APT principles, standards, examples, and checklists.

## Instructions

1. Identify the pack purpose and audience.
2. Read the source files used to build the pack.
3. Preserve source-of-truth boundaries.
4. Keep the pack short enough for repeated agent use.
5. Include when to use it, when not to use it, required source reads, and related checklists.
6. Mark omitted or uncertain areas.

## Compression Rule

Compression is allowed for discovery, planning, summarization, and cross-repo alignment. Compression is not enough for security, compliance, payment handling, final validation, or exact code edits.

## Output

Return the pack content, source files used, and exact-source-read requirements.
