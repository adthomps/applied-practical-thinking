import React from 'react';
import { AptFileUpload, AptButton } from '@apt/ui';

export default function FileUploadExample() {
  return (
    <div>
      <AptFileUpload accept="image/*" multiple={false} />
      <AptButton>Start upload</AptButton>
    </div>
  );
}
