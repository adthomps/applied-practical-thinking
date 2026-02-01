import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { shareOrCopy } from "@/src/services/share";
import { Link } from "react-router-dom";
import { ContentIndexItem } from "@/src/services/contentIndex";
import {
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptTag,
  AptButton,
} from "@/components/apt";
import {
  Lightbulb,
  Figma,
  Play,
  ExternalLink,
  Share2,
  Book,
  Image as ImageIcon,
  ChevronUp,
} from "lucide-react";

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

interface LabCardProps {
  lab: ContentIndexItem;
}

export function LabCard({ lab }: LabCardProps) {
  const [showAllTech, setShowAllTech] = useState(false);
  const { toast } = useToast();
  const TypeIcon = typeIcons[lab.type as string] || Lightbulb;

  // Related insights should be passed as a prop or handled at parent level.
  // Remove direct dependency on insights array.
  const relatedInsightItems: any[] = [];

  const platforms = Array.isArray(lab.platforms) ? lab.platforms : [];
  const technologies = Array.isArray(lab.technologies) ? lab.technologies : [];
  const visibleTechCount = 4;
  const hasMoreTech = technologies.length > visibleTechCount;
  const visibleTechnologies = showAllTech
    ? technologies
    : technologies.slice(0, visibleTechCount);

  const links = lab.links || {};
  const hasLinks = links.demo || links.figma || links.lovable || links.repo;

  const basePath = "/portfolio/labs";
  const labId = lab.slug || lab.id;

  // ...existing code...
  return (
    <div className="block group">
      <AptCard variant="feature" padding="none" className="overflow-hidden flex flex-col h-full">
        {/* Thumbnail Area with link */}
        <Link to={`${basePath}/${labId}`} className="block focus:outline-none">
          <div className="relative aspect-video bg-muted/30 flex items-center justify-center border-b border-border/50">
            {lab.thumbnail ? (
              <img
                src={lab.thumbnail}
                alt={lab.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground/50 h-full w-full">
                <TypeIcon className="h-8 w-8" />
                <span className="text-xs">{typeLabels[lab.type as string] || lab.type || "Lab"}</span>
              </div>
            )}
            {/* Type badge overlay */}
            <div className="absolute top-3 left-3 z-10">
              <div className="backdrop-blur-sm bg-background/80 rounded-md shadow px-0.5">
                <AptTag variant="accent" className="bg-transparent">
                  <TypeIcon className="h-3 w-3 mr-1" />
                  {typeLabels[lab.type as string] || lab.type || "Lab"}
                </AptTag>
              </div>
            </div>
            {lab.status === "archived" && (
              <div className="absolute top-3 right-3">
                <AptTag variant="muted" className="backdrop-blur-sm">
                  Archived
                </AptTag>
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 min-h-[320px]">
          <AptCardHeader className="p-0">
            <Link to={`${basePath}/${labId}`} className="block group-hover:text-primary transition-colors focus:outline-none">
              <AptCardTitle className="text-lg">
                {lab.title}
              </AptCardTitle>
            </Link>
            {lab.problem && (
              <p className="text-sm font-medium text-primary mt-1">{lab.problem}</p>
            )}
          </AptCardHeader>

          <AptCardDescription className="mt-3 line-clamp-2">
            {lab.description}
          </AptCardDescription>

          {/* Platform Tags */}
          {platforms.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {platforms.map((platform) => (
                <AptTag key={platform} variant="default">
                  {platform}
                </AptTag>
              ))}
            </div>
          )}

          {/* Technology Tags */}
          {technologies.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1.5">
                {visibleTechnologies.map((tech) => (
                  <AptTag key={tech} variant="muted">
                    {tech}
                  </AptTag>
                ))}
                {hasMoreTech && !showAllTech && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowAllTech(true);
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +{technologies.length - visibleTechCount} more
                  </button>
                )}
              </div>
              {showAllTech && hasMoreTech && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowAllTech(false);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-1.5 flex items-center gap-0.5"
                >
                  <ChevronUp className="h-3 w-3" />
                  Show less
                </button>
              )}
            </div>
          )}

          {/* Spacer to push footer to bottom */}
          <div className="flex-1" />

          {/* Action Buttons (always render for layout consistency) */}
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-border/50 min-h-[48px]">
            {hasLinks ? (
              <>
                {links.figma && (
                  <AptButton
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => e.stopPropagation()}
                    asChild
                  >
                    <a
                      href={links.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Figma className="h-3.5 w-3.5 mr-1.5" />
                      Figma
                    </a>
                  </AptButton>
                )}
                {links.lovable && (
                  <AptButton
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => e.stopPropagation()}
                    asChild
                  >
                    <span>
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                      Lovable
                    </span>
                  </AptButton>
                )}
                {links.demo && (
                  <AptButton
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => e.stopPropagation()}
                    asChild
                  >
                    <span>
                      <Play className="h-3.5 w-3.5 mr-1.5" />
                      Demo
                    </span>
                  </AptButton>
                )}
                {links.repo && (
                  <AptButton
                    variant="secondary"
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                    asChild
                  >
                    <a
                      href={links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                      Repo
                    </a>
                  </AptButton>
                )}
              </>
            ) : (
              <div className="flex-1" aria-hidden="true"></div>
            )}
          </div>

          {/* Share + Related + Date */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">
              {lab.date ? new Date(lab.date as string).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null}
            </span>
            <AptButton
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const url = window.location.origin + `/portfolio/labs/${lab.slug || lab.id}`;
                const result = await shareOrCopy({
                  title: lab.title,
                  url,
                });
                if (result.status === "copied") {
                  toast({ title: "Link copied to clipboard" });
                } else if (result.status === "unsupported") {
                  toast({ title: "Share not supported", description: "Could not share or copy link." });
                }
              }}
            >
              <Share2 className="h-3.5 w-3.5 mr-1.5" />
              Share
            </AptButton>

            {relatedInsightItems && relatedInsightItems.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Book className="h-3 w-3" />
                <span>
                  {relatedInsightItems.length} insight
                  {relatedInsightItems.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      </AptCard>
    </div>
  );
}
