import { Link } from "react-router-dom";
import { AptCard } from "@/components/apt/AptCard";
import { siteConfig } from "@/data/site";
import { 
  Palette, 
  Brain, 
  Network,
  ArrowRight 
} from "lucide-react";

const designNav = siteConfig.nav.find(n => n.path === "/design");
const designSections = designNav?.children ?? [];

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "/design/system": Palette,
  "/design/thinking": Brain,
  "/design/architecture": Network,
};

export default function Portfolio() {
  return (
    <div className="container py-12 md:py-16 space-y-12">
      {/* Header */}
      <section className="max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Design
        </h1>
        <p className="text-lg text-muted-foreground">
          The public operating model for APT: how problems are framed, how the system is expressed, and how the architecture enforces it.
        </p>
      </section>

      {/* Design Sections Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designSections.map((section) => {
          const Icon = sectionIcons[section.path] ?? Brain;
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
