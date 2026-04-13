import React from 'react';
import { AptSearch, AptInput } from '@apt/ui';

export default function SearchExample() {
  return (
    <div>
      <AptInput label="Search" name="q" />
      <AptSearch placeholder="Type to search…" />
    </div>
  );
}
