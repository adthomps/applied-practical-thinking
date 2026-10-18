---
title: Example Engineering Handoff — Booking Data Export
version: v1
last_updated: 2026-10-04
owner: APT
status: active
kind: "example"
domain: "execution"
source_paths: ["apt-principles-agents/examples/working-backwards/booking-data-export/engineering-handoff.md"]
---

# Engineering handoff: Booking data export

**Approved source artifacts:** press release, external FAQ, internal FAQ, requirements (critic PASS).

### Slice 1 — owner-only export (R1, R2, R5)

- Output: Settings → Your data, with a ZIP download for ranges up to two years.
- Validation: API test for 403 as staff; ZIP contents test; audit log entry test.
- Stop: staff can reach the export, or a CSV includes card data.

### Slice 2 — background export with email link (R3, R4)

- Output: job queue path, expiring single-use link, failure email.
- Validation: a three-year fixture exports by link; the link fails on second use and after 24 hours.
- Stop: a failed job sends a link.

## Forbidden

- Scope not traced to the press release or FAQ (for example, imports into other tools)
- Implementation before critic PASS
