---
title: "APT in Practice: Turning a Repository Dump into a Governed Public Library"
featured: true
id: "apt-publication-boundary-case-study"
type: "case-study"
status: active
description: "How APT thinking, architecture, security, and execution reduced the public doctrine export from 815 broadly discovered artifacts to 203 explicitly governed documents."
publishedAt: "2026-08-16"
concepts:
  - APT
  - content-governance
  - security
  - architecture
  - responsible-ai
platforms:
  - Web
technologies:
  - Node.js
  - React
  - Cloudflare
---

## Problem And Audience

`apt-principles-agents` is the canonical source for APT doctrine and reusable operational assets. `applied-practical-thinking` is the public portfolio and learning surface. The publishing script between them recursively discovered most Markdown and JSON files, which made internal plans, drafts, operational assets, and tooling paths eligible for copying into the public site.

The audience needed a clear APT reference library. Maintainers needed a safe, deterministic publication boundary. Neither group benefited from a public mirror of the entire canonical repository.

## Intended Outcome

Replace implicit file discovery with an explicit, canonical publication contract. Public generation should include only reviewed collections and active or stable artifacts, while internal and generated material remains outside the website.

## Thinking And Decision

The first instinct could have been to extend the exclusion list. That would remain a denylist: every new internal directory would create another opportunity for accidental publication.

The selected approach defaults content to internal and requires each public collection to be named in `references/publication-manifest.json`. This makes publication an affirmative decision and keeps ownership in the canonical repository.

Tradeoff: the public library no longer exposes every prompt, agent, skill, template, or reference file. Those assets remain available through repository distribution, while the portfolio can demonstrate selected workflows without turning its documentation browser into an operational asset dump.

## Design

The public information model now distinguishes orientation, doctrine, standards, examples, reference architecture, and flagship case-study collections. Each generated entry carries its collection, audience, category, featured state, canonical source path, status, and checksum.

This creates two complementary experiences:

- a curated public path for learning and proof
- a complete repository distribution path for adopters and maintainers

## Architecture And Source Boundaries

The canonical publication contract lives in `apt-principles-agents`. The Node-based generator in `applied-practical-thinking` reads that contract, validates document metadata, filters status and visibility before copying, and creates deterministic public manifests.

The public Markdown and generated TypeScript manifest are derived outputs. They are never edited as doctrine.

## Security And Responsible AI

The previous broad scan included paths that were not intended as public information, including internal refactor material and tooling cache locations. The new default-internal allowlist reduces unintended disclosure and makes review scope visible.

AI assisted repository analysis and implementation, but did not decide what was public on its own. The contract, tests, repository boundaries, and validation commands provide reviewable human control.

## Execution And Validation

The change was delivered in a bounded sequence:

1. Define the canonical publication contract.
2. Extract publication selection into a testable library.
3. Filter status and visibility before copying.
4. Generate audience and collection metadata.
5. Add contract tests for active, stable, draft, internal, withheld, unselected, and hidden content.
6. Regenerate the public reference library.

The contract test runs with `node apps/web/scripts/test-apt-publication.cjs`. The public generator runs through `pnpm --dir apps/web run generate-apt-principles-agents-public`.

## Outcome Evidence

The generated APT public manifest changed from approximately 815 broadly discovered artifacts to 203 explicitly selected active or stable Markdown documents in the first curated baseline.

The contract test verifies that draft, internal, withheld, unselected refactor, and hidden tooling documents are not copied. This is verified generation evidence; audience comprehension and portfolio engagement remain outcomes to measure after publication.

## Learning And Reuse

- Allowlists express intent more durably than growing exclusion lists.
- Canonical and public repositories need different completeness goals.
- Publication metadata can support future learning paths without duplicating doctrine.
- A case study is more useful when it records tradeoffs and evidence, not only implementation steps.

The publication contract, responsible-AI standard, taxonomy mapping, and flagship case-study template can now be reused by other APT-adopting projects.

## Next Evidence

- Validate the full web build and Worker content contract.
- Add engagement and navigation signals for featured collections.
- Produce a short visual walkthrough using this case study as the factual source.
