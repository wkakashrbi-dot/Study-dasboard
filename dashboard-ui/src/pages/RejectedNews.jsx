

import React, { useEffect, useState } from 'react';
import { fetchRejected } from '../api/fetchRejected';
import { Filter, RefreshCw, Eye, Download, FileText } from 'lucide-react';

// Mock data for development fallback
const MOCK_ARTICLES = [
  {
    title: "Rejected Sample News",
    source: "RBI",
    date: "2025-12-10",
    efi: 45,
    keywords: ["rejected", "test"],
    domain: "Finance",
    reason: "Low EFI",
    body: "This is a sample rejected news article body."
  }
];


export default function RejectedNews() {
  const [modal, setModal] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchRejected()
      .then(setArticles)
      .catch(() => {
        setArticles(MOCK_ARTICLES);
        setError('Loaded mock data (backend unavailable)');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading rejected news...</div>;

  return (
    <div className="dashboard-grid" style={{gridTemplateRows: 'auto auto'}}>
      {/* Filters Toolbar */}
      <div style={{gridColumn: 'span 12', marginBottom: 24}}>
        <div className="card flex items-center gap-4 sticky top-0 z-10" style={{padding: 16}}>
          <div className="flex gap-2 items-center">
            <Filter size={18} />
            <select className="tag"><option>Keyword</option></select>
            <select className="tag"><option>Domain</option></select>
            <input type="range" min="40" max="70" className="mx-2" />
            <select className="tag"><option>Source</option></select>
            <select className="tag"><option>Sort by</option></select>
            <button className="btn" style={{marginLeft: 8}}><RefreshCw size={16} /> Reset</button>
          </div>
        </div>
      </div>
      {/* Data Table */}
      <div style={{gridColumn: 'span 12'}}>
        <div className="card">
          {error && <div style={{color: 'red', marginBottom: 12}}>{error}</div>}
          <table>
            <thead>
              <tr>
                <th>EFI Score</th>
                <th>Title</th>
                <th>Source</th>
                <th>Date</th>
                <th>Matched Keywords</th>
                <th>Domain</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a, i) => (
                <tr key={i}>
                  <td><span className="tag" style={{background: a.efi < 50 ? '#EF4444' : '#64748B', color: a.efi < 50 ? '#FFF' : '#FFF'}}>{a.efi}</span></td>
                  <td><button className="btn" onClick={()=>setModal(a)}>{a.title}</button></td>
                  <td>{a.source}</td>
                  <td>{a.date}</td>
                  <td>{Array.isArray(a.keywords) ? a.keywords.map((k,j)=>(<span className="tag" key={j}>{k}</span>)) : a.keywords}</td>
                  <td>{a.domain}</td>
                  <td><span className="tag" style={{background: '#EF4444', color: '#FFF'}}>{a.reason}</span></td>
                  <td>
                    <button className="btn" onClick={()=>setModal(a)}><Eye size={16} /></button>
                    <button className="btn ml-2"><Download size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Article Modal */}
      {modal && (
        <div className="modal" onClick={()=>setModal(null)}>
          <div className="modal-content" onClick={e=>e.stopPropagation()}>
            <div className="font-bold mb-2" style={{fontSize: 18}}>{modal.title}</div>
            <div className="mb-1">Source: <span className="tag">{modal.source}</span></div>
            <div className="mb-1">Date: {modal.date}</div>
            <div className="mb-1">EFI Score: <span className="tag" style={{background: '#EF4444', color: '#FFF'}}>{modal.efi}</span></div>
            <div className="mb-2">Matched Keywords: {Array.isArray(modal.keywords) ? modal.keywords.map((k,j)=>(<span className="tag" key={j}>{k}</span>)) : modal.keywords}</div>
            <div className="mb-2">Reason: <span className="tag" style={{background: '#EF4444', color: '#FFF'}}>{modal.reason}</span></div>
            <div className="mb-4" style={{maxHeight: 200, overflowY: 'auto', background: '#F8FAFC', color: '#0A1A2F', padding: 12, borderRadius: 8}}>
              {modal.body || '[Full article body placeholder]'}
            </div>
            <div className="flex gap-2 mt-2">
              <button className="btn"><FileText size={16} /> Copy</button>
              <button className="btn"><Download size={16} /> Export</button>
              <button className="btn" onClick={()=>setModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
