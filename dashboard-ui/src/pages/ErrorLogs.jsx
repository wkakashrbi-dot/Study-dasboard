
import React, { useEffect, useState } from 'react';
import { fetchSummary } from '../api/fetchSummary';

// Mock data for development fallback
const MOCK_LOGS = [
  {
    ts: '2025-12-11 10:00',
    src: 'news_scraper.py',
    type: 'Error',
    trace: 'Sample error: failed to fetch data from RBI API',
    resolved: false
  }
];

export default function ErrorLogs() {
  const [logs, setLogs] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchSummary()
      .then(summary => {
        if (summary && summary.Errors) {
          const errorArr = Array.isArray(summary.Errors) ? summary.Errors : String(summary.Errors).split(';');
          setLogs(errorArr.map((err, i) => ({ ts: summary.Timestamp || '', src: 'news_scraper.py', type: 'Error', trace: err, resolved: false })));
        } else {
          setLogs([]);
        }
      })
      .catch(() => {
        setLogs(MOCK_LOGS);
        setError('Loaded mock data (backend unavailable)');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading error logs...</div>;

  return (
    <div className="dashboard-grid">
      <div style={{gridColumn: 'span 12'}}>
        <div className="card">
          <div className="font-bold mb-2">Error Logs</div>
          {error && <div style={{color: 'red', marginBottom: 12}}>{error}</div>}
          <table className="table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Error Source</th>
                <th>Error Type</th>
                <th>Trace snippet</th>
                <th>Resolved</th>
              </tr>
            </thead>
            <tbody>
              {logs.length ? logs.map((log, i) => (
                <React.Fragment key={i}>
                  <tr onClick={() => setExpanded(expanded === i ? null : i)} style={{cursor: 'pointer'}}>
                    <td>{log.ts}</td>
                    <td>{log.src}</td>
                    <td>{log.type}</td>
                    <td>{log.trace.slice(0, 30)}...</td>
                    <td><input type="checkbox" checked={log.resolved} readOnly /></td>
                  </tr>
                  {expanded === i && (
                    <tr>
                        <td colSpan={5} style={{background: 'var(--color-highlight)', color: '#222', padding: 12}}>
                        <pre style={{margin: 0}}>{log.trace}</pre>
                        <button className="btn mt-2">Copy</button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )) : (
                <tr><td colSpan={5} className="text-slate-400">No errors found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
