// Cloudflare Vectorize API client for Workers and local Node.js
// Docs: https://developers.cloudflare.com/vectorize/api/workers/


const isWorker = typeof globalThis !== 'undefined' && !!(globalThis as any).VECTORIZE;

function getVectorizeConfig() {
  return {
    accountId: process.env.CF_ACCOUNT_ID,
    indexName: process.env.CF_VECTORIZE_INDEX,
    apiToken: process.env.CF_VECTORIZE_API_TOKEN
  };
}

export async function embed(text: string, env?: any): Promise<number[]> {
  // Use OpenAI or Cloudflare embedding endpoint (API key from env)
  let key: string | undefined = undefined;
  if (env && env.OPENAI_API_KEY) {
    key = env.OPENAI_API_KEY;
  } else if (typeof process !== 'undefined' && process.env && process.env.OPENAI_API_KEY) {
    key = process.env.OPENAI_API_KEY;
  } else if (typeof globalThis !== 'undefined' && typeof (globalThis as any).OPENAI_API_KEY === 'string') {
    key = (globalThis as any).OPENAI_API_KEY;
  }
  if (!key) throw new Error('OPENAI_API_KEY not set in environment');
  const resp = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model: 'text-embedding-ada-002', input: text })
  });
  const data = await resp.json();
  console.log('OpenAI embedding API response:', JSON.stringify(data, null, 2));
  return data.data[0].embedding;
}

// Upsert a document chunk to Vectorize using binding (Worker) or REST API (local)
export async function upsertToVectorDb({ id, embedding, metadata }: { id: string, embedding: number[], metadata: any }, env?: any) {
  if (env && env.VECTORIZE) {
    // Worker binding
    await env.VECTORIZE.upsert([{ id, values: embedding, metadata }]);
    return;
  }
  // Local REST API fallback
  const { accountId, indexName, apiToken } = getVectorizeConfig();
  if (!accountId || !indexName || !apiToken) throw new Error('Missing CF_ACCOUNT_ID, CF_VECTORIZE_INDEX, or CF_VECTORIZE_API_TOKEN in env');
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/vectorize/indexes/${indexName}/documents`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      documents: [{ id, embedding, metadata }]
    })
  });
}

// Query Vectorize for top matches using binding (Worker) or REST API (local)
export async function queryVectorDb(embedding: number[], topK: number, env?: any): Promise<Array<{ id: string, score: number, metadata: any, text: string }>> {
  if (env && env.VECTORIZE) {
    // DEBUG: Log embedding shape before query
    console.log('DEBUG: queryVectorDb embedding length =', Array.isArray(embedding) ? embedding.length : typeof embedding, 'Sample:', embedding?.slice?.(0, 5));
    const results = await env.VECTORIZE.query({
      topK,
      vector: embedding,
      includeMetadata: true,
      includeValues: false
    });
    return results.matches || [];
  }
  // Local REST API fallback
  const { accountId, indexName, apiToken } = getVectorizeConfig();
  if (!accountId || !indexName || !apiToken) throw new Error('Missing CF_ACCOUNT_ID, CF_VECTORIZE_INDEX, or CF_VECTORIZE_API_TOKEN in env');
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/vectorize/indexes/${indexName}/query`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      embedding,
      top_k: topK
    })
  });
  const data = await resp.json();
  return data.matches || [];
}
