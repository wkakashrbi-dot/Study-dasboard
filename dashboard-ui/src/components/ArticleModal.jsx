import React from 'react';
import HighlightedText from './HighlightedText';

export default function ArticleModal({ article, onClose }) {
  if (!article) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white dark:bg-charcoal p-6 rounded shadow-xl max-w-2xl mx-auto">
        <button className="absolute top-2 right-2 btn btn-charcoal" onClick={onClose}>Close</button>
        <h2 className="text-xl font-bold mb-2"><HighlightedText text={article.title} highlights={article.keywords} /></h2>
        <div className="mb-2 text-sm text-muted">Source: <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-amber-600 underline">{article.source}</a></div>
        <div className="mb-2 text-sm">EFI Score: <span className="font-bold text-amber-500">{article.efi}</span></div>
        <div className="mb-2 text-sm">Domain: {article.domain}</div>
        <div className="mb-2 text-sm">Matched Keywords: {article.keywords.map((k, i) => <span key={i} className="highlight-amber mx-1">{k}</span>)}</div>
        <div className="mb-4 text-base whitespace-pre-line"><HighlightedText text={article.body} highlights={article.keywords} /></div>
        <div className="flex gap-2 mt-4">
          <button className="btn btn-navy" onClick={() => navigator.clipboard.writeText(article.body)}>Copy Summary</button>
          <a className="btn btn-amber" href={`data:text/plain;charset=utf-8,${encodeURIComponent(article.body)}`} download={`${article.title}.txt`}>Download as text</a>
        </div>
      </div>
    </div>
  );
}
