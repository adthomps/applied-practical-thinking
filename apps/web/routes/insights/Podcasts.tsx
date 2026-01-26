import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { insights } from "@/data/learn";
import { AptCard } from "@/components/apt/AptCard";
import { AptTag } from "@/components/apt/AptTag";
import { ContentFilters, FilterConfig, SelectedFilters } from "@/components/apt";
import { Podcast, Clock } from "lucide-react";

export default function InsightsPodcasts() {
  const podcasts = insights.filter((i) => i.type === "podcast");
  
  const [selected, setSelected] = useState<SelectedFilters>({
    topics: [],
  });

  // Get unique filter options
  const config = useMemo<FilterConfig>(() => {
    const topics = [...new Set(podcasts.flatMap((p) => p.concepts))].sort();
    return { topics };
  }, []);

  // Filter podcasts
  const filteredPodcasts = useMemo(() => {
    if (!selected.topics?.length) return podcasts;
    return podcasts.filter((podcast) =>
      selected.topics?.some((t) => podcast.concepts.includes(t))
    );
  }, [selected.topics]);

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Podcasts
        </h1>
        <p className="text-lg text-muted-foreground">
          Audio discussions exploring thinking, frameworks, and real-world tradeoffs.
        </p>
      </div>

      <ContentFilters
        config={config}
        selected={selected}
        onChange={setSelected}
        resultCount={filteredPodcasts.length}
        totalCount={podcasts.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPodcasts.map((podcast) => (
          <Link key={podcast.id} to={`/insights/${podcast.id}`}>
            <AptCard variant="interactive" padding="none" className="h-full overflow-hidden">
              {/* Thumbnail */}
              <div className="aspect-video bg-muted/30 relative">
                {podcast.thumbnail ? (
                  <img
                    src={podcast.thumbnail}
                    alt={podcast.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Podcast className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <AptTag variant="primary">Podcast</AptTag>
                </div>
                {podcast.duration && (
                  <div className="absolute top-3 right-3">
                    <AptTag variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {podcast.duration}
                    </AptTag>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-5 space-y-3">
                <h2 className="font-semibold text-lg line-clamp-2">{podcast.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {podcast.description}
                </p>
                {podcast.concepts && podcast.concepts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {podcast.concepts.slice(0, 3).map((concept) => (
                      <AptTag key={concept} variant="ghost" size="sm">
                        {concept}
                      </AptTag>
                    ))}
                  </div>
                )}
              </div>
            </AptCard>
          </Link>
        ))}
      </div>

      {filteredPodcasts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No podcasts match your filters.
        </div>
      )}
    </div>
  );
}
