import React from 'react';

export default function Badge({
  children,
  variant = 'yellow',
  size = 'md',
  className = '',
  icon: Icon
}) {
  const variants = {
    yellow: 'bg-yellow text-ink border-ink',
    red: 'bg-red text-white border-ink',
    violet: 'bg-violet text-white border-ink',
    green: 'bg-green text-ink border-ink',
    ink: 'bg-ink text-white border-ink',
    white: 'bg-cardWhite text-ink border-ink',
    outline: 'bg-transparent text-ink border-ink',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] md:text-xs gap-1 border-1.5',
    md: 'px-2.5 py-1 text-xs md:text-sm gap-1.5 border-2',
    lg: 'px-3 py-1.5 text-sm md:text-base gap-2 border-2 md:border-[2.5px]',
  };

  return (
    <span className={`
      inline-flex items-center font-mono font-bold rounded-md shadow-[2px_2px_0px_0px_#111111] uppercase tracking-wider select-none
      ${variants[variant] || variants.yellow}
      ${sizes[size] || sizes.md}
      ${className}
    `}>
      {Icon && <Icon className="w-3.5 h-3.5 stroke-[2.5]" />}
      {children}
    </span>
  );
}
