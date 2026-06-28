---
title: APT Repo Alignment Checklist
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "checklist"
domain: "repo-alignment-checklist"
source_paths: ["apt-principles/checklists/repo-alignment-checklist.md"]
---

# APT Repo Alignment Checklist

## Scope

Use this checklist when reviewing another repository against APT doctrine, standards, examples, prompts, context packs, and agent guidance. It is broader than project adoption: adoption asks whether a project has a local APT layer, while repo alignment asks whether the repo's actual files, workflows, and claims match the relevant APT sources.

Run this checklist before claiming that a repo follows APT standards, before publishing a public showcase profile, or before recommending managed agent standards for a downstream project.

## Required Checks

- [ ] The repo type is identified, such as React/Vite UI app, Cloudflare Worker or Hono API, documentation site, payment/API gateway, agent instructions repo, mixed full-stack app, prototype, or Lovable-generated app.
- [ ] Applicable APT context packs are selected from `context-packs/` and any omitted pack is intentionally out of scope.
- [ ] Mandatory checks are separated from recommended improvements.
- [ ] Canonical doctrine remains linked to `apt-principles-agents`; local docs do not redefine APT rules without a decision record.
- [ ] Agent instructions identify source-of-truth rules, allowed tools, prohibited shortcuts, validation expectations, and approval boundaries.
- [ ] Examples and showcase patterns are used as adaptation guidance, not as replacement doctrine.
- [ ] Relevant checklists have been run against exact target files, not only summaries.
- [ ] Validation commands and report locations are named for both this source repo and the target repo when available.
- [ ] Security, compliance, payment, authentication, authorization, and production-readiness claims are backed by exact source reads.
- [ ] Follow-up actions identify owner, severity, affected APT layer, and required evidence.

## Failure Conditions

- The review claims APT compliance without checking relevant files against the relevant checklist.
- The repo mixes canonical APT doctrine with local implementation details in a way that creates a competing source of truth.
- The review treats context compression as sufficient for security, payment, compliance, final validation, or exact code edits.
- Agent instructions tell tools to invent standards, skip validation, ignore local project context, or mutate high-risk systems without approval.
- Public showcase language overstates maturity, validation, production use, or security posture.
- Mandatory APT artifacts are missing and recorded only as optional improvements.

## Evidence Required

- Repo type classification and selected context packs.
- Paths to exact target files reviewed.
- Checklist results for each relevant domain.
- Validation command output or a clear note that validation was unavailable.
- Links to canonical APT docs, standards, examples, prompts, references, and context packs used.
- Gap report with severity, owner or owning area, and concrete remediation.

## Pass Standard

A repo alignment review passes when the repo type is clear, the relevant APT packs and checklists were applied to exact source files, mandatory gaps are documented, and no compliance or readiness claim exceeds the available evidence.

## Related Documents

- `../README.md`
- `../AGENTS.md`
- `../context-packs/README.md`
- `../prompts/repo-alignment-review.md`
- `../references/apt-application-model.json`
