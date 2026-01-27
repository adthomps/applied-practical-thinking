// POST /api/chat - RAG pipeline for APT Design Assistant

import { Hono } from 'hono';
import { z } from 'zod';
import { embed, queryVectorDb } from '../ai/vectorClient';


const chatSchema = z.object({
  conversationId: z.string().optional(),
  scope: z.enum(['all', 'design-system', 'design-thinking', 'design-architecture', 'tokens', 'ui']),
  messages: z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string() }))
});

export const chatRoute = new Hono().post('/api/chat', async (c) => {
  const body = await c.req.json();
  const { messages, scope } = body;
  const lastMsg = messages && messages.length > 0 ? messages[messages.length - 1].content : '';
  if (!lastMsg) return c.json({ error: 'No question provided.' }, 400);


  // 1. Embed the user question (pass env for Worker)
  const questionEmbedding = await embed(lastMsg, c.env);
  // DEBUG: Log embedding shape
  console.log('DEBUG: questionEmbedding length =', Array.isArray(questionEmbedding) ? questionEmbedding.length : typeof questionEmbedding, 'Sample:', questionEmbedding?.slice?.(0, 5));

  // 2. Query vector DB for top doc chunks (pass env for binding)
  const topChunks = await queryVectorDb(questionEmbedding, 4, c.env); // returns [{id, score, metadata, text}]

  // 3. Build prompt for LLM
  const context = topChunks.map((c, i) => `Source [${i+1}]:\n${c.text}`).join('\n\n');
  const prompt = `You are an expert APT documentation assistant. Use only the provided sources to answer the question. Cite sources as [1], [2], etc.\n\n${context}\n\nQuestion: ${lastMsg}\nAnswer:`;

  // 4. Call LLM (stubbed)
  // TODO: Replace with real LLM API call
  let answer = 'Not found in APT docs yet.';
  let confidence = 0.2;
  let followups: string[] = [];
  if (topChunks.length > 0) {
    answer = `This is a grounded answer using [1], [2], etc.\n\n[1]: ${topChunks[0].metadata.path}`;
    confidence = 0.8;
    followups = ['What else can you do?', 'Show me more about this topic.'];
  }

  // 5. Return answer, citations, confidence, followups
  return c.json({
    answer_markdown: answer,
    citations: topChunks.map((c, i) => ({
      path: c.metadata.path,
      headingPath: c.metadata.heading || '',
      score: c.score,
      snippetId: c.id
    })),
    confidence,
    followups
  });
});
