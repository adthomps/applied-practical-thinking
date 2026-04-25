import { useMemo, useState } from "react";
import { InsightCard } from "@/components/apt/InsightCard";
import {
  AptButton,
  RuntimeConfigNotice,
  SectionIntro,
} from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useInsightsIndexQuery } from "@/hooks/useContentAggregateQueries";

type InsightFilter = "all" | "blog" | "podcast" | "case-study";

export default function Insights() {
  usePageMetadata({
    title: "Insights",
    description:
      "Blogs, podcasts, and case studies. Each piece connects concepts to working implementations in Labs and Systems.",
  });

  const [filter, setFilter] = useState<InsightFilter>("all");
  const insightsQuery = useInsightsIndexQuery();

  const insights = useMemo(() => insightsQuery.data || [], [insightsQuery.data]);
  const loading = insightsQuery.isLoading;

  const filteredContent = useMemo(() => {
    if (filter === "all") return insights;
    if (filter === "blog") return insights.filter((item) => item.type === "blog" || item.type === "article");
    if (filter === "podcast") return insights.filter((item) => item.type === "podcast");
    return insights.filter((item) => item.type === "guide" || item.type === "design-review");
  }, [filter, insights]);

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

  return (
    <div className="container py-10 md:py-12 space-y-8">
      <section>
        <SectionIntro
          title="Insights"
          description="Blogs, podcasts, and case studies. Each piece connects concepts to working implementations in Labs and Systems."
          titleClassName="text-3xl md:text-4xl"
          descriptionClassName="text-lg max-w-3xl"
        />
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-2">
          <AptButton
            variant={filter === "all" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </AptButton>
          {[
            { type: "blog", label: "Blog" },
            { type: "podcast", label: "Podcast" },
            { type: "case-study", label: "Case Study" },
          ].map(({ type, label }) => (
            <AptButton
              key={type}
              variant={filter === type ? "primary" : "ghost"}
              size="sm"
              onClick={() => setFilter(type as InsightFilter)}
            >
              {label}
            </AptButton>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredContent.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              to={`/insights/${insight.id}`}
              compact
            />
          ))}
        </div>

        {filteredContent.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No insight items match this tab yet.
          </div>
        ) : null}
      </section>
    </div>
  );
}
