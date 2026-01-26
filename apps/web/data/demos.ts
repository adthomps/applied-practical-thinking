export type DemoType = "interactive" | "prototype" | "experiment";

export interface Demo {
  id: string;
  title: string;
  type: DemoType;
  problem: string;
  description: string;
  thumbnail?: string;
  platforms: string[];
  technologies: string[];
  tags: string[];
  status: "live" | "coming-soon" | "archived";
  links: {
    demo?: string;
    figma?: string;
    repo?: string;
  };
  relatedLabs?: string[];
}

export const demos: Demo[] = [
  {
    id: "contrast-checker",
    title: "WCAG Contrast Checker",
    type: "interactive",
    problem: "How do you verify color accessibility in real-time?",
    description:
      "A live tool for testing color combinations against WCAG 2.1 contrast requirements with instant AAA/AA compliance feedback.",
    platforms: ["Web"],
    technologies: ["React", "TypeScript", "HSL Color Math"],
    tags: ["accessibility", "design-systems", "wcag"],
    status: "live",
    links: {
      demo: "/portfolio/design-system#contrast",
    },
    relatedLabs: ["component-catalog"],
  },
  {
    id: "design-token-playground",
    title: "Design Token Playground",
    type: "interactive",
    problem: "How do you explore a design system interactively?",
    description:
      "An interactive showroom for exploring colors, typography, spacing, and component variants in real-time.",
    platforms: ["Web"],
    technologies: ["React", "TypeScript", "TailwindCSS", "shadcn/ui"],
    tags: ["design-systems", "tokens", "exploration"],
    status: "live",
    links: {
      demo: "/portfolio/design-system",
    },
    relatedLabs: ["component-catalog"],
  },
  {
    id: "architecture-visualizer",
    title: "Architecture Visualizer",
    type: "prototype",
    problem: "How do you communicate system structure at a glance?",
    description:
      "Visual diagrams and boundary maps for understanding monorepo layouts, CI/CD flows, and deployment patterns.",
    platforms: ["Web"],
    technologies: ["React", "TypeScript", "Mermaid"],
    tags: ["architecture", "documentation", "visualization"],
    status: "live",
    links: {
      demo: "/portfolio/design-architecture",
    },
  },
  {
    id: "decision-explorer",
    title: "Decision Explorer",
    type: "experiment",
    problem: "How do you navigate architectural decisions over time?",
    description:
      "A timeline-based interface for exploring recorded design decisions with context, rationale, and outcomes.",
    platforms: ["Web"],
    technologies: ["React", "TypeScript", "Markdown"],
    tags: ["documentation", "decisions", "architecture"],
    status: "coming-soon",
    links: {},
    relatedLabs: ["decision-log"],
  },
  {
    id: "prompt-sandbox",
    title: "Prompt Sandbox",
    type: "experiment",
    problem: "How do you test and iterate on AI prompts safely?",
    description:
      "A sandboxed environment for testing prompt variations with version control and output comparison.",
    platforms: ["Web"],
    technologies: ["React", "TypeScript", "AI APIs"],
    tags: ["ai", "prompts", "testing"],
    status: "coming-soon",
    links: {},
  },
];
