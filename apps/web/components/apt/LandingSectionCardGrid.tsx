import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AptCard } from "./AptCard";
import { AptTag } from "@apt/ui";

type LandingSectionCard = {
  label: string;
  path: string;
  description: string;
  tagline?: string;
  icon: ComponentType<{ className?: string }>;
  metaLabel?: string;
};

type LandingSectionCardGridProps = {
  items: LandingSectionCard[];
};

export function LandingSectionCardGrid({ items }: LandingSectionCardGridProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Link key={item.path} to={item.path} className="block group">
            <AptCard variant="interactive" className="h-full">
              <div className="p-6 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">{item.label}</h3>
                    {item.metaLabel ? <AptTag variant="ghost">{item.metaLabel}</AptTag> : null}
                  </div>

                  <p className="text-sm text-muted-foreground">{item.description}</p>

                  {item.tagline ? (
                    <p className="text-xs text-primary/80 italic">{item.tagline}</p>
                  ) : null}
                </div>
              </div>
            </AptCard>
          </Link>
        );
      })}
    </section>
  );
}
