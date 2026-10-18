---
title: Example Critic Review — Booking Data Export
version: v1
last_updated: 2026-10-04
owner: APT
status: active
kind: "example"
domain: "execution"
source_paths: ["apt-principles-agents/examples/working-backwards/booking-data-export/critic-review.md"]
---

# Critic review: Booking data export

Independent session; writer artifacts were not edited.

```text
VERDICT: PASS
RUBRIC_VERSION: 1.1.0
PROFILES: none
SUMMARY: Named owner persona with (illustrative) ticket evidence, honest owner-only and privacy answers, traced and testable R1–R5, validated and stoppable slices, complete readiness with outcome signals, and two owned, deferred open items.
```

| Stage | Verdict | Notes |
|---|---|---|
| Press release | PASS | Customer, evidence, and benefit are specific; the quote is a labelled placeholder (oi-quote). |
| External FAQ | PASS | Covers permissions, contents, failure, switching, cost, and import without evasion. |
| Internal FAQ | PASS | Feasibility, privacy, security, support, and a success measure; scale is owned as oi-scale. |
| Requirements | PASS | Each requirement traces to a source; acceptance criteria are testable; open items are carried. |
| Engineering handoff | PASS | Both slices name their requirement IDs (R1–R5 all covered), a runnable validation, and a stop condition; approved sources and forbidden scope are listed. |
| Readiness | PASS | Quality, security and privacy, operations and support, docs, and release with rollback are covered; outcome signals tie to the press release with 30- and 60-day reviews. |

Open vs blocker: oi-quote and oi-scale are owned and deferred; no blockers.

Overall: approved for build from engineering-handoff.md.

## Engineering handoff

| Dimension | Verdict | Evidence |
|---|---|---|
| increment-traceability | PASS | Slice 1 delivers R1, R2, R5; slice 2 delivers R3, R4. |
| validation-and-stop | PASS | Each slice has tests to run and a stop condition ("staff can reach the export", "a failed job sends a link"). |
| scope-guard | PASS | Approved sources are the four passed artifacts; untraced scope (imports into other tools) and pre-PASS work are forbidden. |

## Readiness

| Dimension | Verdict | Evidence |
|---|---|---|
| readiness-coverage | PASS | Tests, security and privacy, on-call and support, help article, and a flag rollout with rollback are each named. |
| outcome-signals | PASS | Export-related tickets and exports per month, reviewed at 30 and 60 days, matching the press-release promise. |
