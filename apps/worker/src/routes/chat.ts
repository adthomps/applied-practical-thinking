// POST /api/chat - RAG pipeline for APT Design Assistant

import { Hono } from 'hono';
import { z } from 'zod';
import { embed, queryVectorDb } from '../ai/vectorClient';
import type { WorkerBindings } from '../workerTypes';


const chatSchema = z.object({
  conversationId: z.string().optional(),
  scope: z.enum(['all', 'design-system', 'design-thinking', 'design-architecture', 'tokens', 'ui']),
  messages: z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string() }))
});

export const chatRoute = new Hono<{ Bindings: WorkerBindings }>().post('/api/chat', async (c) => {
  try {
    // eslint-disable-next-line no-console
    console.log('[Worker] /api/chat POST hit');
    const body = await c.req.json();
    const parsed = chatSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: 'Invalid request', details: parsed.error.format() }, 400);
    }
    // eslint-disable-next-line no-console
    console.log('[Worker] /api/chat body:', JSON.stringify(body));
    const { messages, scope } = parsed.data;
    const lastMsg = messages && messages.length > 0 ? messages[messages.length - 1].content : '';
    if (!lastMsg) {
      // eslint-disable-next-line no-console
      console.log('[Worker] /api/chat error: No question provided.');
      return c.json({ error: 'No question provided.' }, 400);
    }

    // 1. Embed the user question (pass env for Worker)
    const questionEmbedding = await embed(lastMsg, c.env);
    // DEBUG: Log embedding shape
    console.log('DEBUG: questionEmbedding length =', Array.isArray(questionEmbedding) ? questionEmbedding.length : typeof questionEmbedding, 'Sample:', questionEmbedding?.slice?.(0, 5));

    // 2. Query vector DB for top doc chunks (pass env for binding)
    const topChunks = await queryVectorDb(questionEmbedding, 4, c.env); // returns [{id, score, metadata, text}]

    // 3. Build prompt for LLM
    const context = topChunks.map((chunk, index) => `Source [${index + 1}]:\n${chunk.text || ""}`).join('\n\n');
    const prompt = `You are an expert APT documentation assistant. Use only the provided sources to answer the question. Cite sources as [1], [2], etc.\n\n${context}\n\nQuestion: ${lastMsg}\nAnswer:`;

    // 4. Call LLM (stubbed)
    // TODO: Replace with real LLM API call
    let answer = 'Not found in APT docs yet.';
    let confidence = 0.2;
    let followups: string[] = [];
    if (topChunks.length > 0) {
      const topPath = typeof topChunks[0]?.metadata?.path === "string" ? topChunks[0].metadata.path : "unknown";
      answer = `This is a grounded answer using [1], [2], etc.\n\n[1]: ${topPath}`;
      confidence = 0.8;
      followups = ['What else can you do?', 'Show me more about this topic.'];
    }

    // 5. Return answer, citations, confidence, followups
    const response = {
      answer_markdown: answer,
      citations: topChunks.map((chunk) => ({
        path: typeof chunk.metadata?.path === "string" ? chunk.metadata.path : "",
        headingPath: typeof chunk.metadata?.heading === "string" ? chunk.metadata.heading : '',
        score: chunk.score,
        snippetId: chunk.id
      })),
      confidence,
      followups
    };
    // eslint-disable-next-line no-console
    console.log('[Worker] /api/chat response:', JSON.stringify(response));
    return c.json(response);
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error('[Worker] /api/chat error:', err);
    return c.json({ error: 'Internal server error', details: err instanceof Error ? err.message : String(err) }, 500);
  }
});
