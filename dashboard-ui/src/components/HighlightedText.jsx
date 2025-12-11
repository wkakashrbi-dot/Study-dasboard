import React from 'react';

export default function HighlightedText({ text, highlights }) {
  if (!highlights || highlights.length === 0) return <span>{text}</span>;
  let regex = new RegExp(`(${highlights.map(h => h.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        highlights.some(h => h.toLowerCase() === part.toLowerCase()) ?
          <span key={i} className="bg-amber-300 text-black px-1 rounded">{part}</span> :
          <span key={i}>{part}</span>
      )}
    </span>
  );
}
