import React, { useEffect, useState } from 'react';
import { BarChart2, CheckCircle, XCircle, Percent, TrendingUp, Globe } from 'lucide-react';

export default function DashboardOverview() {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/summary')
      .then(res => res.json())
      .then(data => { setSummary(data); setLoading(false); });
  }, []);

  const kpis = [
    { icon: <BarChart2 />, value: summary['Total_Scanned'] || 0, label: 'Total Extracted', tooltip: 'Total news articles extracted in this batch.' },
    { icon: <CheckCircle />, value: summary['Accepted_Count'] || 0, label: 'Accepted Count', tooltip: 'Articles accepted after filtering.' },
    { icon: <XCircle />, value: summary['Rejected_Count'] || 0, label: 'Rejected Count', tooltip: 'Articles rejected by filters.' },
    { icon: <Percent />, value: summary['Match_Rate'] || '', label: 'Match Rate', tooltip: 'Percentage of accepted articles.' },
    { icon: <TrendingUp />, value: summary['Top_EFI_Score'] || 0, label: 'Highest EFI Score', tooltip: 'Top EFI score in this batch.' },
    { icon: <Globe />, value: (summary['Top_Domains_Represented'] ? summary['Top_Domains_Represented'].length : 0), label: 'Total Sources Covered', tooltip: 'Distinct news sources covered.' },
  ];

  // Placeholder for analytics and sources, can be expanded with more backend data
  // ...existing code...

  if (loading) return <div>Loading...</div>;

  return (
    <section className="dashboard-overview" style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-32)'}}>
      <div className="kpi-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-24)'}}>
        {kpis.map(kpi => (
          <div key={kpi.label} className="kpi-card" style={{background: 'var(--color-card)', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 'var(--space-24)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-8)', minHeight: 120}}>
            <span style={{color: 'var(--color-text-secondary)', fontSize: 16}}>{kpi.label}</span>
            <span style={{color: 'var(--color-primary)', fontWeight: 700, fontSize: 32}}>{kpi.value}</span>
          </div>
        ))}
      </div>
      {/* ...analytics panels and source coverage can be added here using summary data... */}
    </section>
  );
}
// ...existing code...
