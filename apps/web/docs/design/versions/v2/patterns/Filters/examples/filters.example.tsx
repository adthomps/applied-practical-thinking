import React from 'react';
import { AptInput, AptTag, AptButton } from '@apt/ui';

export default function FiltersExample() {
  return (
    <div>
      <AptInput label="Search" name="q" />
      <div style={{ marginTop: 8 }}>
        <AptTag>Active</AptTag>
        <AptButton>Clear all</AptButton>
      </div>
    </div>
  );
}
