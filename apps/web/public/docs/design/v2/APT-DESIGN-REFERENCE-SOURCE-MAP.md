---
docId: design-reference-source-map
slug: design-reference-source-map
major: 2
semanticVersion: 2.0.0
status: candidate
publishedAt: 2026-08-02
---
# APT Design Reference Source Map

This document maps useful material from `apt-design-reference` into the public APT design reference without turning the old bundle into a second source of truth.

`applied-practical-thinking` owns the public design reference, examples, and visual explanation. `apt-principles-agents` owns reusable doctrine, standards, prompts, skills, agent instructions, lint gates, and token contracts.

---

## Source Roles

| Source material | Public role in this site | Canonical upstream role |
| --- | --- | --- |
| `apt-design-reference/README.md` | Public explanation of APT visual signature, content voice, surface families, and example taxonomy. | Generalized rules belong in `apt-principles-agents/principles/design/README.md`. |
| `apt-design-reference/colors_and_type.css` | Evidence for token values and design examples after reconciliation with runtime CSS and token contracts. | Token semantics belong in `apt-principles-agents/references/design-tokens.json`. |
| `apt-design-reference/preview/*.html` | Public specimen cards for foundations and components when converted into authored docs or examples. | Reusable pattern expectations belong in examples, lint gates, and checklists. |
| `apt-design-reference/ui_kits/*` | Public examples for portfolio, docs, insights, dashboard, account, product, email, pattern, and primitive surfaces. | Durable behavior rules belong in APT design doctrine and review standards. |
| `apt-design-reference/assets/*` | Public image and cover-art examples when provenance and ownership are clear. | Asset usage rules belong upstream; personal/public assets stay local to the public site. |
| `apt-design-reference/SKILL.md` | Not public site doctrine by default. Useful only as curated external AI guidance when made provider-neutral. | Agent-facing design instructions belong in `apt-principles-agents` context packs, prompts, and platform adapters. |
| Generated bundles, standalone HTML, screenshots, uploads | Evidence only unless intentionally curated into a public example. | Do not promote as canonical source. |

---

## Public Reference Topics To Carry Forward

### Visual Identity

The public site should preserve APT's visible identity:

- dark-first navy surface
- restrained cosmic background treatment
- primary blue for brand, links, focus, and default actions
- restricted teal for support semantics, success, badges, selected support states, and chart accents
- Inter for UI/prose and IBM Plex Mono for technical material
- AptEmblem as the coded brand mark
- Lucide-style outline icons
- calm motion and subtle hover lift

These rules are already represented in the public design system and token docs. Future updates should reconcile claims against runtime source before publishing.

### Content Voice

The public reference should keep APT copy precise, technical, calm, and non-marketing.

Good public design-reference copy explains what a pattern does, when to use it, what can go wrong, and what evidence validates it. It should avoid hype, unsupported claims, decorative emoji, and generic portfolio language.

### Surface Families

The design reference should expose surface families that people can inspect and reuse:

- portfolio and product pages
- insights/content browsers
- docs/principles browsers
- dashboard/admin consoles
- account/auth/settings flows
- transactional email
- feedback and route-level error patterns
- shared primitives for navigation, controls, disclosure, feedback, and technical content

Each surface should explain its user job, states, tradeoffs, and source evidence.

---

## Migration Priority

1. Keep canonical doctrine and token semantics synchronized from `apt-principles-agents`.
2. Convert high-signal preview and UI-kit guidance into authored design docs or pattern docs.
3. Add public examples only when they have clear source, state coverage, and validation expectations.
4. Avoid copying generated bundles, screenshots, or one-off standalone exports as maintained source.
5. Revisit whether `apt-design-reference` remains a portable bundle after public and canonical material has landed.

---

## Public Pattern Targets

| Target area | Source evidence to evaluate |
| --- | --- |
| [`patterns/Portfolio-Surface`](./patterns/Portfolio-Surface/index.md) | `ui_kits/portfolio`, cosmic background, emblem, nav header/footer, card anatomy |
| [`patterns/Docs-Browser`](./patterns/Docs-Browser/index.md) | `ui_kits/docs`, code block, pagination, nav header, tabs, inline alerts |
| [`patterns/Insights-Surface`](./patterns/Insights-Surface/index.md) | `ui_kits/insights`, imagery, tags, tabs, content cover assets |
| `patterns/Application-Layout` | `ui_kits/portfolio`, `ui_kits/product`, `ui_kits/docs`, `ui_kits/dashboard` |
| `patterns/Feedback-Status` and `patterns/Inline-Messages` | `preview/alerts-*`, `preview/states.html`, `ui_kits/patterns`, `ui_kits/account` |
| `patterns/Forms`, `patterns/Search`, `patterns/File-Upload` | `preview/inputs.html`, `preview/dropdowns.html`, `preview/file-actions.html`, `ui_kits/primitives` |
| `patterns/Bar-Chart`, `patterns/Line-Chart`, `patterns/Heatmap`, `patterns/Dumbbell-Plot` | chart previews, dashboard and insights kits |
| future `kits/*` area | surface-level UI kit narratives if the public design reference needs full-page examples |

---

## Preview And Asset Disposition

| Source group | Decision | Reason |
| --- | --- | --- |
| `ui_kits/portfolio` | Promoted into [`patterns/Portfolio-Surface`](./patterns/Portfolio-Surface/index.md). | The kit carries a durable public-site job: identity, project browsing, proof routing, and stable Labs/Proof separation. |
| `ui_kits/docs` | Promoted into [`patterns/Docs-Browser`](./patterns/Docs-Browser/index.md). | The kit carries a durable documentation job: provenance-heavy navigation, article reading, local table of contents, and technical blocks. |
| `ui_kits/insights` | Promoted into [`patterns/Insights-Surface`](./patterns/Insights-Surface/index.md). | The kit carries a durable content job: filtered browsing, metadata, covers, and reading transitions for blogs, guides, podcasts, and case studies. |
| Foundation previews: `colors-*`, `fonts`, `type-*`, `spacing`, `radii`, `elevation`, `motion`, `emblem`, `cosmic-background` | Keep as read-only evidence until token and identity docs are fully reconciled; do not copy as maintained source. | Current public token and design-system docs already own the authored guidance. These previews are useful for visual regression examples, not canonical definitions. |
| Component previews: `accordion`, `buttons`, `card-anatomy`, `dropdowns`, `file-actions`, `inputs`, `pagination`, `selection-controls`, `stepper`, `tabs`, `tags`, `badges-status`, `states`, `nav-*`, `code-block` | Keep as specimen evidence; promote selectively only when a pattern doc needs concrete examples. | Most durable guidance is already represented by existing pattern docs or should be captured as examples under those docs, not as standalone HTML. |
| Feedback previews: `alerts-inline`, `alerts-toast`, `states` | Keep as evidence for Feedback Status and Inline Messages. | These examples are useful for state coverage, but public docs should describe intent, severity, recovery, and accessibility instead of preserving static demo pages. |
| Chart previews: `chart-*` | Keep as evidence for chart pattern docs. | Chart source value is in palette, comparison, ranking, and trend semantics; examples should stay tied to authored chart guidance. |
| `imagery.html` and `assets/profile.jpg` | Do not copy in this pass. | Personal/public identity assets already exist in the public site; any future copy should confirm provenance and desired canonical owner. |
| Blog cover assets: `blog-ai-developers-journey.webp`, `blog-creative-coding.webp`, `blog-decision-driven.webp`, `blog-feedback-multiplier.webp` | Do not copy in this pass. | Equivalent public content assets already exist or are generated by the current content pipeline. |

Decision: the requested `apt-design-reference` material has no remaining app source that should be merged wholesale. Keep the repo temporarily as a frozen evidence bundle only, then replace it with an archive pointer once preview specimens and asset provenance are either promoted into authored docs or explicitly declined.

---

## Split Decision

This pass promotes the high-value public surface kits into authored pattern docs rather than copying kit code:

- `ui_kits/portfolio` becomes the Portfolio Surface pattern.
- `ui_kits/docs` becomes the Docs Browser pattern.
- `ui_kits/insights` becomes the Insights Surface pattern.
- `preview/*` remains source evidence for pattern-specific examples and future component specimen pages.
- `assets/profile.jpg` and the blog cover `.webp` files are not copied in this pass because equivalent public assets already exist or are generated from current content.

Remaining `apt-design-reference` source is worth keeping temporarily as a portable evidence bundle until primitives, preview specimens, and any truly source-worthy assets are either promoted or explicitly declined. After that, the source repo can become a pointer/archive repo unless a real portable-bundle consumer still exists.

---

## Non-Goals

- Do not make this site the canonical doctrine source.
- Do not import generated `apt-design-reference` bundles as authored source.
- Do not publish private or tool-specific agent instructions as public guidance without curation.
- Do not change runtime tokens from the design bundle without checking `apps/web/index.css`, `packages/config/src/aptTokens.ts`, and `apps/web/docs/design/static/APT-TOKENS-CONTRACT.json`.

---

## Related Documents

- [APT Design Overview](./APT-DESIGN-OVERVIEW.md)
- [APT Design System](./APT-DESIGN-SYSTEM.md)
- [APT Tokens](./APT-TOKENS.md)
- [APT Content Naming and Messaging](./APT-CONTENT-NAMING-AND-MESSAGING.md)
- [APT Design Architecture](./APT-DESIGN-ARCHITECTURE.md)
