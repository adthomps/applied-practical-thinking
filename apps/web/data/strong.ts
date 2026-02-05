export interface StrongItem {
  id: string;
  title: string;
  problem: string;
  approach: string;
  decisions: string[];
  concepts: string[];
  links: {
    demo?: string;
    docs?: string;
    case?: string;
  };
}

export const strongItems: StrongItem[] = [
  {
    id: "platform-migration",
    title: "Platform Migration",
    problem: "Migrating a monolith to microservices without downtime",
    approach:
      "Strangler fig pattern with feature flags, incremental traffic shifting, and comprehensive rollback capabilities.",
    decisions: [
      "Service mesh for inter-service communication",
      "Event sourcing for data synchronization",
      "Blue-green deployments for cutover",
    ],
    concepts: ["migration", "microservices", "platform"],
    links: {
      docs: "/learn",
    },
  },
  {
    id: "scale-bottleneck",
    title: "Scale Bottleneck Resolution",
    problem: "Database becoming bottleneck at 10x traffic",
    approach:
      "Read replicas, query optimization, caching layers, and eventually consistent patterns for non-critical paths.",
    decisions: [
      "Redis for hot path caching",
      "Connection pooling optimization",
      "Async processing for writes",
    ],
    concepts: ["performance", "database", "scale"],
    links: {
      docs: "/learn",
    },
  },
  {
    id: "team-velocity",
    title: "Team Velocity Recovery",
    problem: "Delivery slowing despite growing team",
    approach:
      "Reduced work-in-progress, clearer ownership boundaries, and investment in developer experience tooling.",
    decisions: [
      "WIP limits per team",
      "Platform team for shared infrastructure",
      "Trunk-based development",
    ],
    concepts: ["teams", "process", "developer-experience"],
    links: {
      docs: "/learn",
    },
  },
];
