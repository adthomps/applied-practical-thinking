---
docId: content-naming-messaging
slug: content-naming-messaging
title: APT Content Naming and Messaging
version: v2
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-04-12
description: "APT standard for medium-fidelity naming, inline message construction, and alert messaging language."
---

## Intent

Define consistent medium-fidelity labels and message language for planning, prototyping, and implementation.

## Medium-Fidelity Content Standard

Use medium-fidelity content to communicate element purpose clearly without relying on final production copy. Avoid lorem ipsum and avoid speculative marketing language.

## Naming Formula

Use descriptor plus text category.

Examples:

- `Checkout section heading`
- `Filters group label`
- `Search results table header`

Descriptors may be omitted only when the text category is already sufficient.

## Text Categories

Use these categories consistently:

- Action
- Body text
- Header
- Heading
- Label
- Subtitle
- Subheading
- Title

## Descriptors

Common descriptor sources:

- Component name
- Group
- Level
- Page
- Section
- Variant name

Prefer simple descriptors over ordinal complexity. Exception: CTA pairs may use `Primary action` and `Secondary action`.

## Numbering Guidance

If multiple items share the same text category, use numbers for clarity.

Examples:

- `Section heading 1`
- `Section heading 2`

## Empty State Message Standard

When no data is shown, include inline context in the component state area describing why (no data, no permission, filtered out, not yet added) and what to do next.

## Messaging Anatomy

Messages in alerts, banners, dialogs, inline status, and trays use:

- Title (optional): three to five descriptive words
- Message (required): clear context in plain language
- CTA (required when action is needed): explicit verb-first action label

## Messaging Best Practices

- Sentence case only (except proper nouns and acronyms)
- Plain language, no jargon
- Brief and direct
- No blame language
- Provide next step for recovery

## Voice and Tone

Prefer active voice for direct actions. Use passive voice only when active phrasing sounds punitive in error contexts.

## Status Types

- Informational: non-disruptive state or context updates
- Success: confirm completed action, optional undo
- Warning: potential risk or workflow impact
- Error: problem occurred; explain consequence and next step

## Inline Error Pattern

Use `Error:` prefix only when it improves clarity and apply consistently within the experience.

## Badge Guidance

Badges must stay compact and semantic:

- Numeric badges show counts
- Informational badges show status when counts are not relevant

## Tests and QA

Verify labels follow descriptor plus text category, inline messages are attached to the correct element, and CTA labels use clear verbs with no punctuation.
