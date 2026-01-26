import { Link } from "react-router-dom";
import { AptEmblem } from "./AptEmblem";
import { AptButton } from "./AptButton";
import { CosmicBackground } from "./CosmicBackground";

interface HeroSectionProps {
  brand: string;
  tagline: string;
  title: string;
  description: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
}

export function HeroSection({
  brand,
  tagline,
  title,
  description,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <CosmicBackground className="min-h-[70vh] flex items-center justify-center py-16 md:py-24">
      <div className="container max-w-3xl mx-auto text-center px-4">
        {/* Emblem */}
        <div className="flex justify-center mb-8 apt-fade-in">
          <AptEmblem size="xl" glow="strong" animated />
        </div>

        {/* Brand */}
        <div className="apt-slide-up" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-2">
            {brand}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            {tagline}
          </p>
        </div>

        {/* Title & Description */}
        <div className="mt-8 apt-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xl md:text-2xl font-medium text-foreground/90 mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 apt-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            {primaryCta && (
              <AptButton variant="primary" size="lg" className="rounded-full px-8" asChild>
                <Link to={primaryCta.to}>{primaryCta.label}</Link>
              </AptButton>
            )}
            {secondaryCta && (
              <AptButton variant="outline" size="lg" className="rounded-full px-8" asChild>
                <Link to={secondaryCta.to}>{secondaryCta.label}</Link>
              </AptButton>
            )}
          </div>
        )}
      </div>
    </CosmicBackground>
  );
}
