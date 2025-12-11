// Sidebar.jsx  (REPLACE)
import React from 'react';
import {
  LayoutGrid, CheckCircle, XCircle, Tag, Activity, Globe, ClipboardList, AlertTriangle, Settings, Menu
} from 'lucide-react';

const sections = [
  { label: 'Dashboard Overview', icon: <LayoutGrid />, key: 'dashboard' },
  { label: 'Accepted News', icon: <CheckCircle />, key: 'accepted' },
  { label: 'Rejected News', icon: <XCircle />, key: 'rejected' },
  { label: 'Keyword Intelligence', icon: <Tag />, key: 'keywords' },
  { label: 'EFI Analytics', icon: <Activity />, key: 'efi' },
  { label: 'Source Coverage', icon: <Globe />, key: 'sources' },
  { label: 'Batch Summary', icon: <ClipboardList />, key: 'summary' },
  { label: 'Error Logs', icon: <AlertTriangle />, key: 'errors' },
  { label: 'Settings', icon: <Settings />, key: 'settings' },
];

export default function Sidebar({ active, onNavigate, collapsed, setCollapsed }) {
  // apply the CSS class 'collapsed' when collapsed is true
  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      aria-label="Primary navigation"
      role="navigation"
      style={{
        // visual fallback for environments without CSS load
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: collapsed ? '64px' : '260px',
        transition: 'width 0.18s',
        zIndex: 99,
      }}
    >
      <div style={{
        padding: 'var(--space-16) 0',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        gap: 'var(--space-16)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: collapsed ? 0 : '16px' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8, background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-highlight)', fontWeight: 700
          }}>
            RBI
          </div>
          {!collapsed && <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>RBI Grade B</div>}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            marginRight: collapsed ? 0 : 8,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: 'var(--color-text-secondary)'
          }}
        >
          <Menu size={18} />
        </button>
      </div>

      <nav className="sidebar-menu" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-24)', padding: collapsed ? '8px 6px' : '12px 8px' }}>
        {sections.map(section => (
          <button
            key={section.key}
            onClick={() => onNavigate(section.key)}
            className={`sidebar-item ${active === section.key ? 'selected' : ''}`}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-12)',
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: 'var(--space-12)',
              borderRadius: 8,
              background: active === section.key ? 'var(--color-border)' : 'transparent',
              color: active === section.key ? 'var(--color-highlight)' : 'var(--color-text-secondary)',
              cursor: 'pointer'
            }}
            aria-current={active === section.key ? 'page' : undefined}
          >
            <span className="sidebar-icon" style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {section.icon}
            </span>
            {!collapsed && <span style={{ fontSize: 'var(--font-h3)' }}>{section.label}</span>}
          </button>
        ))}
      </nav>

      <div style={{ padding: 'var(--space-12)' }}>
        <button
          style={{
            width: '100%', padding: '10px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--color-text-secondary)', cursor: 'pointer'
          }}
          onClick={() => window.alert('Sign out (placeholder)')}
        >
          {!collapsed ? 'Sign out' : <span style={{display:'inline-block', width:24, textAlign:'center'}}>⤴</span>}
        </button>
      </div>
    </aside>
  );
}
