import React from 'react';

export default function ProgressBar({
  progress = 0,
  color = 'red',
  height = 'h-4',
  showLabel = true,
  className = ''
}) {
  const colorMap = {
    red: 'bg-red',
    yellow: 'bg-yellow',
    violet: 'bg-violet',
    green: 'bg-green',
    blue: 'bg-blue',
  };

  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full space-y-1 font-mono ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-bold text-ink">
          <span>Progress</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-background border-2 border-ink rounded-full p-0.5 overflow-hidden shadow-xs ${height}`}>
        <div
          className={`${colorMap[color] || 'bg-red'} h-full rounded-full transition-all duration-500 border border-ink`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
