import React from 'react';

export default function MainContent({ children, collapsed }) {
  return (
    <main
      className="main-content"
      style={{
        padding: 'var(--space-32)',
        maxWidth: 1400,
        margin: '0 auto',
        width: '100%',
        background: 'var(--color-bg)',
        minHeight: 'calc(100vh - 64px)',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </main>
  );
}
