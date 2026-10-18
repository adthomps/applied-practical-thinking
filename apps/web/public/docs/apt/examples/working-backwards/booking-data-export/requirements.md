---
title: Example Requirements — Booking Data Export
version: v1
last_updated: 2026-10-04
owner: APT
status: active
kind: "example"
domain: "execution"
source_paths: ["apt-principles-agents/examples/working-backwards/booking-data-export/requirements.md"]
---

# Requirements: Booking data export

| ID | Requirement | Traces to |
| --- | --- | --- |
| R1 | Only the account owner can start an export. | External FAQ: staff |
| R2 | The export is one ZIP with bookings, clients, and payments CSVs with headers, and no card data. | Press release; External FAQ: contents |
| R3 | Exports of two years or less complete in under 60 seconds; larger exports run in the background and email a link. | Press release; External FAQ: failure |
| R4 | Download links are single-use and expire after 24 hours. | Internal FAQ: privacy |
| R5 | Every export writes an audit log entry; exports are limited to 5 per owner per day. | Internal FAQ: security |

**Acceptance (R1).** Given a staff user, when they open Settings → Your data, then the Export option is not shown and the API returns 403.

**Acceptance (R3).** Given an owner with three years of bookings, when they export, then they see "We'll email you a link" and an email with a working link arrives; a failed job sends a failure email and no link.

**Edge cases.** Empty account (header-only CSVs); deleted clients (excluded); time zones (exported in the studio's time zone, stated in a README.txt in the ZIP).

**Non-functional.** Personal data is never written to logs; job retries are idempotent.

Carried forward: oi-quote, oi-scale.
