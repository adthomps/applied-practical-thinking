import { Book, Podcast, FileText } from "lucide-react";
import { BrowseCard, AptTag } from "@/components/apt";

export interface InsightCardProps {
  insight: any;
  to: string;
}

export function InsightCard({ insight, to }: InsightCardProps) {
  const typeIcons = {
    blog: FileText,
    podcast: Podcast,
    guide: Book,
    "case-study": Book,
  };
  const Icon = typeIcons[insight.type] || Book;
  const typeLabels = {
    blog: "Article",
    podcast: "Podcast",
    guide: "Guide",
    "case-study": "Case Study",
  };

  return (
    <BrowseCard
      detailTo={to}
      title={insight.title}
      description={insight.description}
      eyebrow={
        <>
          <AptTag variant="accent">
            <Icon className="h-3 w-3 mr-1" />
            {typeLabels[insight.type] || "Learn"}
          </AptTag>
          {insight.duration ? (
            <span className="text-xs text-muted-foreground">{insight.duration}</span>
          ) : null}
        </>
      }
      media={
        <div className="relative aspect-video border-b border-border/50 bg-muted/30 flex items-center justify-center">
          {insight.thumbnail ? (
            <img
              src={insight.thumbnail}
              alt={insight.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <Icon className="h-12 w-12 text-muted-foreground/30" />
          )}
        </div>
      }
      metadata={
        insight.concepts && insight.concepts.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {insight.concepts.slice(0, 3).map((concept: string) => (
              <AptTag key={concept} variant="muted" size="sm">
                {concept}
              </AptTag>
            ))}
          </div>
        ) : null
      }
      footerMeta={
        insight.publishedAt
          ? new Date(insight.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : null
      }
    />
  );
}
