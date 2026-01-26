import { useParams, Link } from "react-router-dom";
import { insights, InsightType } from "@/data/learn";
import { labs, LabType } from "@/data/labs";
import { systems } from "@/data/systems";
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
  Book,
  Mic,
  FileText,
  Clock,
  Calendar,
  Play,
  Lightbulb,
  Figma,
  Settings,
  Share2,
  Volume2,
  Image as ImageIcon,
} from "lucide-react";

const typeIcons: Record<InsightType, typeof Book> = {
  blog: FileText,
  podcast: Mic,
  guide: Book,
};

const typeLabels: Record<InsightType, string> = {
  blog: "Blog Post",
  podcast: "Podcast Episode",
  guide: "Guide",
};

const labTypeIcons: Record<LabType, typeof Lightbulb> = {
  concept: Lightbulb,
  mock: Figma,
  demo: Play,
};

export default function InsightDetail() {
  const { id } = useParams<{ id: string }>();

  const insight = insights.find((i) => i.id === id);
  const insightIndex = insights.findIndex((i) => i.id === id);
  const prevInsight = insightIndex > 0 ? insights[insightIndex - 1] : null;
  const nextInsight =
    insightIndex < insights.length - 1 ? insights[insightIndex + 1] : null;

  const relatedLabItems = insight?.relatedLabs
    ?.map((labId) => labs.find((l) => l.id === labId))
    .filter(Boolean);

  const relatedSystemItems = insight?.relatedSystems
    ?.map((systemId) => systems.find((s) => s.id === systemId))
    .filter(Boolean);

  if (!insight) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Insight not found</h1>
        <p className="text-muted-foreground mb-6">
          The insight you're looking for doesn't exist.
        </p>
        <AptButton variant="primary" asChild>
          <Link to="/insights">Back to Insights</Link>
        </AptButton>
      </div>
    );
  }

  const TypeIcon = typeIcons[insight.type];

  // Simple markdown-like rendering for content
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={index}
              className="bg-muted/50 rounded-lg p-4 overflow-x-auto my-4 text-sm"
            >
              <code>{codeContent.join("\n")}</code>
            </pre>
          );
          codeContent = [];
        }
        inCodeBlock = !inCodeBlock;
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      // Headers
      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={index}
            className="text-2xl font-bold mt-8 mb-4 text-foreground"
          >
            {line.replace("## ", "")}
          </h2>
        );
        return;
      }

      if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={index}
            className="text-xl font-semibold mt-6 mb-3 text-foreground"
          >
            {line.replace("### ", "")}
          </h3>
        );
        return;
      }

      // Blockquotes
      if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={index}
            className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground"
          >
            {line.replace("> ", "")}
          </blockquote>
        );
        return;
      }

      // List items
      if (line.startsWith("- ")) {
        elements.push(
          <li key={index} className="ml-6 list-disc text-muted-foreground">
            {line.replace("- ", "")}
          </li>
        );
        return;
      }

      // Numbered list items
      if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li key={index} className="ml-6 list-decimal text-muted-foreground">
            {line.replace(/^\d+\.\s/, "")}
          </li>
        );
        return;
      }

      // Bold text
      if (line.includes("**")) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        elements.push(
          <p key={index} className="text-muted-foreground my-2">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold text-foreground">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
        return;
      }

      // Regular paragraphs
      if (line.trim()) {
        elements.push(
          <p key={index} className="text-muted-foreground my-2 leading-relaxed">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      {/* Back navigation */}
      <Link
        to="/insights"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        Back to Insights
      </Link>

      {/* Featured Image */}
      <div className="relative aspect-video bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center mb-8 border border-border/50">
        {insight.thumbnail ? (
          <img
            src={insight.thumbnail}
            alt={insight.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
            <TypeIcon className="h-12 w-12" />
            <span className="text-sm">{typeLabels[insight.type]}</span>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <AptTag variant="accent">
            <TypeIcon className="h-3 w-3 mr-1" />
            {typeLabels[insight.type]}
          </AptTag>
          {insight.duration && (
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {insight.duration}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {insight.title}
        </h1>

        {insight.publishedAt && (
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1.5" />
            <time dateTime={insight.publishedAt}>
              {new Date(insight.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        )}
      </div>

      {/* Podcast Player */}
      {insight.type === "podcast" && insight.media && (
        <div className="mb-8 p-6 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/20 text-primary">
              <Volume2 className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium">Listen to this episode</p>
              <p className="text-sm text-muted-foreground">
                {insight.duration}
              </p>
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

          {insight.media.videoUrl && (
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
          )}
        </div>
      )}

      {/* Description */}
      <div className="mb-6 pb-6 border-b border-border">
        <p className="text-xl text-muted-foreground leading-relaxed">
          {insight.description}
        </p>
      </div>

      {/* Full Content */}
      <article className="prose-custom mb-10">
        {renderContent(insight.content)}
      </article>

      {/* Concepts */}
      {insight.concepts.length > 0 && (
        <div className="mb-8 pt-8 border-t border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Key Concepts
          </h3>
          <div className="flex flex-wrap gap-2">
            {insight.concepts.map((concept) => (
              <AptTag key={concept} variant="muted" className="text-sm">
                #{concept}
              </AptTag>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      <div className="flex gap-3 mb-10 pb-8 border-b border-border">
        <AptButton variant="ghost" size="default">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </AptButton>
      </div>

      {/* Related Labs */}
      {relatedLabItems && relatedLabItems.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Related Labs
          </h2>
          <div className="grid gap-4">
            {relatedLabItems.map((lab) => {
              const LabIcon = labTypeIcons[lab!.type];
              return (
                <Link key={lab!.id} to={`/labs/${lab!.id}`}>
                  <AptCard
                    variant="interactive"
                    padding="default"
                    className="group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <LabIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <AptCardHeader className="p-0">
                          <div className="flex items-center gap-2 mb-1">
                            <AptTag variant="accent" className="text-xs">
                              {lab!.type}
                            </AptTag>
                          </div>
                          <AptCardTitle className="text-lg group-hover:text-primary transition-colors">
                            {lab!.title}
                          </AptCardTitle>
                        </AptCardHeader>
                        <AptCardDescription className="mt-1">
                          {lab!.problem}
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

      {/* Related Systems */}
      {relatedSystemItems && relatedSystemItems.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Related Systems
          </h2>
          <div className="grid gap-4">
            {relatedSystemItems.map((system) => (
              <AptCard key={system!.id} variant="default" padding="default">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                    <Settings className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <AptCardHeader className="p-0">
                      <AptCardTitle className="text-lg">
                        {system!.title}
                      </AptCardTitle>
                    </AptCardHeader>
                    <AptCardDescription className="mt-1">
                      {system!.description}
                    </AptCardDescription>
                  </div>
                </div>
              </AptCard>
            ))}
          </div>
        </div>
      )}

      {/* Navigation between insights */}
      <div className="flex items-center justify-between pt-8 border-t border-border">
        {prevInsight ? (
          <Link
            to={`/insights/${prevInsight.id}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <div className="text-right">
              <span className="text-xs block">Previous</span>
              <span className="text-sm font-medium">{prevInsight.title}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextInsight ? (
          <Link
            to={`/insights/${nextInsight.id}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group text-right"
          >
            <div>
              <span className="text-xs block">Next</span>
              <span className="text-sm font-medium">{nextInsight.title}</span>
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
