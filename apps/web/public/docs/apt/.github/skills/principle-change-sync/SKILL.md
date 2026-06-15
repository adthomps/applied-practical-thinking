---
name: principle-change-sync
description: "Repeatable workflow for synchronizing APT principle updates across doctrine, checklists, prompts, and references. Use when a principle changes and linked enforcement artifacts must be updated consistently. Triggers: principle update, terminology change, checklist drift, prompt drift, reference contract alignment."
---

# Principle Change Sync

## Purpose
Execute a deterministic sync workflow whenever a principle-level change is introduced so doctrine and enforcement artifacts remain aligned.

## Use When
- A root doctrine file changed meaning, scope, terminology, acceptance criteria, or required artifacts.
- A checklist or prompt drift issue points back to outdated doctrine coupling.
- A reference contract in `references/` must align with updated doctrine language.

## Inputs
- Changed principle scope and rationale.
- Target doctrine files at repo root.
- Impacted `checklists/`, `prompts/`, and `references/` files.
- Risk tolerance and release urgency.

## Workflow
1. Identify source-of-truth doctrine delta.
- Confirm canonical source update in root doctrine files.
- Extract exact terminology and acceptance criteria that changed.

2. Build impact map.
- Locate linked checklist controls in `checklists/`.
- Locate linked review instructions in `prompts/`.
- Locate linked contracts/schemas/maps in `references/`.
- Record any examples/templates that should be aligned afterward.

3. Apply synchronized edits.
- Update doctrine first.
- Update checklist gates and failure conditions to match doctrine intent.
- Update prompts so requested outputs enforce updated doctrine.
- Update references only where machine-readable contracts must change.

4. Validate and report.
- Run `npm run validate`.
- Run `npm run run-all-checks` when broader confidence is needed.
- Summarize changes by file, residual risks, and deferred follow-up.

## Output Contract
Return:
1. Change summary by layer: doctrine, checklist, prompt, references.
2. Findings or drift risks not fully resolved.
3. Validation commands executed and outcomes.
4. Explicit follow-up queue with severity (`critical`, `high`, `medium`, `low`).

## Guardrails
- Do not change unrelated product behavior or architecture.
- Prefer minimal edits that restore consistency.
- Do not invent doctrine; link back to canonical APT docs.
- If references cannot be safely changed now, record them as explicit follow-up with risk.
