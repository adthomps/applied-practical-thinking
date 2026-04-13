import React from 'react';
import { AptToast, AptButton } from '@apt/ui';

export default function FeedbackStatusExample() {
  return (
    <div>
      <AptToast variant="success">Saved successfully</AptToast>
      <AptButton>Dismiss</AptButton>
    </div>
  );
}
