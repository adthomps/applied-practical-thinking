---
title: Model Routing Review Prompt
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "prompt"
domain: "model-routing-review-prompt"
source_paths: ["apt-principles/prompts/model-routing-review-prompt.md"]
---

# Model Routing Review Prompt

## Purpose

Review an AI workflow's model routing policy for capability sufficiency, local-first execution, cost awareness, data sensitivity, fallback behavior, and human escalation. Use this when a prompt, application route, agent workflow, or APT Agent blueprint proposes repeatable AI execution.

## Input Expectations

- Task or workflow description.
- Current or proposed routing policy.
- Data sensitivity and privacy boundary.
- Required reasoning, modality, latency, and context size.
- Local tools or local models available.
- Cost or throughput constraints.
- Failure and fallback behavior.
- Human approval needs.

## Prompt

```text
You are reviewing model routing using APT AI standards.

Canonical sources:
- ai-agent-framework.md
- standards/ai/model-routing-standard.md
- standards/ai/local-first-ai-standard.md
- standards/ai/token-efficiency-standard.md
- standards/ai/verification-standard.md
- references/ai-harness-contract.json

Evaluate:
1. Deterministic first: Can local non-AI tools answer part or all of the task?
2. Smallest sufficient capability: Is the default capability appropriate for task complexity and risk?
3. Local-first: Can local execution meet quality, privacy, latency, and cost needs?
4. Escalation: Are triggers defined for ambiguity, low confidence, security sensitivity, missing context, or failed validation?
5. Data boundary: Is sensitive data kept local, redacted, or explicitly approved before external use?
6. Token efficiency: Is context loaded through source maps, context packs, targeted excerpts, or prompt reuse?
7. Verification: What evidence proves the routed model output is correct enough for the use case?
8. Human approval: Which decisions must stop for a human rather than escalating to a larger model?

Return:
- Routing findings by severity.
- Recommended default capability tier.
- Escalation and fallback rules.
- Data-boundary corrections.
- Verification requirements.
- Residual risk.
```

## Expected Output

The output should avoid vendor-specific model names unless they are part of the provided local implementation context. It should describe routing in abstract capability tiers and name when target repositories or APT Agent may map those tiers to concrete tools.

## Guardrails

- Do not recommend the largest available model by default.
- Do not recommend external AI for secrets, production credentials, private customer data, or regulated data without an approved boundary.
- Do not treat local-first as local-only when remote capability is genuinely required.
- Do not turn routing guidance into `apt-principles-agents` implementation code.
- Do not let model escalation replace human approval for high-risk decisions.

## Related Documents

- `../ai-agent-framework.md`
- `../standards/ai/model-routing-standard.md`
- `../standards/ai/local-first-ai-standard.md`
- `../standards/ai/token-efficiency-standard.md`
- `../examples/ai-agent/model-routing-decision-example.md`
- `../references/ai-harness-contract.json`
