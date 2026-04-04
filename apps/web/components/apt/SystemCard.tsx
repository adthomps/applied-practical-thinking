import { BrowseCard, AptTag } from "@/components/apt";
import { Network } from "lucide-react";

export interface SystemCardProps {
  system: any;
  to: string;
}

export function SystemCard({ system, to }: SystemCardProps) {
  return (
    <BrowseCard
      detailTo={to}
      title={system.title}
      description={system.description || system.summary}
      eyebrow={<AptTag variant="accent">System</AptTag>}
      media={
        <div className="relative aspect-video border-b border-border/50 bg-muted/30 flex items-center justify-center">
          <Network className="h-12 w-12 text-muted-foreground/30" />
        </div>
      }
      metadata={
        system.concepts && system.concepts.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {system.concepts.slice(0, 3).map((concept: string) => (
              <AptTag key={concept} variant="muted">
                {concept}
              </AptTag>
            ))}
          </div>
        ) : null
      }
    />
  );
}
