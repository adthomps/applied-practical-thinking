import { useEffect, useState, type ComponentType } from "react";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import { InsightCard } from "@/components/apt/InsightCard";
import {
  AptButton,
  LandingSectionCardGrid,
  RuntimeConfigNotice,
} from "@/components/apt";
import { Link } from "react-router-dom";
import { Book, FileText, Podcast } from "lucide-react";
import { siteConfig } from "@/data/site";
import { getWorkerApiConfigError } from "@/src/services/api";


const areaIcons: Record<string, ComponentType<{ className?: string }>> = {
  "/learn/articles": FileText,
  "/learn/podcasts": Podcast,
  "/learn/guides": Book,
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
      : insights.filter((c) =>
          filter === "guide" ? c.type === "guide" || c.type === "case-study" : c.type === filter
        );

  if (loading) {
    return <div className="container py-12 text-center">Loading learning content…</div>;
  }
  if (error) {
    const configError = getWorkerApiConfigError();
    return (
      <div className="container py-12">
        {configError ? (
          <RuntimeConfigNotice
            message={configError.message}
            envVar={configError.envVar}
            expectedValue={configError.expectedProductionValue}
          />
        ) : (
          <div className="text-center text-destructive">{error}</div>
        )}
      </div>
    );
  }

  const learnNav = siteConfig.nav.find((n) => n.path === "/learn");
  const areaSections = learnNav?.children ?? [];
  const landingCards = areaSections.map((section) => ({
    ...section,
    icon: areaIcons[section.path] ?? Book,
    metaLabel: "Learn",
  }));

  return (
    <div className="container py-8 md:py-12 space-y-12">
      <section className="max-w-3xl space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Learn</h1>
        <p className="text-lg text-muted-foreground">
          Guides, articles, podcasts, and worked examples for applied thinking, systems, and execution.
        </p>
      </section>

      <LandingSectionCardGrid items={landingCards} />

      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Browse all Learn content</h2>
          <p className="text-sm text-muted-foreground">
            Filter across articles, podcasts, guides, and worked examples to move from orientation into deeper material.
          </p>
        </div>

        <div className="flex gap-2 mb-8">
          <AptButton
            variant={filter === "all" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </AptButton>
          {[
            { type: "blog", label: "Articles" },
            { type: "podcast", label: "Podcasts" },
            { type: "guide", label: "Guides" },
          ].map(({ type, label }) => (
            <AptButton
              key={type}
              variant={filter === type ? "primary" : "ghost"}
              size="sm"
              onClick={() => setFilter(type)}
            >
              {label}
            </AptButton>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredContent.map((insight) => (
            <InsightCard key={insight.id} insight={insight} to={`/learn/${insight.id}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
