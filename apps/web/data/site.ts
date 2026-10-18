// Site-level configuration
export const siteConfig = {
  name: "APT",
  fullName: "Applied Practical Thinking",
  description:
    "A personal portfolio and demonstration brand focused on turning real-world product, platform, and engineering problems into working systems, reference implementations, and reusable patterns.",
  tagline: "Systems over screens. Decisions over demos.",
  disclaimer: "This is a demonstration, not a production system.",
  footerEyebrow: "Applied Practical Thinking",
  footerDescription:
    "Operational portfolio and reference space for practical systems, product decisions, and implementation patterns.",
  footerSystemNote: "System note: Built as a practical, evolving operational reference.",

  // External links
  appliedGalleryUrl: "/about/visual-gallery",
  appliedGalleryLabel: "Applied Visual Gallery",
  
  // Primary Navigation
  // Plain labels lead; APT terms (Labs, Proof, Principles, Insights) stay on the children.
  nav: [
    {
      label: "Home",
      path: "/",
      description: "Experience, curiosity, and practical innovation.",
    },
    {
      label: "About",
      path: "/about",
      description: "Who I am, how I got here, and what I explore outside work.",
      children: [
        { label: "Profile", path: "/about", description: "Background, career, and the thinking behind APT." },
        { label: "Photography & Drones", path: "/about/visual-gallery", description: "Photos, drone flights, and maps." },
      ],
    },
    {
      label: "Projects",
      path: "/labs",
      description: "Experiments, live demos, and shipped systems.",
      children: [
        { label: "Labs", path: "/labs", description: "All experiments: concepts, mocks, and prototypes." },
        { label: "Live Demos", path: "/labs/live-demos", description: "Runnable API and UI demonstrations." },
        { label: "Proof", path: "/proof", description: "Stable, shipped systems and implementation proof." },
      ],
    },
    {
      label: "Writing",
      path: "/insights",
      description: "Articles, case studies, and podcast episodes.",
      children: [
        { label: "All Insights", path: "/insights", description: "Every article, case study, and episode." },
        { label: "Blog", path: "/insights/blog", description: "Articles and long-form writing." },
        { label: "Case Studies", path: "/insights/case-studies", description: "Detailed case study breakdowns." },
        { label: "Podcast", path: "/insights/podcast", description: "Podcast episodes and notes." },
      ],
    },
    {
      label: "How I Work",
      path: "/principles",
      description: "The APT principles and design system behind the work.",
      children: [
        { label: "APT Principles", path: "/principles", description: "The full APT principles lifecycle overview." },
        { label: "Thinking", path: "/principles/thinking", description: "Problem framing and outcome definition." },
        { label: "Architecture", path: "/principles/architecture", description: "Boundary and contract design." },
        { label: "AI", path: "/principles/ai", description: "AI and agent augmentation standards." },
        { label: "Security", path: "/principles/security", description: "Trust boundaries and access controls." },
        { label: "Design System", path: "/design", description: "Tokens, patterns, and design documentation." },
      ],
    },
  ],
} as const;

// Author/Profile configuration
export const authorConfig = {
  name: "Adam Thompson",
  title: "Director of Service Experience / Go to Market",
  location: "Bellevue, WA",
  roles: ["Engineer", "Photographer", "Product Leader", "Systems Thinker"],
  bio: "Passionate about technology-driven innovation, I design and implement tools, software, and systems that streamline and enhance processes. I focus on improving user experiences through precise testing and automation, delivering quality and efficiency in every project. Outside of work, I channel my creativity into photography and drone flying, capturing unique perspectives from both ground and sky. I also enjoy writing about my experiences and insights in the tech industry, sharing knowledge and fostering community engagement.",
  shortBio: "Crafting digital experiences through code and capturing moments through the lens. Welcome to my creative journey.",
  
  // Profile image (relative to public/ or external URL)
  profileImage: "/profile.jpg", // Place your image in apps/web/public/profile.jpg
  
  // Social links
  social: {
    github: "https://github.com/adthomps",
    linkedin: "https://www.linkedin.com/in/adam-thompson-a547468/",
    portfolio: "https://appliedpracticalthinking.com",
    flickr: "https://www.flickr.com/photos/adam-p-thompson/",
  },
} as const;

// Type exports - using interface to properly type optional children
export interface NavChild {
  readonly label: string;
  readonly path: string;
  readonly description: string;
  readonly tagline?: string;
}

export interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly description: string;
  readonly children?: readonly NavChild[];
}
