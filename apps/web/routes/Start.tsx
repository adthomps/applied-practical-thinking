import { Link } from "react-router-dom";
import { AptCard } from "@/components/apt/AptCard";
import { AptButton } from "@/components/apt/AptButton";
import { siteConfig } from "@/data/site";
import { 
  Lightbulb, 
  BookOpen, 
  Layers, 
  ArrowRight, 
  Sparkles,
  Target,
  Compass,
  Zap
} from "lucide-react";

const coreIdeas = [
  {
    icon: Target,
    title: "Systems Over Screens",
    description: "Focus on the underlying logic, constraints, and relationships—not just the UI.",
  },
  {
    icon: Layers,
    title: "Decisions Over Demos",
    description: "Value the thinking process and tradeoffs more than polished outputs.",
  },
  {
    icon: Compass,
    title: "Applied Practical Thinking",
    description: "Theory is useful only when it translates into observable, testable artifacts.",
  },
];

const startingPoints = [
  {
    icon: BookOpen,
    label: "Insights",
    path: "/insights",
    description: "Essays, podcasts, and case studies on applied thinking and systems.",
    color: "text-blue-400",
  },
  {
    icon: Lightbulb,
    label: "Portfolio",
    path: "/portfolio",
    description: "Labs, demos, design systems, and visual explorations.",
    color: "text-amber-400",
  },
  {
    icon: Sparkles,
    label: "Labs",
    path: "/portfolio/labs",
    description: "Early-stage concept construction using AI-assisted tools.",
    color: "text-purple-400",
  },
];

export default function Start() {
  return (
    <div className="container py-12 md:py-16 space-y-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm">
          <Zap className="h-4 w-4" />
          Welcome to APT
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          New here? Start with the essentials.
        </h1>
        
        <p className="text-lg text-muted-foreground leading-relaxed">
          {siteConfig.fullName} is a personal portfolio and demonstration brand. 
          Here you'll find applied work, essays, and experiments—all focused on 
          turning real-world problems into working systems.
        </p>
      </section>

      {/* Core Ideas */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Core Principles</h2>
          <p className="text-muted-foreground">The philosophy behind everything here.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreIdeas.map((idea) => (
            <AptCard key={idea.title} variant="subtle" className="text-center">
              <div className="flex flex-col items-center gap-4 p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <idea.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{idea.title}</h3>
                <p className="text-sm text-muted-foreground">{idea.description}</p>
              </div>
            </AptCard>
          ))}
        </div>
      </section>

      {/* Starting Points */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Where to Begin</h2>
          <p className="text-muted-foreground">Choose your entry point based on what interests you.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {startingPoints.map((point) => (
            <Link key={point.path} to={point.path}>
              <AptCard variant="interactive" className="h-full">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <point.icon className={`h-5 w-5 ${point.color}`} />
                    <span className="font-semibold">{point.label}</span>
                    <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </AptCard>
            </Link>
          ))}
        </div>
      </section>

      {/* How to Navigate */}
      <section className="max-w-2xl mx-auto">
        <AptCard variant="elevated">
          <div className="p-8 space-y-6">
            <h2 className="text-xl font-semibold text-center">How This Site Works</h2>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <span className="text-primary font-bold">Insights</span>
                <span>= analysis and narrative (blogs, podcasts, case studies)</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">Portfolio</span>
                <span>= applied artifacts and evidence (labs, demos, design work)</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">Labs</span>
                <span>may link to Live Demos, never the reverse</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border text-center">
              <p className="text-xs text-muted-foreground mb-4">{siteConfig.disclaimer}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/portfolio/labs">
                  <AptButton variant="primary" size="sm">
                    Explore Labs
                  </AptButton>
                </Link>
                <Link to="/about">
                  <AptButton variant="outline" size="sm">
                    Learn About Me
                  </AptButton>
                </Link>
              </div>
            </div>
          </div>
        </AptCard>
      </section>
    </div>
  );
}
