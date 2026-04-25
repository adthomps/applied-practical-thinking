import { useParams, Link } from "react-router-dom";
import { useContentDetail } from "@/hooks/useContentDetail";
import { InsightMeta } from "@/components/apt/InsightMeta";
import { ContentDetailPage } from "@/components/apt/ContentDetailPage";
import { AptButton, RuntimeConfigNotice } from "@/components/apt";
import {
  Book,
  Mic,
  FileText,
  Volume2,
} from "lucide-react";
import { getWorkerApiConfigError } from "@/src/services/api";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const typeIcons = {
  article: FileText,
  blog: FileText,
  podcast: Mic,
  guide: Book,
  "design-review": Book,
};

const typeLabels = {
  article: "Article",
  blog: "Article",
  podcast: "Podcast Episode",
  guide: "Guide",
  "design-review": "Design Review",
};

export default function InsightDetail() {
  const { id } = useParams<{ id: string }>();
  const {
    item: insight,
    markdown,
    loading,
    error,
  } = useContentDetail({
    indexTypes: ["blog", "guides", "podcasts", "design-reviews"],
    idOrSlug: id,
    match: "id",
  });

  const hasMissingState = !loading && (Boolean(error) || !insight);

  usePageMetadata(
    hasMissingState
      ? {
          title: "Insight not found",
          description: "The requested learning resource could not be found.",
          noIndex: true,
        }
      : insight
        ? {
            title: insight.title,
            description: insight.description,
            image: insight.thumbnail,
            imageAlt: insight.title,
            type: insight.type === "podcast" ? "website" : "article",
          }
        : {
            title: "Insights",
            description: "Loading insights content.",
          }
  );

  if (loading) {
    return <div className="container py-12 text-center">Loading…</div>;
  }
  if (error || !insight) {
    const configError = getWorkerApiConfigError();
    return (
      <div className="container py-12">
        {configError ? (
          <RuntimeConfigNotice
            message={configError.message}
            envVar={configError.envVar}
            expectedValue={configError.expectedProductionValue}
          />
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Insight not found</h1>
            <p className="text-muted-foreground mb-6">
              The learning resource you're looking for doesn't exist.
            </p>
            <AptButton variant="primary" asChild>
              <Link to="/insights">Back to Insights</Link>
            </AptButton>
          </div>
        )}
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
      backHref="/insights"
      backLabel="Back to Insights"
      item={insight}
      markdown={markdown}
      aboutTitle="Summary"
      headerMeta={<InsightMeta insight={insight} showType={false} showDate={false} showConcepts={false} />}
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
