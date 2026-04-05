import type { SystemDefinition as System } from "@apt/knowledge";

export const systems: System[] = [
  {
    id: "apt-site",
    title: "APT Site",
    purpose: "Portfolio and demonstration platform",
    description:
      "This site itself—a Vite + React + Tailwind stack deployed on Cloudflare Pages with optional Hono worker APIs.",
    referenceType: "Operating Model",
    status: "Active",
    appliesTo: ["Public sites", "Content platforms", "Static-first products"],
    decisions: [
      "Static-first with optional API layer",
      "Single design system for all demos",
      "Markdown for content, TypeScript for data",
    ],
    tradeoffs: [
      "No SSR means slower FCP for content-heavy pages",
      "Worker-based APIs add deployment complexity",
    ],
    concepts: ["vite", "react", "cloudflare"],
    links: {
      demo: "/",
      docs: "/learn",
    },
    productionGuide: {
      overview: "Vite + React SPA deployed on Cloudflare Pages, with optional Hono worker APIs for backend.",
      deployment: "See README for build and deploy steps. Configure Cloudflare Pages and Wrangler for worker APIs.",
      api: "Worker APIs documented in /api routes. Auth via JWT, data via REST endpoints.",
      operations: "Monitor via Cloudflare dashboard. Rollback via git and redeploy."
    },
    learningResources: {
      rationale: "Static-first for speed and simplicity. Unified design system for consistency.",
      practice: ["systems-mapping-guide", "design-review-portfolio-redesign"],
      tutorials: ["guide-to-deployment", "guide-to-content-management"],
      glossary: ["SSR", "SPA", "API", "Design System"]
    }
  },
  {
    id: "auth-patterns",
    title: "Auth Patterns",
    purpose: "Reference implementations for authentication flows",
    description:
      "A collection of auth patterns including session management, JWT handling, and OAuth integrations with security considerations.",
    referenceType: "Pattern Library",
    status: "Active",
    appliesTo: ["Web apps", "APIs", "Protected product surfaces"],
    decisions: [
      "httpOnly cookies over localStorage",
      "Refresh token rotation",
      "Rate limiting on auth endpoints",
    ],
    tradeoffs: [
      "Cookie-based auth complicates mobile clients",
      "Token rotation adds database writes",
    ],
    concepts: ["security", "auth", "patterns"],
    links: {
      docs: "/learn",
    },
    productionGuide: {
      overview: "Auth flows using JWT, OAuth, and session management. Security-first design.",
      deployment: "Configure environment variables for secrets. Deploy with secure cookie settings.",
      api: "Endpoints documented in /api/auth. Supports login, refresh, and logout.",
      operations: "Monitor auth logs. Rotate secrets regularly."
    },
    learningResources: {
      rationale: "httpOnly cookies for security. Token rotation for safety. Rate limiting to prevent abuse.",
      practice: [],
      tutorials: ["guide-to-auth-patterns"],
      glossary: ["JWT", "OAuth", "Session", "Rate Limiting"]
    }
  },
  {
    id: "data-pipeline",
    title: "Data Pipeline",
    purpose: "Lightweight ETL for small-scale analytics",
    description:
      "A simple but robust pattern for extracting, transforming, and loading data with observability and error recovery.",
    referenceType: "Reference Model",
    status: "Active",
    appliesTo: ["Batch analytics", "Scheduled processing", "Small-scale data workflows"],
    decisions: [
      "Idempotent transforms",
      "Dead letter queues for failures",
      "Schema validation at boundaries",
    ],
    tradeoffs: [
      "Not designed for real-time streams",
      "Single-node processing limits scale",
    ],
    concepts: ["data", "etl", "observability"],
    links: {
      docs: "/learn",
    },
    productionGuide: {
      overview: "ETL pipeline for batch analytics. Built for reliability and error recovery.",
      deployment: "Run as scheduled job. Configure schema validation and error queues.",
      api: "Endpoints for ingest, transform, and load. Dead letter queue for failures.",
      operations: "Monitor job status. Handle errors via dead letter queue."
    },
    learningResources: {
      rationale: "Idempotency for safe retries. Dead letter queues for error handling.",
      practice: [],
      tutorials: ["guide-to-etl-pipeline"],
      glossary: ["ETL", "Idempotency", "Dead Letter Queue", "Schema Validation"]
    }
  },
  {
    id: "shadcn-ui-builder",
    title: "shadcn UI Builder",
    purpose: "Visual project scaffolding and design system customization tool",
    description:
      "A visual interface for configuring and generating UI projects using shadcn's open-code component registry. Enables real-time customization and open code ownership.",
    referenceType: "Tooling Reference",
    status: "External",
    appliesTo: ["Design system setup", "Frontend scaffolding", "Open-code UI workflows"],
    decisions: [
      "Open code ownership: components are copied, not imported",
      "Visual builder for real-time customization",
      "Supports multiple frameworks (Next.js, Vite, TanStack Start, v0)",
    ],
    tradeoffs: [
      "Requires manual updates for component changes",
      "No package-level updates; full code control",
    ],
    concepts: ["design system", "visual builder", "shadcn", "Radix UI", "Base UI"],
    platforms: ["web"],
    technologies: ["shadcn", "vite", "nextjs", "tanstack", "radix-ui", "base-ui"],
    links: {
      docs: "https://ui.shadcn.com/create",
      repo: "https://github.com/shadcn/ui",
      demo: "https://ui.shadcn.com/create"
    },
    productionGuide: {
      overview: "Use shadcn UI Builder to bootstrap new projects or enhance existing design systems. Configure preferences visually, then run the generated command.",
      deployment: "Visit the builder, configure, and run the generated command in your project.",
      api: "N/A",
      operations: "Manual updates for new component versions. Full code control."
    },
    learningResources: {
      rationale: "Open code for flexibility and control. Visual builder accelerates design system setup.",
      practice: ["shadcn-ui-builder-guide", "design-review-shadcn-ui-builder"],
      tutorials: ["guide-to-shadcn-ui-builder"],
      glossary: ["Design System", "Visual Builder", "Open Code"]
    }
  },
];
