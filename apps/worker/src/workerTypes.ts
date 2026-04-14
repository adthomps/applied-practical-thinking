export type VectorizeQueryMatch = {
  id: string;
  score: number;
  metadata?: Record<string, unknown>;
  values?: number[];
  text?: string;
};

export type VectorizeBinding = {
  upsert: (vectors: Array<{ id: string; values: number[]; metadata?: Record<string, unknown> }>) => Promise<unknown>;
  query: (params: {
    topK: number;
    vector: number[];
    includeMetadata?: boolean;
    includeValues?: boolean;
  }) => Promise<{ matches?: VectorizeQueryMatch[] }>;
};

export type WorkerBindings = {
  PUBLIC_SITE_ORIGIN?: string;
  OPENAI_API_KEY?: string;
  APT_INGEST_TOKEN?: string;
  CF_ACCOUNT_ID?: string;
  CF_VECTORIZE_INDEX?: string;
  CF_VECTORIZE_API_TOKEN?: string;
  VECTORIZE?: VectorizeBinding;
};
