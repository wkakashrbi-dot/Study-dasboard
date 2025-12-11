
import React, { useEffect, useState } from 'react';
import { fetchAccepted } from '../api/fetchAccepted';

// Mock data for development fallback
const MOCK_ARTICLES = [
  {
    title: "Sample News",
    source: "RBI",
    date: "2025-12-10",
    efi: 95,
    keywords: ["sample", "test", "intelligence"],
    domain: "Finance",
    body: "This is a sample news article body."
  }
];

export default function KeywordIntelligence() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState(null);
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

  // Extract keywords and mapping
  const keywordMap = {};
  articles.forEach(a => {
    if (Array.isArray(a.keywords)) {
      a.keywords.forEach(k => {
        if (!keywordMap[k]) keywordMap[k] = [];
        keywordMap[k].push(a);
      });
    } else if (typeof a.keywords === 'string') {
      a.keywords.split(',').forEach(k => {
        const kw = k.trim();
        if (!keywordMap[kw]) keywordMap[kw] = [];
        keywordMap[kw].push(a);
      });
    }
  });
  const keywords = Object.keys(keywordMap).filter(k => k.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div>Loading keyword intelligence...</div>;

  return (
    <div className="dashboard-grid" style={{gridTemplateColumns: '1fr 2fr', gap: 'var(--space-24)'}}>
      {error && <div style={{color: 'red', marginBottom: 12}}>{error}</div>}
      {/* Left: Keyword cluster categories */}
      <div style={{gridColumn: 'span 1'}}>
        <div className="card" style={{minHeight: 320}}>
          <div className="font-bold mb-2">Master Keyword List</div>
          <input className="filter-select mb-2" placeholder="Search keywords..." value={search} onChange={e=>setSearch(e.target.value)} />
          <div className="flex flex-wrap gap-8">
            {keywords.map((k, i) => (
              <span key={i} className="modal-keyword cursor-pointer" onClick={()=>setSelectedKeyword(k)}>{k}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Right: Keyword table */}
      <div style={{gridColumn: 'span 1'}}>
        <div className="card" style={{minHeight: 320}}>
          <div className="font-bold mb-2">Keyword → Article Mapping</div>
          {selectedKeyword ? (
            <div className="drawer">
              <div className="font-bold mb-2">Articles for: <span className="modal-keyword">{selectedKeyword}</span></div>
              <ul>
                {keywordMap[selectedKeyword].map((a, i) => (
                  <li key={i} className="mb-1">
                    <span className="font-semibold">{a.title}</span> <span className="efi-badge">EFI {a.efi}</span> <span className="badge">{a.source}</span>
                  </li>
                ))}
              </ul>
              <button className="btn mt-2" onClick={()=>setSelectedKeyword(null)}>Close</button>
            </div>
          ) : <span className="text-slate-400">Click a keyword to view mapping.</span>}
        </div>
      </div>
      {/* Keyword Frequency Table */}
      <div style={{gridColumn: 'span 2'}}>
        <div className="card" style={{marginTop: 'var(--space-24)'}}>
          <div className="font-bold mb-2">Keyword Frequency Table</div>
          <table className="table">
            <thead>
              <tr>
                <th>Keyword</th>
                <th>Frequency</th>
                <th>Articles Matched</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((k, i) => (
                <tr key={i}>
                  <td>{k}</td>
                  <td>{keywordMap[k].length}</td>
                  <td>{keywordMap[k].map(a => a.title).join('; ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
