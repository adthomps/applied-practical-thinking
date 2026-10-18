---
title: APT Principles + Agents
kind: repository
status: active
owner: APT
last_updated: 2026-10-04
source: APT consolidation
domain: "governance"
source_paths: ["apt-principles-agents/README.md"]
---

# APT Principles + Agents

**apt-principles-agents** is the canonical operating system for APT thinking, design, architecture, and execution. It consolidates source-backed APT doctrine with reusable agent workflows while keeping principles distinct from procedures and platform adapters.

## Four Pillars

1. **Thinking** frames the real problem, assumptions, outcomes, and tradeoffs.
2. **Design** aligns intent, audiences, journeys, roles, permissions, UI, and API.
3. **Architecture** defines boundaries, contracts, data, integration, modernization, deployment, and failure handling.
4. **Execution** turns decisions into validated increments, releases, operations, support, and learning.

## Use It As A Human

Start in [principles](principles/README.md), choose a [template](./templates/README.md), use a [skill](skills/README.md) for the workflow, and ask the relevant [agent perspective](agents/README.md) to review the result. Product-facing work should use a [Product Hub](product-hubs/README.md). The [APT Agent and Persona Directory](docs/agent-persona-directory.md) is the workspace-level index for canonical roles, local workers, platform availability, product personas, and related mechanisms. The internal [Product Team planning subsystem](product-team/README.md) is maintained here; its Working Backwards workers and planning records are distinct from canonical roles and product-owned personas.

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

A Product Hub is the canonical product-facing package for business/merchant, bank/acquirer/partner, integrator/developer, support/operations, and product/internal audiences. Product/customer personas and their evidence belong to the product repository that owns them. AI agents may consume those audience layers, but the global [agent catalog](agents/README.md) defines accountable agent roles, not customer personas. Each layer shares one verified product truth but answers the questions and operational needs of its audience.

## Domain Coverage

The repository includes API design and modernization; payments and ecommerce; service readiness; security and risk; cautious stablecoin/crypto readiness; documentation; product planning; beginner-friendly game development and interactive experiences; model routing; and compatibility bridge patterns for SOAP, XML, NVP, legacy JSON, provider-specific APIs, checkout forms, and callback-to-webhook migrations.

## Game Development And Interactive Experiences

The [game-development domain](principles/game-development/README.md) helps beginners learn and build small games through APT Thinking, Design, Architecture, and AI-assisted Execution. It emphasizes one understandable idea, a protected core loop, a playable prototype, evidence-based stack choice, incremental playtesting, and aggressive scope control.

## Reviews

Use micro-group review for focused cross-functional decisions and swarm review for broad, high-risk work. Every reviewer returns perspective, concerns, recommended changes, risks, questions, and approval status. Always include a beginner reviewer for onboarding, APIs, guides, UI journeys, migrations, troubleshooting, and Product Hubs.

## Workspace knowledge graph

The Graphify operator in `scripts/graphify-workspace.mjs` builds a deterministic portfolio map from the workspace project catalog and explicitly sourced relationships. Run `npm run graphify:portfolio` to generate the portfolio graph, report, and HTML under ignored `graphify-out/portfolio/current/`; run `npm run graphify:portfolio:check` to verify the JSON and report are current. The portfolio map is a routing index, not authority for local project behavior.

Detailed graphs remain repository-local and opt-in: `code <repo>` builds an AST-only candidate for configured code repositories, while `content <repo>` stages only the configured authored Markdown sources and extracts them with local-only Ollama. Candidates stay under each repository's ignored `graphify-out/runs/`; review before explicit promotion. Content graphs are navigation aids, not sources of truth. `apt-vas-smb-training` remains explicitly provisional. Full-portfolio semantic builds, hosted extraction, hooks, schedules, and automatic promotion remain disabled. See each target repository's `docs/graphify.md` and `references/graphify-portfolio.json` for scope and exclusions.

## Contribute

Put durable decision guidance in **principles/**, procedures in **skills/**, accountable perspectives in **agents/**, reusable inputs in **templates/** or **prompts/**, and concrete demonstrations in **examples/**. Add cross-links, provenance, tests, and audience impact; run **npm run check**.

## Provenance

See [migration from the old repositories](docs/migration-from-old-repos.md) and [source provenance](docs/archive/source-provenance/README.md).
