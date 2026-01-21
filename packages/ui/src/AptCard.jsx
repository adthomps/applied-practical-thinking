
import React from 'react';

export function AptCard({ children, className = '', ...props }) {
  return (
    <div className={`apt-card glass ${className}`} {...props}>
      {children}
    </div>
  );
}
