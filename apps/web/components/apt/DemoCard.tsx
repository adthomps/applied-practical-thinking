import { ContentIndexItem } from "@/src/services/contentIndex";
import {
  BrowseCard,
  AptTag,
} from "@/components/apt";
import { Play, Zap, FlaskConical, ExternalLink, Clock, Github, Beaker } from "lucide-react";

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
  const TypeIcon = typeIcons[demo.type as string] || Play;

  const platforms = Array.isArray(demo.platforms) ? demo.platforms : [];
  const technologies = Array.isArray(demo.technologies) ? demo.technologies : [];

  const links = demo.links || {};
  const isComingSoon = demo.status === "coming-soon";

  const detailHref = `/experiments/live-demos/${demo.slug || demo.id}`;
  const quickAction = !isComingSoon && (links.demo || links.figma || links.repo)
    ? links.demo
      ? {
          label: "Try demo",
          href: String(links.demo),
          external: true,
          icon: <Play className="h-4 w-4" />,
        }
      : links.figma
        ? {
            label: "Open Figma",
            href: String(links.figma),
            external: true,
            icon: <ExternalLink className="h-4 w-4" />,
          }
        : {
            label: "Open repo",
            href: String(links.repo),
            external: true,
            icon: <Github className="h-4 w-4" />,
          }
    : undefined;

  return (
    <BrowseCard
      detailTo={detailHref}
      title={demo.title}
      description={isComingSoon ? "This demo is under development." : demo.description}
      eyebrow={
        <AptTag variant="accent">
          <TypeIcon className="h-3 w-3 mr-1" />
          {typeLabels[demo.type as string] || demo.type || "Demo"}
        </AptTag>
      }
      status={
        demo.status === "coming-soon" ? (
          <AptTag variant="muted">
            <Clock className="h-3 w-3 mr-1" />
            Coming Soon
          </AptTag>
        ) : demo.status === "archived" ? (
          <AptTag variant="muted">Archived</AptTag>
        ) : null
      }
      highlight={demo.problem ? <p className="text-sm font-medium text-primary">{demo.problem}</p> : null}
      media={
        <div className="relative aspect-video border-b border-border/50 bg-muted/30 flex items-center justify-center">
          {demo.thumbnail ? (
            <img
              src={demo.thumbnail}
              alt={demo.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground/50">
              <TypeIcon className="h-8 w-8" />
              <span className="text-xs">{typeLabels[demo.type as string] || demo.type || "Demo"}</span>
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
        demo.date
          ? new Date(demo.date as string).toLocaleDateString("en-US", {
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
