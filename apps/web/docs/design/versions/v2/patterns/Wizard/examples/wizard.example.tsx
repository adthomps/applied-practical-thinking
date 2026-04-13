import React from 'react';
import { AptWizard, AptButton } from '@apt/ui';

export default function WizardExample() {
  return (
    <AptWizard
      steps={[
        { id: 'one', title: 'Step 1', content: <div>Step one content</div> },
        { id: 'two', title: 'Step 2', content: <div>Step two content</div> },
      ]}
    />
  );
}
