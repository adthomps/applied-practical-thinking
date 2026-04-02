export const contentIndexTypes = [
  "blog",
  "guides",
  "podcasts",
  "case-studies",
  "labs",
  "demos",
  "systems",
] as const;

export type ContentIndexType = (typeof contentIndexTypes)[number];

export interface ContentIndexItem {
  title: string;
  id?: string;
  slug?: string;
  type?: string;
  date?: string;
  description?: string;
  publishedAt?: string;
  concepts?: string[];
  tags?: string[];
  platforms?: string[];
  technologies?: string[];
  status?: string;
  links?: Record<string, string | null | undefined>;
  contentPath: string;
  excerpt?: string;
  summary?: string;
  problem?: string;
  featured?: boolean;
  related?: string[];
  relatedLabs?: string[];
  thumbnail?: string;
  [key: string]: unknown;
}
