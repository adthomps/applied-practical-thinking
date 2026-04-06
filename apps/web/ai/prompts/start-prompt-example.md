---
title: APT Start Prompt Example
version: v1
status: draft
audience: internal
visibility: internal
source: manual
---

# APT Start Prompt Example

Use this as a starter prompt for Lovable/Figma Make or other generation tools when you need output aligned with APT design doctrine.

---

## Prompt

You are generating an APT-aligned UI artifact.

Required contracts:
1. Follow APT design doctrine in:
   - `apps/web/docs/design/versions/v2/APT-DESIGN-SYSTEM.md`
   - `apps/web/docs/design/versions/v2/APT-DESIGN-THINKING.md`
   - `apps/web/docs/design/versions/v2/APT-DESIGN-ARCHITECTURE.md`
2. Follow internal AI behavior rules in `.github/copilot-instructions.md` when operating inside the repo.
3. Enforce visual decisions from `apps/web/docs/design/static/APT-TOKENS-CONTRACT.json`.
4. Preserve layout baseline from `apps/web/components/apt/AptLayout.tsx`.
5. Run output against `apps/web/docs/design/static/APT-DESIGN-SYSTEM-LINT-CHECKLIST.md` and satisfy all critical checks.
6. For any boundary-affecting work, also enforce:
   - `apps/web/docs/design/versions/v2/APT-ARCHITECTURE-EXAMPLES.md`
   - `apps/web/docs/design/versions/v2/APT-ARCHITECTURE-REFERENCE.json`
7. For documentation-boundary work, also enforce:
   - `apps/web/docs/design/versions/v2/APT-DESIGN-ARCHITECTURE.md` (section: `Documentation Architecture (Canonical Section)`)
   - `apps/web/docs/design/versions/v2/APT-ARCHITECTURE-DOC-EXAMPLES.md`
   - `apps/web/docs/design/versions/v2/APT-ARCHITECTURE-DOC-REFERENCE.json`
   - `apps/web/docs/design/versions/v2/APT-ARCHITECTURE-DOC.md` (compatibility shim)

Hard constraints:
- Use semantic tokens only.
- Use shared APT primitives (`AptButton`, `AptCard`, `AptTag`) for user-facing controls and containers.
- Do not introduce custom ad hoc layout scaffolds that conflict with `AptLayout`.
- Keep authored source and generated output boundaries clear.
- Include loading, empty, error, and success states where applicable.
- Treat unresolved critical architecture violations as merge-blocking unless linked exception exists in `docs/DECISION_LOG.md`.
- Treat unresolved critical documentation architecture violations as merge-blocking unless linked exception exists in `docs/DECISION_LOG.md`.

Deliverable format:
- Output the artifact.
- List any assumptions.
- List which rule each major choice satisfies.
- Report checklist outcome as `Pass`, `Pass with fixes`, or `Fail`.
- For architecture-impacting work, report architecture gate outcome as `Pass`, `Pass with fixes`, or `Fail` with findings first.
- For documentation-boundary work, report documentation architecture gate outcome as `Pass`, `Pass with fixes`, or `Fail` with findings first.
