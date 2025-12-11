import React from 'react';

export default function DashboardMetricsCard({ title, value, icon, color }) {
  return (
    <div className={`metrics-card bg-charcoal text-white rounded shadow p-4 flex items-center`}>
      {icon && <span className="mr-3 text-2xl" style={{ color }}>{icon}</span>}
      <div>
        <div className="text-xs uppercase tracking-wider text-muted mb-1">{title}</div>
        <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      </div>
    </div>
  );
}
