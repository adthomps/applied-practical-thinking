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
      description: "Articles, podcasts, practice material, and systems for applied thinking in practice.",
      children: [
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
        {
          label: "Practice",
          path: "/learn/practice",
          description: "Guides and design reviews that turn ideas into repeatable work.",
        },
        {
          label: "Systems",
          path: "/learn/systems",
          description: "Reference models with decisions, tradeoffs, and production guidance.",
        },
      ],
    },
    {
      label: "Experiments",
      path: "/experiments",
      description: "Concepts, mocks, and runnable proof that make ideas tangible before they become stable references.",
      children: [
        {
          label: "All",
          path: "/experiments",
          description: "The full index of exploratory work across concepts, mocks, and live demos.",
          tagline: "Exploration made legible.",
        },
        {
          label: "Concepts",
          path: "/experiments/concepts",
          description: "Early conceptual builds and prototype directions that give shape to an idea.",
          tagline: "The first coherent form of an idea.",
        },
        {
          label: "Mocks",
          path: "/experiments/mocks",
          description: "Framed representations that clarify flow, layout, and experience before implementation hardens.",
          tagline: "Structured representations before systems settle.",
        },
        {
          label: "Live Demos",
          path: "/experiments/live-demos",
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
        {
          label: "Systems",
          path: "/design/systems",
          description: "Stable system references that capture architecture, decisions, and reusable models inside the APT doctrine.",
          tagline: "Reference models governed by the design doctrine.",
        },
        {
          label: "Content Strategy",
          path: "/design/content-strategy",
          description: "How APT organizes information so people can understand, navigate, and apply it.",
          tagline: "Information architecture made visible.",
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
