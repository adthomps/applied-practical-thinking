import { AptTag } from "@/components/apt/AptTag";
import { Book, Clock, FileText, Podcast } from "lucide-react";

export function InsightMeta({ insight, showType = true, showDate = true, showConcepts = true }) {
  const typeIcons = {
    article: FileText,
    blog: FileText,
    podcast: Podcast,
    guide: Book,
    "design-review": Book,
  };
  const typeLabels = {
    article: "Article",
    blog: "Article",
    podcast: "Podcast",
    guide: "Guide",
    "design-review": "Design Review",
  };
  const Icon = typeIcons[insight.type] || Book;
  return (
    <div className="flex items-center gap-3 mb-4">
      {showType ? (
        <AptTag variant="primary">
          <Icon className="h-3 w-3 mr-1" />
          {typeLabels[insight.type]}
        </AptTag>
      ) : null}
      {insight.duration && (
        <span className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          {insight.duration}
        </span>
      )}
      {showDate && insight.publishedAt && (
        <span className="text-xs text-muted-foreground">
          {new Date(insight.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      )}
      {showConcepts && insight.concepts?.length > 0 && (
        <span className="flex gap-1 ml-2">
          {insight.concepts.slice(0, 3).map((concept) => (
            <AptTag key={concept} variant="muted" size="sm">
              {concept}
            </AptTag>
          ))}
        </span>
      )}
    </div>
  );
}
