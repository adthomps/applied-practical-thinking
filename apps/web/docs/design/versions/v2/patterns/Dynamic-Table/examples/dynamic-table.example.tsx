import React from 'react';
import { AptTable } from '@apt/ui';

export default function DynamicTableExample() {
  const data = [
    { id: 1, name: 'Alpha', value: 10 },
    { id: 2, name: 'Beta', value: 20 },
  ];
  return (
    <AptTable columns={['Name', 'Value']} data={data} />
  );
}
