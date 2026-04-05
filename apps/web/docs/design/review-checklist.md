# APT Design Review Checklist

Use this checklist before merging design changes.

For an AI-usable and broader review contract that covers IA, design system usage, architecture boundaries, systems, and content strategy, start with `APT-REVIEW-STANDARD.md` in this same folder.

## Colors

- [ ] All colors use semantic tokens (no raw colors)
- [ ] Text has sufficient contrast against background
- [ ] Accent color used sparingly (one per section max)
- [ ] Dark mode is the primary experience

## Typography

- [ ] Hierarchy is clear (one H1, logical heading structure)
- [ ] Body text uses `text-muted-foreground` for secondary content
- [ ] No decorative fonts
- [ ] Line heights ensure readability

## Layout

- [ ] Uses `container` class for consistent max-width
- [ ] Responsive breakpoints tested (mobile, tablet, desktop)
- [ ] Cards use consistent padding (`p-6` or `p-8`)
- [ ] Spacing follows the design scale

## Components

- [ ] Uses APT components (`AptButton`, `AptCard`, etc.)
- [ ] Button variants match action importance
- [ ] Interactive elements have hover states
- [ ] Tags/badges use consistent semantics: area identity, item type, meta role, status, and supporting taxonomy are visually distinct
- [ ] Tag-like metadata uses `AptTag` instead of route-level custom pills or raw uppercase label text
- [ ] `ghost` tags are only used for intentionally de-emphasized inline labels, not for core semantic chips
- [ ] Native `<button>` is reserved for low-level accessible controls (tabs, menus, toggles); user-facing action controls use `AptButton`

## Motion

- [ ] Animations are calm (fade, slide, lift only)
- [ ] Duration is 200-400ms
- [ ] Easing uses `ease-out`
- [ ] No jarring or distracting motion

## Content

- [ ] Copy is concise and non-marketing
- [ ] Titles are action-oriented
- [ ] Descriptions explain the "what" in one sentence
- [ ] Links are clearly labeled

## Accessibility

- [ ] Interactive elements are keyboard accessible
- [ ] Focus states are visible
- [ ] Text alternatives for icons where needed
- [ ] Color is not the only differentiator

## Footer

- [ ] Contains "APT — Applied Practical Thinking"
- [ ] Contains disclaimer
- [ ] Applied Gallery link present

---

# APT New Project Checklist (2026-01-25)

- [x] Repo structure follows pattern (see apps/web, apps/worker, packages)
- [x] README with setup and architecture instructions
- [x] CI/CD pipeline placeholder (pnpm-workspace.yaml, wrangler.toml)
- [x] Branch protection and CODEOWNERS defined
- [x] API contracts documented for active web/worker setup
- [x] AI prompts versioned in apps/web/ai/prompts

# Deployment Checklist
- [ ] Environment variables configured (N/A for static)
- [ ] Secrets in secure storage (N/A for static)
- [ ] Health checks passing (N/A for static)
- [ ] Error monitoring enabled (N/A for static)
- [ ] Performance baseline captured (TBD)

# Architecture Decision Checklist
- [x] Problem clearly stated
- [x] Alternatives considered
- [x] Tradeoffs documented
- [x] Decision recorded in log
- [x] Team notified (see CODEOWNERS)
