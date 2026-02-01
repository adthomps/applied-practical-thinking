import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import { systems } from "@/data/systems";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import {
  HeroSection,
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptCardFooter,
  AptTag,
  AptButton,
} from "@/components/apt";
import { AssistantChat } from "@/features/assistant/AssistantChat";
import { Brain, AppWindow, Network, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "Applied Thinking",
    description:
      "Real problems, practical solutions. No theoretical exercises — everything connects to actual use cases.",
    demoLink: "/labs",
    docsLink: "/insights",
  },
  {
    icon: AppWindow,
    title: "Reference Implementations",
    description:
      "Working code that demonstrates patterns in production-ready form, not just simplified examples.",
    demoLink: "/labs",
    docsLink: "/insights",
  },
  {
    icon: Network,
    title: "Patterns & Decisions",
    description:
      "Documented tradeoffs and reasoning behind every major choice. Understanding the why, not just the how.",
    demoLink: "/systems",
    docsLink: "/insights",
  },
];

export default function Home() {
  // Featured items - mix of labs, systems, and content
  const [featuredLabs, setFeaturedLabs] = useState<ContentIndexItem[]>([]);
  const [labsLoading, setLabsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchContentIndex("labs")
      .then((items) => {
        if (cancelled) return;
        setFeaturedLabs(items.slice(0, 2));
      })
      .catch(() => {
        if (cancelled) return;
        setFeaturedLabs([]);
      })
      .finally(() => {
        if (cancelled) return;
        setLabsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const featuredSystems = systems.slice(0, 2);
  const [featuredContent, setFeaturedContent] = useState<ContentIndexItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetchContentIndex("blog")
      .then((items) => {
        if (cancelled) return;
        setFeaturedContent(items.slice(0, 2));
      })
      .catch(() => {
        if (cancelled) return;
        setFeaturedContent([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        brand={siteConfig.name}
        tagline={siteConfig.fullName}
        title={siteConfig.tagline}
        description={siteConfig.description}
        primaryCta={{ label: "Explore APT Labs", to: "/labs" }}
        secondaryCta={{ label: "Read Insights", to: "/insights" }}
      />

      {/* ...existing code... */}

      {/* What You'll Find Here */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
            What you'll find here
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Focused areas of exploration and demonstration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <AptCard
              key={pillar.title}
              variant="feature"
              padding="large"
              className="apt-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <pillar.icon className="h-6 w-6" />
                </div>
              </div>
              <AptCardHeader className="p-0">
                <AptCardTitle className="text-lg">{pillar.title}</AptCardTitle>
                <AptCardDescription className="mt-2 text-sm">
                  {pillar.description}
                </AptCardDescription>
              </AptCardHeader>
              <AptCardFooter className="border-0 pt-4 mt-auto">
                <AptButton variant="primary" size="sm" asChild>
                  <Link to={pillar.demoLink}>View demo</Link>
                </AptButton>
                <AptButton variant="ghost" size="sm" asChild>
                  <Link to={pillar.docsLink}>Read docs</Link>
                </AptButton>
              </AptCardFooter>
            </AptCard>
          ))}
        </div>
      </section>

      {/* Assistant Chat Section (after Featured) */}
      <section className="container py-16 flex justify-center">
        <div className="w-full max-w-xl">
          <AssistantChat />
        </div>
      </section>

      {/* Featured */}
      <section className="container pb-16 md:pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Featured</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Featured Labs */}
          {labsLoading && featuredLabs.length === 0 && (
            <AptCard variant="interactive" padding="default">
              <AptCardHeader className="p-0 mt-3">
                <AptCardTitle>Loading labs…</AptCardTitle>
                <AptCardDescription className="mt-1">
                  Fetching the latest labs.
                </AptCardDescription>
              </AptCardHeader>
            </AptCard>
          )}
          {featuredLabs.map((lab) => (
            <AptCard
              key={lab.id ?? lab.slug ?? lab.contentPath}
              variant="interactive"
              padding="default"
            >
              <div className="flex items-start justify-between mb-2">
                <AptTag variant="accent">Lab</AptTag>
                {lab.status && <AptTag variant="muted">{lab.status}</AptTag>}
              </div>
              <AptCardHeader className="p-0 mt-3">
                <AptCardTitle>{lab.title}</AptCardTitle>
                <AptCardDescription className="mt-1">
                  {lab.problem ?? lab.description}
                </AptCardDescription>
              </AptCardHeader>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {(lab.tags || []).slice(0, 3).map((tag: string) => (
                  <AptTag key={tag} variant="muted">
                    {tag}
                  </AptTag>
                ))}
              </div>
            </AptCard>
          ))}

          {/* Featured Systems */}
          {featuredSystems.map((system) => (
            <AptCard key={system.id} variant="interactive" padding="default">
              <div className="mb-2">
                <AptTag variant="default">System</AptTag>
              </div>
              <AptCardHeader className="p-0 mt-3">
                <AptCardTitle>{system.title}</AptCardTitle>
                <AptCardDescription className="mt-1">
                  {system.purpose}
                </AptCardDescription>
              </AptCardHeader>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {system.tags.slice(0, 3).map((tag) => (
                  <AptTag key={tag} variant="muted">
                    {tag}
                  </AptTag>
                ))}
              </div>
            </AptCard>
          ))}

          {/* Featured Insights */}
          {featuredContent.map((insight) => (
            <AptCard key={insight.id} variant="interactive" padding="default">
              <div className="mb-2">
                <AptTag variant="default">{insight.type}</AptTag>
              </div>
              <AptCardHeader className="p-0 mt-3">
                <AptCardTitle>{insight.title}</AptCardTitle>
                <AptCardDescription className="mt-1">
                  {insight.description.slice(0, 100)}...
                </AptCardDescription>
              </AptCardHeader>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {insight.concepts.slice(0, 3).map((concept) => (
                  <AptTag key={concept} variant="muted">
                    {concept}
                  </AptTag>
                ))}
              </div>
            </AptCard>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <AptButton variant="secondary" asChild>
            <Link to="/labs" className="gap-2">
              All Labs <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
          <AptButton variant="secondary" asChild>
            <Link to="/systems" className="gap-2">
              All Systems <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
          <AptButton variant="secondary" asChild>
            <Link to="/insights" className="gap-2">
              All Insights <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
        </div>
      </section>
    </div>
  );
}
