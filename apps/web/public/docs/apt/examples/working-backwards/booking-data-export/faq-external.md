---
title: Example External FAQ — Booking Data Export
version: v1
last_updated: 2026-10-04
owner: APT
status: active
kind: "example"
domain: "execution"
source_paths: ["apt-principles-agents/examples/working-backwards/booking-data-export/faq-external.md"]
---

# External FAQ: Booking data export

**Can my staff export client data?** No. Only the account owner can, because the file contains every client's contact details.

**What exactly is in the file?** Three CSVs: bookings (date, time, class, client, status), clients (name, email, phone, notes), and payments (date, amount, method, booking). Card numbers are never included.

**What if the export fails or takes too long?** Exports over two years run in the background and you get an email link valid for 24 hours. If it fails, you get an email saying so and can retry; nothing is half-delivered.

**Will this make it easy to leave?** Yes, deliberately. The press release names that as the point.

**Does it cost anything?** No. It is part of every plan.

**Can I import this into another tool?** The files are plain CSV with a header row. We do not promise any specific tool's import format.
