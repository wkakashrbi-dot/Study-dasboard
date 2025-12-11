
import React, { useEffect, useState } from 'react';
import { fetchSummary } from '../api/fetchSummary';

// Mock data for development fallback
const MOCK_SUMMARY = {
  'Batch ID': 'Batch 2025-12-11-01',
  'Timestamp': '10 Dec 2025',
  'Total Extracted': 100,
  'Accepted': 80,
  'Rejected': 20,
  'Match Rate': '80%',
  'Highest EFI': 98,
  'Source Coverage': 'RBI: 80%, Finance Ministry: 80%',
  'Keyword Distribution': 'sample: 10, test: 5',
  'EFI Score Histogram': '[Histogram Placeholder]',
  'Errors': 'None'
};

export default function BatchSummary({ date, setDate }) {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchSummary()
      .then(setSummary)
      .catch(() => {
        setSummary(MOCK_SUMMARY);
        setError('Loaded mock data (backend unavailable)');
      })
      .finally(() => setLoading(false));
  }, []);

  // Update summary timestamp when date changes (mock only)
  useEffect(() => {
    if (summary && summary['Timestamp'] !== undefined) {
      setSummary(s => ({ ...s, Timestamp: new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }));
    }
  }, [date]);

  if (loading) return <div>Loading batch summary...</div>;

  return (
    <div className="dashboard-grid" style={{gridTemplateRows: 'auto auto auto', gap: 'var(--space-24)'}}>
      {error && <div style={{color: 'red', marginBottom: 12}}>{error}</div>}
      <div style={{gridColumn: 'span 12', maxWidth: 600}}>
        <div className="card">
          <div className="font-bold mb-2">Batch Metadata</div>
          <div className="mb-2">Batch ID: <span className="badge">{summary['Batch ID']}</span></div>
          <div className="mb-2">
            Run Timestamp: {summary['Timestamp']}
          </div>
          <div className="mb-2">Total Extracted: {summary['Total Extracted']}</div>
          <div className="mb-2">Accepted: {summary['Accepted']}</div>
          <div className="mb-2">Rejected: {summary['Rejected']}</div>
          <div className="mb-2">Match Rate: {summary['Match Rate']}</div>
          <div className="mb-2">Highest EFI: {summary['Highest EFI']}</div>
        </div>
      </div>
      <div style={{gridColumn: 'span 6'}}>
        <div className="card">
          <div className="font-bold mb-2">Source Coverage</div>
          <div>{summary['Source Coverage']}</div>
        </div>
      </div>
      <div style={{gridColumn: 'span 6'}}>
        <div className="card">
          <div className="font-bold mb-2">Keyword Distribution</div>
          <div>{summary['Keyword Distribution']}</div>
        </div>
      </div>
      <div style={{gridColumn: 'span 6'}}>
        <div className="card">
          <div className="font-bold mb-2">EFI Score Histogram</div>
          <div>{summary['EFI Score Histogram']}</div>
        </div>
      </div>
      <div style={{gridColumn: 'span 6'}}>
        <div className="card">
          <div className="font-bold mb-2">Errors/Warnings</div>
          <div>{summary['Errors'] || 'None'}</div>
        </div>
      </div>
      <div style={{gridColumn: 'span 12'}}>
        <div className="card">
          <button className="btn btn-amber mt-2">Download Full Summary (PDF/Excel)</button>
        </div>
      </div>
    </div>
  );
}
