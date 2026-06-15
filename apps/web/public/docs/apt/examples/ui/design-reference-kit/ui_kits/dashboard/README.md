---
title: Dashboard UI Kit Reference
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
---

# Dashboard UI Kit Reference

## Context

This vendored kit demonstrates an APT console/dashboard with sidebar navigation, topbar, KPI tiles, charts, status table, and operational actions.

## Problem

Dashboards often become piles of unrelated cards with arbitrary chart colors and weak action hierarchy.

## APT Principles Applied

- Design: scan-first hierarchy and stable operational states.
- Operations: status should be explainable.
- System Standards: charts and tables should use shared token roles.

## Solution

Open `index.html` to inspect the dashboard composition. It includes grouped navigation, breadcrumb title treatment, search and utility actions, KPI deltas, chart ramp usage, neutral status pills with semantic dots, and table actions.

Use `../../../dashboard-layout-pattern.md` and `../../../chart-data-visualization-pattern.md` as the canonical examples that interpret this kit.

## Tradeoffs

The kit optimizes for repeated operational scanning rather than marketing impact. It may be too dense for simple public pages.

## Common Mistakes

- Copying the dashboard shell for non-operational content.
- Using status colors as decorative table fills.
- Omitting loading, empty, stale, or partial-failure dashboard states.

## Related Documents

- `../../../dashboard-layout-pattern.md`
- `../../../chart-data-visualization-pattern.md`
- `../../../../../design.md`
