import { Link } from "react-router-dom";
import { AptCard } from "@/components/apt/AptCard";
import { siteConfig } from "@/data/site";
import { 
  FlaskConical, 
  Palette, 
  Brain, 
  Play, 
  Camera,
  ArrowRight 
} from "lucide-react";

const portfolioNav = siteConfig.nav.find(n => n.path === "/portfolio");
const portfolioSections = portfolioNav?.children ?? [];

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "/portfolio/labs": FlaskConical,
  "/portfolio/design-system": Palette,
  "/portfolio/design-thinking": Brain,
  "/portfolio/live-demos": Play,
  "/portfolio/visual-gallery": Camera,
};

export default function Portfolio() {
  return (
    <div className="container py-12 md:py-16 space-y-12">
      {/* Header */}
      <section className="max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Portfolio
        </h1>
        <p className="text-lg text-muted-foreground">
          Applied work—concepts, frameworks, demos, and visual explorations.
        </p>
      </section>

      {/* Portfolio Sections Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioSections.map((section) => {
          const Icon = sectionIcons[section.path] ?? FlaskConical;
          return (
            <Link key={section.path} to={section.path}>
              <AptCard variant="interactive" className="h-full">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold">{section.label}</h2>
                    <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                  
                  {"tagline" in section && section.tagline && (
                    <p className="text-xs text-primary/80 italic">
                      {section.tagline}
                    </p>
                  )}
                </div>
              </AptCard>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
