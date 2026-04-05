---
docId: design-demos
slug: demos
major: 1
semanticVersion: 1.0.0
status: stable
publishedAt: 2026-04-05
---
# APT Demo Design

Patterns for demo pages and interactive examples.

## Demo Layout

Use `DemoLayout` and `DemoSection` for structured demos:

```tsx
<DemoLayout
  title="Component Name"
  description="What this demonstrates"
>
  <DemoSection title="Variant Name">
    {/* Demo content */}
  </DemoSection>
</DemoLayout>
```

## Decision Blocks

Show architectural decisions:

```tsx
<DecisionBlock
  title="Key Decisions"
  decisions={[
    "First decision with rationale",
    "Second decision with context",
  ]}
/>
```

## Limitation Notices

Surface known constraints:

```tsx
<LimitationNotice
  title="Known Limitations"
  limitations={[
    "Limitation with context",
    "Another constraint",
  ]}
/>
```

## Demo Page Structure

1. **Title + Description** - What this demo covers
2. **Live Demo** - Interactive elements
3. **Decisions** - Why it's built this way
4. **Limitations** - What it doesn't do
5. **Related** - Links to docs/labs/systems

## Code Examples

When showing code:

```tsx
<div className="p-4 rounded-lg bg-muted/50 font-mono text-sm">
  {/* Code block */}
</div>
```

## Testing Patterns

The `/design` route is the design playground:
- All component variants
- Stress tests (long content)
- Normalized ID catalog

