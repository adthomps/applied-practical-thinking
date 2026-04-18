// WCAG Contrast Ratio Utilities

/**
 * Parse HSL string to values
 * Handles formats: "220 20% 8%" or "hsl(220, 20%, 8%)"
 */
export function parseHSL(hsl: string): { h: number; s: number; l: number } | null {
  // Handle "220 20% 8%" format
  const spaceMatch = hsl.match(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%?\s+(\d+(?:\.\d+)?)%?/);
  if (spaceMatch) {
    return {
      h: parseFloat(spaceMatch[1]),
      s: parseFloat(spaceMatch[2]),
      l: parseFloat(spaceMatch[3]),
    };
  }
  
  // Handle "hsl(220, 20%, 8%)" format
  const hslMatch = hsl.match(/hsl\((\d+(?:\.\d+)?),?\s*(\d+(?:\.\d+)?)%?,?\s*(\d+(?:\.\d+)?)%?\)/i);
  if (hslMatch) {
    return {
      h: parseFloat(hslMatch[1]),
      s: parseFloat(hslMatch[2]),
      l: parseFloat(hslMatch[3]),
    };
  }
  
  return null;
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/**
 * Calculate relative luminance
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get WCAG compliance level
 */
export type WCAGLevel = "AAA" | "AA" | "AA-large" | "Fail";

export function getWCAGLevel(ratio: number): WCAGLevel {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA-large";
  return "Fail";
}

/**
 * Get contrast ratio between two HSL color strings
 */
export function getContrastRatioFromHSL(hsl1: string, hsl2: string): number | null {
  const color1 = parseHSL(hsl1);
  const color2 = parseHSL(hsl2);
  
  if (!color1 || !color2) return null;
  
  const rgb1 = hslToRgb(color1.h, color1.s, color1.l);
  const rgb2 = hslToRgb(color2.h, color2.s, color2.l);
  
  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  return getContrastRatio(l1, l2);
}

/**
 * Color pair definition for contrast checking
 */
export interface ColorPair {
  name: string;
  background: string;
  foreground: string;
  bgClass: string;
  fgClass: string;
}

/**
 * APT Design System color pairs to check
 */
export const aptColorPairs: ColorPair[] = [
  // Primary text combinations
  {
    name: "Body Text",
    background: "220 20% 8%",
    foreground: "220 10% 95%",
    bgClass: "bg-background",
    fgClass: "text-foreground",
  },
  {
    name: "Muted Text",
    background: "220 20% 8%",
    foreground: "220 10% 55%",
    bgClass: "bg-background",
    fgClass: "text-muted-foreground",
  },
  {
    name: "Card Text",
    background: "220 18% 12%",
    foreground: "220 10% 95%",
    bgClass: "bg-card",
    fgClass: "text-card-foreground",
  },
  // Primary button
  {
    name: "Primary Button",
    background: "220 70% 55%",
    foreground: "220 20% 8%",
    bgClass: "bg-primary",
    fgClass: "text-primary-foreground",
  },
  // Accent combinations
  {
    name: "Accent Button",
    background: "165 45% 40%",
    foreground: "220 20% 8%",
    bgClass: "bg-accent",
    fgClass: "text-accent-foreground",
  },
  {
    name: "Nav Selected (Dark)",
    background: "165 45% 40%",
    foreground: "220 20% 8%",
    bgClass: "bg-accent",
    fgClass: "text-accent-foreground",
  },
  {
    name: "Nav Selected (Light)",
    background: "165 45% 35%",
    foreground: "0 0% 100%",
    bgClass: "bg-accent",
    fgClass: "text-accent-foreground",
  },
  {
    name: "Accent on Background",
    background: "220 20% 8%",
    foreground: "165 45% 40%",
    bgClass: "bg-background",
    fgClass: "text-accent",
  },
  // Secondary
  {
    name: "Secondary Button",
    background: "220 15% 18%",
    foreground: "220 10% 90%",
    bgClass: "bg-secondary",
    fgClass: "text-secondary-foreground",
  },
  // Destructive
  {
    name: "Destructive Button",
    background: "0 65% 45%",
    foreground: "0 0% 100%",
    bgClass: "bg-destructive",
    fgClass: "text-destructive-foreground",
  },
  // Muted surfaces
  {
    name: "Muted Surface",
    background: "220 15% 15%",
    foreground: "220 10% 55%",
    bgClass: "bg-muted",
    fgClass: "text-muted-foreground",
  },
];
