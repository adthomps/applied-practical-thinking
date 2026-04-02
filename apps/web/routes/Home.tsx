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

export default function Home() {
  // Featured items - mix of labs, systems, and content
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
    ]).then(([labs, blog, guides, podcasts, caseStudies, demos]) => {
      if (cancelled) return;
      // Only use ContentIndexItem[] for featuredItems
      const allContent: ContentIndexItem[] = [
        ...labs,
        ...blog,
        ...guides,
        ...podcasts,
        ...caseStudies,
        ...demos,
      ];
      const featured = allContent.filter(item => item.featured === true);
      featured.sort((a, b) => {
        const aDate = new Date(a.date || a.publishedAt || 0).getTime();
        const bDate = new Date(b.date || b.publishedAt || 0).getTime();
        return bDate - aDate;
      });
      setFeaturedItems(featured);
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
      <section className="container py-16 md:py-24">
      <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
            What you'll find here
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Focused areas for learning, experimentation, and design-governed reference models
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
            // Determine link and type label
            let to = "#";
            let typeLabel = item.type || (item.platforms ? "System" : "Experiment");
            if (item.type === "lab" || item.type === "mock" || item.type === "demo") {
              to = `/experiments/${item.slug ?? item.id}`;
              typeLabel = item.type === "mock" ? "Mock" : "Concept";
            } else if (item.type === "system" || item.platforms) {
              to = `/design/systems/${item.id ?? item.slug}`;
              typeLabel = "System";
            } else if (item.type === "blog" || item.type === "guide" || item.type === "case-study") {
              to = `/learn/${item.id ?? item.slug}`;
              typeLabel = item.type === "blog" ? "Article" : item.type === "case-study" ? "Case Study" : "Guide";
            } else if (item.type === "podcast") {
              to = `/learn/${item.id ?? item.slug}`;
              typeLabel = "Podcast";
            }
            return (
              <Link key={item.id ?? item.slug ?? item.contentPath} to={to} className="block group">
                <AptCard variant="interactive" padding="default">
                  <div className="flex items-start justify-between mb-2">
                    <AptTag variant="accent">{typeLabel}</AptTag>
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
        </div>
      </section>
    </div>
  );
}
