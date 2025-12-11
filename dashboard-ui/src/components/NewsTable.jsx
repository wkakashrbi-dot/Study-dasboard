import React from 'react';
import HighlightedText from './HighlightedText';

export default function NewsTable({ articles, onView, filterOptions, onExport }) {
  // ...filter logic omitted for brevity
  return (
    <div className="news-table">
      <div className="flex justify-between mb-2">
        <div>
          {/* Filters would go here */}
        </div>
        <button className="btn btn-amber" onClick={onExport}>Export to Excel</button>
      </div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-navy text-white">
            <th>Title</th>
            <th>Date</th>
            <th>Source</th>
            <th>EFI Score</th>
            <th>Keywords</th>
            <th>Domain</th>
            <th>Reason</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a, i) => (
            <tr key={i} className="border-b border-muted">
              <td><HighlightedText text={a.title} highlights={a.keywords} /></td>
              <td>{a.date}</td>
              <td>{a.source}</td>
              <td className="font-bold text-amber-500">{a.efi}</td>
              <td>{a.keywords.map((k, j) => <span key={j} className="highlight-amber mx-1">{k}</span>)}</td>
              <td>{a.domain}</td>
              <td>{a.reason}</td>
              <td><button className="btn btn-navy" onClick={() => onView(a)}>View Full Article</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
