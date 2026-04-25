---
title: Canonical Doc Update Example
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Canonical Doc Update Example

## Context

A team adds a new API response rule after repeated inconsistent endpoint reviews.

## Problem

If the rule is only added to a prompt or PR comment, future maintainers and agents may miss it.

## APT Principles Applied

- Knowledge: document once, reuse everywhere.
- System standards: response shape belongs in canonical doctrine.
- AI: prompts should reference doctrine rather than redefine it.

## Solution

Update the canonical standard first, then supporting artifacts:

```text
1. Add the rule to system-standards.md.
2. Add or update an API example.
3. Add a checklist item.
4. Update API review prompt references.
5. Run validation.
```

## Example Structure

```text
Canonical doc:
Supporting example:
Checklist update:
Prompt update:
Historical/replaced guidance:
Validation:
```

Example:

```text
Canonical change: system-standards.md adds metadata contract rule.
Related updates:
- references/metadata-versioning-contract.json
- checklists/knowledge-system-checklist.md
- prompts/knowledge-review-prompt.md
Validation: npm --prefix apt-principles run validate
```

## Tradeoffs

Updating several artifacts takes discipline, but it prevents doctrine drift and keeps AI review grounded.

## Common Mistakes

- Adding a rule only to a prompt.
- Copying the same rule into multiple docs with different wording.
- Forgetting to update examples after changing a standard.
- Changing generated or public-facing copies without updating the canonical source.

## Implementation Notes

Treat canonical doc updates as small releases. Identify consumers, update related build-kit assets, validate links and references, and record whether public-site or downstream-project sync work is needed.

## Related Documents

- `../../knowledge-system.md`
- `../../checklists/knowledge-system-checklist.md`
