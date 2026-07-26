---
title: Model Routing Decision Example
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "example"
domain: "ai-agent"
source_paths: ["apt-principles/examples/ai-agent/model-routing-decision-example.md"]
---

# Model Routing Decision Example

## Context

A future APT Agent workflow needs to review a pull request for documentation drift, changed validation commands, and AI-governance risk. The workflow should work across local LLMs, Codex, GitHub Copilot, Claude, ChatGPT, and future platforms without naming a specific model in doctrine.

## Problem

If the workflow always chooses the most capable remote model, it may waste cost, increase latency, and send unnecessary context externally. If it always chooses a small local model, it may miss architecture, security, or cross-document reasoning issues.

## APT Principles Applied

- AI: routing starts with smallest sufficient capability.
- Knowledge: source maps and canonical docs reduce context loading.
- Security: data sensitivity controls external calls.
- Quality: output requires validation evidence.
- Operations: routing decisions should be inspectable.

## Solution

Use capability tiers instead of model names:

```text
Task:
Review documentation drift in an APT repo.

Default route:
Deterministic local search and validator first.

Low-capability AI:
Summarize changed docs and classify APT layers when source files are small and low sensitivity.

Higher-capability AI:
Use when changes span multiple lifecycle areas, include architecture/security tradeoffs, or require synthesis across many docs.

Human approval:
Required when the workflow recommends doctrine ownership changes, security exceptions, production-impacting guidance, or standards distribution changes.

Forbidden:
Send secrets, private customer data, production credentials, or target-owned local context externally without approval.
```

## Example Structure

```text
Intent:
Choose a sufficient AI capability for repository review.

Owner:
APT Agent routing policy owner.

Inputs:
Task type, risk, data sensitivity, context size, local tool availability, cost budget, approval needs.

Flow:
Deterministic check -> local/low-cost capability -> higher capability -> human approval.

Artifacts:
Routing decision record, validation summary, residual risk.

Validation:
Compare findings with validator output, changed files, and human review.

Risks:
Over-escalation, under-escalation, sensitive data exposure, unreviewable routing.

Related APT docs:
standards/ai/model-routing-standard.md.
```

## Tradeoffs

Capability routing requires policy work up front. The benefit is that teams can change concrete model providers without rewriting doctrine. Small tasks stay fast and inexpensive, while ambiguous or high-risk tasks have a clear escalation path.

## Common Mistakes

- Encoding a current model name as a permanent doctrine rule.
- Sending full-repo context to an external model before using local search.
- Treating a larger model as a replacement for human approval.
- Using local AI for high-risk synthesis without independent verification.
- Ignoring provider failure and degraded fallback behavior.

## Implementation Notes

APT Agent can map capability tiers to concrete tools in local configuration. `apt-principles-agents` should keep only the routing standard, decision shape, and evidence expectations.

## Related Documents

- `../../ai-agent-framework.md`
- `../../standards/ai/model-routing-standard.md`
- `../../standards/ai/local-first-ai-standard.md`
- `../../standards/ai/token-efficiency-standard.md`
- `../../prompts/model-routing-review-prompt.md`
