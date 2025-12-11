// Export array of objects to Excel (CSV fallback)
export function exportToExcel(data, filename) {
  const csv = [Object.keys(data[0]).join(','), ...data.map(row => Object.values(row).map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename.endsWith('.csv') ? filename : filename + '.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
