---
title: Design Review Prompt
version: v1
status: draft
audience: internal
visibility: internal
source: apt-principles-agents/prompts/design-review-prompt.md
---

# Design Review Prompt

Review user-facing behavior, interaction states, visual consistency, and accessibility against APT Design Principles.

## Required Reading Before Reviewing

1. `apps/web/docs/design/static/APT-REVIEW-STANDARD.md`
2. `apps/web/docs/design/versions/v2/APT-DESIGN-SYSTEM.md`
3. `apps/web/docs/design/versions/v2/APT-DESIGN-THINKING.md`
4. `apps/web/docs/design/static/APT-DESIGN-SYSTEM-LINT-CHECKLIST.md`
5. The route or component under review

## Prompt

```text
You are reviewing design in the applied-practical-thinking repo using APT Design Principles.

Use:
- apps/web/docs/design/static/APT-REVIEW-STANDARD.md
- apps/web/docs/design/versions/v2/APT-DESIGN-SYSTEM.md
- apps/web/docs/design/static/APT-DESIGN-SYSTEM-LINT-CHECKLIST.md
- apt-principles-agents/principles/design/README.md (canonical doctrine)
- apt-principles-agents/checklists/design-review-checklist.md

Review for:
1. User goal clarity — is the intent of the page/feature immediately clear?
2. Required states — loading, empty, success, error, disabled are all handled
3. Interaction consistency — hover, focus, active, and keyboard behaviors follow existing patterns
4. Token and component alignment:
   - Only semantic tokens used (bg-background, bg-card, text-foreground, text-primary, etc.)
   - No raw Tailwind color classes
   - APT components used where they exist (AptCard, AptButton, AptTag, etc.)
   - Blue carries primary actions, links, focus rings, and high-frequency action emphasis
   - Restricted accent used only for badges, callouts, charts, success treatment
   - Neutral surfaces used for secondary actions, inactive tabs, disabled surfaces
5. Copy clarity — concise, honest, non-marketing, matched to user intent
6. Accessibility — keyboard nav, ARIA labels, focus rings, reduced motion respected
7. Missing acceptance criteria or undocumented design deviations

Return:
- Blocking design issues (must fix before release)
- Non-blocking refinements (improve when convenient)
- Missing states or artifacts
- Smallest corrective changes
- Evidence needed before release
```

## Output Shape

```
Route/Component:
Workflow:
Blocking issues:
Missing states:
Token/component alignment issues:
Accessibility notes:
Smallest correction:
Evidence required:
```

## Guardrails

- Do not suggest a new visual language or token system.
- Do not accept raw color values or missing semantic tokens without a decision record.
- Do not accept happy-path-only UI for data-driven sections.
- Do not ignore accessibility states or keyboard behavior.
- If a deviation is intentional, ask for the entry in `docs/DECISION_LOG.md`.

## Related Documents

Local (project-specific, primary):
- `apps/web/docs/design/static/APT-REVIEW-STANDARD.md`
- `apps/web/docs/design/versions/v2/APT-DESIGN-SYSTEM.md`
- `apps/web/docs/design/versions/v2/APT-DESIGN-THINKING.md`
- `apps/web/docs/design/versions/v2/APT-DESIGN-ARCHITECTURE.md` (for design-boundary checks)
- `apps/web/docs/design/static/APT-DESIGN-SYSTEM-LINT-CHECKLIST.md`
- `docs/DECISION_LOG.md`

Canonical (doctrine authority):
- `apt-principles-agents/principles/design/README.md`
- `apt-principles-agents/checklists/design-review-checklist.md`
