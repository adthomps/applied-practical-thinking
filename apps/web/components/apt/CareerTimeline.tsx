import { ChevronRight } from "lucide-react";
import { AptTag } from "@apt/ui";
import { cn } from "@/lib/utils";
import type { CareerPhase } from "@/data/career";

type CareerTimelineProps = {
  phases: CareerPhase[];
  className?: string;
};

// Compact career-phases timeline. Phases are ordered newest first; the first
// phase is treated as current. Highlights use native <details> so they work
// without JavaScript and need no animation.
export function CareerTimeline({ phases, className }: CareerTimelineProps) {
  return (
    <ol className={cn("relative space-y-8 border-l border-border pl-6", className)}>
      {phases.map((phase, index) => {
        const isCurrent = index === 0;

        return (
          <li key={phase.id} className="relative">
            <span
              aria-hidden="true"
              className={cn(
                "absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2",
                isCurrent ? "border-primary bg-primary" : "border-border bg-background"
              )}
            />

            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-foreground">{phase.name}</h3>
              <AptTag variant={isCurrent ? "accent" : "muted"} size="sm">
                {phase.period}
              </AptTag>
            </div>

            <ul className="mt-2 space-y-1 text-sm">
              {phase.roles.map((role) => (
                <li key={role.title} className="text-foreground/90">
                  {role.title}
                  <span className="text-muted-foreground">
                    {" "}
                    · {role.start} – {role.end}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{phase.summary}</p>

            {phase.highlights.length > 0 ? (
              <details className="group mt-3">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-sm text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 motion-reduce:transition-none" />
                  Highlights
                </summary>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {phase.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span aria-hidden="true" className="text-primary">
                        →
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
