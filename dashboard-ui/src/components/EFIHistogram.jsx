import React from 'react';

export default function EFIHistogram({ histogram }) {
  // Simple bar chart for EFI score distribution
  const ranges = Object.keys(histogram);
  return (
    <div className="efi-histogram flex gap-2 items-end h-24">
      {ranges.map((range, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="bg-amber-400 w-8" style={{ height: `${histogram[range] * 10}px` }}></div>
          <div className="text-xs mt-1">{range}</div>
        </div>
      ))}
    </div>
  );
}
