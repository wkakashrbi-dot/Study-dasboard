import React from 'react';
import DashboardMetricsCard from '../components/DashboardMetricsCard';

export default function DashboardHome({ summary, onQuickLink }) {
  return (
    <div className="dashboard-home p-6">
      <h1 className="text-2xl font-bold mb-4">RBI Grade B News Extraction Dashboard</h1>
      <div className="mb-2 text-sm text-muted">Batch ID: {summary.batch_id} | T-1 Date: {summary.run_timestamp?.slice(0,10)}</div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <DashboardMetricsCard title="Total Extracted" value={summary.total_extracted} color="#FFD600" />
        <DashboardMetricsCard title="Accepted" value={summary.total_accepted} color="#4CAF50" />
        <DashboardMetricsCard title="Rejected" value={summary.total_rejected} color="#F44336" />
        <DashboardMetricsCard title="Match Rate (%)" value={summary.match_rate} color="#FFD600" />
        <DashboardMetricsCard title="Highest EFI" value={summary.highest_efi} color="#FFD600" />
      </div>
      <div className="mb-6">
        <div className="text-sm font-semibold mb-2">Source Coverage:</div>
        <div className="flex flex-wrap gap-2">
          {summary.source_coverage?.map((src, i) => <span key={i} className="bg-navy text-white px-2 py-1 rounded text-xs">{src}</span>)}
        </div>
      </div>
      <div className="quick-links flex flex-wrap gap-4 mt-8">
        <button className="btn btn-navy" onClick={() => onQuickLink('accepted')}>Accepted News</button>
        <button className="btn btn-charcoal" onClick={() => onQuickLink('rejected')}>Rejected News</button>
        <button className="btn btn-amber" onClick={() => onQuickLink('keywords')}>Keywords Index</button>
        <button className="btn btn-grey" onClick={() => onQuickLink('efi')}>EFI Scores</button>
        <button className="btn btn-muted" onClick={() => onQuickLink('summary')}>Batch Summary Report</button>
      </div>
    </div>
  );
}
