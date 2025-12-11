import React from 'react';

export default function KeywordHeatmap({ heatmap }) {
  // Simple heatmap: keyword: count
  return (
    <div className="keyword-heatmap grid grid-cols-4 gap-2">
      {Object.entries(heatmap).map(([kw, count], i) => (
        <div key={i} className="bg-amber-100 text-black px-2 py-1 rounded text-xs flex justify-between">
          <span>{kw}</span>
          <span className="font-bold">{count}</span>
        </div>
      ))}
    </div>
  );
}
