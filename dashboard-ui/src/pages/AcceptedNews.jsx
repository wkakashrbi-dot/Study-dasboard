


import React, { useEffect, useState } from 'react';
import { fetchAccepted } from '../api/fetchAccepted';
import { Filter, RefreshCw, Eye, Download } from 'lucide-react';

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
  }
];

export default function AcceptedNews() {
  const [modal, setModal] = useState(null);
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

  if (loading) return <div>Loading accepted news...</div>;

  return (
    <div className="dashboard-grid" style={{gridTemplateRows: 'auto auto'}}>
      {/* Filters Toolbar */}
      <div style={{gridColumn: 'span 12', marginBottom: 'var(--space-24)'}}>
        <div className="filters-toolbar">
          <Filter size={20} />
          <select className="filter-select"><option>Keyword</option></select>
          <select className="filter-select"><option>Domain</option></select>
          <input type="range" min="60" max="100" className="filter-slider" />
          <select className="filter-select"><option>Source</option></select>
          <select className="filter-sort"><option>Sort by</option></select>
          <button className="filter-reset"><RefreshCw size={18} /> Reset</button>
        </div>
      </div>
      {/* Data Table */}
      <div style={{gridColumn: 'span 12'}}>
        <div className="card">
          {error && <div style={{color: 'red', marginBottom: 12}}>{error}</div>}
          <table className="table">
            <thead>
              <tr>
                <th>EFI Score</th>
                <th>Title</th>
                <th>Source</th>
                <th>Date</th>
                <th>Matched Keywords</th>
                <th>Domain</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a, i) => (
                <tr key={i}>
                  <td><span className="efi-badge" style={{background: a.efi > 90 ? 'var(--color-highlight)' : 'var(--color-border)', color: a.efi > 90 ? '#222' : 'var(--color-text-primary)'}}>{a.efi}</span></td>
                  <td><button className="btn" onClick={()=>setModal(a)}>{a.title}</button></td>
                  <td>{a.source}</td>
                  <td>{a.date}</td>
                  <td>{Array.isArray(a.keywords) ? a.keywords.map((k,j)=>(<span className="modal-keyword" key={j}>{k}</span>)) : a.keywords}</td>
                  <td>{a.domain}</td>
                  <td>
                    <button className="btn" onClick={()=>setModal(a)}><Eye size={20} /></button>
                    <button className="btn ml-2"><Download size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Article Modal */}
      {modal && (
        <div className="modal">
          <div className="modal-title">{modal.title}</div>
          <div className="modal-meta">
            <span>Source: {modal.source}</span>
            <span>Date: {modal.date}</span>
            <span className="efi-badge">EFI {modal.efi}</span>
          </div>
          <div className="modal-keywords">
            {Array.isArray(modal.keywords) ? modal.keywords.map((k, j) => <span className="modal-keyword" key={j}>{k}</span>) : modal.keywords}
          </div>
          <div className="modal-body">{modal.body || '[Article body here]'}</div>
          <button className="btn mt-2" onClick={()=>setModal(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
