import React from 'react';
import { AssistantChat, ASSISTANT_CHAT_ENABLED } from '../features/assistant';

const AssistantPage: React.FC = () => {
  return (
    <div className="apt-assistant-page container py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">APT Design Assistant</h1>
      {ASSISTANT_CHAT_ENABLED ? (
        <AssistantChat />
      ) : (
        <p className="text-muted-foreground">The assistant is not available yet.</p>
      )}
    </div>
  );
};

export default AssistantPage;
