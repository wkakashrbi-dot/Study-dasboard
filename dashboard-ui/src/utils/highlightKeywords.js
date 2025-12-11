// Highlight keywords in a string with <span> tags (amber)
export function highlightKeywords(text, keywords) {
  if (!keywords || keywords.length === 0) return text;
  let regex = new RegExp(`(${keywords.map(k => k.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`, 'gi');
  return text.split(regex).map((part, i) =>
    keywords.some(k => k.toLowerCase() === part.toLowerCase())
      ? `<span class='bg-amber-300 text-black px-1 rounded'>${part}</span>`
      : part
  ).join('');
}
