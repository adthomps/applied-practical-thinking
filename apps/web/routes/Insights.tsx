import { useEffect, useState } from "react";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import { InsightCard } from "@/components/apt/InsightCard";
import {
  AptCard,
  AptButton,
} from "@/components/apt";
import { Link } from "react-router-dom";
import { Book, FileText, Podcast, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";


const areaIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "/insights/blogs": FileText,
  "/insights/podcasts": Podcast,
  "/insights/guides": Book,
  "/insights/case-studies": Book,
};


export default function Insights() {
  const [filter, setFilter] = useState<string | "all">("all");
  const [insights, setInsights] = useState<ContentIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchContentIndex("blog"),
      fetchContentIndex("guides"),
      fetchContentIndex("podcasts"),
      fetchContentIndex("case-studies"),
    ])
      .then(([blog, guides, podcasts, caseStudies]) => {
        setInsights([
          ...blog,
          ...guides,
          ...podcasts,
          ...caseStudies,
        ].sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || "")));
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const filteredContent =
    filter === "all"
      ? insights
      : insights.filter((c) => c.type === filter);

  if (loading) {
    return <div className="container py-12 text-center">Loading insights…</div>;
  }
  if (error) {
    return <div className="container py-12 text-center text-destructive">{error}</div>;
  }

  // Get Insights nav children for area cards
  const insightsNav = siteConfig.nav.find((n) => n.path === "/insights");
  const areaSections = insightsNav?.children ?? [];

  return (
    <div className="container py-8 md:py-12 space-y-12">
      {/* Header */}
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Insights</h1>
        <p className="text-muted-foreground max-w-2xl">
          Essays, podcasts, and case studies on applied thinking, systems, and execution.
        </p>
      </section>

      {/* Area Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {areaSections.map((section) => {
          const Icon = areaIcons[section.path] ?? Book;
          return (
            <Link key={section.path} to={section.path}>
              <AptCard variant="interactive" className="h-full">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold">{section.label}</h2>
                    <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                  {"tagline" in section && section.tagline && (
                    <p className="text-xs text-primary/80 italic">
                      {section.tagline}
                    </p>
                  )}
                </div>
              </AptCard>
            </Link>
          );
        })}
      </section>

      {/* Filterable Insights List */}
      <section>
        {/* Filters */}
        <div className="flex gap-2 mb-8">
          <AptButton
            variant={filter === "all" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </AptButton>
          {(["blog", "podcast", "guide", "case-study"]).map((type) => (
            <AptButton
              key={type}
              variant={filter === type ? "primary" : "ghost"}
              size="sm"
              onClick={() => setFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
            </AptButton>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredContent.map((insight) => (
            <InsightCard key={insight.id} insight={insight} to={`/insights/${insight.id}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
