import { Link } from "react-router-dom";
import { InsightMeta } from "@/components/apt/InsightMeta";
import { Book, Podcast, FileText } from "lucide-react";
import { AptCard, AptCardTitle, AptCardDescription } from "@/components/apt/AptCard";
import { ArrowRight } from "lucide-react";

export interface InsightCardProps {
  insight: any;
  to: string;
}

export function InsightCard({ insight, to }: InsightCardProps) {
  // Icon selection logic (should match InsightMeta)
  const typeIcons = {
    blog: FileText,
    podcast: Podcast,
    guide: Book,
    "case-study": Book,
  };
  const Icon = typeIcons[insight.type] || Book;

  return (
    <Link to={to} className="block group">
      <AptCard variant="feature" padding="none" className="overflow-hidden h-full flex flex-col">
        {/* Thumbnail Area (optional, fallback to icon if missing) */}
        <div className="relative aspect-video bg-muted/30 flex items-center justify-center border-b border-border/50">
          {insight.thumbnail ? (
            <img
              src={insight.thumbnail}
              alt={insight.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon className="h-12 w-12 text-muted-foreground/30" />
          )}
        </div>
        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <InsightMeta insight={insight} />
          <AptCardTitle className="text-lg group-hover:text-primary transition-colors">
            {insight.title}
          </AptCardTitle>
          <AptCardDescription className="mt-2 line-clamp-2">
            {insight.description}
          </AptCardDescription>
          {/* Concept tags (max 3 + overflow) */}
          {insight.concepts && insight.concepts.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {insight.concepts.slice(0, 3).map((concept: string) => (
                <span key={concept} className="bg-muted px-2 py-0.5 rounded text-xs text-muted-foreground">
                  {concept}
                </span>
              ))}
              {insight.concepts.length > 3 && (
                <span className="text-xs text-muted-foreground">+{insight.concepts.length - 3} more</span>
              )}
            </div>
          )}
          <div className="flex-1" />
          {/* Footer: publication date and arrow */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
            {insight.publishedAt && (
              <span className="text-xs text-muted-foreground">
                {new Date(insight.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </AptCard>
    </Link>
  );
}
