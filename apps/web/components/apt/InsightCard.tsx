import { Book, Podcast, FileText } from "lucide-react";
import { BrowseCard, AptTag } from "@/components/apt";

export interface InsightCardProps {
  insight: any;
  to: string;
}

export function InsightCard({ insight, to }: InsightCardProps) {
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

  return (
    <BrowseCard
      detailTo={to}
      title={insight.title}
      description={insight.description}
      icon={<Icon className="h-5 w-5" />}
      eyebrow={
        <>
          <AptTag variant="accent">
            {typeLabels[insight.type] || "Learn"}
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
