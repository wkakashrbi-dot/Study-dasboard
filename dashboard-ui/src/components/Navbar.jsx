// Navbar.jsx (REPLACE)
import React from 'react';
import { SunMoon, Search, Bell, User } from 'lucide-react';

export default function Navbar({ theme, setTheme, batchId, t1Date, date, setDate, onSearch }) {
  return (
    <header
      className="navbar"
      role="banner"
      style={{
        width: '100%',
        height: 'var(--navbar-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-32)',
        background: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        zIndex: 98,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-24)' }}>
        <div style={{ fontWeight: 700, fontSize: 'var(--font-h2)', color: 'var(--color-text-primary)' }}>Daily News Dashboard</div>
        <div style={{ background: 'var(--color-highlight)', color: '#0b1720', borderRadius: 16, padding: '4px 12px', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 12 }}>
          Batch {batchId} • {t1Date}
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={{marginLeft: 12, padding: 4, borderRadius: 4, border: '1px solid #ccc', fontSize: 13}}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-20)' }}>
        <input
          onChange={(e) => onSearch && onSearch(e.target.value)}
          placeholder="Search keywords, titles..."
          aria-label="Search keywords"
          style={{
            background: 'var(--color-card)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            padding: '8px 14px',
            fontSize: 15,
            width: 260,
          }}
        />
        <button
          aria-label="Notifications"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center' }}
        >
          <Bell size={20} />
        </button>
        <button
          aria-label="User"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center' }}
        >
          <User size={20} />
        </button>
        <button
          aria-label="Toggle theme"
          onClick={() => setTheme && setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center' }}
        >
          <SunMoon size={18} />
        </button>
      </div>
    </header>
  );
}
