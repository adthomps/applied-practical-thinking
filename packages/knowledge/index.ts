// APT Knowledge Package: File Discovery, Chunking, Embedding, Retrieval, Citation

import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';

// Type-safe models shared by web + worker
export type KnowledgeChunk = {
  snippetId: string;
  path: string;
  headingPath: string;
  content: string;
  score?: number;
};

export type Citation = {
  snippetId: string;
  path: string;
  headingPath: string;
  score: number;
};

export type ChatRequest = {
  conversationId?: string;
  scope: 'all' | 'design-system' | 'design-thinking' | 'design-architecture' | 'tokens' | 'ui';
  messages: { role: 'user' | 'assistant'; content: string }[];
};

export type ChatResponse = {
  answer_markdown: string;
  citations: Citation[];
  confidence: number;
  followups: string[];
};

// File discovery and filtering
export function discoverFiles(basePaths: string[]): string[] {
  // Exclude .env*, .git, node_modules, build output, credentials
  const exclude = [/\.env/, /\.git/, /node_modules/, /dist/, /build/, /\.DS_Store/, /\.vscode/, /\.github/];
  const files: string[] = [];
  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, entry);
      if (exclude.some((rx) => rx.test(entry))) continue;
      if (fs.statSync(fullPath).isDirectory()) walk(fullPath);
      else files.push(fullPath);
    }
  }
  for (const base of basePaths) walk(base);
  return files;
}

// Heading-aware chunking for Markdown
export function chunkMarkdown(fileContent: string, filePath: string): KnowledgeChunk[] {
  const lines = fileContent.split('\n');
  const chunks: KnowledgeChunk[] = [];
  let currentHeading = '';
  let buffer: string[] = [];
  let chunkIdx = 0;
  for (const line of lines) {
    const headingMatch = line.match(/^#+\s+(.*)/);
    if (headingMatch) {
      if (buffer.length > 0) {
        chunks.push({
          snippetId: `snip_${chunkIdx++}_${path.basename(filePath)}`,
          path: filePath,
          headingPath: currentHeading,
          content: buffer.join('\n'),
        });
        buffer = [];
      }
      currentHeading = headingMatch[1];
    } else {
      buffer.push(line);
    }
  }
  if (buffer.length > 0) {
    chunks.push({
      snippetId: `snip_${chunkIdx++}_${path.basename(filePath)}`,
      path: filePath,
      headingPath: currentHeading,
      content: buffer.join('\n'),
    });
  }
  return chunks;
}

// Embedding generation (OpenAI)
export async function generateEmbeddings(chunks: KnowledgeChunk[], apiKey: string): Promise<number[][]> {
  const openai = new OpenAI({ apiKey });
  const texts = chunks.map((c) => c.content);
  // Use OpenAI embedding endpoint
  const resp = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: texts,
  });
  return resp.data.map((d) => d.embedding);
}

// Vector retrieval + ranking
export function rankChunks(queryEmbedding: number[], chunkEmbeddings: number[], chunks: KnowledgeChunk[]): Citation[] {
  function cosine(a: number[], b: number[]): number {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }
  return chunks.map((chunk, i) => ({
    snippetId: chunk.snippetId,
    path: chunk.path,
    headingPath: chunk.headingPath,
    score: cosine(queryEmbedding, chunkEmbeddings[i]),
  })).sort((a, b) => b.score - a.score);
}

// Citation + confidence helpers
export function getTopCitations(citations: Citation[], threshold = 0.7): { top: Citation[]; confidence: number } {
  const top = citations.filter((c) => c.score >= threshold);
  const confidence = top.length > 0 ? top[0].score : 0;
  return { top, confidence };
}

// Source priority mapping
export function getSourcePriority(filePath: string): number {
  if (/docs\/architecture/i.test(filePath)) return 1;
  if (/docs\/(.*design.*system|generalbrand)/i.test(filePath)) return 2;
  if (/docs\/.*thinking/i.test(filePath)) return 3;
  if (/packages\/config\//i.test(filePath)) return 4;
  if (/packages\/ui\//i.test(filePath)) return 5;
  return 99;
}
