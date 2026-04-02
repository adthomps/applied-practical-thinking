import { useParams, Link } from "react-router-dom";
import { useContentDetail } from "@/hooks/useContentDetail";
import { InsightMeta } from "@/components/apt/InsightMeta";
import { ContentDetailPage } from "@/components/apt/ContentDetailPage";
import { AptButton } from "@/components/apt";
import {
  Book,
  Mic,
  FileText,
  Volume2,
} from "lucide-react";

const typeIcons = {
  blog: FileText,
  podcast: Mic,
  guide: Book,
  "case-study": Book,
};

const typeLabels = {
  blog: "Blog Post",
  podcast: "Podcast Episode",
  guide: "Guide",
  "case-study": "Mock Case Study",
};

export default function InsightDetail() {
  const { id } = useParams<{ id: string }>();
  const {
    item: insight,
    markdown,
    loading,
    error,
  } = useContentDetail({
    indexTypes: ["blog", "guides", "podcasts", "case-studies"],
    idOrSlug: id,
    match: "id",
  });

  if (loading) {
    return <div className="container py-12 text-center">Loading…</div>;
  }
  if (error || !insight) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Insight not found</h1>
        <p className="text-muted-foreground mb-6">
          The learning resource you're looking for doesn't exist.
        </p>
        <AptButton variant="primary" asChild>
          <Link to="/learn">Back to Learn</Link>
        </AptButton>
      </div>
    );
  }

  const TypeIcon = typeIcons[insight.type] || Book;

  const mediaBlock =
    insight.type === "podcast" && insight.media ? (
      <div className="p-6 bg-muted/30 rounded-lg border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-primary/20 text-primary">
            <Volume2 className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">Listen to this episode</p>
            <p className="text-sm text-muted-foreground">{insight.duration}</p>
          </div>
        </div>

        {insight.media.embedUrl ? (
          <div className="w-full rounded-lg overflow-hidden">
            <iframe
              src={insight.media.embedUrl}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            />
          </div>
        ) : insight.media.audioUrl ? (
          <audio controls className="w-full" preload="metadata">
            <source src={insight.media.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : null}

        {insight.media.videoUrl ? (
          <div className="mt-4">
            <video
              controls
              className="w-full rounded-lg"
              preload="metadata"
              poster=""
            >
              <source src={insight.media.videoUrl} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>
        ) : null}
      </div>
    ) : null;

  return (
    <ContentDetailPage
      backHref="/learn"
      backLabel="Back to Learn"
      item={insight}
      markdown={markdown}
      aboutTitle="Summary"
      //markdownTitle="Full Content"
      headerMeta={<InsightMeta insight={insight} showDate={false} showConcepts={false} />}
      heroFallback={
        <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
          <TypeIcon className="h-12 w-12" />
          <span className="text-sm">{typeLabels[insight.type]}</span>
        </div>
      }
      mainTop={mediaBlock}
    />
  );
}
