import React from 'react';

export default function GuestLayout({ children }) {
  return (
    <div style={{ padding: '2rem', background: '#f5f5f5', minHeight: '100vh' }}>
      <header style={{ marginBottom: '1rem' }}>
        <h1>ゲストレイアウト</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
