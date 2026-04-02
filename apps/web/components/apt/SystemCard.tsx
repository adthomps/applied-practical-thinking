import { Link } from "react-router-dom";
import { AptCard, AptCardTitle, AptCardDescription } from "@/components/apt/AptCard";
import { AptTag } from "@/components/apt/AptTag";
import { FileText, Network } from "lucide-react";

export interface SystemCardProps {
  system: any;
  to: string;
}

export function SystemCard({ system, to }: SystemCardProps) {
  return (
    <Link to={to} className="block group">
      <AptCard variant="feature" padding="none" className="overflow-hidden h-full flex flex-col">
        <div className="relative aspect-video bg-muted/30 flex items-center justify-center border-b border-border/50">
          <Network className="h-12 w-12 text-muted-foreground/30" />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="mb-3 flex items-center gap-2">
            <AptTag variant="accent">System</AptTag>
          </div>
          <AptCardTitle className="text-lg group-hover:text-primary transition-colors">
            {system.title}
          </AptCardTitle>
          <AptCardDescription className="mt-2 line-clamp-2">
            {system.description || system.summary}
          </AptCardDescription>
          {system.concepts && system.concepts.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {system.concepts.slice(0, 3).map((concept: string) => (
                <AptTag key={concept} variant="muted">
                  {concept}
                </AptTag>
              ))}
            </div>
          )}
        </div>
      </AptCard>
    </Link>
  );
}
