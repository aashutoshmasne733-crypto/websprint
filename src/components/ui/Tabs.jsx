import React from 'react';

export default function Tabs({
  tabs,
  activeTab,
  onChange,
  className = ''
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 border-b-3 border-ink pb-3 font-mono ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id || activeTab === tab.label;
        return (
          <button
            key={tab.id || tab.label}
            onClick={() => onChange(tab.id || tab.label)}
            className={`
              px-4 py-2 rounded-xl font-heading text-xs md:text-sm font-bold border-2 border-ink transition-all duration-150 flex items-center gap-2 select-none
              ${
                isActive
                  ? 'bg-red text-white shadow-hard translate-x-0 -translate-y-0.5'
                  : 'bg-cardWhite text-ink hover:bg-background hover:shadow-hard-sm'
              }
            `}
          >
            {tab.icon && <tab.icon className="w-4 h-4 stroke-[2.5]" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border border-ink ${isActive ? 'bg-yellow text-ink' : 'bg-background text-ink'}`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
