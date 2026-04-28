import { Link } from "react-router-dom";
import { cn } from "./utils";
import { AptButton } from "./AptButton";

export interface HeroCardProps {
  brand?: string;
  tagline?: string;
  title: string;
  description: string;
  primaryCta?: {
    label: string;
    to: string;
  };
  secondaryCta?: {
    label: string;
    to: string;
  };
  className?: string;
}

export function HeroCard({
  brand = "APT",
  tagline,
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
}: HeroCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border bg-card/50 backdrop-blur-sm p-8 md:p-12 shadow-elevation-4 overflow-hidden",
        "apt-slide-up",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <div className="mb-6">
          <span className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {brand}
          </span>
          {tagline && (
            <p className="mt-2 text-muted-foreground text-sm md:text-base">
              {tagline}
            </p>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          {title}
        </h1>

        <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl">
          {description}
        </p>

        {(primaryCta || secondaryCta) && (
          <div className="flex flex-wrap gap-3">
            {primaryCta && (
              <AptButton variant="primary" size="lg" asChild>
                <Link to={primaryCta.to}>{primaryCta.label}</Link>
              </AptButton>
            )}
            {secondaryCta && (
              <AptButton variant="outline" size="lg" asChild>
                <Link to={secondaryCta.to}>{secondaryCta.label}</Link>
              </AptButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
