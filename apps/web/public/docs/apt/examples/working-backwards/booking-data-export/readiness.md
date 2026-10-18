---
title: Example Readiness — Booking Data Export
version: v1
last_updated: 2026-10-04
owner: APT
status: active
kind: "example"
domain: "execution"
source_paths: ["apt-principles-agents/examples/working-backwards/booking-data-export/readiness.md"]
---

# Readiness: Booking data export

- Quality / tests: the slice tests, plus an end-to-end export as an owner and a denial as staff.
- Security and privacy: owner check, audit log, rate limit, expiring links, no personal data in logs.
- Operations / support: on-call alert for failed jobs; help article and support macro.
- Docs: help article "Download your data".
- Release: behind a flag, enabled for 10% of accounts first; rollback is turning the flag off.
- Outcome signals: export-related tickets and exports per month, reviewed at 30 and 60 days.
