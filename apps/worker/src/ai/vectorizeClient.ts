import type { WorkerBindings } from "../workerTypes";

type QueryMatch = {
  id: string;
  score: number;
  metadata?: Record<string, unknown>;
  text?: string;
};

type OpenAIEmbeddingResponse = {
  data?: Array<{ embedding?: number[] }>;
  error?: { message?: string };
};

type RuntimeEnv = Partial<WorkerBindings>;

function getNodeEnvValue(name: string): string | undefined {
  const maybeProcess = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  if (!maybeProcess?.env) return undefined;
  const value = maybeProcess.env[name];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function getVectorizeConfig(env?: RuntimeEnv) {
  return {
    accountId: env?.CF_ACCOUNT_ID || getNodeEnvValue("CF_ACCOUNT_ID"),
    indexName: env?.CF_VECTORIZE_INDEX || getNodeEnvValue("CF_VECTORIZE_INDEX"),
    apiToken: env?.CF_VECTORIZE_API_TOKEN || getNodeEnvValue("CF_VECTORIZE_API_TOKEN"),
  };
}

function resolveOpenAIKey(env?: RuntimeEnv): string | undefined {
  if (env?.OPENAI_API_KEY) return env.OPENAI_API_KEY;
  const fromNode = getNodeEnvValue("OPENAI_API_KEY");
  if (fromNode) return fromNode;

  if (
    typeof globalThis !== "undefined" &&
    "OPENAI_API_KEY" in globalThis &&
    typeof (globalThis as Record<string, unknown>).OPENAI_API_KEY === "string"
  ) {
    const key = (globalThis as Record<string, unknown>).OPENAI_API_KEY;
    return typeof key === "string" ? key : undefined;
  }

  return undefined;
}

export async function embed(text: string, env?: RuntimeEnv): Promise<number[]> {
  const key = resolveOpenAIKey(env);
  if (!key) throw new Error("OPENAI_API_KEY not set in environment");

  const resp = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: "text-embedding-ada-002", input: text }),
  });

  const data = (await resp.json()) as OpenAIEmbeddingResponse;
  const embedding = data.data?.[0]?.embedding;

  if (!resp.ok || !Array.isArray(embedding)) {
    throw new Error(data.error?.message || "Embedding API request failed");
  }

  return embedding;
}

export async function upsertToVectorDb(
  params: { id: string; embedding: number[]; metadata?: Record<string, unknown> },
  env?: RuntimeEnv
) {
  const { id, embedding, metadata } = params;

  if (env?.VECTORIZE) {
    await env.VECTORIZE.upsert([{ id, values: embedding, metadata }]);
    return;
  }

  const { accountId, indexName, apiToken } = getVectorizeConfig(env);
  if (!accountId || !indexName || !apiToken) {
    throw new Error("Missing CF_ACCOUNT_ID, CF_VECTORIZE_INDEX, or CF_VECTORIZE_API_TOKEN in env");
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/vectorize/indexes/${indexName}/documents`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      documents: [{ id, embedding, metadata }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Vector upsert failed: ${response.status}`);
  }
}

export async function queryVectorDb(embedding: number[], topK: number, env?: RuntimeEnv): Promise<QueryMatch[]> {
  if (env?.VECTORIZE) {
    const results = await env.VECTORIZE.query({
      topK,
      vector: embedding,
      includeMetadata: true,
      includeValues: false,
    });

    return (results.matches || []).map((match) => ({
      id: match.id,
      score: match.score,
      metadata: match.metadata,
      text: typeof match.text === "string" ? match.text : undefined,
    }));
  }

  const { accountId, indexName, apiToken } = getVectorizeConfig(env);
  if (!accountId || !indexName || !apiToken) {
    throw new Error("Missing CF_ACCOUNT_ID, CF_VECTORIZE_INDEX, or CF_VECTORIZE_API_TOKEN in env");
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/vectorize/indexes/${indexName}/query`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embedding,
      top_k: topK,
    }),
  });

  const data = (await resp.json()) as { matches?: QueryMatch[] };
  if (!resp.ok) {
    throw new Error(`Vector query failed: ${resp.status}`);
  }

  return Array.isArray(data.matches) ? data.matches : [];
}
