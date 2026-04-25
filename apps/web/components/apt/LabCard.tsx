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
import { getStatusTagDefinition } from "@/lib/tagSemantics";

const typeIcons: Record<string, typeof Lightbulb> = {
  concept: Lightbulb,
  mock: Figma,
  demo: Lightbulb,
};

const typeLabels: Record<string, string> = {
  concept: "Concept",
  mock: "Mock",
  demo: "Prototype",
};

interface LabCardProps {
  lab: ContentIndexItem;
}

export function LabCard({ lab }: LabCardProps) {
  const TypeIcon = typeIcons[lab.type as string] || Lightbulb;

  const platforms = Array.isArray(lab.platforms) ? lab.platforms : [];
  const technologies = Array.isArray(lab.technologies) ? lab.technologies : [];
  const statusTag = getStatusTagDefinition(lab.status as string | undefined);

  const links = lab.links || {};
  const basePath = "/labs";
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
      icon={<TypeIcon className="h-5 w-5" />}
      eyebrow={
        <AptTag variant="primary">
          {typeLabels[lab.type as string] || lab.type || "Experiment"}
        </AptTag>
      }
      status={statusTag ? <AptTag variant={statusTag.variant}>{statusTag.label}</AptTag> : null}
      highlight={
        lab.problem ? (
          <p className="line-clamp-1 text-sm font-medium text-primary">{lab.problem}</p>
        ) : null
      }
      metadata={
        <div className="flex flex-wrap gap-1.5">
          {platforms.slice(0, 1).map((platform) => (
            <AptTag key={platform} variant="default">
              {platform}
            </AptTag>
          ))}
          {technologies.slice(0, 2).map((tech) => (
            <AptTag key={tech} variant="muted">
              {tech}
            </AptTag>
          ))}
          {platforms.length + technologies.length > 3 ? (
            <span className="text-xs text-muted-foreground">
              +{platforms.length + technologies.length - 3} more
            </span>
          ) : null}
        </div>
      }
      footerMeta={
        lab.date ? (
          new Date(lab.date as string).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        ) : (
          <span>Experiment</span>
        )
      }
      action={quickAction}
    />
  );
}
