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
      icon={<TypeIcon className="h-5 w-5" />}
      eyebrow={
        <AptTag variant="accent">
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
      highlight={
        demo.problem ? (
          <p className="line-clamp-1 text-sm font-medium text-primary">{demo.problem}</p>
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
        demo.date ? (
          new Date(demo.date as string).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        ) : isComingSoon ? (
          <span>In progress</span>
        ) : (
          <span>Live demo</span>
        )
      }
      action={quickAction}
    />
  );
}
