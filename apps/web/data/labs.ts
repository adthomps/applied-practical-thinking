export type LabType = "concept" | "mock" | "demo";

export interface Lab {
  id: string;
  title: string;
  type: LabType;
  problem: string;
  description: string;
  thumbnail?: string;
  platforms: string[];
  technologies: string[];
  tags: string[];
  status: "active" | "archived";
  links: {
    demo?: string;
    figma?: string;
    lovable?: string;
    repo?: string;
  };
  relatedInsights?: string[];
}

export const labs: Lab[] = [
  {
    id: "decision-log",
    title: "Decision Log",
    type: "demo",
    problem: "How do you track architectural decisions over time?",
    description:
      "A lightweight system for recording and querying technical decisions with context, alternatives considered, and outcomes.",
    platforms: ["Lovable"],
    technologies: ["React", "TypeScript", "TailwindCSS", "shadcn/ui"],
    tags: ["documentation", "architecture", "teams"],
    status: "active",
    links: {
      lovable: "/design",
    },
    relatedInsights: ["decision-driven-development"],
  },
  {
    id: "component-catalog",
    title: "Component Catalog",
    type: "demo",
    problem: "How do you maintain consistency across a growing UI?",
    description:
      "A pattern for building and documenting reusable components with variants, accessibility, and usage guidelines.",
    platforms: ["Lovable"],
    technologies: ["React", "TypeScript", "TailwindCSS", "shadcn/ui", "Storybook"],
    tags: ["design-systems", "react", "documentation"],
    status: "active",
    links: {
      demo: "/design",
    },
  },
  {
    id: "api-contract-first",
    title: "API Contract-First",
    type: "concept",
    problem: "How do you align frontend and backend before implementation?",
    description:
      "A workflow for defining API contracts upfront using OpenAPI specs, generating types, and validating at build time.",
    platforms: ["Figma Make"],
    technologies: ["OpenAPI", "TypeScript", "Zod"],
    tags: ["api", "typescript", "contracts"],
    status: "active",
    links: {},
    relatedInsights: ["edge-first-thinking"],
  },
  {
    id: "edge-caching-patterns",
    title: "Edge Caching Patterns",
    type: "mock",
    problem: "How do you optimize for global latency without complexity?",
    description:
      "Reference implementations for caching strategies at the edge using Cloudflare Workers and cache APIs.",
    platforms: ["Figma Make", "Lovable"],
    technologies: ["Cloudflare", "TypeScript", "Hono", "Workers"],
    tags: ["performance", "cloudflare", "caching"],
    status: "active",
    links: {
      figma: "#",
    },
    relatedInsights: ["edge-first-thinking"],
  },
];
