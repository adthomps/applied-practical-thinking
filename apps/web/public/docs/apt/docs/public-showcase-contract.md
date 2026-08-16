---
title: APT Public Showcase Contract
kind: guide
domain: documentation
status: active
owner: APT
last_updated: 2026-08-16
source_paths: ["apt-principles-agents/docs/public-showcase-contract.md"]
---

# APT Public Showcase Contract

## Purpose

An APT showcase demonstrates applied judgment and verified outcomes; it is not a promotional summary of files created. The canonical project owns facts and evidence. A public site may adapt the story for different formats without changing those facts.

## Required Story Spine

1. **Problem:** audience, baseline condition, constraints, and why the problem mattered.
2. **Thinking:** evidence, assumptions, options, tradeoffs, decision, and intended outcome.
3. **Design:** journeys, states, behavior, accessibility, and acceptance criteria.
4. **Architecture:** boundaries, contracts, ownership, source-of-truth decisions, and deployment model.
5. **Security and responsible AI:** trust and data boundaries, autonomy, approvals, misuse cases, and residual risk.
6. **Execution:** increments, validation, release, rollback or recovery, and operational readiness.
7. **Outcome:** observed evidence compared with the baseline; implementation alone is not an outcome.
8. **Learning:** what changed, what remains uncertain, and which reusable APT assets improved.

## Evidence Rules

- Link to source files, commands, reports, screenshots, demos, or decision records when they are safe to publish.
- Distinguish verified outcome, observed signal, hypothesis, and planned work.
- Do not expose secrets, private data, internal-only instructions, security-sensitive detail, or customer information.
- Date evidence that can become stale.
- Name material AI assistance and the human decisions or reviews that bounded it.
- If a claim cannot be supported publicly, narrow the claim rather than implying hidden proof.

## Multi-Format Derivatives

The case study is the factual anchor. Derivatives should link back to it:

- blog: decision and learning narrative
- vlog or video: visual walkthrough and demonstration
- podcast: tradeoff and reflection discussion
- demo: runnable or inspectable behavior
- social excerpt: one claim and one supporting artifact

Each derivative may change tone and depth, but not the verified facts, outcome status, or source boundary.

## Readiness Gate

A showcase is ready when the project owner verifies public-safe evidence, the relevant APT layers are represented or marked not applicable, links resolve, uncertain claims are labeled, and the public publication contract includes only intended artifacts.

Use `templates/docs/flagship-case-study.md` to create the canonical narrative.
