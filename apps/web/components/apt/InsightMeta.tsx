import { AptTag } from "@/components/apt/AptTag";
import { Clock } from "lucide-react";
import { Book, Mic, FileText, Podcast } from "lucide-react";

export function InsightMeta({ insight, showDate = true, showConcepts = true }) {
  const typeIcons = {
    blog: FileText,
    podcast: Podcast,
    guide: Book,
    "case-study": Book,
  };
  const typeLabels = {
    blog: "Blog",
    podcast: "Podcast",
    guide: "Guide",
    "case-study": "Case Study",
  };
  const Icon = typeIcons[insight.type] || Book;
  return (
    <div className="flex items-center gap-3 mb-4">
      <AptTag variant="accent">
        <Icon className="h-3 w-3 mr-1" />
        {typeLabels[insight.type]}
      </AptTag>
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
