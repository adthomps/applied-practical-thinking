import { Link } from "react-router-dom";
import { useMemo } from "react";
import { authorConfig, siteConfig } from "@/data/site";
import { ContentIndexItem } from "@/src/services/contentIndex";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useHomeFeaturedContentQuery } from "@/hooks/useContentAggregateQueries";
import {
  HeroSection,
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptCardFooter,
  AptTag,
  AptButton,
  SectionIntro,
} from "@/components/apt";
import { AssistantChat, ASSISTANT_CHAT_ENABLED } from "@/features/assistant/AssistantChat";
import { Network, ArrowRight, Scale, FlaskConical, BookOpen } from "lucide-react";
import { getStatusTagDefinition } from "@/lib/tagSemantics";

const pillars = [
  {
    icon: Scale,
    title: "Principles",
    description:
      "Defines how decisions are made and how systems stay aligned across design, architecture, quality, operations, and AI.",
    demoLink: "/principles",
    docsLink: "/principles/framework",
  },
  {
    icon: FlaskConical,
    title: "Labs",
    description:
      "Experiments, prototypes, UI concepts, and API demos that make ideas tangible before promotion.",
    demoLink: "/labs",
    docsLink: "/labs/live-demos",
  },
  {
    icon: Network,
    title: "Proof",
    description:
      "Stable systems and complete implementations with clear model boundaries and repeatable operational intent.",
    demoLink: "/proof",
    docsLink: "/proof",
  },
  {
    icon: BookOpen,
    title: "Insights",
    description:
      "Breakdowns, learnings, and practical guidance that explain how APT decisions and systems are applied.",
    demoLink: "/insights",
    docsLink: "/insights/practice",
  },
];

function getHomepageFeaturedLink(item: ContentIndexItem) {
  if (item.indexType === "labs") {
    return {
      to: `/labs/${item.slug ?? item.id}`,
      typeLabel: item.type === "mock" ? "Mock" : item.type === "lab" ? "Concept" : "Experiment",
      laneLabel: "Labs",
    };
  }

  if (item.indexType === "demos") {
    return {
      to: `/labs/live-demos/${item.slug ?? item.id}`,
      typeLabel: "Live Demo",
      laneLabel: "Labs",
    };
  }

  if (item.indexType === "systems" || item.type === "system" || item.platforms) {
    return {
      to: `/proof/${item.id ?? item.slug}`,
      typeLabel: "System",
      laneLabel: "Proof",
    };
  }

  if (item.indexType === "podcasts" || item.type === "podcast") {
    return {
      to: `/insights/${item.id ?? item.slug}`,
      typeLabel: "Podcast",
      laneLabel: "Insights",
    };
  }

  return {
    to: `/insights/${item.id ?? item.slug}`,
    typeLabel:
      item.type === "article" || item.type === "blog"
        ? "Article"
        : item.type === "design-review"
          ? "Design Review"
          : item.type === "guide"
            ? "Guide"
            : "Learn",
    laneLabel: "Insights",
  };
}

export default function Home() {
  usePageMetadata({
    title: siteConfig.fullName,
    description: siteConfig.description,
    image: authorConfig.profileImage,
    imageAlt: `${siteConfig.fullName} social preview`,
  });

  const featuredQuery = useHomeFeaturedContentQuery();

  const featuredItems = useMemo(
    () => featuredQuery.data || [],
    [featuredQuery.data]
  );
  const loading = featuredQuery.isLoading;

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        brand={siteConfig.name}
        tagline={siteConfig.fullName}
        title={siteConfig.tagline}
        description={siteConfig.description}
        primaryCta={{ label: "Explore Labs", to: "/labs" }}
        secondaryCta={{ label: "Read Insights", to: "/insights" }}
      />

      {/* ...existing code... */}

      {/* What You'll Find Here */}
      <section className="container py-12 md:py-16">
        <SectionIntro
          title="How APT Works"
          description="Principles shape decisions, Labs test ideas, Proof captures stable systems, and Insights turn outcomes into reusable learning."
          align="center"
          className="mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
                  <Link to={pillar.demoLink}>Explore</Link>
                </AptButton>
                <AptButton variant="ghost" size="sm" asChild>
                  <Link to={pillar.docsLink}>Read docs</Link>
                </AptButton>
              </AptCardFooter>
            </AptCard>
          ))}
        </div>
      </section>

      {ASSISTANT_CHAT_ENABLED ? (
        <section className="container py-10 md:py-12 flex justify-center">
          <div className="w-full max-w-xl">
            <AssistantChat />
          </div>
        </section>
      ) : null}


      {/* Featured */}
      <section className="container py-12 md:py-16">
        <SectionIntro
          title="Featured"
          description="A curated set of recent highlights across Labs, Proof, and Insights."
          className="mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && featuredItems.length === 0 && (
            <AptCard variant="interactive" padding="default">
              <AptCardHeader className="p-0 mt-3">
                <AptCardTitle>Loading featured…</AptCardTitle>
                <AptCardDescription className="mt-1">
                  Fetching the latest featured content.
                </AptCardDescription>
              </AptCardHeader>
            </AptCard>
          )}
          {featuredItems.map((item) => {
            const { to, typeLabel, laneLabel } = getHomepageFeaturedLink(item);
            const statusTag = getStatusTagDefinition(item.status as string | undefined);

            return (
              <Link key={item.id ?? item.slug ?? item.contentPath} to={to} className="block group">
                <AptCard variant="interactive" padding="default">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex flex-wrap gap-2">
                      <AptTag variant="primary">{typeLabel}</AptTag>
                      <AptTag variant="accent">{laneLabel}</AptTag>
                    </div>
                    {statusTag ? <AptTag variant={statusTag.variant}>{statusTag.label}</AptTag> : null}
                  </div>
                  <AptCardHeader className="p-0 mt-3">
                    <AptCardTitle>{item.title}</AptCardTitle>
                    <AptCardDescription className="mt-1">
                      {item.problem ?? item.description ?? item.excerpt}
                    </AptCardDescription>
                  </AptCardHeader>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(item.tags || []).slice(0, 3).map((tag) => (
                      <AptTag key={tag} variant="muted">
                        {tag}
                      </AptTag>
                    ))}
                  </div>
                  {item.date || item.publishedAt ? (
                    <div className="mt-3 text-xs text-muted-foreground">
                      {new Date(item.date || item.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  ) : null}
                </AptCard>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <AptButton variant="secondary" asChild>
            <Link to="/labs" className="gap-2">
              All Labs <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
          <AptButton variant="secondary" asChild>
            <Link to="/proof" className="gap-2">
              All Proof <ArrowRight className="h-4 w-4" />
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
