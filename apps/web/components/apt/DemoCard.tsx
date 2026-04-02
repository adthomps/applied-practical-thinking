
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
import { Play, Zap, FlaskConical, ExternalLink, Share2, Beaker, ChevronUp, Clock } from "lucide-react";

const typeIcons: Record<string, typeof Play> = {
  interactive: Zap,
  prototype: FlaskConical,
  experiment: Beaker,
};

const typeLabels: Record<string, string> = {
  interactive: "Interactive",
  prototype: "Prototype",
  experiment: "Experiment",
};

interface DemoCardProps {
  demo: ContentIndexItem;
}

export function DemoCard({ demo }: DemoCardProps) {
  const [showAllTech, setShowAllTech] = useState(false);
  const { toast } = useToast();
  const TypeIcon = typeIcons[demo.type as string] || Play;
  const relatedLabCount = Array.isArray(demo.relatedLabs) ? demo.relatedLabs.length : 0;

  const platforms = Array.isArray(demo.platforms) ? demo.platforms : [];
  const technologies = Array.isArray(demo.technologies) ? demo.technologies : [];
  const visibleTechCount = 4;
  const hasMoreTech = technologies.length > visibleTechCount;
  const visibleTechnologies = showAllTech
    ? technologies
    : technologies.slice(0, visibleTechCount);

  const links = demo.links || {};
  const hasLinks = links.demo || links.figma || links.repo;
  const isComingSoon = demo.status === "coming-soon";

  const detailHref = `/experiments/live-demos/${demo.slug || demo.id}`;

  return (
    <div className="block group">
      <AptCard
        variant="feature"
        padding="none"
        className={`overflow-hidden flex flex-col h-full ${isComingSoon ? "opacity-75" : ""}`}
      >
        {/* Thumbnail Area with link */}
        <Link to={detailHref} className="block focus:outline-none">
          <div className="relative aspect-video bg-muted/30 flex items-center justify-center border-b border-border/50">
            {demo.thumbnail ? (
              <img
                src={demo.thumbnail}
                alt={demo.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground/50 h-full w-full">
                <TypeIcon className="h-8 w-8" />
                <span className="text-xs">{typeLabels[demo.type as string] || demo.type || "Demo"}</span>
              </div>
            )}
            {/* Type badge overlay */}
            <div className="absolute top-3 left-3 z-10">
              <div className="backdrop-blur-sm bg-background/80 rounded-md shadow px-0.5">
                <AptTag variant="accent" className="bg-transparent">
                  <TypeIcon className="h-3 w-3 mr-1" />
                  {typeLabels[demo.type as string] || demo.type || "Demo"}
                </AptTag>
              </div>
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
        </Link>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 min-h-[320px]">
          <AptCardHeader className="p-0">
            <Link to={detailHref} className="block group-hover:text-primary transition-colors focus:outline-none">
              <AptCardTitle className="text-lg">
                {demo.title}
              </AptCardTitle>
            </Link>
            {demo.problem && (
              <p className="text-sm font-medium text-primary mt-1">
                {demo.problem}
              </p>
            )}
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
                  <AptButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowAllTech(true);
                    }}
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs text-muted-foreground"
                  >
                    +{technologies.length - visibleTechCount} more
                  </AptButton>
                )}
              </div>
              {showAllTech && hasMoreTech && (
                <AptButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowAllTech(false);
                  }}
                  variant="link"
                  size="sm"
                  className="mt-1.5 h-auto p-0 text-xs text-muted-foreground"
                >
                  <ChevronUp className="h-3 w-3" />
                  Show less
                </AptButton>
              )}
            </div>
          )}

          {/* Spacer to push footer to bottom */}
          <div className="flex-1" />

          {/* Action Buttons (always render for layout consistency) */}
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-border/50 min-h-[48px]">
            {hasLinks && !isComingSoon ? (
              <>
                {links.demo && (
                  <AptButton
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a href={links.demo} target="_blank" rel="noopener noreferrer">
                      <Play className="h-3.5 w-3.5 mr-1.5" />
                      Try Demo
                    </a>
                  </AptButton>
                )}
                {links.figma && (
                  <AptButton variant="secondary" size="sm" className="flex-1" asChild>
                    <a
                      href={links.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                      Figma
                    </a>
                  </AptButton>
                )}
                {links.repo && (
                  <AptButton variant="secondary" size="sm" asChild>
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

          {/* Coming Soon State */}
          {isComingSoon && (
            <div className="mt-5 pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground text-center">
                This demo is under development
              </p>
            </div>
          )}

          {/* Share + Related + Date */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">
              {demo.date ? new Date(demo.date as string).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null}
            </span>
            <AptButton
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const url = window.location.origin + detailHref;
                const result = await shareOrCopy({
                  title: demo.title,
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

            {relatedLabCount > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Beaker className="h-3 w-3" />
                <span>
                  {relatedLabCount} experiment
                  {relatedLabCount > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      </AptCard>
    </div>
  );
}
