import React from 'react';
import { AptForm, AptInput, AptButton } from '@apt/ui';

export default function FormsExample() {
  return (
    <AptForm onSubmit={() => {}}>
      <AptInput label="Name" name="name" />
      <AptInput label="Email" name="email" type="email" />
      <AptButton type="submit">Submit</AptButton>
    </AptForm>
  );
}
