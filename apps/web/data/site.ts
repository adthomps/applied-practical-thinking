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
  
  // Primary Navigation
  nav: [
    {
      label: "Home",
      path: "/",
      description: "APT overview and system model.",
    },
    {
      label: "Labs",
      path: "/labs",
      description: "Experiments, concepts, mocks, prototypes, and live demos.",
    },
    {
      label: "Proof",
      path: "/proof",
      description: "Stable, complete systems and implementation proof.",
    },
    {
      label: "Principles",
      path: "/principles",
      description: "Curated APT principles summaries linked to canonical GitHub sources.",
    },
    {
      label: "Insights",
      path: "/insights",
      description: "Articles, podcasts, and practical breakdowns.",
    },
    {
      label: "About",
      path: "/about",
      description: "How I think, what I work on, and why APT exists.",
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
