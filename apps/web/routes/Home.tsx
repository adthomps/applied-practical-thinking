import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
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
  SectionIntro,
} from "@/components/apt";
import { AssistantChat } from "@/features/assistant/AssistantChat";
import { Brain, AppWindow, Network, ArrowRight } from "lucide-react";

const HOMEPAGE_FEATURE_LIMIT = 6;

type HomepageFeatureLane = "experiments" | "learn" | "systems";

const pillars = [
  {
    icon: Brain,
    title: "Applied Thinking",
    description:
      "Real problems, practical solutions. No theoretical exercises — everything connects to actual use cases.",
    demoLink: "/experiments",
    docsLink: "/learn",
  },
  {
    icon: AppWindow,
    title: "Reference Implementations",
    description:
      "Working code that demonstrates patterns in production-ready form, not just simplified examples.",
    demoLink: "/experiments",
    docsLink: "/learn",
  },
  {
    icon: Network,
    title: "Patterns & Decisions",
    description:
      "Documented tradeoffs and reasoning behind every major choice. Understanding the why, not just the how.",
    demoLink: "/design/systems",
    docsLink: "/design",
  },
];

function getFeatureDate(item: ContentIndexItem) {
  return new Date(item.date || item.publishedAt || 0).getTime();
}

function sortByFeatureDate(items: ContentIndexItem[]) {
  return [...items].sort((a, b) => getFeatureDate(b) - getFeatureDate(a));
}

function getHomepageFeatureLane(item: ContentIndexItem): HomepageFeatureLane {
  if (item.indexType === "labs" || item.indexType === "demos") return "experiments";
  if (item.indexType === "systems") return "systems";
  return "learn";
}

function selectHomepageFeatured(items: ContentIndexItem[]) {
  const featured = sortByFeatureDate(items.filter((item) => item.featured === true));
  const selected: ContentIndexItem[] = [];
  const selectedIds = new Set<string>();

  const addItem = (item: ContentIndexItem) => {
    const key = item.id || item.slug || item.contentPath;
    if (selectedIds.has(key) || selected.length >= HOMEPAGE_FEATURE_LIMIT) return;
    selectedIds.add(key);
    selected.push(item);
  };

  const laneCaps: Record<HomepageFeatureLane, number> = {
    experiments: 2,
    learn: 3,
    systems: 1,
  };

  (Object.keys(laneCaps) as HomepageFeatureLane[]).forEach((lane) => {
    featured
      .filter((item) => getHomepageFeatureLane(item) === lane)
      .slice(0, laneCaps[lane])
      .forEach(addItem);
  });

  featured.forEach(addItem);

  return selected;
}

function getHomepageFeaturedLink(item: ContentIndexItem) {
  if (item.indexType === "labs") {
    return {
      to: `/experiments/${item.slug ?? item.id}`,
      typeLabel: item.type === "mock" ? "Mock" : item.type === "lab" ? "Concept" : "Experiment",
      laneLabel: "Experiment",
    };
  }

  if (item.indexType === "demos") {
    return {
      to: `/experiments/live-demos/${item.slug ?? item.id}`,
      typeLabel: "Live Demo",
      laneLabel: "Experiment",
    };
  }

  if (item.indexType === "systems" || item.type === "system" || item.platforms) {
    return {
      to: `/design/systems/${item.id ?? item.slug}`,
      typeLabel: "System",
      laneLabel: "Design",
    };
  }

  if (item.indexType === "podcasts" || item.type === "podcast") {
    return {
      to: `/learn/${item.id ?? item.slug}`,
      typeLabel: "Podcast",
      laneLabel: "Learn",
    };
  }

  return {
    to: `/learn/${item.id ?? item.slug}`,
    typeLabel:
      item.type === "blog"
        ? "Article"
        : item.type === "case-study"
          ? "Case Study"
          : item.type === "guide"
            ? "Guide"
            : "Learn",
    laneLabel: "Learn",
  };
}

export default function Home() {
  // Featured items - curated cross-section of experiments, learn content, and systems
  const [featuredItems, setFeaturedItems] = useState<ContentIndexItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetchContentIndex("labs"),
      fetchContentIndex("blog"),
      fetchContentIndex("guides"),
      fetchContentIndex("podcasts"),
      fetchContentIndex("case-studies"),
      fetchContentIndex("demos"),
      fetchContentIndex("systems"),
    ]).then(([labs, blog, guides, podcasts, caseStudies, demos, systems]) => {
      if (cancelled) return;

      const allContent: ContentIndexItem[] = [
        ...labs,
        ...blog,
        ...guides,
        ...podcasts,
        ...caseStudies,
        ...demos,
        ...systems,
      ];

      setFeaturedItems(selectHomepageFeatured(allContent));
    }).catch(() => {
      if (cancelled) return;
      setFeaturedItems([]);
    }).finally(() => {
      if (cancelled) return;
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        brand={siteConfig.name}
        tagline={siteConfig.fullName}
        title={siteConfig.tagline}
        description={siteConfig.description}
        primaryCta={{ label: "Explore Experiments", to: "/experiments" }}
        secondaryCta={{ label: "Start Learning", to: "/learn" }}
      />

      {/* ...existing code... */}

      {/* What You'll Find Here */}
      <section className="container py-12 md:py-16">
        <SectionIntro
          title="What you'll find here"
          description="Focused areas for learning, experimentation, and design-governed reference models."
          align="center"
          className="mb-10"
        />

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

      {/* Assistant Chat Section (after Featured) */}
      <section className="container py-10 md:py-12 flex justify-center">
        <div className="w-full max-w-xl">
          <AssistantChat />
        </div>
      </section>


      {/* Featured */}
      <section className="container py-12 md:py-16">
        <SectionIntro
          title="Featured"
          description="A curated set of up to six recent highlights across Experiments, Learn, and Systems."
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

            return (
              <Link key={item.id ?? item.slug ?? item.contentPath} to={to} className="block group">
                <AptCard variant="interactive" padding="default">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex flex-wrap gap-2">
                      <AptTag variant="accent">{typeLabel}</AptTag>
                      <AptTag variant="ghost">{laneLabel}</AptTag>
                    </div>
                    {item.status && <AptTag variant="muted">{item.status}</AptTag>}
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
            <Link to="/experiments" className="gap-2">
              All Experiments <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
          <AptButton variant="secondary" asChild>
            <Link to="/design/systems" className="gap-2">
              Design Systems <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
          <AptButton variant="secondary" asChild>
            <Link to="/learn" className="gap-2">
              All Learn Content <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
        </div>
      </section>
    </div>
  );
}
