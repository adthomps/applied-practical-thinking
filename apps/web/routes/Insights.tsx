import { useEffect, useState, type ComponentType } from "react";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import { InsightCard } from "@/components/apt/InsightCard";
import {
  AptButton,
  LandingSectionCardGrid,
  RuntimeConfigNotice,
  SectionIntro,
} from "@/components/apt";
import { Book, FileText, Network, Podcast } from "lucide-react";
import { siteConfig } from "@/data/site";
import { getWorkerApiConfigError } from "@/src/services/api";
import { usePageMetadata } from "@/hooks/usePageMetadata";


const areaIcons: Record<string, ComponentType<{ className?: string }>> = {
  "/learn/articles": FileText,
  "/learn/podcasts": Podcast,
  "/learn/practice": Book,
  "/learn/systems": Network,
};


export default function Insights() {
  usePageMetadata({
    title: "Learn",
    description: "Articles, podcasts, practice material, and systems for applied thinking, execution, and review.",
  });

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
      fetchContentIndex("design-reviews"),
    ])
      .then(([blog, guides, podcasts, reviews]) => {
        setInsights([
          ...blog,
          ...guides,
          ...podcasts,
          ...reviews,
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
          filter === "practice" ? c.type === "guide" || c.type === "design-review" : c.type === filter
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
      <section>
        <SectionIntro
          title="Learn"
          description="Articles, podcasts, practice material, and systems for applied thinking, execution, and review."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
        />
      </section>

      <LandingSectionCardGrid items={landingCards} />

      <section className="space-y-6">
        <SectionIntro
          title="Browse all Learn content"
          description="Filter across articles, podcasts, guides, and design reviews to move from orientation into repeatable practice."
        />

        <div className="flex gap-2 mb-8">
          <AptButton
            variant={filter === "all" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </AptButton>
          {[
            { type: "article", label: "Articles" },
            { type: "podcast", label: "Podcasts" },
            { type: "practice", label: "Practice" },
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
