import React from 'react';

export default function Toggle({
  enabled,
  onChange,
  label,
  description,
  color = 'violet',
  disabled = false
}) {
  const colorMap = {
    violet: 'bg-violet',
    green: 'bg-green',
    yellow: 'bg-yellow',
    red: 'bg-red',
  };

  return (
    <div className="flex items-center justify-between gap-4 font-mono select-none">
      {(label || description) && (
        <div className="space-y-0.5">
          {label && <div className="font-heading font-bold text-sm text-ink">{label}</div>}
          {description && <div className="text-xs text-ink/70">{description}</div>}
        </div>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={() => onChange(!enabled)}
        className={`
          relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-ink shadow-hard-sm transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50
          ${enabled ? (colorMap[color] || 'bg-violet') : 'bg-gray-200'}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white border-2 border-ink shadow-xs transition duration-200 ease-in-out mt-[1px]
            ${enabled ? 'translate-x-7' : 'translate-x-0.5'}
          `}
        />
      </button>
    </div>
  );
}
