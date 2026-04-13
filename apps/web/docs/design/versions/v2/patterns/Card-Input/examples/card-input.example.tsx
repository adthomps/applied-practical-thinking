import React from 'react';
import { AptCard, AptInput, AptButton } from '@apt/ui';

export default function CardInputExample() {
  return (
    <AptCard>
      <AptInput label="Title" name="title" />
      <div style={{ marginTop: 8 }}>
        <AptButton>Save</AptButton>
      </div>
    </AptCard>
  );
}
