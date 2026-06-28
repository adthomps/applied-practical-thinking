---
title: APT Principles + Agents
kind: repository
status: active
owner: APT
last_updated: 2026-06-27
source: APT consolidation
domain: "repository"
source_paths: ["apt-principles-agents/README.md"]
---

# APT Principles + Agents

**apt-principles-agents** is the canonical operating system for APT thinking, design, architecture, and execution. It consolidates the doctrine from **apt-principles-agents** with the reusable agent workflows from **apt-principles-agents** while keeping principles distinct from procedures and platform adapters.

## Four Pillars

1. **Thinking** frames the real problem, assumptions, outcomes, and tradeoffs.
2. **Design** aligns intent, audiences, journeys, roles, permissions, UI, and API.
3. **Architecture** defines boundaries, contracts, data, integration, modernization, deployment, and failure handling.
4. **Execution** turns decisions into validated increments, releases, operations, support, and learning.

## Use It As A Human

Start in [principles](principles/README.md), choose a [template](./templates/README.md), use a [skill](skills/README.md) for the workflow, and ask the relevant [agent perspective](agents/README.md) to review the result. Product-facing work should use a [Product Hub](product-hubs/README.md).

## Use It With AI Tools

- **Codex:** read **AGENTS.md** and **CODEX.md**; install selected skills under **.codex/skills/**.
- **GitHub Copilot:** use **.github/copilot-instructions.md**, **.github/skills/**, and **.github/prompts/** mappings described in [the adapter](platforms/github-copilot/README.md).
- **Claude:** read **AGENTS.md** and **CLAUDE.md**; expose selected skills under **.claude/skills/**.
- **Gemini:** read **AGENTS.md** and **GEMINI.md**; map workflows into **.gemini/commands/**.
- **Local models:** use them for low-risk classification, triage, summarization, and routing; escalate complex architecture, payment, security, and major-refactor work.

## Install Selected Assets

Choose a manifest such as **core**, **payments**, **api-modernization**, **documentation**, **product-hub**, **game-development**, or **full**, then run:

```powershell
./installers/install-skills.ps1 -Target ../my-project -Manifest core -DryRun
```

```bash
./installers/install-skills.sh --target ../my-project --manifest core --dry-run
```

See [distribution setup](docs/operations/setup.md), [routine operations](docs/operations/operating.md), and the [workspace rollout gate](docs/operations/workspace-rollout.md).

Existing files are skipped by default. The force option creates timestamped backups before replacement.

## Product Hubs And Audience Layers

A Product Hub is the canonical product-facing package for business/merchant, bank/acquirer/partner, integrator/developer, support/operations, product/internal, and AI-agent audiences. Each layer shares one verified product truth but answers the questions and operational needs of its audience.

## Domain Coverage

The repository includes API design and modernization; payments and ecommerce; service readiness; security and risk; cautious stablecoin/crypto readiness; documentation; product planning; beginner-friendly game development and interactive experiences; model routing; and compatibility bridge patterns for SOAP, XML, NVP, legacy JSON, provider-specific APIs, checkout forms, and callback-to-webhook migrations.

## Game Development And Interactive Experiences

The [game-development domain](principles/game-development/README.md) helps beginners learn and build small games through APT Thinking, Design, Architecture, and AI-assisted Execution. It emphasizes one understandable idea, a protected core loop, a playable prototype, evidence-based stack choice, incremental playtesting, and aggressive scope control.

## Reviews

Use micro-group review for focused cross-functional decisions and swarm review for broad, high-risk work. Every reviewer returns perspective, concerns, recommended changes, risks, questions, and approval status. Always include a beginner reviewer for onboarding, APIs, guides, UI journeys, migrations, troubleshooting, and Product Hubs.

## Contribute

Put durable decision guidance in **principles/**, procedures in **skills/**, accountable perspectives in **agents/**, reusable inputs in **templates/** or **prompts/**, and concrete demonstrations in **examples/**. Add cross-links, provenance, tests, and audience impact; run **npm run check**.

## Provenance

See [migration from the old repositories](docs/migration-from-old-repos.md) and [source provenance](docs/archive/source-provenance/README.md).
