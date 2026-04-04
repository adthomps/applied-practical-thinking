import { Link } from "react-router-dom";
import { AptButton, AptCard, AptTag, LandingSectionCardGrid, SectionIntro } from "@/components/apt";
import { siteConfig } from "@/data/site";
import {
  ArrowRight,
  Beaker,
  BookOpen,
  Compass,
  Layers,
  Lightbulb,
  Route,
  Target,
  Zap,
} from "lucide-react";

const startingPoints = [
  {
    icon: BookOpen,
    label: "Learn",
    path: "/learn",
    description: "Guides, articles, podcasts, and worked examples for applied thinking and systems.",
    tagline: "Start here when you want ideas, explanation, and practical framing.",
    metaLabel: "Entry Point",
  },
  {
    icon: Beaker,
    label: "Experiments",
    path: "/experiments",
    description: "Concepts, mocks, and interactive proof that make ideas tangible in the open.",
    tagline: "Start here when you want to inspect artifacts and working proof.",
    metaLabel: "Entry Point",
  },
  {
    icon: Layers,
    label: "Design",
    path: "/design",
    description: "The doctrine behind APT, including thinking, architecture, systems, and content strategy.",
    tagline: "Start here when you want the governing model behind the work.",
    metaLabel: "Entry Point",
  },
];

const principles = [
  {
    icon: Target,
    title: "Systems over screens",
    description: "APT starts with structure, constraints, and relationships before UI polish.",
  },
  {
    icon: Layers,
    title: "Decisions over demos",
    description: "The reasoning behind choices matters as much as the artifact itself.",
  },
  {
    icon: Compass,
    title: "Applied, not abstract",
    description: "Ideas should resolve into observable artifacts, reference models, or practical guidance.",
  },
];

const visitorPaths = [
  {
    title: "Start with Learn",
    path: "/learn",
    summary: "Use Learn when you want the clearest entry into APT through articles, podcasts, guides, and worked examples.",
    details: "Best for orientation, understanding the language of the site, and moving from broad ideas into concrete methods.",
  },
  {
    title: "Start with Experiments",
    path: "/experiments",
    summary: "Use Experiments when you want concepts, mocks, and live proof before reading the reference layers.",
    details: "Best for people who want to see artifacts first and understand ideas through what has been made observable.",
  },
  {
    title: "Start with Design",
    path: "/design",
    summary: "Use Design when you want the doctrine, standards, systems, and content strategy behind APT itself.",
    details: "Best for understanding why the site is organized this way and how stable references differ from exploratory proof.",
  },
];

export default function Start() {
  return (
    <div className="container py-8 md:py-12 space-y-12">
      <section className="max-w-3xl mx-auto text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm">
          <Zap className="h-4 w-4" />
          Welcome to APT
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          New here? Start with the essentials.
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {siteConfig.fullName} is organized to help you understand what APT is, what has been built,
          and where to go deeper into the methods behind it.
        </p>
      </section>

      <section className="space-y-6">
        <SectionIntro
          title="Where to begin"
          description="Choose the entry point that matches your intent instead of learning the taxonomy first."
        />

        <LandingSectionCardGrid items={startingPoints} />
      </section>

      <section className="space-y-6">
        <SectionIntro
          title="How APT thinks"
          description="These are not standalone slogans. They are the orientation layer for the fuller design doctrine."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((idea) => (
            <AptCard key={idea.title} variant="subtle" className="h-full">
              <div className="p-6 space-y-4">
                <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center">
                  <idea.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{idea.title}</h3>
                  <p className="text-sm text-muted-foreground">{idea.description}</p>
                </div>
              </div>
            </AptCard>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <AptButton variant="outline" asChild>
            <Link to="/design/thinking" className="gap-2">
              Design Thinking <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
          <AptButton variant="ghost" asChild>
            <Link to="/design/content-strategy" className="gap-2">
              Content Strategy <ArrowRight className="h-4 w-4" />
            </Link>
          </AptButton>
        </div>
      </section>

      <section className="space-y-6">
        <SectionIntro
          title="How this site works"
          description="APT is organized around visitor intent: understand the ideas, inspect the proof, or study the governing system."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {visitorPaths.map((path) => (
            <AptCard key={path.title} variant="interactive" className="h-full">
              <div className="p-6 space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Route className="h-4 w-4 text-primary" />
                    <AptTag variant="ghost">Suggested Path</AptTag>
                  </div>
                  <h3 className="text-lg font-semibold">{path.title}</h3>
                  <p className="text-sm text-muted-foreground">{path.summary}</p>
                  <p className="text-sm text-muted-foreground">{path.details}</p>
                </div>

                <AptButton variant="outline" size="sm" asChild>
                  <Link to={path.path} className="gap-2">
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </AptButton>
              </div>
            </AptCard>
          ))}
        </div>
      </section>

      <section className="max-w-3xl">
        <AptCard variant="elevated">
          <div className="p-8 space-y-5">
            <h2 className="text-xl font-semibold">One note before you explore</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.disclaimer} APT is meant to make thinking visible through working artifacts,
              reference models, and documented reasoning rather than present itself as a finished product suite.
            </p>

            <div className="flex flex-wrap gap-3">
              <AptButton variant="primary" asChild>
                <Link to="/experiments">Explore Experiments</Link>
              </AptButton>
              <AptButton variant="outline" asChild>
                <Link to="/learn">Start with Learn</Link>
              </AptButton>
              <AptButton variant="ghost" asChild>
                <Link to="/about">Learn About Me</Link>
              </AptButton>
            </div>
          </div>
        </AptCard>
      </section>
    </div>
  );
}
