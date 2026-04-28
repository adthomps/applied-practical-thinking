import { useEffect, useState } from "react";
import {
  HeroCard,
  AptButton,
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptCardContent,
  AptTag,
  DemoLayout,
  DemoSection,
  DecisionBlock,
  LimitationNotice,
} from "@/components/apt";
import { fetchContentIndex, type ContentIndexItem } from "@/src/services/contentIndex";
import { strongItems } from "@/data/strong";
import { systems } from "@/data/systems";

export default function DesignPlayground() {
  const [labsIndex, setLabsIndex] = useState<ContentIndexItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetchContentIndex("labs")
      .then((items) => {
        if (cancelled) return;
        setLabsIndex(items);
      })
      .catch(() => {
        if (cancelled) return;
        setLabsIndex([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Design Playground
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Component catalog, example surface, and visual validation area for the
          APT portfolio implementation. Use this page to review examples and
          verify design consistency against the doctrine.
        </p>
      </div>

      <div className="space-y-12">
        <DemoLayout
          title="Responsive Checks"
          description="A lightweight test surface for mobile-first layout rules before components are used on public pages."
        >
          <DemoSection title="Button Wrap Behavior">
            <div className="flex flex-wrap gap-3">
              <AptButton variant="primary">Primary Action</AptButton>
              <AptButton variant="outline">Secondary Action</AptButton>
              <AptButton variant="ghost">Tertiary Action</AptButton>
            </div>
          </DemoSection>

          <DemoSection title="Card Grid Expansion">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {["Mobile first", "Tablet split", "Desktop restraint"].map((title) => (
                <AptCard key={title} variant="interactive">
                  <AptCardHeader>
                    <AptCardTitle>{title}</AptCardTitle>
                    <AptCardDescription>
                      This card should stay legible at narrow widths and gain columns only when space genuinely helps scanning.
                    </AptCardDescription>
                  </AptCardHeader>
                </AptCard>
              ))}
            </div>
          </DemoSection>
        </DemoLayout>

        {/* Hero Card Variants */}
        <DemoLayout
          title="Hero Card"
          description="Primary hero component for page headers"
        >
          <DemoSection title="Full Hero">
            <HeroCard
              brand="APT"
              tagline="Applied Practical Thinking"
              title="Systems over screens. Decisions over demos."
              description="A personal portfolio and demonstration brand focused on turning real-world problems into working systems."
              primaryCta={{ label: "Primary Action", to: "#" }}
              secondaryCta={{ label: "Secondary Action", to: "#" }}
            />
          </DemoSection>

          <DemoSection title="Minimal Hero">
            <HeroCard
              title="Minimal Hero Variant"
              description="Without brand mark and CTAs, suitable for internal pages."
            />
          </DemoSection>
        </DemoLayout>

        {/* Button Variants */}
        <DemoLayout
          title="Button Variants"
          description="All button states and sizes"
        >
          <DemoSection title="Variants">
            <div className="flex flex-wrap gap-3">
              <AptButton variant="primary">Primary</AptButton>
              <AptButton variant="secondary">Secondary</AptButton>
              <AptButton variant="outline">Outline</AptButton>
              <AptButton variant="ghost">Ghost</AptButton>
              <AptButton variant="link">Link</AptButton>
              <AptButton variant="accent">Accent</AptButton>
            </div>
          </DemoSection>

          <DemoSection title="Sizes">
            <div className="flex flex-wrap items-center gap-3">
              <AptButton variant="primary" size="sm">
                Small
              </AptButton>
              <AptButton variant="primary" size="default">
                Default
              </AptButton>
              <AptButton variant="primary" size="lg">
                Large
              </AptButton>
            </div>
          </DemoSection>

          <DemoSection title="Disabled States">
            <div className="flex flex-wrap gap-3">
              <AptButton variant="primary" disabled>
                Primary Disabled
              </AptButton>
              <AptButton variant="secondary" disabled>
                Secondary Disabled
              </AptButton>
              <AptButton variant="outline" disabled>
                Outline Disabled
              </AptButton>
            </div>
          </DemoSection>
        </DemoLayout>

        {/* Card Stress Test */}
        <DemoLayout
          title="Card Stress Test"
          description="Testing cards with long content"
        >
          <DemoSection title="Long Title + Long Body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AptCard variant="default">
                <AptCardHeader>
                  <AptCardTitle>
                    This Is an Exceptionally Long Card Title That Should Wrap
                    Gracefully Without Breaking the Layout
                  </AptCardTitle>
                  <AptCardDescription>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam euismod, nisi vel consectetur interdum, nisl nunc
                    egestas nunc, vitae tincidunt nisl nunc euismod nunc. Sed
                    euismod, nisi vel consectetur interdum, nisl nunc egestas
                    nunc, vitae tincidunt nisl nunc euismod nunc.
                  </AptCardDescription>
                </AptCardHeader>
                <AptCardContent>
                  <p className="text-sm text-muted-foreground">
                    Additional content that extends the card height
                    significantly to test vertical spacing and overall card
                    proportions when dealing with substantial amounts of text
                    content.
                  </p>
                </AptCardContent>
              </AptCard>

              <AptCard variant="elevated">
                <AptCardHeader>
                  <AptCardTitle>Elevated Card Variant</AptCardTitle>
                  <AptCardDescription>
                    With shadow for visual hierarchy
                  </AptCardDescription>
                </AptCardHeader>
              </AptCard>
            </div>
          </DemoSection>

          <DemoSection title="Card Variants">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <AptCard variant="default">
                <AptCardTitle className="text-sm">Default</AptCardTitle>
              </AptCard>
              <AptCard variant="elevated">
                <AptCardTitle className="text-sm">Elevated</AptCardTitle>
              </AptCard>
              <AptCard variant="interactive">
                <AptCardTitle className="text-sm">Interactive</AptCardTitle>
              </AptCard>
              <AptCard variant="subtle">
                <AptCardTitle className="text-sm">Subtle</AptCardTitle>
              </AptCard>
            </div>
          </DemoSection>
        </DemoLayout>

        {/* Demo Layout Components */}
        <DemoLayout
          title="Demo Components"
          description="Components for demo pages and documentation"
        >
          <DemoSection title="Decision Block">
            <DecisionBlock
              decisions={[
                "httpOnly cookies over localStorage for security",
                "Refresh token rotation to limit exposure",
                "Rate limiting on all auth endpoints",
                "Audit logging for compliance requirements",
              ]}
            />
          </DemoSection>

          <DemoSection title="Limitation Notice">
            <LimitationNotice
              limitations={[
                "Not designed for real-time streaming use cases",
                "Single-node processing limits horizontal scale",
                "Requires manual failover configuration",
              ]}
            />
          </DemoSection>
        </DemoLayout>

        {/* Tags */}
        <DemoLayout title="Tags" description="Tag variants for categorization">
          <DemoSection title="All Variants">
            <div className="flex flex-wrap gap-2">
              <AptTag variant="default">Default</AptTag>
              <AptTag variant="accent">Accent</AptTag>
              <AptTag variant="muted">Muted</AptTag>
            </div>
          </DemoSection>
        </DemoLayout>

        {/* Normalized Demo Names */}
        <DemoLayout
          title="Demo Names Catalog"
          description="Normalized identifiers for Labs, Systems, and Strong items"
        >
          <DemoSection title="Labs">
            <div className="space-y-2">
              {labsIndex.map((lab) => (
                <div
                  key={lab.id ?? lab.slug ?? lab.contentPath}
                  className="flex items-center justify-between p-2 rounded bg-muted/50"
                >
                  <code className="text-sm font-mono text-primary">
                    {lab.id ?? lab.slug ?? lab.contentPath}
                  </code>
                  <span className="text-sm text-muted-foreground">
                    {lab.title}
                  </span>
                </div>
              ))}
            </div>
          </DemoSection>

          <DemoSection title="Systems">
            <div className="space-y-2">
              {systems.map((system) => (
                <div
                  key={system.id}
                  className="flex items-center justify-between p-2 rounded bg-muted/50"
                >
                  <code className="text-sm font-mono text-primary">
                    {system.id}
                  </code>
                  <span className="text-sm text-muted-foreground">
                    {system.title}
                  </span>
                </div>
              ))}
            </div>
          </DemoSection>

          <DemoSection title="Strong">
            <div className="space-y-2">
              {strongItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded bg-muted/50"
                >
                  <code className="text-sm font-mono text-primary">
                    {item.id}
                  </code>
                  <span className="text-sm text-muted-foreground">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </DemoSection>
        </DemoLayout>
      </div>
    </div>
  );
}
