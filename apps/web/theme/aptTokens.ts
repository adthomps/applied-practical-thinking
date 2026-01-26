// APT Design Tokens - Semantic design language
// These map to CSS variables defined in index.css

export const aptTokens = {
  colors: {
    // Semantic color mappings
    background: "bg-background",
    foreground: "text-foreground",
    card: "bg-card",
    cardForeground: "text-card-foreground",
    primary: "text-primary",
    primaryBg: "bg-primary",
    secondary: "bg-secondary",
    secondaryForeground: "text-secondary-foreground",
    muted: "bg-muted",
    mutedForeground: "text-muted-foreground",
    accent: "bg-accent",
    accentForeground: "text-accent-foreground",
    border: "border-border",
  },

  // Spacing scale following APT rhythm
  spacing: {
    section: "py-16 md:py-24",
    sectionCompact: "py-8 md:py-12",
    cardPadding: "p-6",
    cardPaddingLarge: "p-8",
    gap: "gap-6",
    gapLarge: "gap-8",
  },

  // Typography scale
  typography: {
    hero: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
    h1: "text-3xl md:text-4xl font-bold tracking-tight",
    h2: "text-2xl md:text-3xl font-semibold tracking-tight",
    h3: "text-xl md:text-2xl font-semibold",
    h4: "text-lg font-semibold",
    body: "text-base leading-relaxed",
    bodySmall: "text-sm leading-relaxed",
    caption: "text-xs text-muted-foreground",
  },

  // Animation classes
  animation: {
    fadeIn: "apt-fade-in",
    slideUp: "apt-slide-up",
    hoverLift: "apt-hover-lift",
    glowSubtle: "apt-glow-subtle",
  },

  // Card variants
  card: {
    base: "rounded-lg border bg-card text-card-foreground",
    elevated: "rounded-lg border bg-card text-card-foreground shadow-lg",
    interactive:
      "rounded-lg border bg-card text-card-foreground transition-all duration-200 hover:border-primary/50 hover:shadow-lg",
    hero: "rounded-xl border bg-card/50 backdrop-blur-sm text-card-foreground shadow-xl",
  },

  // Container widths
  container: {
    prose: "max-w-prose mx-auto",
    content: "max-w-4xl mx-auto",
    wide: "max-w-6xl mx-auto",
    full: "max-w-7xl mx-auto",
  },
} as const;

export type AptTokens = typeof aptTokens;
