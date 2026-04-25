import { useMemo, useState, type ComponentType } from "react";
import { Book, FileText, Network, Podcast } from "lucide-react";
import { InsightCard } from "@/components/apt/InsightCard";
import {
  AptButton,
  LandingSectionCardGrid,
  RuntimeConfigNotice,
  SectionIntro,
} from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useInsightsIndexQuery } from "@/hooks/useContentAggregateQueries";


const areaIcons: Record<string, ComponentType<{ className?: string }>> = {
  "/insights/articles": FileText,
  "/insights/podcasts": Podcast,
  "/insights/practice": Book,
  "/proof": Network,
};

const insightsSections = [
  {
    label: "Articles",
    path: "/insights/articles",
    description: "Short- to medium-form writing on applied ideas and practical systems.",
  },
  {
    label: "Podcasts",
    path: "/insights/podcasts",
    description: "Audio discussions exploring thinking, frameworks, and real-world tradeoffs.",
  },
  {
    label: "Practice",
    path: "/insights/practice",
    description: "Guides and design reviews that turn ideas into repeatable work.",
  },
  {
    label: "Proof",
    path: "/proof",
    description: "Stable reference systems that capture reusable decisions and structures.",
  },
] as const;


export default function Insights() {
  usePageMetadata({
    title: "Insights",
    description: "Articles, podcasts, practice material, and systems for applied thinking, execution, and review.",
  });

  const [filter, setFilter] = useState<string | "all">("all");
  const insightsQuery = useInsightsIndexQuery();

  const insights = useMemo(() => insightsQuery.data || [], [insightsQuery.data]);
  const loading = insightsQuery.isLoading;

  const filteredContent =
    filter === "all"
      ? insights
      : insights.filter((c) =>
          filter === "practice" ? c.type === "guide" || c.type === "design-review" : c.type === filter
        );

  if (loading) {
    return <div className="container py-12 text-center">Loading learning content…</div>;
  }
  if (insightsQuery.isError) {
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
          <div className="text-center text-destructive">{insightsQuery.error?.message}</div>
        )}
      </div>
    );
  }

  const landingCards = insightsSections.map((section) => ({
    ...section,
    icon: areaIcons[section.path] ?? Book,
    metaLabel: "Insight",
  }));

  return (
    <div className="container py-8 md:py-12 space-y-12">
      <section>
        <SectionIntro
          title="Insights"
          description="Articles, podcasts, practice material, and systems for applied thinking, execution, and review."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg"
        />
      </section>

      <LandingSectionCardGrid items={landingCards} />

      <section className="space-y-6">
        <SectionIntro
          title="Browse all Insights"
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
            <InsightCard key={insight.id} insight={insight} to={`/insights/${insight.id}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
