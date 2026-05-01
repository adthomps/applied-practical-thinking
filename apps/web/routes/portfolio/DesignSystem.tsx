import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Palette,
  Type,
  Box,
  Sparkles,
  Layout,
  MonitorSmartphone,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Download,
  Eye,
} from "lucide-react";
import {
  AptButton,
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptCardContent,
  AptTag,
  DesignDocVersionSwitcher,
  AptEmblem,
  ReviewBundleCallout,
  SectionIntro,
  ValidationStatusCallout,
} from "@/components/apt";
import { ContrastChecker } from "@/components/apt/ContrastChecker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getWorkerApiConfigError, tryGetWorkerApiUrl } from "@/src/services/api";
import { useDesignDocVersion } from "@/hooks/useDesignDocVersion";
import { downloadWorkerMarkdown } from "@/src/services/download";
import { downloadWorkspaceKnowledge } from "@/src/services/workspaceKnowledge";

function ColorSwatch({ name, cssVar, className }: { name: string; cssVar: string; className: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(cssVar);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AptButton
      type="button"
      onClick={handleCopy}
      variant="ghost"
      className="group flex h-auto w-full flex-col items-start justify-start p-0 text-left"
    >
      <div className={`mb-2 h-16 w-full rounded-lg border border-border ${className} transition-transform group-hover:scale-[1.02]`} />
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-muted-foreground font-mono">{cssVar}</p>
      {copied && <p className="text-xs text-muted-foreground">Copied!</p>}
    </AptButton>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto text-sm">
        <code className="text-foreground">{code}</code>
      </pre>
      <AptButton
        type="button"
        onClick={handleCopy}
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 bg-background/80 border border-border"
      >
        {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
      </AptButton>
    </div>
  );
}

function Section({ id, title, description, children }: { id: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <SectionIntro title={title} description={description} className="mb-6" />
      {children}
    </section>
  );
}

export default function PortfolioDesignSystem() {
  const systemVersion = useDesignDocVersion("system");
  const systemDocUrl = tryGetWorkerApiUrl(systemVersion.downloadApiPath);
  const systemPublishedDocUrl = systemVersion.canonicalPath || null;
  const checklistCanonicalMajor = systemVersion.activeMajor || systemVersion.latestMajor;
  const checklistPublishedDocUrl = checklistCanonicalMajor
    ? `/docs/design/v${checklistCanonicalMajor}/APT-DESIGN-SYSTEM-LINT-CHECKLIST.md`
    : null;
  const configError = getWorkerApiConfigError();
  const handleSystemMarkdownDownload = async () => {
    const majorSuffix = systemVersion.activeMajor ? `-v${systemVersion.activeMajor}` : "";
    await downloadWorkerMarkdown(systemVersion.downloadApiPath, `apt-design-system${majorSuffix}.md`);
  };
  const handleWorkspaceKnowledgeDownload = () => {
    downloadWorkspaceKnowledge("design-system");
  };
  const sections = [
    { id: "philosophy", label: "Philosophy", icon: Sparkles },
    { id: "colors", label: "Colors", icon: Palette },
    { id: "contrast", label: "Contrast", icon: Eye },
    { id: "typography", label: "Typography", icon: Type },
    { id: "spacing", label: "Spacing", icon: Layout },
    { id: "responsive", label: "Responsive", icon: MonitorSmartphone },
    { id: "components", label: "Components", icon: Box },
    { id: "animations", label: "Animations", icon: Sparkles },
  ];

  return (
    <div className="container py-12 md:py-16">
      {/* Hero */}
      <SectionIntro
        title="APT Design System"
        description="A dark-first, card-based design system built for clarity, consistency, and calm. This route is the portfolio's visual implementation guide for tokens, semantics, components, and constraints."
        titleClassName="text-3xl md:text-4xl"
        descriptionClassName="text-lg"
        eyebrow={
          <div className="flex items-center gap-3">
            <AptTag variant="primary">Design System</AptTag>
          </div>
        }
        className="mb-12"
      >
        <div className="flex flex-wrap gap-3">
          <AptButton asChild>
            <a href="/docs/design/APT-TOKENS.json" download>
              <Download className="h-4 w-4" />
              Download Tokens
            </a>
          </AptButton>
          <AptButton variant="outline" type="button" onClick={handleWorkspaceKnowledgeDownload}>
            <Download className="h-4 w-4" />
            Download Workspace Knowledge
          </AptButton>
          <AptButton variant="outline" asChild>
            <Link to="/design-playground">
              Open Playground
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
          {systemPublishedDocUrl ? (
            <AptButton variant="outline" asChild>
              <a href={systemPublishedDocUrl} target="_blank" rel="noreferrer">
                Open Published Doc
              </a>
            </AptButton>
          ) : null}
        </div>
        <DesignDocVersionSwitcher versionState={systemVersion} />
        {!systemDocUrl && configError ? (
          <p className="text-sm text-muted-foreground mt-3">
            Configure <code>{configError.envVar}</code> on the Pages project to enable full-doc links.
          </p>
        ) : null}
      </SectionIntro>

      <section className="mb-12">
        <AptCard variant="subtle" padding="large">
          <AptCardHeader>
            <AptCardTitle className="text-xl">Design System Lint Checklist</AptCardTitle>
            <AptCardDescription>
              Critical gate checklist for design-system compliance. This is the published action surface for lint review and artifact downloads in the portfolio repo.
            </AptCardDescription>
          </AptCardHeader>
          <AptCardContent className="flex flex-wrap gap-3">
            <AptButton variant="primary" asChild>
              <a href="/docs/design/APT-DESIGN-SYSTEM-LINT-CHECKLIST.md" target="_blank" rel="noreferrer">
                Open Checklist
                <ArrowRight className="h-4 w-4" />
              </a>
            </AptButton>
            <AptButton variant="outline" asChild>
              <a href="/docs/design/APT-DESIGN-SYSTEM-LINT-CHECKLIST.md" download>
                Download Markdown
              </a>
            </AptButton>
            <AptButton variant="outline" asChild>
              <a href="/docs/design/APT-DESIGN-SYSTEM-LINT-CHECKLIST.json" download>
                Download Checklist JSON
              </a>
            </AptButton>
            {checklistPublishedDocUrl ? (
              <AptButton variant="outline" asChild>
                <a href={checklistPublishedDocUrl} target="_blank" rel="noreferrer">
                  Open Published Version
                </a>
              </AptButton>
            ) : null}
          </AptCardContent>
        </AptCard>
      </section>

      <section className="mb-12">
        <ValidationStatusCallout />
      </section>

      {/* Quick Nav */}
      <nav className="mb-12 overflow-x-auto pb-6 border-b border-border">
        <div className="flex min-w-max flex-nowrap gap-2 sm:min-w-0 sm:flex-wrap">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1.5 rounded-md text-sm bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <section.icon className="h-4 w-4" />
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="space-y-16">
        {/* Philosophy */}
        <Section
          id="philosophy"
          title="Design Philosophy"
          description="The core principles that guide every design decision in APT."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Dark-First",
                description: "Dark mode is the primary experience. Light mode exists for completeness, never as default.",
              },
              {
                title: "Card-Based",
                description: "All content structured in semantic card containers. Cards create hierarchy and visual grouping.",
              },
              {
                title: "Calm Motion",
                description: "Only subtle, purposeful animations. 200-400ms durations, ease-out easing, no bouncing.",
              },
              {
                title: "Low-Noise",
                description: "Minimal visual clutter. Generous whitespace. Typography does the heavy lifting.",
              },
              {
                title: "One Accent",
                description: "Single accent color per section. Color is used sparingly for emphasis, never decoration.",
              },
              {
                title: "Semantic Tokens",
                description: "No raw colors. Every value references a design token for consistency and theming.",
              },
            ].map((principle) => (
              <AptCard key={principle.title} variant="subtle" padding="default">
                <AptCardHeader>
                  <AptCardTitle className="text-lg">{principle.title}</AptCardTitle>
                </AptCardHeader>
                <AptCardContent>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </AptCardContent>
              </AptCard>
            ))}
          </div>
        </Section>

        {/* Colors */}
        <Section
          id="colors"
          title="Color System"
        description="HSL-based semantic color tokens for both dark and light modes. Primary blue drives action and state emphasis; accent remains a restricted support token."
        >
          <Tabs defaultValue="dark" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="dark">Dark Mode</TabsTrigger>
              <TabsTrigger value="light">Light Mode</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dark" className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Core Colors</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  <ColorSwatch name="Background" cssVar="--background" className="bg-background" />
                  <ColorSwatch name="Foreground" cssVar="--foreground" className="bg-foreground" />
                  <ColorSwatch name="Card" cssVar="--card" className="bg-card" />
                  <ColorSwatch name="Muted" cssVar="--muted" className="bg-muted" />
                  <ColorSwatch name="Primary" cssVar="--primary" className="bg-primary" />
                  <ColorSwatch name="Secondary" cssVar="--secondary" className="bg-secondary" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Supporting Colors</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  <ColorSwatch name="Restricted Accent" cssVar="--accent" className="bg-accent" />
                  <ColorSwatch name="Border" cssVar="--border" className="bg-border" />
                  <ColorSwatch name="Ring" cssVar="--ring" className="bg-ring" />
                  <ColorSwatch name="Destructive" cssVar="--destructive" className="bg-destructive" />
                  <ColorSwatch name="Input" cssVar="--input" className="bg-input" />
                  <ColorSwatch name="Popover" cssVar="--popover" className="bg-popover" />
                </div>
              </div>

              <CodeBlock code={`/* Dark mode (default) - apps/web/index.css */
.dark {
  --background: 220 20% 8%;      /* Deep space blue */
  --foreground: 220 10% 95%;     /* Near-white text */
  --primary: 220 70% 55%;        /* Blue accent */
  --accent: 165 45% 40%;         /* Restricted support accent */
  --muted: 220 15% 15%;          /* Subdued backgrounds */
  --border: 220 15% 20%;         /* Subtle dividers */
}`} />
            </TabsContent>
            
            <TabsContent value="light" className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Core Colors (Light)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="text-left">
                    <div className="h-16 rounded-lg border mb-2 bg-background" />
                    <p className="text-sm font-medium">Background</p>
                    <p className="text-xs text-muted-foreground font-mono">HSL(220, 15%, 95%)</p>
                  </div>
                  <div className="text-left">
                    <div className="h-16 rounded-lg border mb-2 bg-foreground" />
                    <p className="text-sm font-medium">Foreground</p>
                    <p className="text-xs text-muted-foreground font-mono">HSL(220, 20%, 10%)</p>
                  </div>
                  <div className="text-left">
                    <div className="h-16 rounded-lg border mb-2 bg-card" />
                    <p className="text-sm font-medium">Card</p>
                    <p className="text-xs text-muted-foreground font-mono">HSL(0, 0%, 100%)</p>
                  </div>
                  <div className="text-left">
                    <div className="h-16 rounded-lg border mb-2 bg-primary" />
                    <p className="text-sm font-medium">Primary</p>
                    <p className="text-xs text-muted-foreground font-mono">HSL(220, 70%, 50%)</p>
                  </div>
                  <div className="text-left">
                    <div className="h-16 rounded-lg border mb-2 bg-secondary" />
                    <p className="text-sm font-medium">Secondary</p>
                    <p className="text-xs text-muted-foreground font-mono">HSL(220, 15%, 90%)</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Section>

        {/* Contrast Checker */}
        <Section
          id="contrast"
          title="Contrast Checker"
          description="WCAG 2.1 compliance verification for all color combinations."
        >
          <ContrastChecker />
        </Section>

        {/* Typography */}
        <Section
          id="typography"
          title="Typography Scale"
          description="A hierarchical type system using system fonts for performance."
        >
          <div className="space-y-8">
            <AptCard variant="default" padding="large">
              <div className="space-y-6">
                <div className="pb-4 border-b border-border">
                  <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Hero Title</p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight</p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-3xl md:text-4xl font-bold tracking-tight">Page Heading (H1)</p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">text-3xl md:text-4xl font-bold tracking-tight</p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-2xl md:text-3xl font-semibold tracking-tight">Section Heading (H2)</p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">text-2xl md:text-3xl font-semibold tracking-tight</p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-xl md:text-2xl font-semibold">Card Title (H3)</p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">text-xl md:text-2xl font-semibold</p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-lg font-semibold">Subsection (H4)</p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">text-lg font-semibold</p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-base leading-relaxed">Body text for paragraphs and content. This is the default reading size optimized for legibility.</p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">text-base leading-relaxed</p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-sm leading-relaxed text-muted-foreground">Small body text for descriptions and secondary content.</p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">text-sm leading-relaxed text-muted-foreground</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Caption text for labels and timestamps</p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">text-xs text-muted-foreground</p>
                </div>
              </div>
            </AptCard>

            <CodeBlock code={`/* Typography Tokens */
typography: {
  hero: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
  h1: "text-3xl md:text-4xl font-bold tracking-tight",
  h2: "text-2xl md:text-3xl font-semibold tracking-tight",
  h3: "text-xl md:text-2xl font-semibold",
  h4: "text-lg font-semibold",
  body: "text-base leading-relaxed",
  bodySmall: "text-sm leading-relaxed",
  caption: "text-xs text-muted-foreground",
}

/* Font Stack */
fontFamily: {
  sans: "ui-sans-serif, system-ui, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
}`} />
          </div>
        </Section>

        {/* Spacing */}
        <Section
          id="spacing"
          title="Spacing System"
          description="Consistent spacing scale for rhythm and visual hierarchy."
        >
          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <AptCard variant="subtle">
                <AptCardHeader>
                  <AptCardTitle className="text-lg">Spacing Scale</AptCardTitle>
                </AptCardHeader>
                <AptCardContent>
                  <div className="space-y-3">
                    {[
                      { name: "1", value: "0.25rem (4px)" },
                      { name: "2", value: "0.5rem (8px)" },
                      { name: "4", value: "1rem (16px)" },
                      { name: "6", value: "1.5rem (24px)" },
                      { name: "8", value: "2rem (32px)" },
                      { name: "12", value: "3rem (48px)" },
                      { name: "16", value: "4rem (64px)" },
                      { name: "24", value: "6rem (96px)" },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center gap-4">
                        <div className="w-12 text-right font-mono text-sm">{item.name}</div>
                        <div className="flex-1 h-4 bg-primary/20 rounded" style={{ width: `${parseInt(item.name) * 8}px`, maxWidth: '100%' }} />
                        <div className="text-xs text-muted-foreground font-mono">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </AptCardContent>
              </AptCard>

              <AptCard variant="subtle">
                <AptCardHeader>
                  <AptCardTitle className="text-lg">Semantic Spacing</AptCardTitle>
                </AptCardHeader>
                <AptCardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Section", value: "py-12 md:py-16", description: "Major page sections" },
                      { name: "Section Compact", value: "py-8 md:py-12", description: "Condensed sections" },
                      { name: "Card Padding", value: "p-5 to p-6", description: "Standard browse and support card interior" },
                      { name: "Card Large", value: "p-8", description: "Hero/feature cards" },
                      { name: "Gap", value: "gap-5 to gap-6", description: "Grid/flex spacing" },
                      { name: "Gap Large", value: "gap-8", description: "Larger component gaps" },
                    ].map((item) => (
                      <div key={item.name} className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                        <code className="text-xs bg-muted px-2 py-1 rounded">{item.value}</code>
                      </div>
                    ))}
                  </div>
                </AptCardContent>
              </AptCard>
            </div>

            <CodeBlock code={`/* Container Widths */
container: {
  prose: "max-w-prose",    /* 65ch - optimal reading */
  content: "max-w-4xl",    /* 896px - standard content */
  wide: "max-w-6xl",       /* 1152px - wide layouts */
  full: "max-w-7xl",       /* 1280px - full width */
}

/* Border Radius */
--radius: 0.5rem;          /* Base token */
rounded-sm  → calc(var(--radius) - 4px)
rounded-md  → calc(var(--radius) - 2px)
rounded-lg  → var(--radius)
rounded-xl  → 0.75rem
rounded-full → 9999px`} />
          </div>
        </Section>

        {/* Responsive */}
        <Section
          id="responsive"
          title="Responsive System"
          description="APT is mobile-first. Every surface should read cleanly on phones, scale deliberately on tablets, and expand with restraint on desktop."
        >
          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Mobile First",
                  range: "< 640px",
                  rules: [
                    "Single-column by default",
                    "CTAs stack or wrap without clipping",
                    "Quick nav can scroll horizontally",
                    "Tap targets stay 40px+ tall",
                  ],
                },
                {
                  title: "Tablet / Mid",
                  range: "640px - 1023px",
                  rules: [
                    "Two-column content where density helps",
                    "Cards gain width before they gain complexity",
                    "Section rhythm stays compact",
                    "Code blocks scroll, never shrink unreadably",
                  ],
                },
                {
                  title: "Desktop",
                  range: "1024px+",
                  rules: [
                    "Three-column grids only when scanning improves",
                    "Long-form reading stays width-constrained",
                    "Whitespace is deliberate, not decorative",
                    "Interactive demos stay secondary to reference content",
                  ],
                },
              ].map((breakpoint) => (
                <AptCard key={breakpoint.title} variant="subtle">
                  <AptCardHeader>
                    <AptCardTitle className="text-lg">{breakpoint.title}</AptCardTitle>
                    <AptCardDescription className="font-mono text-xs">{breakpoint.range}</AptCardDescription>
                  </AptCardHeader>
                  <AptCardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {breakpoint.rules.map((rule) => (
                        <li key={rule} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </AptCardContent>
                </AptCard>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <AptCard variant="default" padding="large">
                <AptCardHeader>
                  <AptCardTitle className="text-lg">Breakpoint Strategy</AptCardTitle>
                  <AptCardDescription>
                    Layout expands in steps. Content never depends on a desktop-only arrangement to make sense.
                  </AptCardDescription>
                </AptCardHeader>
                <AptCardContent>
                  <CodeBlock
                    code={`/* Mobile-first layout rules */
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3

/* Section rhythm */
py-12 md:py-16

/* Type scaling */
text-3xl md:text-4xl
text-xl md:text-2xl

/* Behavior rules */
- stack first, then split
- wrap controls before shrinking them
- scroll code blocks horizontally
- keep reading content width-constrained`}
                    language="css"
                  />
                </AptCardContent>
              </AptCard>

              <AptCard variant="subtle" padding="large">
                <AptCardHeader>
                  <AptCardTitle className="text-lg">Responsive Checklist</AptCardTitle>
                  <AptCardDescription>
                    The baseline checks every page or component should pass before it is considered finished.
                  </AptCardDescription>
                </AptCardHeader>
                <AptCardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>1. Hero and section headers do not create oversized vertical gaps on mobile.</p>
                    <p>2. Card metadata wraps without forcing unreadable card widths.</p>
                    <p>3. Button rows wrap cleanly and preserve clear primary/secondary order.</p>
                    <p>4. Code examples and token tables remain readable without layout breakage.</p>
                    <p>5. Desktop layouts add clarity, not extra noise or unnecessary columns.</p>
                  </div>
                </AptCardContent>
              </AptCard>
            </div>
          </div>
        </Section>

        {/* Components */}
        <Section
          id="components"
          title="Component Library"
          description="Core components with variants and interactive examples."
        >
          <div className="space-y-12">
            <AptCard variant="subtle" padding="large">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Section Card</p>
                  <p className="text-sm text-muted-foreground">
                    Large orientation cards for landing pages and top-level navigation choices.
                  </p>
                  <code className="rounded bg-muted px-2 py-1 text-xs">interactive + roomy copy + directional CTA</code>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Browse Card</p>
                  <p className="text-sm text-muted-foreground">
                    Mid-density cards for Learn, Experiments, and Systems indexes.
                  </p>
                  <code className="rounded bg-muted px-2 py-1 text-xs">interactive + icon-led header + short metadata + light footer</code>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Supporting / Detail Card</p>
                  <p className="text-sm text-muted-foreground">
                    Lower-emphasis cards for sidebars, snapshots, related content, and doctrine support.
                  </p>
                  <code className="rounded bg-muted px-2 py-1 text-xs">default or subtle + compact content</code>
                </div>
              </div>
            </AptCard>

            {/* Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">AptButton</h3>
              <AptCard variant="default" padding="large">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Variants</p>
                    <div className="flex flex-wrap gap-3">
                      <AptButton variant="primary">Primary</AptButton>
                      <AptButton variant="secondary">Secondary</AptButton>
                      <AptButton variant="outline">Outline</AptButton>
                      <AptButton variant="ghost">Ghost</AptButton>
                      <AptButton variant="link">Link</AptButton>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Sizes</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <AptButton size="sm">Small</AptButton>
                      <AptButton size="default">Default</AptButton>
                      <AptButton size="lg">Large</AptButton>
                      <AptButton size="icon"><Sparkles className="h-4 w-4" /></AptButton>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">With Icons</p>
                    <div className="flex flex-wrap gap-3">
                      <AptButton><ExternalLink className="h-4 w-4" /> Open Link</AptButton>
                      <AptButton variant="outline">Continue <ArrowRight className="h-4 w-4" /></AptButton>
                    </div>
                  </div>
                </div>
              </AptCard>
              <CodeBlock code={`import { AptButton } from "@/components/apt";

<AptButton variant="primary">Primary Action</AptButton>
<AptButton variant="secondary">Secondary</AptButton>
<AptButton variant="outline">Outline</AptButton>
<AptButton variant="ghost">Ghost</AptButton>
<AptButton variant="link">Link</AptButton>

// Sizes
<AptButton size="sm">Small</AptButton>
<AptButton size="default">Default</AptButton>
<AptButton size="lg">Large</AptButton>
<AptButton size="icon"><Icon /></AptButton>

// As Link
<AptButton asChild>
  <Link to="/path">Navigate</Link>
</AptButton>`} />
            </div>

            {/* Cards */}
            <div>
              <h3 className="text-lg font-semibold mb-4">AptCard</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
                <AptCard variant="default">
                  <AptCardHeader>
                    <AptCardTitle>Default Card</AptCardTitle>
                    <AptCardDescription>Standard card with border</AptCardDescription>
                  </AptCardHeader>
                  <AptCardContent>
                    <p className="text-sm">Card content goes here.</p>
                  </AptCardContent>
                </AptCard>
                
                <AptCard variant="elevated">
                  <AptCardHeader>
                    <AptCardTitle>Elevated Card</AptCardTitle>
                    <AptCardDescription>With shadow for emphasis</AptCardDescription>
                  </AptCardHeader>
                  <AptCardContent>
                    <p className="text-sm">Card content goes here.</p>
                  </AptCardContent>
                </AptCard>
                
                <AptCard variant="interactive">
                  <AptCardHeader>
                    <AptCardTitle>Interactive Card</AptCardTitle>
                    <AptCardDescription>Hover to see effect</AptCardDescription>
                  </AptCardHeader>
                  <AptCardContent>
                    <p className="text-sm">Card content goes here.</p>
                  </AptCardContent>
                </AptCard>
                
                <AptCard variant="subtle">
                  <AptCardHeader>
                    <AptCardTitle>Subtle Card</AptCardTitle>
                    <AptCardDescription>Muted background</AptCardDescription>
                  </AptCardHeader>
                  <AptCardContent>
                    <p className="text-sm">Card content goes here.</p>
                  </AptCardContent>
                </AptCard>
                
                <AptCard variant="feature">
                  <AptCardHeader>
                    <AptCardTitle>Feature Card</AptCardTitle>
                    <AptCardDescription>With blur and hover</AptCardDescription>
                  </AptCardHeader>
                  <AptCardContent>
                    <p className="text-sm">Card content goes here.</p>
                  </AptCardContent>
                </AptCard>
                
                <AptCard variant="hero" className="bg-gradient-to-br from-primary/10 to-secondary/40">
                  <AptCardHeader>
                    <AptCardTitle>Hero Card</AptCardTitle>
                    <AptCardDescription>Glassmorphism effect</AptCardDescription>
                  </AptCardHeader>
                  <AptCardContent>
                    <p className="text-sm">Card content goes here.</p>
                  </AptCardContent>
                </AptCard>
              </div>
              <CodeBlock code={`import { 
  AptCard, AptCardHeader, AptCardTitle, 
  AptCardDescription, AptCardContent, AptCardFooter 
} from "@/components/apt";

// Variants: default, elevated, interactive, subtle, feature, hero
<AptCard variant="interactive">
  <AptCardHeader>
    <AptCardTitle>Card Title</AptCardTitle>
    <AptCardDescription>Card description</AptCardDescription>
  </AptCardHeader>
  <AptCardContent>
    <p>Content here</p>
  </AptCardContent>
  <AptCardFooter>
    <AptButton>Action</AptButton>
  </AptCardFooter>
</AptCard>

// Padding: default (p-6), compact (p-4), large (p-8), none`} />
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold mb-4">AptTag</h3>
              <AptCard variant="default" padding="large">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Variants</p>
                    <div className="flex flex-wrap gap-2">
                      <AptTag variant="default">Default</AptTag>
                      <AptTag variant="primary">Primary</AptTag>
                      <AptTag variant="muted">Muted</AptTag>
                      <AptTag variant="secondary">Secondary</AptTag>
                      <AptTag variant="outline">Outline</AptTag>
                      <AptTag variant="ghost">Ghost</AptTag>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Sizes</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <AptTag size="sm">Small</AptTag>
                      <AptTag size="default">Default</AptTag>
                    </div>
                  </div>
                </div>
              </AptCard>
              <CodeBlock code={`import { AptTag } from "@/components/apt";

<AptTag variant="primary">New</AptTag>
<AptTag variant="outline" size="sm">Beta</AptTag>`} />
            </div>

            {/* Emblem */}
            <div>
              <h3 className="text-lg font-semibold mb-4">AptEmblem</h3>
              <AptCard variant="default" padding="large">
                <div className="flex flex-wrap items-end gap-8">
                  <div className="text-center">
                    <AptEmblem size="sm" />
                    <p className="text-xs text-muted-foreground mt-2">sm (32px)</p>
                  </div>
                  <div className="text-center">
                    <AptEmblem size="md" />
                    <p className="text-xs text-muted-foreground mt-2">md (48px)</p>
                  </div>
                  <div className="text-center">
                    <AptEmblem size="lg" glow="subtle" />
                    <p className="text-xs text-muted-foreground mt-2">lg + glow</p>
                  </div>
                  <div className="text-center">
                    <AptEmblem size="xl" glow="strong" />
                    <p className="text-xs text-muted-foreground mt-2">xl + strong glow</p>
                  </div>
                </div>
              </AptCard>
              <CodeBlock code={`import { AptEmblem } from "@/components/apt";

<AptEmblem size="sm" />   {/* 32px */}
<AptEmblem size="md" />   {/* 48px */}
<AptEmblem size="lg" glow="subtle" />   {/* 80px */}
<AptEmblem size="xl" glow="strong" />   {/* 128px */}`} />
            </div>
          </div>
        </Section>

        {/* Animations */}
        <Section
          id="animations"
          title="Animation System"
          description="Calm, purposeful motion with consistent timing."
        >
          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <AptCard variant="subtle">
                <AptCardHeader>
                  <AptCardTitle className="text-lg">Motion Principles</AptCardTitle>
                </AptCardHeader>
                <AptCardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Duration: 200-400ms for UI, up to 500ms for hero</li>
                    <li>• Easing: <code className="bg-muted px-1 rounded">ease-out</code> or <code className="bg-muted px-1 rounded">cubic-bezier(0.4, 0, 0.2, 1)</code></li>
                    <li>• No bouncing or overshooting</li>
                    <li>• Transform-based for performance</li>
                    <li>• Subtle opacity changes (0.6-1.0)</li>
                  </ul>
                </AptCardContent>
              </AptCard>

              <AptCard variant="subtle">
                <AptCardHeader>
                  <AptCardTitle className="text-lg">Animation Classes</AptCardTitle>
                </AptCardHeader>
                <AptCardContent>
                  <div className="space-y-3">
                    {[
                      { name: "apt-fade-in", description: "400ms opacity fade" },
                      { name: "apt-slide-up", description: "500ms slide + fade" },
                      { name: "apt-hover-lift", description: "200ms translateY(-2px)" },
                      { name: "apt-glow-subtle", description: "Soft box-shadow glow" },
                    ].map((anim) => (
                      <div key={anim.name} className="flex justify-between items-center">
                        <code className="text-sm bg-muted px-2 py-1 rounded">.{anim.name}</code>
                        <span className="text-xs text-muted-foreground">{anim.description}</span>
                      </div>
                    ))}
                  </div>
                </AptCardContent>
              </AptCard>
            </div>

            <CodeBlock code={`/* Animation Keyframes - src/index.css */
@keyframes aptFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes aptSlideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Utility Classes */
.apt-fade-in {
  animation: aptFadeIn 0.4s ease-out forwards;
}

.apt-slide-up {
  animation: aptSlideUp 0.5s ease-out forwards;
}

.apt-hover-lift {
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.apt-hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: var(--elevation-hover-lift);
}

.apt-glow-subtle {
  box-shadow: var(--elevation-glow-subtle);
}`} />
          </div>
        </Section>
      </div>

      {/* Footer CTA */}
      <div className="mt-16 pt-8 border-t border-border">
        <AptCard variant="feature" padding="large">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">Export & Use</h3>
              <p className="text-muted-foreground">
                Download the design tokens for Figma, Style Dictionary, or other tools.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <AptButton
                variant="outline"
                type="button"
                onClick={() => {
                  void handleSystemMarkdownDownload();
                }}
                disabled={!systemDocUrl}
              >
                Download System Markdown
              </AptButton>
              <AptButton variant="outline" type="button" onClick={handleWorkspaceKnowledgeDownload}>
                Download Workspace Knowledge
              </AptButton>
              <AptButton asChild>
                <a href="/docs/design/APT-TOKENS.json" download>
                  <Download className="h-4 w-4" />
                  Download Tokens JSON
                </a>
              </AptButton>
            </div>
          </div>
        </AptCard>
      </div>

      <ReviewBundleCallout />
    </div>
  );
}
