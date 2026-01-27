// Shared types for APT Design Assistant

export type Scope = 'all' | 'design-system' | 'design-thinking' | 'design-architecture' | 'tokens' | 'ui';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export type ChatRequest = {
  conversationId?: string;
  scope: Scope;
  messages: Message[];
};

export type Citation = {
  snippetId: string;
  path: string;
  headingPath: string;
  score: number;
};

export type ChatResponse = {
  answer_markdown: string;
  citations: Citation[];
  confidence: number;
  followups: string[];
};

export type IngestRequest = {
  paths: string[];
  rebuild: boolean;
};
