// Site-level configuration
export const siteConfig = {
  name: "APT",
  fullName: "Applied Practical Thinking",
  description:
    "A personal portfolio and demonstration brand focused on turning real-world product, platform, and engineering problems into working systems, reference implementations, and reusable patterns.",
  tagline: "Systems over screens. Decisions over demos.",
  disclaimer: "This is a demonstration, not a production system.",
  
  // External links
  appliedGalleryUrl: "https://appliedpracticalthinking.com/about/visual-gallery",
  appliedGalleryLabel: "Applied Visual Gallery",
  
  // Primary Navigation with hover descriptions and dropdowns
  nav: [
    { 
      label: "Start", 
      path: "/start",
      description: "New here? Start with the core ideas, examples, and how to navigate APT.",
    },
    {
      label: "Learn",
      path: "/learn",
      description: "Guides, articles, podcasts, and worked examples for applied thinking in practice.",
      children: [
        {
          label: "Guides",
          path: "/learn/guides",
          description: "Practical walkthroughs, reference guides, and worked examples.",
        },
        {
          label: "Articles",
          path: "/learn/articles",
          description: "Short- to medium-form writing on applied ideas and practical systems.",
        },
        {
          label: "Podcasts",
          path: "/learn/podcasts",
          description: "Audio discussions exploring thinking, frameworks, and real-world tradeoffs.",
        },
      ],
    },
    {
      label: "Systems",
      path: "/systems",
      description: "Completed system models with architecture, decisions, and known tradeoffs.",
    },
    {
      label: "Labs",
      path: "/labs",
      description: "Experiments, prototypes, and proof-of-work built in the open.",
      children: [
        {
          label: "Labs",
          path: "/labs",
          description: "Early, exploratory, and iterative builds that make ideas tangible.",
          tagline: "Ideas given shape—early, imperfect, and intentional.",
        },
        {
          label: "Live Demos",
          path: "/labs/live-demos",
          description: "Real, running demos that make concepts observable and testable.",
          tagline: "Not products—clickable proof.",
        },
      ],
    },
    {
      label: "Design",
      path: "/design",
      description: "APT's design doctrine, standards, thinking, and architecture.",
      children: [
        {
          label: "Design Thinking",
          path: "/design/thinking",
          description: "Problem framing, assumptions, constraints, and decision-making in practice.",
          tagline: "How problems are defined before solutions exist.",
        },
        {
          label: "Design System",
          path: "/design/system",
          description: "How APT applies design systems—tokens, semantics, components, and constraints.",
          tagline: "Designing for clarity, consistency, and scale.",
        },
        {
          label: "Design Architecture",
          path: "/design/architecture",
          description: "Repo layout, deployment flows, API contracts, and enforcement rules.",
          tagline: "Structure exists to prevent failure, not to enable creativity.",
        },
      ],
    },
    {
      label: "About",
      path: "/about",
      description: "How I think, what I work on, and why APT exists.",
      children: [
        {
          label: "Visual Gallery",
          path: "/about/visual-gallery",
          description: "Photography and drone work framed as visual exploration under constraint.",
          tagline: "Seeing patterns through composition and limitation.",
        },
      ],
    },
  ],
} as const;

// Author/Profile configuration
export const authorConfig = {
  name: "Adam Thompson",
  title: "Director of Service Experience",
  location: "Bellevue, WA",
  joinedDate: "June 2006",
  roles: ["Engineer", "Photographer", "Product Leader", "Systems Thinker"],
  bio: "Passionate about technology-driven innovation, I design and implement tools, software, and systems that streamline and enhance processes. I focus on improving user experiences through precise testing and automation, delivering quality and efficiency in every project. Outside of work, I channel my creativity into photography and drone flying, capturing unique perspectives from both ground and sky. I also enjoy writing about my experiences and insights in the tech industry, sharing knowledge and fostering community engagement.",
  shortBio: "Crafting digital experiences through code and capturing moments through the lens. Welcome to my creative journey.",
  
  // Profile image (relative to public/ or external URL)
  profileImage: "/profile.jpg", // Place your image in apps/web/public/profile.jpg

  // Contact
  contact: {
    email: "test@example.com",
  },
  
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
