import { useState } from "react";
import { Link } from "react-router-dom";
import { Lab, LabType } from "@/data/labs";
import { insights } from "@/data/learn";
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

const typeIcons: Record<LabType, typeof Lightbulb> = {
  concept: Lightbulb,
  mock: Figma,
  demo: Play,
};

const typeLabels: Record<LabType, string> = {
  concept: "Concept",
  mock: "Mock",
  demo: "Demo",
};

interface LabCardProps {
  lab: Lab;
}

export function LabCard({ lab }: LabCardProps) {
  const [showAllTech, setShowAllTech] = useState(false);
  const TypeIcon = typeIcons[lab.type];

  const relatedInsightItems = lab.relatedInsights
    ?.map((id) => insights.find((i) => i.id === id))
    .filter(Boolean);

  const platforms = lab.platforms || [];
  const technologies = lab.technologies || [];
  const visibleTechCount = 4;
  const hasMoreTech = technologies.length > visibleTechCount;
  const visibleTechnologies = showAllTech
    ? technologies
    : technologies.slice(0, visibleTechCount);

  const hasLinks =
    lab.links.demo || lab.links.figma || lab.links.lovable || lab.links.repo;

  const basePath = "/portfolio/labs";
  
  return (
    <Link to={`${basePath}/${lab.id}`} className="block group">
      <AptCard variant="feature" padding="none" className="overflow-hidden flex flex-col h-full">
        {/* Thumbnail Area */}
        <div className="relative aspect-video bg-muted/30 flex items-center justify-center border-b border-border/50">
          {lab.thumbnail ? (
            <img
              src={lab.thumbnail}
              alt={lab.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
              <ImageIcon className="h-8 w-8" />
            </div>
          )}
          {/* Type badge overlay */}
          <div className="absolute top-3 left-3">
            <AptTag variant="accent" className="backdrop-blur-sm bg-accent/30">
              <TypeIcon className="h-3 w-3 mr-1" />
              {typeLabels[lab.type]}
            </AptTag>
          </div>
          {lab.status === "archived" && (
            <div className="absolute top-3 right-3">
              <AptTag variant="muted" className="backdrop-blur-sm">
                Archived
              </AptTag>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <AptCardHeader className="p-0">
            <AptCardTitle className="text-lg group-hover:text-primary transition-colors">
              {lab.title}
            </AptCardTitle>
            <p className="text-sm font-medium text-primary mt-1">{lab.problem}</p>
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

          {/* Action Buttons */}
          {hasLinks && (
            <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-border/50">
              {lab.links.figma && (
                <AptButton
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => e.stopPropagation()}
                  asChild
                >
                  <a
                    href={lab.links.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Figma className="h-3.5 w-3.5 mr-1.5" />
                    Figma
                  </a>
                </AptButton>
              )}
              {lab.links.lovable && (
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
              {lab.links.demo && (
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
              {lab.links.repo && (
                <AptButton
                  variant="secondary"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                  asChild
                >
                  <a
                    href={lab.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                    Repo
                  </a>
                </AptButton>
              )}
            </div>
          )}

          {/* Share + Related */}
          <div className="flex items-center justify-between mt-3">
            <AptButton
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
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
    </Link>
  );
}
