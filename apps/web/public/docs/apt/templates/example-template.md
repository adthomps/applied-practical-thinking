---
title: {{TITLE}}
version: v1
last_updated: {{DATE}}
owner: APT
status: draft
---

# {{TITLE}}

## Context

Describe the real situation this example represents. Include the project type, user or operator, system boundary, and why the example matters.

Examples should be concrete enough to guide implementation, but they should not redefine doctrine. Link back to the principle docs that own the rules.

## Problem

Explain the failure, ambiguity, or recurring decision this example resolves. Good problem statements name the risk, not just the desired solution.

## APT Principles Applied

- Thinking: what question or decision is clarified?
- Design: what user-facing behavior or state is shaped?
- Architecture: what boundary or responsibility is protected?
- System Standards: what contract or convention is reused?
- Quality/Release/Operations/Knowledge/AI/Security: include only the areas that genuinely apply.

## Solution

Describe the pattern to use. Include enough detail for another project to adapt it safely.

Where useful, include:

- flow steps
- request/response examples
- folder or artifact structure
- state map
- validation evidence
- support or release notes

## Example Structure

Use a structure that can be copied into project docs or implementation tickets.

```text
Intent:
Owner:
Inputs:
Flow:
Artifacts:
Validation:
Risks:
Related APT docs:
```

## Notes

Use this section for implementation hints, project-specific adaptation guidance, or source references. Keep doctrine in the canonical docs.

## Tradeoffs

Name the cost of the pattern. A good example explains when the pattern is useful and when it may be too heavy, too light, or incomplete.

## Common Mistakes

- Treating the example as a rule without checking the related doctrine.
- Copying project-specific details without adapting ownership, security, or validation.
- Omitting failure states, evidence, or support impact.
- Letting the example drift from the referenced principle docs.

## Related Documents

- `../apt-principles.md`
- `../templates/checklist-template.md`
- `../templates/prompt-template.md`
