import { Link } from "react-router-dom";
import {
  AptButton,
  AptCard,
  AptCardContent,
  AptCardDescription,
  AptCardHeader,
  AptCardTitle,
  AptTag,
} from "@/components/apt";
import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  LayoutGrid,
  Layers3,
  Route,
} from "lucide-react";

const pillars = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Learn",
    description: "Articles, podcasts, guides, and worked examples that help people understand and apply the ideas.",
    rationale: "This is the educational surface. It should answer what APT believes and how to use it.",
  },
  {
    icon: <FlaskConical className="h-5 w-5" />,
    title: "Experiments",
    description: "Concepts, mocks, prototypes, and live demos that make proof visible before it becomes a stable reference.",
    rationale: "This is the experimentation surface. It should make proof visible without pretending every artifact is complete.",
  },
  {
    icon: <LayoutGrid className="h-5 w-5" />,
    title: "Design",
    description: "The operating doctrine behind APT: thinking, system, architecture, content strategy, and systems.",
    rationale: "This is the standards surface. It explains why the site is organized the way it is.",
  },
  {
    icon: <Layers3 className="h-5 w-5" />,
    title: "Systems",
    description: "Stable system references inside Design with architecture, decisions, constraints, and tradeoffs.",
    rationale: "This is the reference layer inside Design. It shows what has become coherent enough to reuse.",
  },
];

const principles = [
  "Organize by visitor intent before content format.",
  "Keep stable references under Design while exploratory proof lives in Experiments.",
  "Treat demos as supporting proof, not the primary taxonomy.",
  "Make the reasoning behind the information architecture visible.",
];

const visitorPaths = [
  {
    title: "I want to understand the ideas",
    path: "/learn",
    summary: "Start with Articles and Podcasts, then move into Guides when you need a practical path.",
  },
  {
    title: "I want reusable patterns",
    path: "/design/systems",
    summary: "Use Design > Systems when you need architecture, tradeoffs, and reference-model thinking.",
  },
  {
    title: "I want to see proof-of-work",
    path: "/experiments",
    summary: "Use Experiments for concepts and mocks, then Live Demos when you want to interact with the work.",
  },
];

export default function PortfolioContentStrategy() {
  return (
    <div className="container py-12 md:py-16 space-y-16">
      <section className="max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <AptTag variant="accent">Content Strategy</AptTag>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          How APT Organizes Information
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Content strategy at APT is not decoration. It is the information architecture that helps
          people understand what they are looking at, why it exists, and how to move from learning
          to reference to working proof.
        </p>
        <AptButton variant="outline" asChild>
          <Link to="/start">
            <Route className="h-4 w-4" />
            Follow the Start Path
          </Link>
        </AptButton>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">IA Principles</h2>
        <p className="text-muted-foreground mb-6">
          The structure exists to reduce ambiguity and make intent legible.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
            <AptCard key={principle} variant="subtle">
              <AptCardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <Route className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-foreground">{principle}</p>
                </div>
              </AptCardContent>
            </AptCard>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">Section Roles</h2>
        <p className="text-muted-foreground mb-6">
          Each top-level section has a distinct job so visitors do not have to infer the structure.
        </p>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => (
            <AptCard key={pillar.title} variant="interactive" className="h-full">
              <AptCardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    {pillar.icon}
                  </div>
                  <AptCardTitle>{pillar.title}</AptCardTitle>
                </div>
                <AptCardDescription>{pillar.description}</AptCardDescription>
              </AptCardHeader>
              <AptCardContent>
                <p className="text-sm text-muted-foreground">{pillar.rationale}</p>
              </AptCardContent>
            </AptCard>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">Audience Paths</h2>
        <p className="text-muted-foreground mb-6">
          The site should meet visitors where they are instead of forcing them to learn internal labels first.
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          {visitorPaths.map((path) => (
            <AptCard key={path.title} variant="feature" className="h-full">
              <AptCardHeader>
                <AptCardTitle className="text-lg">{path.title}</AptCardTitle>
                <AptCardDescription>{path.summary}</AptCardDescription>
              </AptCardHeader>
              <AptCardContent>
                <AptButton variant="ghost" asChild>
                  <Link to={path.path}>
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </AptButton>
              </AptCardContent>
            </AptCard>
          ))}
        </div>
      </section>
    </div>
  );
}
