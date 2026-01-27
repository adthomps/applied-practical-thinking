import React from 'react';
import { AssistantChat } from '../features/assistant';

const AssistantPage: React.FC = () => {
  return (
    <div className="apt-assistant-page">
      <h2>APT Design Assistant</h2>
      <AssistantChat />
    </div>
  );
};

export default AssistantPage;
