---
title: Example Internal FAQ — Booking Data Export
version: v1
last_updated: 2026-10-04
owner: APT
status: active
kind: "example"
domain: "execution"
source_paths: ["apt-principles-agents/examples/working-backwards/booking-data-export/faq-internal.md"]
---

# Internal FAQ: Booking data export

**Why now?** Export is the top support request (illustrative) and a common reason for distrust in churn interviews.

**Is it feasible at our largest account sizes?** The largest studio has about 40,000 bookings (illustrative); a background job streaming CSV handles that in seconds. Sizes above 200,000 rows are open: oi-scale, owner engineering.

**Privacy and legal.** The export contains personal data of the studio's clients. The owner is the controller; we deliver the file only to the owner's verified email. Download links expire after 24 hours and are single-use. Legal confirmed no change to terms is needed (illustrative).

**Security.** Owner-only permission check on the server, an audit log entry per export, and a limit of 5 exports per owner per day.

**Operations and support.** Support gets a help article and a macro; failed jobs alert on-call.

**Success measure.** Export-related tickets fall by 80% within two months; exports per month are tracked.

[OPEN] oi-scale: behavior above 200,000 rows. Owner: engineering. Deferred; does not block build.
