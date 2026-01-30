import { useEffect, useState } from "react";
import { fetchContentIndex, ContentIndexItem } from "@/src/services/contentIndex";
import { labs } from "@/data/labs";
import { systems } from "@/data/systems";
import { InsightMeta } from "@/components/apt/InsightMeta";
import { InsightCard } from "@/components/apt/InsightCard";
import {
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptTag,
  AptButton,
} from "@/components/apt";
import { Link } from "react-router-dom";
import { Book, Mic, FileText, Clock, Play, Lightbulb, Figma, Settings, ArrowRight, Image as ImageIcon } from "lucide-react";

const typeIcons = {
  blog: FileText,
  podcast: Mic,
  guide: Book,
  "case-study": Book,
};

const typeLabels = {
  blog: "Blog",
  podcast: "Podcast",
  guide: "Guide",
  "case-study": "Case Study",
};


export default function Insights() {
  const [filter, setFilter] = useState<string | "all">("all");
  const [insights, setInsights] = useState<ContentIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchContentIndex("blog"),
      fetchContentIndex("guides"),
      fetchContentIndex("podcasts"),
      fetchContentIndex("case-studies"),
    ])
      .then(([blog, guides, podcasts, caseStudies]) => {
        setInsights([
          ...blog,
          ...guides,
          ...podcasts,
          ...caseStudies,
        ].sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || "")));
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const filteredContent =
    filter === "all"
      ? insights
      : insights.filter((c) => c.type === filter);

  // DEBUG: Log filteredContent to diagnose rendering issue
  console.log('filteredContent', filteredContent);

  if (loading) {
    return <div className="container py-12 text-center">Loading insights…</div>;
  }
  if (error) {
    return <div className="container py-12 text-center text-red-500">{error}</div>;
  }

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
        {(["blog", "podcast", "guide", "case-study"]).map((type) => (
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
        {filteredContent.map((insight) => (
          <InsightCard key={insight.id} insight={insight} to={`/insights/${insight.id}`} />
        ))}
      </div>
    </div>
  );
}