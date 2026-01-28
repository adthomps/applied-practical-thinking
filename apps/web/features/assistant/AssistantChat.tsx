import React, { useState } from 'react';
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent, AptCardFooter } from '@/components/apt';
import { AptButton } from '@/components/apt';
import { AptTag } from '@/components/apt';

export type Scope = 'all' | 'design-system' | 'design-thinking' | 'design-architecture' | 'tokens' | 'ui';

const scopes: { value: Scope; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'design-system', label: 'Design System' },
  { value: 'design-thinking', label: 'Design Thinking' },
  { value: 'design-architecture', label: 'Design Architecture' },
  { value: 'tokens', label: 'Tokens' },
  { value: 'ui', label: 'UI Components' },
];


// Temporarily hide the assistant chat UI until backend is ready
export const AssistantChat: React.FC = () => {
  return null;
}
