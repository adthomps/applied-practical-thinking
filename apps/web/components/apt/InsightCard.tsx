import { Book, Podcast, FileText } from "lucide-react";
import { BrowseCard, AptCard, AptTag, AptCardDescription, AptCardTitle } from "@/components/apt";
import type { ContentIndexItem } from "@/src/services/contentIndex";
import { Link } from "react-router-dom";

export interface InsightCardProps {
  insight: ContentIndexItem;
  to: string;
  compact?: boolean;
}

export function InsightCard({ insight, to, compact = false }: InsightCardProps) {
  const typeIcons = {
    article: FileText,
    blog: FileText,
    podcast: Podcast,
    guide: Book,
    "design-review": Book,
  };
  const Icon = typeIcons[insight.type] || Book;
  const typeLabels = {
    article: "Article",
    blog: "Article",
    podcast: "Podcast",
    guide: "Guide",
    "design-review": "Design Review",
  };
  const displayTypeLabel =
    insight.type === "guide" || insight.type === "design-review"
      ? "Case Study"
      : typeLabels[insight.type] || "Insight";

  if (compact) {
    return (
      <AptCard variant="interactive" padding="none" className="group h-full">
        <Link to={to} className="flex h-full flex-col p-5 focus:outline-none">
          <div className="mb-3 flex items-center justify-between gap-3">
            <AptTag variant="accent" size="sm">
              {displayTypeLabel}
            </AptTag>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>

          <AptCardTitle className="line-clamp-2 text-xl leading-tight transition-colors group-hover:text-primary">
            {insight.title}
          </AptCardTitle>
          <AptCardDescription className="mt-2 line-clamp-2 text-sm">
            {insight.description}
          </AptCardDescription>

          {insight.concepts && insight.concepts.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {insight.concepts.slice(0, 3).map((concept: string) => (
                <AptTag key={concept} variant="muted" size="sm">
                  {concept}
                </AptTag>
              ))}
            </div>
          ) : null}

          <div className="mt-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
            {insight.publishedAt ? (
              <span>
                {new Date(insight.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            ) : null}
            {insight.duration ? <span className="ml-2">{insight.duration}</span> : null}
          </div>
        </Link>
      </AptCard>
    );
  }

  return (
    <BrowseCard
      detailTo={to}
      title={insight.title}
      description={insight.description}
      icon={<Icon className="h-5 w-5" />}
      eyebrow={
        <>
          <AptTag variant="accent">
            {displayTypeLabel}
          </AptTag>
        </>
      }
      metadata={
        insight.concepts && insight.concepts.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {insight.concepts.slice(0, 2).map((concept: string) => (
              <AptTag key={concept} variant="muted" size="sm">
                {concept}
              </AptTag>
            ))}
            {insight.concepts.length > 2 ? (
              <span className="text-xs text-muted-foreground">
                +{insight.concepts.length - 2} more
              </span>
            ) : null}
          </div>
        ) : null
      }
      footerMeta={
        <div className="flex flex-wrap items-center gap-2">
          {insight.publishedAt ? (
            <span>
              {new Date(insight.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          ) : null}
          {insight.duration ? <span>{insight.duration}</span> : null}
        </div>
      }
    />
  );
}
