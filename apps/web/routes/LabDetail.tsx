import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchContentIndex, type ContentIndexItem } from "@/src/services/contentIndex";
import {
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptTag,
  AptButton,
} from "@/components/apt";
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Figma,
  Play,
  ExternalLink,
  Share2,
  Book,
  Image as ImageIcon,
  FileText,
  Mic,
  BookOpen,
} from "lucide-react";
import { getStatusTagDefinition } from "@/lib/tagSemantics";

const typeIcons: Record<string, typeof Lightbulb> = {
  concept: Lightbulb,
  mock: Figma,
  demo: Play,
};

const typeLabels: Record<string, string> = {
  concept: "Concept",
  mock: "Mock",
  demo: "Demo",
};

const insightTypeIcons = {
  blog: FileText,
  podcast: Mic,
  guide: BookOpen,
};

export default function LabDetail() {
  const { id } = useParams<{ id: string }>();

  const [labsIndex, setLabsIndex] = useState<ContentIndexItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchContentIndex("labs")
      .then((items) => {
        if (cancelled) return;
        setLabsIndex(items);
      })
      .catch(() => {
        if (cancelled) return;
        setLabsIndex([]);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const lab = useMemo(() => {
    if (!id) return undefined;
    return labsIndex.find((l) => l.id === id || l.slug === id);
  }, [id, labsIndex]);
  const statusTag = getStatusTagDefinition(lab?.status as string | undefined);

  const labIndex = useMemo(() => {
    if (!id) return -1;
    return labsIndex.findIndex((l) => l.id === id || l.slug === id);
  }, [id, labsIndex]);

  const prevLab = labIndex > 0 ? labsIndex[labIndex - 1] : null;
  const nextLab = labIndex >= 0 && labIndex < labsIndex.length - 1 ? labsIndex[labIndex + 1] : null;

  const [insightsIndex, setInsightsIndex] = useState<ContentIndexItem[]>([]);
  useEffect(() => {
    let cancelled = false;
    fetchContentIndex("blog")
      .then((items) => {
        if (cancelled) return;
        setInsightsIndex(items);
      })
      .catch(() => {
        if (cancelled) return;
        setInsightsIndex([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const relatedInsightItems = useMemo(() => {
    const ids = (lab as any)?.relatedInsights as string[] | undefined;
    return ids?.map((insightId) => insightsIndex.find((i) => i.id === insightId)).filter(Boolean);
  }, [lab, insightsIndex]);

  const labType = (lab?.type ?? "concept") as string;

  if (!lab) {
    if (loading) {
      return <div className="container py-12 md:py-16">Loading…</div>;
    }
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Lab not found</h1>
        <p className="text-muted-foreground mb-6">
          The lab you're looking for doesn't exist.
        </p>
        <AptButton variant="primary" asChild>
          <Link to="/labs">Back to Labs</Link>
        </AptButton>
      </div>
    );
  }

  const TypeIcon = typeIcons[labType] ?? Lightbulb;

  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      {/* Back navigation */}
      <Link
        to="/labs"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        Back to Labs
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <AptTag variant="primary">
            <TypeIcon className="h-3 w-3 mr-1" />
            {typeLabels[labType] ?? labType}
          </AptTag>
          {statusTag ? <AptTag variant={statusTag.variant}>{statusTag.label}</AptTag> : null}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          {lab.title}
        </h1>

        <p className="text-xl text-primary font-medium">{lab.problem}</p>
      </div>

      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted/30 rounded-lg flex items-center justify-center border border-border/50 mb-8 overflow-hidden">
        {lab.thumbnail ? (
          <img
            src={lab.thumbnail}
            alt={lab.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
            <ImageIcon className="h-12 w-12" />
            <span className="text-sm">No preview available</span>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="prose prose-invert max-w-none mb-8">
        <p className="text-lg text-muted-foreground leading-relaxed">
          {lab.description}
        </p>
      </div>

      {/* Platforms & Technologies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {(lab.platforms || []).length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Platforms
            </h3>
            <div className="flex flex-wrap gap-2">
              {(lab.platforms || []).map((platform: string) => (
                <AptTag key={platform} variant="default">
                  {platform}
                </AptTag>
              ))}
            </div>
          </div>
        )}

        {(lab.technologies || []).length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {(lab.technologies || []).map((tech: string) => (
                <AptTag key={tech} variant="muted">
                  {tech}
                </AptTag>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      {(lab.tags || []).length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {(lab.tags || []).map((tag: string) => (
              <AptTag key={tag} variant="muted">
                #{tag}
              </AptTag>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {(lab.links?.demo ||
        lab.links?.figma ||
        lab.links?.lovable ||
        lab.links?.repo) && (
        <div className="flex flex-wrap gap-3 mb-10 pb-8 border-b border-border">
          {lab.links?.figma && (
            <AptButton variant="secondary" size="default" asChild>
              <a
                href={lab.links.figma}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Figma className="h-4 w-4 mr-2" />
                View in Figma
              </a>
            </AptButton>
          )}
          {lab.links?.lovable && (
            <AptButton variant="primary" size="default" asChild>
              <Link to={lab.links.lovable}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in Lovable
              </Link>
            </AptButton>
          )}
          {lab.links?.demo && (
            <AptButton variant="primary" size="default" asChild>
              <Link to={lab.links.demo}>
                <Play className="h-4 w-4 mr-2" />
                View Demo
              </Link>
            </AptButton>
          )}
          {lab.links?.repo && (
            <AptButton variant="secondary" size="default" asChild>
              <a
                href={lab.links.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Repository
              </a>
            </AptButton>
          )}
          <AptButton variant="ghost" size="default">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </AptButton>
        </div>
      )}

      {/* Related Insights */}
      {relatedInsightItems && relatedInsightItems.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            Related Insights
          </h2>
          <div className="grid gap-4">
            {relatedInsightItems.map((insight) => {
              const InsightIcon = insightTypeIcons[insight!.type];
              return (
                <Link key={insight!.id} to={`/learn/${insight!.id}`}>
                  <AptCard
                    variant="interactive"
                    padding="default"
                    className="group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <InsightIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <AptCardHeader className="p-0">
                          <div className="flex items-center gap-2 mb-1">
                            <AptTag variant="accent" className="text-xs">
                              {insight!.type}
                            </AptTag>
                          </div>
                          <AptCardTitle className="text-lg group-hover:text-primary transition-colors">
                            {insight!.title}
                          </AptCardTitle>
                        </AptCardHeader>
                        <AptCardDescription className="mt-1">
                          {insight!.description}
                        </AptCardDescription>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </AptCard>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation between labs */}
      <div className="flex items-center justify-between pt-8 border-t border-border">
        {prevLab && (prevLab.slug || prevLab.id) ? (
          <Link
            to={`/labs/${prevLab.slug ?? prevLab.id}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <div className="text-right">
              <span className="text-xs block">Previous</span>
              <span className="text-sm font-medium">{prevLab.title}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextLab && (nextLab.slug || nextLab.id) ? (
          <Link
            to={`/labs/${nextLab.slug ?? nextLab.id}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group text-right"
          >
            <div>
              <span className="text-xs block">Next</span>
              <span className="text-sm font-medium">{nextLab.title}</span>
            </div>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
