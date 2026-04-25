---
title: Problem Framing Example
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
---

# Problem Framing Example

## Context

A stakeholder asks for a dashboard to make reviews easier.

## Problem

The request names a solution but does not explain the user, pain, baseline, or success criteria.

## APT Principles Applied

- Thinking: problem-first framing.
- Design: user workflow clarity before screens.
- Execution: smallest useful next step.

## Solution

Reframe the request before design or build:

```text
Problem:
Reviewers lose time collecting status, ownership, and validation evidence across tools.

Audience:
Maintainers preparing release review.

Success:
Reduce review handoff time by 30% and make blockers visible before release meeting.

Constraints:
Use existing repo metadata and validation reports. Do not require manual status entry.
```

## Example Structure

```text
Problem statement:
Audience:
Current baseline:
Success criteria:
Constraints:
Tradeoffs:
Smallest useful next step:
```

Decision note:

```text
Decision: Build a review status dashboard only after confirming which evidence reviewers need most.
Owner: release maintainer
Open assumption: validation report data is reliable enough to summarize automatically
Next step: prototype a read-only status view from existing validation outputs
```

## Tradeoffs

Framing slows the first few minutes of work, but prevents building a polished answer to the wrong problem.

## Common Mistakes

- Treating the requested feature as the problem.
- Skipping baseline or success criteria.
- Hiding constraints until implementation.
- Turning the first solution idea into a build ticket before naming the decision.

## Implementation Notes

Problem framing should produce enough clarity to choose a next artifact: design flow, architecture boundary, validation plan, or decision record. If the next artifact is still unclear, the problem is not framed tightly enough.

## Related Documents

- `../../thinking.md`
- `../../checklists/thinking-review-checklist.md`
