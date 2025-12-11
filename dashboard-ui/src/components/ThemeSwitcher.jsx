import React from 'react';

export default function ThemeSwitcher({ theme, setTheme }) {
  return (
    <button className="theme-switcher btn btn-muted" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}
