import { ContentIndexItem } from "@/src/services/contentIndex";
import {
  BrowseCard,
  AptTag,
} from "@/components/apt";
import {
  Lightbulb,
  Figma,
  ExternalLink,
  Github,
} from "lucide-react";

const typeIcons: Record<string, typeof Lightbulb> = {
  concept: Lightbulb,
  mock: Figma,
  demo: Lightbulb,
};

const typeLabels: Record<string, string> = {
  concept: "Concept",
  mock: "Mock",
  demo: "Concept",
};

interface LabCardProps {
  lab: ContentIndexItem;
}

export function LabCard({ lab }: LabCardProps) {
  const TypeIcon = typeIcons[lab.type as string] || Lightbulb;

  const platforms = Array.isArray(lab.platforms) ? lab.platforms : [];
  const technologies = Array.isArray(lab.technologies) ? lab.technologies : [];

  const links = lab.links || {};
  const basePath = "/experiments";
  const labId = lab.slug || lab.id;
  const quickAction = links.demo || links.lovable
    ? {
        label: "Open proof",
        href: String(links.demo || links.lovable),
        external: true,
        icon: <ExternalLink className="h-4 w-4" />,
      }
    : links.figma
      ? {
          label: "Open Figma",
          href: String(links.figma),
          external: true,
          icon: <Figma className="h-4 w-4" />,
        }
      : links.repo
        ? {
            label: "Open repo",
            href: String(links.repo),
            external: true,
            icon: <Github className="h-4 w-4" />,
          }
        : undefined;

  return (
    <BrowseCard
      detailTo={`${basePath}/${labId}`}
      title={lab.title}
      description={lab.description}
      eyebrow={
        <AptTag variant="accent">
          <TypeIcon className="h-3 w-3 mr-1" />
          {typeLabels[lab.type as string] || lab.type || "Experiment"}
        </AptTag>
      }
      status={lab.status === "archived" ? <AptTag variant="muted">Archived</AptTag> : null}
      highlight={lab.problem ? <p className="text-sm font-medium text-primary">{lab.problem}</p> : null}
      media={
        <div className="relative aspect-video border-b border-border/50 bg-muted/30 flex items-center justify-center">
          {lab.thumbnail ? (
            <img
              src={lab.thumbnail}
              alt={lab.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground/50">
              <TypeIcon className="h-8 w-8" />
              <span className="text-xs">{typeLabels[lab.type as string] || lab.type || "Experiment"}</span>
            </div>
          )}
        </div>
      }
      metadata={
        <div className="flex flex-wrap gap-1.5">
          {platforms.slice(0, 2).map((platform) => (
            <AptTag key={platform} variant="default">
              {platform}
            </AptTag>
          ))}
          {technologies.slice(0, 3).map((tech) => (
            <AptTag key={tech} variant="muted">
              {tech}
            </AptTag>
          ))}
        </div>
      }
      footerMeta={
        lab.date
          ? new Date(lab.date as string).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : null
      }
      action={quickAction}
    />
  );
}
