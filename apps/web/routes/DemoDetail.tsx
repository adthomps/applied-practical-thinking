
import { Navigate, useParams } from "react-router-dom";
import { ContentDetailPage } from "@/components/apt/ContentDetailPage";
import { useContentDetail } from "@/hooks/useContentDetail";
import { Play } from "lucide-react";

export default function DemoDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { item: demo, markdown, loading, error } = useContentDetail({
    indexTypes: ["demos"],
    idOrSlug: slug,
    match: "idOrSlug",
  });

  if (!slug) {
    return <Navigate to="/portfolio/live-demos" replace />;
  }

  if (loading) {
    return <div className="container py-12 md:py-16">Loading…</div>;
  }

  if (error || !demo) {
    return <Navigate to="/portfolio/live-demos" replace />;
  }

  // Consistent fallback for missing images, matching other detail types
  const TypeIcon = Play;

  return (
    <ContentDetailPage
      backHref="/portfolio/live-demos"
      backLabel="Back to Live Demos"
      item={demo}
      markdown={markdown}
      aboutTitle="About This Demo"
      markdownTitle="Walkthrough"
      heroFallback={
        <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
          <TypeIcon className="h-12 w-12" />
          <span className="text-sm">Demo</span>
        </div>
      }
    />
  );
}
