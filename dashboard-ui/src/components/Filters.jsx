import React from 'react';

export default function Filters({ filters, onChange }) {
  return (
    <div className="filters flex gap-4 mb-4">
      <input className="input input-sm" placeholder="Keyword" value={filters.keyword} onChange={e => onChange({ ...filters, keyword: e.target.value })} />
      <select className="input input-sm" value={filters.domain} onChange={e => onChange({ ...filters, domain: e.target.value })}>
        <option value="">All Domains</option>
        <option value="GA">GA</option>
        <option value="ESI">ESI</option>
        <option value="Finance">Finance</option>
      </select>
      <input className="input input-sm" placeholder="Source" value={filters.source} onChange={e => onChange({ ...filters, source: e.target.value })} />
      <input className="input input-sm" type="range" min="0" max="100" value={filters.efi} onChange={e => onChange({ ...filters, efi: e.target.value })} />
      <span className="text-xs">EFI ≥ {filters.efi}</span>
      <input className="input input-sm" type="date" value={filters.date} onChange={e => onChange({ ...filters, date: e.target.value })} />
    </div>
  );
}
