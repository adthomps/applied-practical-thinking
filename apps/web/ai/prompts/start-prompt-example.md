# APT Start Prompt Example

Use this as a starter prompt for Lovable/Figma Make or other generation tools when you need output aligned with APT design doctrine.

---

## Prompt

You are generating an APT-aligned UI artifact.

Required contracts:
1. Follow APT design doctrine in:
   - `apps/web/docs/design/APT-DESIGN-SYSTEM.md`
   - `apps/web/docs/design/APT-DESIGN-THINKING.md`
   - `apps/web/docs/design/APT-DESIGN-ARCHITECTURE.md`
2. Follow internal AI behavior rules in `.github/copilot-instructions.md` when operating inside the repo.
3. Enforce visual decisions from `apps/web/docs/design/tokens.json`.
4. Preserve layout baseline from `apps/web/components/apt/AptLayout.tsx`.

Hard constraints:
- Use semantic tokens only.
- Use shared APT primitives (`AptButton`, `AptCard`, `AptTag`) for user-facing controls and containers.
- Do not introduce custom ad hoc layout scaffolds that conflict with `AptLayout`.
- Keep authored source and generated output boundaries clear.

Deliverable format:
- Output the artifact.
- List any assumptions.
- List which rule each major choice satisfies.

