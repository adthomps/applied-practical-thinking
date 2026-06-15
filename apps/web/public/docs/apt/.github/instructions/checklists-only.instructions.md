---
description: "Use when editing checklist files under checklists/. Applies to gate synchronization, acceptance criteria updates, and checklist language alignment with canonical doctrine."
applyTo: "checklists/**/*.md"
---
# Checklist File Instructions

## Goal
Maintain checklist gates as enforceable, traceable controls that reflect canonical doctrine.

## Required Behavior
- Keep checklist sections complete: Scope, Required Checks, Failure Conditions, Evidence Required, Related Documents.
- Use concrete pass/fail language reviewers can apply consistently.
- Keep wording aligned to canonical doctrine terms from root APT docs.
- Keep edits minimal and focused on the affected checklist area.

## Do Not
- Do not edit files outside `checklists/` in checklist-only tasks.
- Do not add speculative controls without doctrine basis.
- Do not weaken security, quality, release, or operations gates without explicit request.

## Before Finishing
- Verify traceability links to relevant doctrine docs.
- Note any out-of-scope drift in prompts/references as follow-up.
