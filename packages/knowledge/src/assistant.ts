export type Scope = "all" | "design-system" | "design-thinking" | "design-architecture" | "tokens" | "ui";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface Citation {
  snippetId: string;
  path: string;
  headingPath: string;
  score: number;
}

export interface ChatRequest {
  conversationId?: string;
  scope: Scope;
  messages: Message[];
}

export interface ChatResponse {
  answer_markdown: string;
  citations: Citation[];
  confidence: number;
  followups: string[];
}

export interface IngestRequest {
  paths: string[];
  rebuild: boolean;
}
