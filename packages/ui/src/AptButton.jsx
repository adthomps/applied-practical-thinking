
import React from 'react';

export function AptButton({ children, className = '', href, target, rel, ...props }) {
  if (href) {
    return (
      <a
        className={`apt-btn ${className}`}
        href={href}
        target={target}
        rel={rel}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <button className={`apt-btn ${className}`} {...props}>
      {children}
    </button>
  );
}
