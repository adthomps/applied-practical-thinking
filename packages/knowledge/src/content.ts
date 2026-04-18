export const contentIndexTypes = [
  "blog",
  "guides",
  "podcasts",
  "design-reviews",
  "labs",
  "demos",
  "systems",
] as const;

export type ContentIndexType = (typeof contentIndexTypes)[number];

export interface ContentIndexItem {
  title: string;
  id?: string;
  slug?: string;
  indexType?: ContentIndexType;
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
  assetBasePath?: string;
  [key: string]: unknown;
}

export interface ContentDetailResponse {
  item: ContentIndexItem | null;
  markdown: string;
}

export interface PublicDesignDocItem {
  docId?: string;
  slug: string;
  title: string;
  path: string;
  description?: string;
  semanticVersion?: string;
  major?: number;
  latestMajor?: number;
  publishedAt?: string;
  changelog?: string;
  status?: string;
  aliasPath?: string;
  canonicalPath?: string;
}

export interface PublicDesignDocVersionItem {
  major: number;
  semanticVersion?: string;
  status?: string;
  publishedAt?: string;
  changelog?: string;
  canonicalPath?: string;
}

export interface PublicDesignDocDetailResponse {
  item: PublicDesignDocItem | null;
  markdown: string;
}

export interface PublicDesignDocVersionsResponse {
  slug: string;
  title: string;
  latestMajor?: number;
  versions: PublicDesignDocVersionItem[];
}

export interface PublicReviewBundleFile {
  id: string;
  title: string;
  url: string;
  contentType?: string;
  ui?: {
    cardOrder: number;
    ctaOrder?: number;
    ctaLabel?: string;
    ctaVariant?: "primary" | "secondary" | "ghost" | "outline" | "link" | "accent";
    tagLabel: string;
    tagVariant: "default" | "accent" | "muted" | "primary" | "secondary" | "outline" | "ghost";
    icon: "bot" | "download" | "file-text" | "hard-drive-download" | "network" | "palette" | "route" | "sparkles";
    description?: string;
  };
}

export interface PublicReviewBundleDocument {
  id: string;
  title: string;
  path: string;
  format?: string;
  role?: string;
  useFor?: string[];
}

export interface PublicReviewBundleHandoff {
  name: string;
  documents: string[];
  requiresTargetArtifact?: boolean;
  ui?: {
    title: string;
    order: number;
    targetArtifactLabel?: string;
  };
}

export interface PublicReviewBundleStarterPack {
  id: string;
  title: string;
  description?: string;
  order: number;
  documents: string[];
  requiresTargetArtifact?: boolean;
  targetArtifactLabel?: string;
}

export interface PublicReviewBundleManifest {
  id: string;
  title?: string;
  version?: string;
  docsMajor?: number;
  docsMajors?: number[];
  updatedAt?: string;
  bundleFiles?: PublicReviewBundleFile[];
  documents?: PublicReviewBundleDocument[];
  recommendedHandoffs?: PublicReviewBundleHandoff[];
  starterPacks?: PublicReviewBundleStarterPack[];
}

// Knowledge Engine types (ingest/index/query contracts)
export interface KnowledgeChunk {
  id: string;
  source: string;
  path?: string;
  text: string;
  tokens?: number;
  embeddingId?: string;
  metadata?: {
    tags?: string[];
    visibility?: 'public' | 'private' | 'internal';
    [key: string]: unknown;
  };
  publishedAt: string;
  [key: string]: unknown;
}

export interface IngestReport {
  ingestId: string;
  acceptedCount: number;
  rejectedCount: number;
  fileSummaries?: Array<Record<string, unknown>>;
  validationErrors?: string[];
}

export interface QueryCandidate {
  chunkId: string;
  score: number;
  snippet: string;
  citation?: string;
}

export interface QueryResponse {
  queryId: string;
  candidates: QueryCandidate[];
  composedResponse: {
    text?: string;
    citations?: string[];
    confidence?: number;
    [key: string]: unknown;
  };
}
