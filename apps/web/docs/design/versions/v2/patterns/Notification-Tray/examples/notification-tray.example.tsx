import React from 'react';
import { AptToast, AptButton } from '@apt/ui';

export default function NotificationTrayExample() {
  return (
    <div>
      <AptButton>Open notifications</AptButton>
      <div aria-live="polite">
        <AptToast>New sign-in from a new device</AptToast>
      </div>
    </div>
  );
}
