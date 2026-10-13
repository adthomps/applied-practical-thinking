import type { SystemDefinition as System } from "@apt/knowledge";

export const systems: System[] = [
  {
    id: "apt-site",
    title: "APT Site",
    purpose: "Public portfolio on Pages, with a separate Worker for feeds",
    description:
      "Cloudflare Pages serves the Vite and React app. The Worker reads those published files and returns the public feeds.",
    referenceType: "Operating Model",
    status: "Active",
    appliesTo: ["Public sites", "Content platforms"],
    decisions: [
      "Pages serves the browser app",
      "The Worker is a separate deploy and reads published content",
      "Authored markdown is the source; public copies are generated",
    ],
    tradeoffs: [
      "Feeds depend on the Worker being able to read the Pages origin",
      "There is no visitor account system on this site",
    ],
    concepts: ["vite", "react", "cloudflare"],
    links: {
      demo: "/",
      docs: "/labs",
    },
  },
  {
    id: "apt-commerce-compass",
    title: "APT Commerce Compass",
    purpose: "Working payments proof with a sandbox money path",
    description:
      "Signup, portals, and staff review are implemented. The money path is the APT sandbox processor.",
    referenceType: "Working Proof",
    status: "Working proof",
    appliesTo: ["Payments proofs", "Merchant onboarding"],
    decisions: [
      "Show the merchant and partner path",
      "Record money-path results in the sandbox processor",
      "Keep live processors out of the claim",
    ],
    tradeoffs: [
      "Cannot prove settlement or a production certification",
      "A clickable site can be mistaken for live acquiring if the limit is not stated",
    ],
    concepts: ["payments", "sandbox"],
    links: {
      demo: "https://commerce.appliedpracticalthinking.com",
      docs: "/labs/live-demos/apt-commerce-compass",
    },
  },
  {
    id: "apt-health-compass",
    title: "APT Health Compass",
    purpose: "Signed-in review of periodic results and supplements",
    description:
      "Personal health review for the signed-in account. Not medical advice, and not a public dataset.",
    referenceType: "Working Proof",
    status: "Working proof",
    appliesTo: ["Personal health review"],
    decisions: [
      "Keep records with the signed-in account",
      "Describe the product without publishing sample patient data",
      "State that the app is not medical advice",
    ],
    tradeoffs: [
      "A stranger cannot inspect someone else's results",
      "The public proof is the boundary, not a shared dashboard",
    ],
    concepts: ["health", "privacy"],
    links: {
      demo: "https://health.appliedpracticalthinking.com",
      docs: "/labs/live-demos/apt-health-compass",
    },
  },
  {
    id: "crt-world",
    title: "CRT World",
    purpose: "Live author site with a separate editorial admin",
    description:
      "The Worlds of C. R. Thompson is public. Editorial control stays in the admin, backed by a Worker and D1.",
    referenceType: "Live System",
    status: "Live",
    appliesTo: ["Author sites", "Editorial publishing"],
    decisions: [
      "Publish the author site on its own domain",
      "Keep editorial tools in the admin",
      "Store content in D1 behind the Worker",
    ],
    tradeoffs: [
      "Anonymous visitors do not get the editorial tools",
      "The public site and the admin share one app, so the boundary has to stay explicit",
    ],
    concepts: ["content", "cloudflare"],
    links: {
      demo: "https://crthompson.net/",
      docs: "/labs/live-demos/crt-world",
    },
  },
];
