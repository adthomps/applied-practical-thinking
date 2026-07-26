---
title: Token Efficient Context Pack Example
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "example"
domain: "ai-agent"
source_paths: ["apt-principles/examples/ai-agent/token-efficient-context-pack-example.md"]
---

# Token Efficient Context Pack Example

## Context

An agent repeatedly reviews APT AI-governance changes. The relevant source material is stable: `ai-agent-framework.md`, selected AI standards, the AI checklist, a few examples, and the validator rules.

## Problem

Loading the entire repository for every review wastes tokens and increases the chance that old examples, generated assets, or unrelated design-reference files distract the agent. Loading too little context creates the opposite problem: the agent guesses policy and misses approval rules.

## APT Principles Applied

- AI: deterministic inputs produce better outputs.
- Knowledge: canonical docs are linked instead of duplicated.
- Quality: validation commands and evidence requirements are included.
- Security: sensitive and unrelated data stays out of context.
- System Standards: reusable contracts reduce drift.

## Solution

Define a compact context pack:

```text
Context pack:
APT AI harness review

Purpose:
Review AI-governance changes against APT doctrine.

Canonical sources:
- ai-agent-framework.md
- standards/ai/agent-harness-standard.md
- standards/ai/model-routing-standard.md
- standards/ai/token-efficiency-standard.md
- standards/ai/repository-lifecycle-standard.md
- checklists/ai-agent-review-checklist.md
- references/ai-harness-contract.json

Source map:
- Root doctrine owns principles.
- standards/ai owns enforceable AI rules.
- prompts owns reusable review prompts.
- examples owns concrete adaptation patterns.
- references owns machine-readable contracts.

Validation:
npm run validate

Forbidden sources:
Generated public docs, build output, vendored assets, unrelated historical material.

Output:
Findings by severity, missing artifacts, validation status, residual risk.
```

## Example Structure

```text
Intent:
Reduce repeated context loading while preserving safety.

Owner:
APT doctrine maintainer or APT Agent context planner.

Inputs:
Task summary, canonical source map, changed files, validator rules.

Flow:
Source map -> targeted reads -> review prompt -> validation summary.

Artifacts:
Context pack, review output, validation evidence.

Validation:
The agent can cite canonical sources and validator output.

Risks:
Stale context pack, missing approval rules, too much summarized evidence.

Related APT docs:
standards/ai/token-efficiency-standard.md.
```

## Tradeoffs

A context pack needs maintenance when canonical docs move or standards are added. The payoff is repeatable AI work with less duplication, lower cost, clearer source boundaries, and fewer accidental references to unrelated material.

## Common Mistakes

- Copying full doctrine into the context pack instead of linking to it.
- Omitting approval or security rules because they seem obvious.
- Using a cached context pack after source files changed.
- Summarizing exact evidence that needs file, command, or line-level detail.
- Treating token efficiency as permission to starve the agent of required context.

## Implementation Notes

APT Agent can later manage context-pack freshness, source maps, and excerpt selection. This example defines the artifact shape and governance expectations, not the implementation.

## Related Documents

- `../../ai-agent-framework.md`
- `../../knowledge-system.md`
- `../../standards/ai/token-efficiency-standard.md`
- `../../standards/ai/verification-standard.md`
- `../../references/ai-harness-contract.json`
