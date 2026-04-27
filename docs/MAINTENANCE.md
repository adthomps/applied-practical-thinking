---
title: Maintenance
version: v2
status: candidate
audience: developer
visibility: public
source: manual
---
# Maintenance

This guide explains how to add or edit content in all major areas of the APT monorepo. Follow these instructions to keep the site, docs, and system up to date and consistent.

---

## 1. Site Content & Pages

### Add/Edit Site Pages
- All site-facing pages live in `apps/web/routes/`.
- To add a new page:
  1. Create a new file/component in `apps/web/routes/`.
  2. Add the route to the router in `apps/web/App.tsx`.
  3. Add a navigation item in `apps/web/data/site.ts` if needed.
- To edit a page, update the relevant file in `apps/web/routes/`.


### Manage Home, Start, and About Pages
- The Home page route is `apps/web/routes/Home.tsx`.
- The Start page route is `apps/web/routes/Start.tsx`.
- The About page route is `apps/web/routes/About.tsx`.
- To edit content, update the respective file/component.
- For structured content (hero, intro, etc.), check `apps/web/data/site.ts` or similar data files.
- Images and assets for authored markdown content should be placed in `apps/web/public/content/<type>/<slug-or-filename>/`.
- Global shell assets can live directly under `apps/web/public/` (for example `profile.jpg`).

---

## Asset Management for Content Types

For all content types (articles, podcasts, guides, design reviews, labs, demos):

- **Local images, audio, and video files** referenced in markdown must be placed in:
  - `apps/web/public/content/<type>/<slug-or-filename>/`
  - Example: For a blog post at `apps/web/content/blog/my-post.md`, images go in `apps/web/public/content/blog/my-post/my-image.png`.
  - For podcasts, local audio files (e.g., `.mp3`) should be in `apps/web/public/content/podcasts/<episode>/`.
  - For demos or guides with local video, use `apps/web/public/content/demos/<demo>/` or `apps/web/public/content/guides/<guide>/`.
- **Reference these assets in markdown** using relative paths (e.g., `![](./my-image.png)`), which resolve to `/content/<type>/<slug>/my-image.png` at runtime.
- **External media** (YouTube, etc.): Use full URLs or embed code (e.g., `<iframe>`) directly in markdown. No need to download or host these externally embedded assets.

#### Asset Path Summary Table

| Content Type | Local Asset Path Example                                      | Reference in Markdown Example                |
|--------------|--------------------------------------------------------------|----------------------------------------------|
| blog         | public/content/blog/my-post/my-image.png                      | ![](./my-image.png)                          |
| podcast      | public/content/podcasts/episode-1/episode.mp3                 | [audio](./episode.mp3)                       |
| guides       | public/content/guides/my-guide/diagram.png                    | ![](./diagram.png)                           |
| design reviews | public/content/design-reviews/review-xyz/cover.jpg            | ![](./cover.jpg)                             |
| labs         | public/content/labs/lab-abc/screenshot.png                    | ![](./screenshot.png)                        |
| demos        | public/content/demos/demo-123/demo-video.mp4                  | [video](./demo-video.mp4)                    |

For gallery assets, prefer `apps/web/data/gallery.ts` links (external or hosted) and only add local static files under `apps/web/public/` when needed.

### Content Authoring Checklist (Keep Things Consistent)
- Create the markdown file under `apps/web/content/<type>/` with correct frontmatter (`id`, `type`, `title`, `description`, `publishedAt`, etc.).
- If you want buttons/links in the detail page sidebar, add a `links:` map in frontmatter (keys are flexible; common ones: `demo`, `repo`, `figma`, `website`, `article`, `youtube`, `spotify`, `transcript`).
- Run the index build when adding/changing content: `pnpm --dir apps/web run build-content-index`.
- Put all local assets for that entry under `apps/web/public/content/<type>/<id-or-slug>/`.
- In markdown, reference local assets with relative paths (e.g., `![](./diagram.png)`, `[audio](./episode.mp3)`).
- Keep `contentPath` pointing to the markdown file path under `/content/...` (this is what enables relative asset resolution).

#### Example (Guide with One Image)
1. Create: `apps/web/content/guides/my-new-guide.md`
2. Add an image at: `apps/web/public/content/guides/my-new-guide/diagram.png`
3. Reference it in markdown as: `![](./diagram.png)`

---

### Manage Header and Footer
- The header and footer components are in `apps/web/components/apt/` (e.g., `AptHeader.tsx`, `AptFooter.tsx`).
- To edit navigation links, branding, or layout, update these components.
- Navigation items are often sourced from `apps/web/data/site.ts`.
- For global changes (e.g., logo, links), update both the component and the relevant data file.

### Add/Edit Content Registries
Systems references are maintained in `apps/web/data/systems.ts`.
Labs, demos, and learn content are authored as markdown and indexed by script output in `apps/web/data/*-index.json`.
For articles, podcasts, guides, and design reviews, each entry is a Markdown file with YAML frontmatter in `apps/web/content/{blog,guides,podcasts,design-reviews}/`.
To add a new item, create a new Markdown file in the appropriate folder with the required frontmatter fields (see below).
To edit, update the Markdown file directly.

---

## 2. Portfolio Content (Labs, Design System, Design Thinking, Architecture, Demos, Gallery)

Portfolio sections are managed as structured data and/or Markdown in `apps/web/data/` and `apps/web/content/`.


### Labs
- Lab entries are authored in `apps/web/content/labs/` as markdown with frontmatter.
- To add a lab, create a markdown file with `id`, `slug`, `title`, `description`, `publishedAt`, and related metadata.
- Place images, audio, or video for labs in `apps/web/public/content/labs/<slug>/` and reference them in the object or markdown.

### Design System
- Documented in `apps/web/docs/design/versions/v2/` with shared token contracts in `packages/config` (`apps/web/theme/aptTokens.ts` is the compatibility re-export).
- To add or update a governed design-system doctrine doc, edit `apps/web/docs/design/versions/v*/...` and update manifest metadata.
- To add or update support contracts (lint/review bundle/tokens reference), edit `apps/web/docs/design/static/...`.
- To update tokens, edit the relevant files and log changes in `docs/DECISION_LOG.md`.

### Design Thinking
- Add or edit framework metadata in `apps/web/data/designThinkingFrameworks.tsx`.
- Add doctrine/source material in `apps/web/docs/design/versions/v*/` when the change is part of governed design docs.

### Design Architecture
- Architecture doctrine lives in `apps/web/docs/design/versions/v2/` (e.g., `APT-DESIGN-ARCHITECTURE.md`).
- Add new governed architecture docs in `versions/v*/` and keep support contracts in `static/`.
- Store associated media in `apps/web/public/content/` or `apps/web/public/` and reference those stable paths from docs/pages.


### Live Demos
- Demo entries are authored in `apps/web/content/demos/` as markdown with frontmatter.
- Add a new demo markdown file with fields like `title`, `slug`, `description`, links, and media metadata.
- For embedded demos, add the relevant code/component in `apps/web/routes/` or `apps/web/components/`.
- Place images, audio, or video for demos in `apps/web/public/content/demos/<slug>/` and reference them in the object or markdown.


### Gallery
- Gallery items are in `apps/web/data/gallery.ts`.
- Add new local media under `apps/web/public/` only when external hosted assets are not appropriate.
- Reference images and metadata in the data file.

---

## 3. Insights Content (Articles, Podcasts, Guides, Design Reviews)

All Learn content (articles, podcasts, guides, design reviews) is managed as Markdown files with YAML frontmatter in their respective folders under `apps/web/content/`.


### Add/Edit an Article, Podcast, Guide, or Design Review
- **Content:**
  - Each entry is a Markdown file in the appropriate folder:
    - Articles: `apps/web/content/blog/`
    - Guides: `apps/web/content/guides/`
    - Podcasts: `apps/web/content/podcasts/`
    - Design reviews: `apps/web/content/design-reviews/`
  - The file must start with YAML frontmatter containing fields like `title`, `id`, `type`, `description`, `publishedAt`, and any other relevant metadata (see below for example).
  - The body of the file is the full content, using Markdown formatting.
- **Images, Audio, Video:**
  - Place images, audio, or video in `apps/web/public/content/<type>/<slug-or-filename>/`.
  - Reference the asset path in the frontmatter or within the Markdown content as needed (e.g., `![](./my-image.png)`).
- **External Media:**
  - For YouTube or other external videos, use the full URL or embed code directly in markdown.
- **Metadata:**
  - Fill out all required frontmatter fields for proper display and filtering.
- **Edit Existing Content:**
  - Update the Markdown file as needed.
  - Replace or update assets as required.

#### Example: Adding a New Guide
1. Add a new Markdown file: `apps/web/content/guides/my-new-guide.md`
2. Use this template:
   ```markdown
   ---
   title: "My New Guide"
   id: "my-new-guide"
   type: "guide"
   description: "A short summary of the guide."
   publishedAt: "2026-01-25"
   concepts:
     - insight
     - how-to
   ---

   # My New Guide

   Full content goes here...
   ```
3. Place any images in `apps/web/public/content/guides/my-new-guide/` and reference them in the Markdown file (e.g., `![](./diagram.png)`).
4. Edit the Markdown file for the full text and formatting.

#### Indexing and Dynamic Loading
- Index files for each content type are generated automatically by a Node.js script that parses Markdown frontmatter.
- The app loads content dynamically from these indexes; do not manually edit index files.

#### Detail Pages Architecture
- Detail pages (Insights, Labs, Demos) all use the same pipeline: `useContentDetail` (loads index + markdown), `MarkdownContent` (renders markdown with correct relative asset resolution), and `ContentDetailPage` (shared layout shell with slots for type-specific UI).
- When adding a new content type detail page, prefer composing slots (e.g., media player, meta blocks, custom actions) instead of copy/pasting a new layout.

---

## 4. Documentation

### Internal Docs
- All internal process/guardrail docs are in `docs/` at the repo root.
- Update or add files as needed (see `DOCUMENTATION_INDEX.md` for a list).

### Site Docs (User-Facing)
- APT design doctrine source lives in `apps/web/docs/design/versions/` (governed docs) and `apps/web/docs/design/static/` (support contracts), with `APT-DESIGN-DOCS-MANIFEST.json` as control plane.
- Public learning/content markdown lives in `apps/web/content/`.
- Generated runtime copies in `apps/web/public/docs/` and `apps/web/public/content/` should not be edited as authored source.

### Design Doctrine Versioning (v1+)
- Use the unified policy in `apps/web/docs/design/static/APT-DESIGN-VERSIONING.md` for thinking, system, architecture, systems, strategy, review standard, and AI review bundle artifacts.
- Classify every change as semantic major, minor, or patch before publishing.
- For major and minor updates, add a decision entry in `docs/DECISION_LOG.md` with rationale and consequences.
- Publish canonical public docs under `/docs/design/v{major}/` and keep `/docs/design/*` aliases pointed to the latest stable major.
- Update the design docs manifest and AI bundle metadata together so API and UI consumers see consistent version data.
- Do not add source alias files at `apps/web/docs/design/` root; aliases are publish-generated output only.
- Do not edit files in `apps/web/public/docs/design/` manually; regenerate from source and scripts.

---

## 5. Design System

- Shared design tokens are authored in `packages/config`, with `apps/web/theme/aptTokens.ts` kept as the compatibility re-export.
- To update tokens, edit these files and document changes in `docs/DECISION_LOG.md`.
- All UI components should use Apt* components from `apps/web/components/apt/`.
- For new design patterns, update governed doctrine in `apps/web/docs/design/versions/v*/...` and support contracts in `apps/web/docs/design/static/...`.

---

## 6. AI Prompts & Agents

- All AI prompt files are in `apps/web/ai/prompts/`.
- To add a new prompt, create a new file in this folder and version it.
- To edit a prompt, update the file and increment the version if needed.
- All agent logic should live below `apps/worker/src/ai/`; worker route handlers should stay thin.
- Shared request/response/domain contracts belong in `packages/knowledge`.
- Agent and prompt changes must preserve auth, validation, and route boundaries.
- Local prompt ownership is documented in `apps/web/ai/README.md`.
- Canonical APT-wide AI-agent doctrine lives in `apt-principles/ai-agent-framework.md` and is published at `/docs/apt/ai-agent-framework.md`.

---

## 7. Business Logic & Shared Packages

- Shared content/domain/assistant contracts are in `packages/knowledge`, and reusable UI primitives are in `packages/ui`.
- Shared UI components: `packages/ui`
- Shared utilities: `packages/utils`
- Only update these with reviewed, tested changes.

---

## 8. Review & Logging

- All changes to design, prompts, or business logic must be reviewed.
- Design review uses `apps/web/docs/design/static/APT-REVIEW-STANDARD.md` plus the canonical APT design checklist in `apt-principles/checklists/design-review-checklist.md`.
- Security review uses canonical APT security doctrine and checklist in `apt-principles/security.md` and `apt-principles/checklists/security-review-checklist.md`.
- Quality review uses canonical APT quality/testing doctrine and checklist in `apt-principles/quality-testing.md` and `apt-principles/checklists/quality-testing-checklist.md`.
- Log all durable design, architecture, security, release, or operational deviations in `docs/DECISION_LOG.md`.
- For major changes, update `DOCUMENTATION_INDEX.md` and relevant docs.

---

## 9. Dependency & Tooling Updates

- Update dependencies with `pnpm update`.
- For new tools or scripts, document usage in `README.md` or `QUICK_REFERENCE.md`.

---

## 10. General Tips

- Never commit secrets or credentials.
- Manage secrets through Cloudflare environment bindings and document binding names in `docs/PLATFORM_IDS.md`.
- Validate external inputs at worker route boundaries before calling services or AI/runtime dependencies.
- Keep docs and code in sync.
- Use only semantic tokens for colors/styles.
- Follow local guardrails in `PROJECT_RULES.md` and APT-wide doctrine in `apt-principles`.
