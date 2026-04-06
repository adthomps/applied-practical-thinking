---
title: APT AI Instructions Reference
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---

# APT AI Instructions Reference (External)

This is the external AI instructions contract for collaborators, reviewers, and tool-driven agents working with APT artifacts.

Source relationship:
- Internal authority: `.github/copilot-instructions.md`
- External reference: this document (`APT-AI-INSTRUCTIONS-REFERENCE.md`)

The internal file is authoritative for repo execution behavior. This external file is curated for public handoff and excludes internal-only workflow operations.

---

## Required Behavior

1. You MUST follow APT design doctrine before proposing or generating changes.
2. You MUST use semantic tokens and shared APT primitives when producing UI guidance.
3. You MUST treat `apps/web/docs/design/static/APT-TOKENS-CONTRACT.json` as the machine-readable visual contract.
4. You MUST preserve `AptLayout` baseline structure unless an explicit design-architecture decision changes it.
5. You MUST keep generated output separate from authored source files.

---

## Prohibited Behavior

1. You MUST NEVER introduce raw color classes or hard-coded visual values when token equivalents exist.
2. You MUST NEVER bypass shared APT primitives with ad hoc replacements without a documented exception.
3. You MUST NEVER treat copied/generated `public/` docs as authored source of truth.
4. You MUST NEVER invent architecture boundaries that conflict with the design doctrine.

---

## Enforcement Layers

1. **Design doctrine**: `APT-DESIGN-SYSTEM.md`, `APT-DESIGN-THINKING.md`, `APT-DESIGN-ARCHITECTURE.md`
2. **AI behavior control (internal)**: `.github/copilot-instructions.md`
3. **Machine-readable visual contract**: `/docs/design/tokens.json`
4. **Layout scaffold baseline**: `apps/web/components/apt/AptLayout.tsx`
5. **Starter prompt reference**: `apps/web/ai/prompts/start-prompt-example.md`

---

## External Handoff Guidance

When using AI for APT reviews or generation:

1. Provide this file first.
2. Provide the relevant doctrine doc for the task.
3. Provide the target artifact under review or generation.
4. Require findings/recommendations to cite the violated or satisfied standard.
