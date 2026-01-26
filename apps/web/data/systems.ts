export interface System {
  id: string;
  title: string;
  purpose: string;
  description: string;
  decisions: string[];
  tradeoffs: string[];
  tags: string[];
  links: {
    demo?: string;
    docs?: string;
    repo?: string;
  };
}

export const systems: System[] = [
  {
    id: "apt-site",
    title: "APT Site",
    purpose: "Portfolio and demonstration platform",
    description:
      "This site itself—a Vite + React + Tailwind stack deployed on Cloudflare Pages with optional Hono worker APIs.",
    decisions: [
      "Static-first with optional API layer",
      "Single design system for all demos",
      "Markdown for content, TypeScript for data",
    ],
    tradeoffs: [
      "No SSR means slower FCP for content-heavy pages",
      "Worker-based APIs add deployment complexity",
    ],
    tags: ["vite", "react", "cloudflare"],
    links: {
      demo: "/",
      docs: "/learn",
    },
  },
  {
    id: "auth-patterns",
    title: "Auth Patterns",
    purpose: "Reference implementations for authentication flows",
    description:
      "A collection of auth patterns including session management, JWT handling, and OAuth integrations with security considerations.",
    decisions: [
      "httpOnly cookies over localStorage",
      "Refresh token rotation",
      "Rate limiting on auth endpoints",
    ],
    tradeoffs: [
      "Cookie-based auth complicates mobile clients",
      "Token rotation adds database writes",
    ],
    tags: ["security", "auth", "patterns"],
    links: {
      docs: "/learn",
    },
  },
  {
    id: "data-pipeline",
    title: "Data Pipeline",
    purpose: "Lightweight ETL for small-scale analytics",
    description:
      "A simple but robust pattern for extracting, transforming, and loading data with observability and error recovery.",
    decisions: [
      "Idempotent transforms",
      "Dead letter queues for failures",
      "Schema validation at boundaries",
    ],
    tradeoffs: [
      "Not designed for real-time streams",
      "Single-node processing limits scale",
    ],
    tags: ["data", "etl", "observability"],
    links: {
      docs: "/learn",
    },
  },
];
