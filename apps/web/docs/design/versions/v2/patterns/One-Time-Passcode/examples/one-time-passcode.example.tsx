import React from 'react';
import { AptInput, AptButton } from '@apt/ui';

export default function OneTimePasscodeExample() {
  return (
    <div>
      <label>Enter code</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <AptInput name="code-1" maxLength={1} />
        <AptInput name="code-2" maxLength={1} />
        <AptInput name="code-3" maxLength={1} />
        <AptInput name="code-4" maxLength={1} />
      </div>
      <AptButton>Verify</AptButton>
    </div>
  );
}
import React from 'react';
import { AptInput, AptButton } from '@apt/ui';

export default function OneTimePasscodeExample() {
  return (
    <div>
      <label>Enter code</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <AptInput name="code-1" maxLength={1} />
        <AptInput name="code-2" maxLength={1} />
        <AptInput name="code-3" maxLength={1} />
        <AptInput name="code-4" maxLength={1} />
      </div>
      <AptButton>Verify</AptButton>
    </div>
  );
}
