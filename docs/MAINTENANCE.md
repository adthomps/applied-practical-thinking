# Maintenance

This guide explains how to add or edit content in all major areas of the APT monorepo. Follow these instructions to keep the site, docs, and system up to date and consistent.

---

## 1. Site Content & Pages

### Add/Edit Site Pages
- All site-facing pages live in `apps/web/routes/`.
- To add a new page:
  1. Create a new file/component in `apps/web/routes/`.
  2. Add the route to the router in `apps/web/src/App.tsx`.
  3. Add a navigation item in `apps/web/data/site.ts` if needed.
- To edit a page, update the relevant file in `apps/web/routes/`.

### Manage Start (Home) and About Pages
- The Start (Home) page is typically `apps/web/routes/index.tsx` or `home.tsx`.
- The About page is usually `apps/web/routes/about.tsx`.
- To edit content, update the respective file/component.
- For structured content (hero, intro, etc.), check `apps/web/data/site.ts` or similar data files.
- Images and assets for these pages should be placed in `apps/web/public/images/`.

### Manage Header and Footer
- The header and footer components are in `apps/web/components/apt/` (e.g., `AptHeader.tsx`, `AptFooter.tsx`).
- To edit navigation links, branding, or layout, update these components.
- Navigation items are often sourced from `apps/web/data/site.ts`.
- For global changes (e.g., logo, links), update both the component and the relevant data file.

### Add/Edit Content Registries
- Content such as labs, systems, blog posts, and case studies are defined in TypeScript files in `apps/web/data/`:
  - `labs.ts`, `systems.ts`, `learn.ts`, `strong.ts`, etc.
- To add a new item, export a new object in the relevant file.
- To edit, update the object in place.

---

## 2. Portfolio Content (Labs, Design System, Design Thinking, Architecture, Demos, Gallery)

Portfolio sections are managed as structured data and/or Markdown in `apps/web/data/` and `apps/web/content/`.

### Labs
- All lab entries are in `apps/web/data/labs.ts`.
- To add a lab, export a new object with fields like `title`, `slug`, `summary`, `image`, `content`, etc.
- For detailed content, reference a Markdown file in `apps/web/content/labs/`.
- Place images in `apps/web/public/images/labs/` and reference in the object.

### Design System
- Documented in `apps/web/docs/design/` and tokens in `packages/config` and `apps/web/theme/aptTokens.ts`.
- To add a new design system doc, create a Markdown file in `apps/web/docs/design/`.
- To update tokens, edit the relevant files and log changes in `decision-log.md`.

### Design Thinking
- Add or edit content in `apps/web/data/` (e.g., `designThinking.ts` if present) or as Markdown in `apps/web/content/design-thinking/`.
- Add new Markdown files for guides, principles, or frameworks.

### Design Architecture
- Architecture docs live in `apps/web/docs/design/` (e.g., `APT-DESIGN-ARCHITECTURE.md`).
- Add new architecture docs as Markdown files in this folder.
- Update diagrams/images in `apps/web/public/images/architecture/`.

### Live Demos
- Demo entries are in `apps/web/data/demos.ts` (if present).
- Add a new demo object with fields like `title`, `slug`, `url`, `description`, `image`, etc.
- For embedded demos, add the relevant code/component in `apps/web/routes/` or `apps/web/components/`.

### Gallery
- Gallery items are in `apps/web/data/gallery.ts` (if present) or as Markdown in `apps/web/content/gallery/`.
- Add new images to `apps/web/public/images/gallery/`.
- Reference images and metadata in the data file.

---

## 3. Insights Content (Blogs, Podcasts, Guides, Case Studies)

All insights content is managed as structured data in `apps/web/data/` and associated Markdown or image files.

### Add/Edit a Blog, Podcast, or Guide
- **Registry:**
  - Add a new entry to the appropriate registry file:
    - Blogs/guides: `apps/web/data/learn.ts`
    - Case studies: `apps/web/data/strong.ts`
  - Each entry is a TypeScript object with fields like `title`, `slug`, `summary`, `date`, `image`, `content`, etc.
- **Content:**
  - For long-form content, reference a Markdown file in the object (e.g., `content: require('../content/guides/my-guide.md')`).
  - Place Markdown files in `apps/web/content/guides/`, `apps/web/content/blog/`, etc.
  - Edit the Markdown file to update the text, formatting, and links.
- **Images:**
  - Place images in `apps/web/public/images/` or a relevant subfolder.
  - Reference the image path in the registry object (e.g., `image: '/images/my-guide-cover.png'`).
- **Metadata:**
  - Fill out all required fields in the registry object (title, date, tags, etc.) for proper display and filtering.
- **Edit Existing Content:**
  - Update the registry object and/or the Markdown file as needed.
  - Replace or update images as required.

### Example: Adding a New Guide
1. Add a new Markdown file: `apps/web/content/guides/my-new-guide.md`
2. Add an entry to `apps/web/data/learn.ts`:
   ```ts
   export const guides = [
     // ...existing guides,
     {
       title: 'My New Guide',
       slug: 'my-new-guide',
       summary: 'A short summary of the guide.',
       date: '2026-01-25',
       image: '/images/guides/my-new-guide.png',
       content: require('../content/guides/my-new-guide.md'),
       tags: ['insight', 'how-to']
     }
   ];
   ```
3. Place any images in `apps/web/public/images/guides/` and reference them in the object.
4. Edit the Markdown file for the full text and formatting.

---

## 4. Documentation

### Internal Docs
- All internal process/guardrail docs are in `docs/` at the repo root.
- Update or add files as needed (see `DOCUMENTATION_INDEX.md` for a list).

### Site Docs (User-Facing)
- All user-facing docs (guides, help, etc.) are in `apps/web/docs/`.
- Add new Markdown files for new guides or help pages.
- Edit existing files to update content.

---

## 5. Design System

- All design tokens are in `packages/config` and `apps/web/theme/aptTokens.ts`.
- To update tokens, edit these files and document changes in `apps/web/docs/design/decision-log.md`.
- All UI components should use Apt* components from `apps/web/components/apt/`.
- For new design patterns, update docs in `apps/web/docs/design/`.

---

## 6. AI Prompts & Agents

- All AI prompt files are in `apps/worker/src/ai/prompts/`.
- To add a new prompt, create a new file in this folder and version it.
- To edit a prompt, update the file and increment the version if needed.
- All agent logic should be in `apps/worker/src/ai/` and reference prompt files.
- Document all changes in the relevant agent or prompt doc.

---

## 7. Business Logic & Shared Packages

- All business logic and data adapters are in `packages/core`.
- Shared UI components: `packages/ui`
- Shared utilities: `packages/utils`
- Only update these with reviewed, tested changes.

---

## 8. Review & Logging

- All changes to design, prompts, or business logic must be reviewed.
- Log all design deviations in `apps/web/docs/design/decision-log.md`.
- For major changes, update `DOCUMENTATION_INDEX.md` and relevant docs.

---

## 9. Dependency & Tooling Updates

- Update dependencies with `pnpm update`.
- For new tools or scripts, document usage in `README.md` or `QUICK_REFERENCE.md`.

---

## 10. General Tips

- Never commit secrets or credentials.
- Keep docs and code in sync.
- Use only semantic tokens for colors/styles.
- Follow patterns in `PATTERNS.md` and guardrails in `PROJECT_RULES.md`.
