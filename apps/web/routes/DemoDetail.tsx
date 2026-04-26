
import { Navigate, useParams } from "react-router-dom";
import { ContentDetailPage } from "@/components/apt/ContentDetailPage";
import { useFeedDetailQuery } from "@/hooks/useFeedQueries";
import { Play } from "lucide-react";
import { RuntimeConfigNotice } from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";
import { toContentIndexItemFromFeed } from "@/src/services/feedAdapters";

export default function DemoDetail() {
  const { slug } = useParams<{ slug: string }>();
  const detailQuery = useFeedDetailQuery("labs", slug);
  const demo = detailQuery.data?.item?.kind === "live-demo" ? detailQuery.data.item : null;
  const markdown = detailQuery.data?.markdown || "";
  const loading = detailQuery.isLoading;
  const error = detailQuery.error?.message || (!loading && !demo ? "Not found" : null);

  if (!slug) {
    return <Navigate to="/labs/live-demos" replace />;
  }

  if (loading) {
    return <div className="container py-12 md:py-16">Loading…</div>;
  }

  if (error) {
    const configError = getWorkerApiConfigError();
    if (configError) {
      return (
        <div className="container py-12 md:py-16">
          <RuntimeConfigNotice
            message={configError.message}
            envVar={configError.envVar}
            expectedValue={configError.expectedProductionValue}
          />
        </div>
      );
    }
  }

  if (!demo) {
    return <Navigate to="/labs/live-demos" replace />;
  }

  const demoItem = toContentIndexItemFromFeed(demo);

  // Consistent fallback for missing images, matching other detail types
  const TypeIcon = Play;

  return (
    <ContentDetailPage
      backHref="/labs/live-demos"
      backLabel="Back to Live Demos"
      item={demoItem}
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
