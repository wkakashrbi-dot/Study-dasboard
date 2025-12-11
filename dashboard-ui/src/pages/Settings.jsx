import React, { useState } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState('Dark');
  const [density, setDensity] = useState('Comfortable');
  const [cardAnim, setCardAnim] = useState(true);

  return (
    <div className="dashboard-grid">
      <div style={{gridColumn: 'span 12', maxWidth: 600}}>
        <div className="card">
          <div className="font-bold mb-2">Settings</div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Theme</label>
            <select className="filter-select" value={theme} onChange={e=>setTheme(e.target.value)}>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Table Density</label>
            <select className="filter-select" value={density} onChange={e=>setDensity(e.target.value)}>
              <option>Comfortable</option>
              <option>Compact</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Card Animation</label>
            <input type="checkbox" className="mr-2" checked={cardAnim} onChange={e=>setCardAnim(e.target.checked)} /> Enable elevation/hover
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Date Override</label>
            <input type="date" className="filter-select" disabled />
            <span className="ml-2 text-xs text-slate-400">(Admin only)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
