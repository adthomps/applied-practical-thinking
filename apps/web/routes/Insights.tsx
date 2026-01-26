import { insights, InsightType } from "@/data/learn";
import { labs } from "@/data/labs";
import { systems } from "@/data/systems";
import {
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptTag,
  AptButton,
} from "@/components/apt";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Book, Mic, FileText, Clock, Play, Lightbulb, Figma, Settings, ArrowRight, Image as ImageIcon } from "lucide-react";

const typeIcons: Record<InsightType, typeof Book> = {
  blog: FileText,
  podcast: Mic,
  guide: Book,
};

const typeLabels: Record<InsightType, string> = {
  blog: "Blog",
  podcast: "Podcast",
  guide: "Guide",
};

export default function Insights() {
  const [filter, setFilter] = useState<InsightType | "all">("all");

  const filteredContent =
    filter === "all"
      ? insights
      : insights.filter((c) => c.type === filter);

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Insights</h1>
        <p className="text-muted-foreground max-w-2xl">
          Blogs, podcasts, and guides. Each piece connects concepts to working
          implementations in Labs and Systems.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8">
        <AptButton
          variant={filter === "all" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </AptButton>
        {(["blog", "podcast", "guide"] as InsightType[]).map((type) => (
          <AptButton
            key={type}
            variant={filter === type ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter(type)}
          >
            {typeLabels[type]}
          </AptButton>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredContent.map((insight) => {
          const Icon = typeIcons[insight.type];
          const relatedLabItems = insight.relatedLabs
            ?.map((id) => labs.find((l) => l.id === id))
            .filter(Boolean);
          const relatedSystemItems = insight.relatedSystems
            ?.map((id) => systems.find((s) => s.id === id))
            .filter(Boolean);

          return (
            <Link key={insight.id} to={`/insights/${insight.id}`} className="block group">
              <AptCard variant="feature" padding="none" className="overflow-hidden h-full flex flex-col">
                {/* Thumbnail Area */}
                <div className="relative aspect-video bg-muted/30 flex items-center justify-center border-b border-border/50">
                  {insight.thumbnail ? (
                    <img
                      src={insight.thumbnail}
                      alt={insight.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
                      <Icon className="h-8 w-8" />
                    </div>
                  )}
                  {/* Type badge overlay */}
                  <div className="absolute top-3 left-3">
                    <AptTag variant="accent" className="backdrop-blur-sm bg-accent/30">
                      <Icon className="h-3 w-3 mr-1" />
                      {typeLabels[insight.type]}
                    </AptTag>
                  </div>
                  {insight.duration && (
                    <div className="absolute top-3 right-3">
                      <AptTag variant="muted" className="backdrop-blur-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {insight.duration}
                      </AptTag>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <AptCardHeader className="p-0">
                    <AptCardTitle className="text-lg group-hover:text-primary transition-colors">
                      {insight.title}
                    </AptCardTitle>
                    <AptCardDescription className="mt-2 line-clamp-2">
                      {insight.description}
                    </AptCardDescription>
                  </AptCardHeader>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {insight.concepts.map((concept) => (
                      <AptTag key={concept} variant="muted">
                        {concept}
                      </AptTag>
                    ))}
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {relatedLabItems && relatedLabItems.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Play className="h-3 w-3" />
                          {relatedLabItems.length} lab{relatedLabItems.length > 1 ? 's' : ''}
                        </span>
                      )}
                      {relatedSystemItems && relatedSystemItems.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Settings className="h-3 w-3" />
                          {relatedSystemItems.length} system{relatedSystemItems.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
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
                </div>
              </AptCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}