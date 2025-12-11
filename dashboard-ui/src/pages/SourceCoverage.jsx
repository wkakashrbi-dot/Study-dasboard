import React, { useEffect, useState } from 'react';

// Mock data for development fallback
const MOCK_SOURCES = [
  { name: 'RBI', total: 10, accepted: 8, rejected: 2, rate: '80%', tag: 'Regulator' },
  { name: 'Finance Ministry', total: 5, accepted: 4, rejected: 1, rate: '80%', tag: 'Gov' }
];

export default function SourceCoverage() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/summary')
      .then(res => res.json())
      .then(data => {
        setSources(data['Source_Coverage'] || []);
      })
      .catch(() => {
        setSources(MOCK_SOURCES);
        setError('Loaded mock data (backend unavailable)');
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <div>Loading source coverage...</div>;
  return (
    <div className="dashboard-grid">
      {error && <div style={{color: 'red', marginBottom: 12}}>{error}</div>}
      <div style={{gridColumn: 'span 12'}}>
        <div className="card">
          <div className="font-bold mb-2">Source Coverage</div>
          <table>
            <thead>
              <tr>
                <th>Source Name</th>
                <th>Total Articles</th>
                <th>Accepted</th>
                <th>Rejected</th>
                <th>Coverage Rate</th>
                <th>Reliability Tag</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((src, i) => (
                <tr key={i}>
                  <td>{src.name}</td>
                  <td>{src.total}</td>
                  <td>{src.accepted}</td>
                  <td>{src.rejected}</td>
                  <td>{src.rate}</td>
                  <td><span className="tag" style={{background: src.tag === 'Gov' ? '#0A1A2F' : src.tag === 'Regulator' ? '#FBBF24' : '#64748B', color: src.tag === 'Gov' ? '#FBBF24' : src.tag === 'Regulator' ? '#0A1A2F' : '#FFF'}}>{src.tag}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
