---
title: APT Repo Alignment Review Prompt
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "prompt"
domain: "repo-alignment-review"
source_paths: ["apt-principles/prompts/repo-alignment-review.md"]
---

# APT Repo Alignment Review Prompt

## Purpose

Use this prompt to scan another repository, determine its repo type, select applicable APT context packs, and produce a gap report. It supports project adoption, AI readiness, public showcase review, and cross-repo alignment without moving canonical doctrine into the target repo.

This prompt is for review and planning first. It may recommend edits, but it must distinguish source-supported findings from assumptions and must not claim APT compliance unless relevant files were checked against relevant checklists.

## Input Expectations

Provide the target repo path or file inventory, known project purpose, current maturity, any local APT docs, validation commands, public showcase intent, and whether installed agent standards are present. If available, include recent validation reports or CI results.

## Prompt

```text
Review this repository for APT alignment.

Canonical source:
- apt-principles-agents/README.md
- apt-principles-agents/apt-principles-agents.md
- apt-principles-agents/AGENTS.md
- apt-principles-agents/context-packs/README.md
- apt-principles-agents/references/apt-application-model.json

Target repository:
- Path or file inventory:
- Purpose:
- Audience:
- Current maturity:
- Known validation commands:
- Public showcase intent:
- Installed agent standards or local agent files:

Instructions:
1. Inspect the target repo structure before asking questions.
2. Classify the repo type.
3. Select applicable APT packs and separate mandatory from recommended checks.
4. Check exact target files for any compliance or readiness claim.
5. Identify duplicated doctrine, stale guidance, unclear folders, missing examples, missing validation evidence, and mixed implementation/doctrine responsibilities.
6. Preserve the apt-principles-agents / apt-principles-agents ownership split.

Return:
1. Summary.
2. Repo type classification.
3. Applicable APT packs and required checks.
4. Gap report ordered by severity.
5. Files or areas reviewed as evidence.
6. Mandatory fixes versus recommended improvements.
7. Validation commands to run.
8. Residual risks and assumptions.
```

## Expected Output

- A concise alignment summary.
- Repo type and applicable context-pack table.
- Findings with severity, evidence path, violated APT source, and recommended correction.
- Mandatory versus recommended action list.
- Validation commands and unavailable-evidence notes.
- Public showcase readiness or blocking gaps when applicable.

## Guardrails

- Do not claim the target repo follows APT standards unless exact files were checked against the relevant checklist.
- Do not treat Headroom or any compressed context as enough for security, compliance, payment handling, final validation, or exact code edits.
- Do not copy canonical doctrine into the target repo unless the adoption mode explicitly calls for vendored assets.
- Do not merge `apt-principles-agents` installer, profile detection, or path-mapping behavior into `apt-principles-agents`.
- Do not overstate maturity, production readiness, security posture, or public showcase readiness.

## Related Documents

- `../README.md`
- `../AGENTS.md`
- `../context-packs/README.md`
- `../checklists/repo-alignment-checklist.md`
- `../checklists/project-adoption-checklist.md`
- `../references/apt-application-model.json`
