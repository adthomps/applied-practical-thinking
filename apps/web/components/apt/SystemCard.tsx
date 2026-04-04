import { BrowseCard, AptTag } from "@/components/apt";
import { Network } from "lucide-react";
import { systems as systemDefinitions } from "@/data/systems";
import type { ContentIndexItem } from "@/src/services/contentIndex";

export interface SystemCardProps {
  system: ContentIndexItem;
  to: string;
}

export function SystemCard({ system, to }: SystemCardProps) {
  const systemDefinition = systemDefinitions.find((entry) => entry.id === system.id);
  const appliesTo = systemDefinition?.appliesTo?.slice(0, 2) ?? [];

  return (
    <BrowseCard
      detailTo={to}
      title={system.title}
      description={system.description || system.summary}
      icon={<Network className="h-5 w-5" />}
      eyebrow={
        <div className="flex flex-wrap items-center gap-2">
          <AptTag variant="accent">Reference Model</AptTag>
          {systemDefinition?.referenceType ? (
            <AptTag variant="outline" size="sm">
              {systemDefinition.referenceType}
            </AptTag>
          ) : null}
        </div>
      }
      status={
        systemDefinition?.status ? (
          <AptTag variant="secondary" size="sm">
            {systemDefinition.status}
          </AptTag>
        ) : null
      }
      highlight={
        systemDefinition?.purpose ? (
          <p className="text-sm text-muted-foreground">{systemDefinition.purpose}</p>
        ) : null
      }
      metadata={
        system.concepts && system.concepts.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {system.concepts.slice(0, 2).map((concept: string) => (
              <AptTag key={concept} variant="muted">
                {concept}
              </AptTag>
            ))}
          </div>
        ) : null
      }
      footerMeta={
        appliesTo.length > 0 ? `Applies to ${appliesTo.join(" + ")}` : systemDefinition?.referenceType
      }
      action={{ label: "Open model", href: to }}
    />
  );
}
