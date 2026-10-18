// Career history for the About page timeline.
// Source: workexperience.txt (supplied by Adam Thompson, 2026-10-18).
// Only add verified roles, dates, and highlights here.

export interface CareerRole {
  title: string;
  start: string;
  end: string;
}

export interface CareerPhase {
  id: string;
  name: string;
  period: string;
  summary: string;
  roles: CareerRole[];
  highlights: string[];
}

export const careerEmployer = {
  name: "Authorize.net / Visa Acceptance Solutions",
  shortName: "Visa",
  start: "Jun 2006",
  location: "Bellevue, WA",
} as const;

// Ordered newest first.
export const careerPhases: CareerPhase[] = [
  {
    id: "service-experience",
    name: "Service experience & go to market",
    period: "2023 – Present",
    summary:
      "Lead service experience and go-to-market readiness for Authorize.net and Visa Acceptance Solutions, connecting product, technology, customer experience, and operations so new capabilities are ready to launch, adopt, and support.",
    roles: [{ title: "Director, Service Experience / Go to Market", start: "Mar 2023", end: "Present" }],
    highlights: [
      "Lead cross-functional readiness for payment products, APIs, platform changes, migrations, infrastructure, and security initiatives.",
      "Translate complex payment and integration changes into migration strategies, requirements, workflows, documentation, and customer enablement.",
      "Apply AI-assisted workflows to requirements discovery, integration analysis, migration planning, testing, documentation, and knowledge management.",
    ],
  },
  {
    id: "product-readiness",
    name: "Product support & readiness leadership",
    period: "2017 – 2023",
    summary:
      "Led product support and service readiness for the Authorize.net platform, preparing teams and customers for new products, APIs, platform changes, security initiatives, and operational improvements.",
    roles: [{ title: "Director, Product Support & Readiness", start: "Apr 2017", end: "Mar 2023" }],
    highlights: [
      "Directed readiness for new and updated products, APIs, user experiences, infrastructure, and security changes across the launch lifecycle.",
      "Built monitoring and validation for APIs, merchant interfaces, portals, and critical customer journeys using Postman, Runscope, Ghost Inspector, and UptimeRobot.",
      "Improved incident response, service communications, operational reporting, and visibility into customer-impacting issues.",
    ],
  },
  {
    id: "product-support-engineering",
    name: "Product support engineering",
    period: "2011 – 2017",
    summary:
      "Platform subject-matter expert and escalation resource for complex payment, API, operational, and partner issues across Authorize.net products and services.",
    roles: [
      { title: "Senior Product Support Engineer", start: "Oct 2015", end: "Apr 2017" },
      { title: "Product Support Engineer", start: "Sep 2011", end: "Oct 2015" },
    ],
    highlights: [
      "Investigated complex defects through transaction analysis, reproduction, log review, and work with Engineering and QA.",
      "Supported emerging digital payments including Apple Pay, Google Pay, Visa Checkout, mobile payments, and mobile point of sale.",
      "Used Tableau and operational data to surface trends, and maintained documentation using Knowledge-Centered Service practices.",
    ],
  },
  {
    id: "customer-support",
    name: "Customer support foundations",
    period: "2006 – 2011",
    summary:
      "Front-line and then senior technical support for merchants, partners, and resellers, building a foundation in payment gateways, card processing, APIs, and ecommerce integrations.",
    roles: [
      { title: "Senior Customer Support Representative", start: "Feb 2009", end: "Sep 2011" },
      { title: "Customer Support Representative", start: "Jun 2006", end: "Feb 2009" },
    ],
    highlights: [
      "Troubleshot merchant websites, shopping-cart integrations, payment configurations, APIs, and hosted payment solutions.",
      "Served as an escalation resource and subject-matter expert for the Customer Support organization.",
    ],
  },
];
