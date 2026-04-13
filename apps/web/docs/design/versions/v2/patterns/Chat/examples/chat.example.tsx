import React from 'react';
import { AptCard, AptInput, AptButton } from '@apt/ui';

export default function ChatExample() {
  return (
    <AptCard>
      <div aria-live="polite" style={{ minHeight: 120 }}>
        <div><strong>Alice</strong>: Hi there</div>
        <div><strong>You</strong>: Hello</div>
      </div>
      <AptInput label="Message" name="message" />
      <AptButton>Send</AptButton>
    </AptCard>
  );
}
