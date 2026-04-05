import React from "react";

export const ASSISTANT_CHAT_ENABLED = false;

// Temporarily hide the assistant chat UI until backend is ready
export const AssistantChat: React.FC = () => {
  if (!ASSISTANT_CHAT_ENABLED) {
    return null;
  }

  return null;
};
