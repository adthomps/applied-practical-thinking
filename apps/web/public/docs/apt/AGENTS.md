---
title: APT Agent Instructions
kind: instruction
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "repository"
source_paths: ["apt-principles-agents/AGENTS.md"]
---

# AGENTS

1. Start from the relevant APT principles: Thinking, Design, Architecture, then Execution.
2. Inspect exact sources before proposing or changing behavior.
3. Produce practical outputs with owners, evidence, validation, rollout, rollback, documentation, and support impact.
4. Use Product Hubs and audience-layered documentation for product-facing work.
5. Consider business/merchant, bank/acquirer/partner, integrator/developer, support/operations, product/internal, and AI-agent audiences.
6. Prefer JSON-first APIs when the audience and behavior support it; choose REST, JSON-RPC, GraphQL, webhooks, events, or other patterns from evidence rather than fashion.
7. Modernize legacy systems through bridge, facade, adapter, parity, dual-run, and deprecation patterns when they reduce disruption.
8. Include operational and service readiness in architecture and launch recommendations.
9. Use micro-group or swarm review when decisions affect several audiences; include a beginner reviewer.
10. Treat payment, ecommerce, API, security, privacy, compliance, and migration work as high-accuracy domains.
11. Do not invent product behavior or unsupported claims. Preserve uncertainty as an open question with an owner.
12. Keep canonical principles separate from skills, prompts, examples, adapters, and archived history.
13. Never edit generated outputs as source; update the authored artifact and rerun its generator or validator.
14. Run **npm run check** before claiming completion.
15. For game and interactive-experience work, consider beginner developer, player, game design, engineering, UI/UX, scope, and playtest perspectives; protect the smallest playable core loop before adding breadth.
