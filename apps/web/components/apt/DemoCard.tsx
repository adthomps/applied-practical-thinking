import { useState } from "react";
import { Link } from "react-router-dom";
import { Demo, DemoType } from "@/data/demos";
import { labs } from "@/data/labs";
import {
  AptCard,
  AptCardHeader,
  AptCardTitle,
  AptCardDescription,
  AptTag,
  AptButton,
} from "@/components/apt";
import {
  Play,
  Zap,
  FlaskConical,
  ExternalLink,
  Share2,
  Beaker,
  Image as ImageIcon,
  ChevronUp,
  Clock,
} from "lucide-react";

const typeIcons: Record<DemoType, typeof Play> = {
  interactive: Zap,
  prototype: FlaskConical,
  experiment: Beaker,
};

const typeLabels: Record<DemoType, string> = {
  interactive: "Interactive",
  prototype: "Prototype",
  experiment: "Experiment",
};

interface DemoCardProps {
  demo: Demo;
}

export function DemoCard({ demo }: DemoCardProps) {
  const [showAllTech, setShowAllTech] = useState(false);
  const TypeIcon = typeIcons[demo.type];

  const relatedLabItems = demo.relatedLabs
    ?.map((id) => labs.find((l) => l.id === id))
    .filter(Boolean);

  const platforms = demo.platforms || [];
  const technologies = demo.technologies || [];
  const visibleTechCount = 4;
  const hasMoreTech = technologies.length > visibleTechCount;
  const visibleTechnologies = showAllTech
    ? technologies
    : technologies.slice(0, visibleTechCount);

  const hasLinks = demo.links.demo || demo.links.figma || demo.links.repo;
  const isComingSoon = demo.status === "coming-soon";

  return (
    <div className="block group">
      <AptCard
        variant="feature"
        padding="none"
        className={`overflow-hidden flex flex-col h-full ${isComingSoon ? "opacity-75" : ""}`}
      >
        {/* Thumbnail Area */}
        <div className="relative aspect-video bg-muted/30 flex items-center justify-center border-b border-border/50">
          {demo.thumbnail ? (
            <img
              src={demo.thumbnail}
              alt={demo.title}
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
              {typeLabels[demo.type]}
            </AptTag>
          </div>
          {demo.status === "coming-soon" && (
            <div className="absolute top-3 right-3">
              <AptTag variant="muted" className="backdrop-blur-sm">
                <Clock className="h-3 w-3 mr-1" />
                Coming Soon
              </AptTag>
            </div>
          )}
          {demo.status === "archived" && (
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
              {demo.title}
            </AptCardTitle>
            <p className="text-sm font-medium text-primary mt-1">
              {demo.problem}
            </p>
          </AptCardHeader>

          <AptCardDescription className="mt-3 line-clamp-2">
            {demo.description}
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
          {hasLinks && !isComingSoon && (
            <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-border/50">
              {demo.links.demo && (
                <AptButton
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <Link to={demo.links.demo}>
                    <Play className="h-3.5 w-3.5 mr-1.5" />
                    Try Demo
                  </Link>
                </AptButton>
              )}
              {demo.links.figma && (
                <AptButton variant="secondary" size="sm" className="flex-1" asChild>
                  <a
                    href={demo.links.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                    Figma
                  </a>
                </AptButton>
              )}
              {demo.links.repo && (
                <AptButton variant="secondary" size="sm" asChild>
                  <a
                    href={demo.links.repo}
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

          {/* Coming Soon State */}
          {isComingSoon && (
            <div className="mt-5 pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground text-center">
                This demo is under development
              </p>
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

            {relatedLabItems && relatedLabItems.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Beaker className="h-3 w-3" />
                <span>
                  {relatedLabItems.length} lab
                  {relatedLabItems.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      </AptCard>
    </div>
  );
}
