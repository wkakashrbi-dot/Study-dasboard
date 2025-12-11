
import React, { useEffect, useState } from 'react';
import { fetchAccepted } from '../api/fetchAccepted';

// Mock data for development fallback
const MOCK_ARTICLES = [
  {
    title: "Sample News",
    source: "RBI",
    date: "2025-12-10",
    efi: 95,
    keywords: ["sample", "test"],
    domain: "Finance",
    body: "This is a sample news article body."
  },
  {
    title: "Another News",
    source: "RBI",
    date: "2025-12-09",
    efi: 70,
    keywords: ["finance"],
    domain: "Finance",
    body: "Another article body."
  }
];

export default function EFIAnalytics() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchAccepted()
      .then(setArticles)
      .catch(() => {
        setArticles(MOCK_ARTICLES);
        setError('Loaded mock data (backend unavailable)');
      })
      .finally(() => setLoading(false));
  }, []);

  // Prepare data
  const efiScores = articles.map(a => a.efi).filter(e => typeof e === 'number');
  const timeline = articles.map(a => ({ date: a.date, efi: a.efi })).filter(a => a.date && typeof a.efi === 'number');
  const top10 = [...articles].sort((a, b) => (b.efi || 0) - (a.efi || 0)).slice(0, 10);

  if (loading) return <div>Loading EFI analytics...</div>;

  return (
    <div className="dashboard-grid" style={{gridTemplateRows: 'auto auto auto', gap: 'var(--space-24)'}}>
      {error && <div style={{color: 'red', marginBottom: 12}}>{error}</div>}
      {/* EFI Score Timeline */}
      <div style={{gridColumn: 'span 12', marginBottom: 'var(--space-24)'}}>
        <div className="analytics-panel">
          <div className="font-bold mb-2">EFI Score Timeline</div>
          <div style={{height: 160, background: 'var(--color-border)', borderRadius: 8, overflowX: 'auto', color: 'var(--color-highlight)', padding: 8}}>
            {timeline.length ? (
              <div style={{display: 'flex', gap: 8}}>
                {timeline.map((t, i) => (
                  <div key={i} style={{width: 40, textAlign: 'center'}}>
                    <div style={{height: t.efi, background: 'var(--color-highlight)', borderRadius: 4}}></div>
                    <div style={{fontSize: 10, color: 'var(--color-text-secondary)'}}>{t.date}</div>
                  </div>
                ))}
              </div>
            ) : '[No Data]'}
          </div>
        </div>
      </div>
      {/* EFI Score Histogram */}
      <div style={{gridColumn: 'span 6'}}>
        <div className="analytics-panel">
          <div className="font-bold mb-2">EFI Score Histogram</div>
          <div style={{height: 160, background: 'var(--color-border)', borderRadius: 8, color: 'var(--color-text-secondary)', padding: 8}}>
            {efiScores.length ? (
              <div style={{display: 'flex', gap: 2}}>
                {Array.from({length: 10}).map((_, i) => {
                  const min = 60 + i*4;
                  const max = min+4;
                  const count = efiScores.filter(e => e >= min && e < max).length;
                  return <div key={i} style={{height: count*8, width: 16, background: 'var(--color-text-secondary)', borderRadius: 2, marginRight: 2}} title={`${min}-${max}: ${count}`}></div>;
                })}
              </div>
            ) : '[No Data]'}
          </div>
        </div>
      </div>
      {/* Top 10 Highest EFI Articles */}
      <div style={{gridColumn: 'span 6'}}>
        <div className="analytics-panel">
          <div className="font-bold mb-2">Top 10 Highest EFI Articles</div>
          <div style={{height: 160, background: 'var(--color-border)', borderRadius: 8, color: 'var(--color-highlight)', padding: 8, overflowY: 'auto'}}>
            <ol>
              {top10.map((a, i) => (
                <li key={i} style={{marginBottom: 8}}>
                  <span className="font-semibold">{a.title}</span> <span className="efi-badge">EFI {a.efi}</span> <span className="badge">{a.source}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      {/* EFI vs Source Scatter Plot */}
      <div style={{gridColumn: 'span 6'}}>
        <div className="analytics-panel">
          <div className="font-bold mb-2">EFI vs Source Scatter Plot</div>
          <div style={{height: 160, background: 'var(--color-border)', borderRadius: 8, color: 'var(--color-highlight)', padding: 8}}>
            [Scatter Plot Placeholder]
          </div>
        </div>
      </div>
      {/* EFI vs Keyword Intensity Heatmap */}
      <div style={{gridColumn: 'span 6'}}>
        <div className="analytics-panel">
          <div className="font-bold mb-2">EFI vs Keyword Intensity Heatmap</div>
          <div style={{height: 160, background: 'var(--color-border)', borderRadius: 8, color: 'var(--color-text-secondary)', padding: 8}}>
            [Heatmap Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}

