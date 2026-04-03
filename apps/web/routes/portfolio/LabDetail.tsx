
import { useParams, Navigate } from "react-router-dom";
import { ContentDetailPage } from "@/components/apt/ContentDetailPage";
import { useContentDetail } from "@/hooks/useContentDetail";
import { FlaskConical, Book, FileText, Play } from "lucide-react";
import { RuntimeConfigNotice } from "@/components/apt";
import { getWorkerApiConfigError } from "@/src/services/api";

export default function PortfolioLabDetail() {
  const { id } = useParams<{ id: string }>();
  const { item: lab, markdown, loading, error } = useContentDetail({
    indexTypes: ["labs"],
    idOrSlug: id,
    match: "idOrSlug",
  });

  if (!id) {
    return <Navigate to="/experiments" replace />;
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

  if (!lab) {
    return <Navigate to="/experiments" replace />;
  }

  // Use a consistent fallback icon/label for missing images, matching blogs/podcasts/guides/case-studies
  const typeIcons = {
    lab: FlaskConical,
    demo: Play,
    guide: Book,
    blog: FileText,
  };
  const typeLabels = {
    lab: "Lab",
    demo: "Demo",
    guide: "Guide",
    blog: "Blog",
  };
  const type = lab.type || "lab";
  const TypeIcon = typeIcons[type] || FlaskConical;
  const typeLabel = typeLabels[type] || "Lab";

  return (
    <ContentDetailPage
      backHref="/experiments"
      backLabel="Back to Experiments"
      item={lab}
      markdown={markdown}
      aboutTitle="About This Experiment"
      markdownTitle="Notes"
      heroFallback={
        <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
          <TypeIcon className="h-12 w-12" />
          <span className="text-sm">{typeLabel}</span>
        </div>
      }
    />
  );
}
