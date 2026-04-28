import { Link, Navigate, useParams } from "react-router-dom";
import {
  AptButton,
  AptCard,
  AptTag,
  DesignDocVersionSwitcher,
  RuntimeConfigNotice,
  SectionIntro,
} from "@/components/apt";
import { MarkdownContent } from "@/components/apt/MarkdownContent";
import { ArrowLeft, Download } from "lucide-react";
import { getWorkerApiConfigError } from "@/src/services/api";
import { useDesignDocVersion } from "@/hooks/useDesignDocVersion";
import { downloadWorkerMarkdown } from "@/src/services/download";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useDesignDocQuery } from "@/hooks/useDesignDocsQueries";

export default function DesignDocDetail() {
  const params = useParams();
  const slugParam = params["*"] || params.slug || "";
  const slug = decodeURIComponent(slugParam).trim();

  const versionState = useDesignDocVersion(slug);
  const activeMajor = versionState.activeMajor;
  const docQuery = useDesignDocQuery(slug, activeMajor);

  const docItem = docQuery.data?.item || null;
  const markdown = docQuery.data?.markdown || "";
  const publishedDocPath = versionState.canonicalPath || docItem?.canonicalPath || null;
  const docAssetBasePath = publishedDocPath
    ? publishedDocPath.replace(/[^/]*$/, "")
    : "/docs/design/";

  usePageMetadata(
    docItem
      ? {
          title: docItem.title,
          description: docItem.description,
        }
      : {
          title: "Design Doc",
          description: "APT design doctrine and pattern documentation.",
          noIndex: true,
        }
  );

  if (!slug) {
    return <Navigate to="/design/docs" replace />;
  }

  if (docQuery.isLoading || versionState.loading) {
    return <div className="container py-12 text-center">Loading design doc…</div>;
  }

  if (docQuery.isError || versionState.error) {
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
          <div className="text-center text-destructive">
            {docQuery.error?.message || versionState.error || "Failed to load design doc."}
          </div>
        )}
      </div>
    );
  }

  if (!docItem) {
    return <Navigate to="/design/docs" replace />;
  }

  const handleMarkdownDownload = async () => {
    const filenameSuffix = activeMajor ? `-v${activeMajor}` : "";
    const safeSlug = slug.replace(/\//g, "-");
    await downloadWorkerMarkdown(
      versionState.downloadApiPath,
      `apt-design-${safeSlug}${filenameSuffix}.md`
    );
  };

  return (
    <div className="container py-8 md:py-12 space-y-8">
      <AptButton variant="ghost" size="sm" asChild>
        <Link to="/design/docs">
          <ArrowLeft className="h-4 w-4" />
          Back to Design Docs
        </Link>
      </AptButton>

      <SectionIntro
        title={docItem.title}
        description={docItem.description || "Manifest-driven design documentation."}
        titleClassName="text-3xl md:text-4xl"
        descriptionClassName="text-lg"
        eyebrow={
          <div className="flex items-center gap-2">
            <AptTag variant={slug.startsWith("patterns/") ? "accent" : "primary"}>
              {slug.startsWith("patterns/") ? "Pattern" : "Doc"}
            </AptTag>
            {activeMajor ? <AptTag variant="muted">v{activeMajor}</AptTag> : null}
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <AptButton variant="outline" type="button" onClick={() => void handleMarkdownDownload()}>
            <Download className="h-4 w-4" />
            Download Markdown
          </AptButton>
          {publishedDocPath ? (
            <AptButton variant="ghost" asChild>
              <a href={publishedDocPath} target="_blank" rel="noreferrer">
                Open published doc
              </a>
            </AptButton>
          ) : null}
        </div>
        <DesignDocVersionSwitcher versionState={versionState} />
      </SectionIntro>

      <AptCard>
        <div className="p-6 md:p-8">
          <article className="prose-custom">
            <MarkdownContent
              markdown={markdown}
              contentPath="docs/design"
              assetBasePath={docAssetBasePath}
            />
          </article>
        </div>
      </AptCard>
    </div>
  );
}
