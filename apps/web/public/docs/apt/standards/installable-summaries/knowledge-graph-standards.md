---
title: "Knowledge Graph Standards"
kind: "standard"
domain: "installable-summaries"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/apt-core/knowledge-graph-standards.md"]
---

# Knowledge Graph Standards

Use a knowledge graph when a repo has enough documentation, prompts, contracts, generated evidence, or cross-package architecture that ordinary README navigation stops being enough.

## Ownership

- `apt-principles-agents` owns the APT-wide Graphify runbook, graph scripts, curated graph reports, and doctrine-to-evidence review workflow.
- `apt-principles-agents` owns installable agent guidance for participating in graph workflows.
- Target repos own local context, sensitive-path exclusions, generated-output notes, and decisions about whether repo-local graph output is useful.

Do not treat generated graph output as canonical source. Canonical truth remains in source docs, code, schemas, decisions, project profiles, and validation reports.

## When To Use

Use Graphify or a comparable knowledge graph for:

- cross-repo doctrine, standards, and implementation drift review
- architecture discovery in repos with multiple apps, workers, packages, prompts, or docs
- tracing concepts across canonical doctrine, checklists, prompts, examples, references, and local adoption evidence
- finding weakly connected or duplicated project knowledge
- preparing audit findings that still need source-backed human review

Do not use a graph as the only evidence for high-risk claims, production behavior, security posture, or release readiness. Pair graph traversal with deterministic validation and direct source inspection.

## Local Repo Requirements

Repos that participate in a graph workflow should document:

- whether the repo is included in the APT-wide graph
- which generated, runtime, dependency, or sensitive paths must be excluded
- whether semantic extraction may send prose or images to an AI backend
- useful graph queries for the repo
- where source-backed findings should be recorded

Keep `graphify-out/`, graph caches, HTML visualizations, cost files, manifests, and temporary staging folders out of commits unless a project explicitly changes its storage policy.

## Review Rules

- Prefer extracted or source-backed relationships over inferred edges.
- Treat inferred or ambiguous graph edges as candidates, not conclusions.
- Promote only source-supported findings into remediation work, project profiles, decision records, or doctrine updates.
- Rebuild the graph after meaningful doctrine, prompt, architecture, or project-profile changes before using old graph reports for new governance decisions.
- If a graph is dominated by generated public docs, build output, validation sweep artifacts, runtime folders, or dependency folders, fix the input filters before reviewing findings.

## Recommended APT Pattern

Use `apt-principles-agents` as the portfolio graph operator home. Use this profile to teach target repos how to participate safely and how agents should interpret graph evidence.
