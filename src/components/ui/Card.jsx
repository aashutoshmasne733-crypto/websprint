import React from 'react';

export default function Card({
  children,
  title,
  subtitle,
  action,
  bg = 'cardWhite',
  borderColor = 'ink',
  accentBorder = false,
  accentColor = 'violet',
  shadow = 'hard-md',
  className = '',
  headerClassName = '',
  bodyClassName = '',
  badge,
  ...props
}) {
  const bgClasses = {
    cardWhite: 'bg-cardWhite',
    white: 'bg-white',
    yellow: 'bg-yellow',
    violet: 'bg-violet text-white',
    red: 'bg-red text-white',
    green: 'bg-green',
    background: 'bg-background',
    ink: 'bg-ink text-white',
  };

  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-hard-sm',
    hard: 'shadow-hard',
    'hard-md': 'shadow-hard-md',
    'hard-lg': 'shadow-hard-lg',
    'hard-xl': 'shadow-hard-xl',
  };

  const accentBorderClasses = {
    violet: 'border-l-8 border-l-violet',
    red: 'border-l-8 border-l-red',
    yellow: 'border-l-8 border-l-yellow',
    green: 'border-l-8 border-l-green',
    purpleRed: 'border-l-8 border-l-violet border-r-4 border-r-red',
  };

  return (
    <div
      className={`
        relative border-2 md:border-[3px] border-ink rounded-xl transition-all duration-200
        ${bgClasses[bg] || 'bg-cardWhite'}
        ${shadowClasses[shadow] || 'shadow-hard-md'}
        ${accentBorder ? (accentBorderClasses[accentColor] || accentBorderClasses.violet) : ''}
        ${className}
      `}
      {...props}
    >
      {(title || subtitle || action || badge) && (
        <div className={`p-4 md:p-5 border-b-2 md:border-b-[3px] border-ink flex items-center justify-between gap-3 ${headerClassName}`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {badge && <div>{badge}</div>}
              {title && (
                <h3 className="font-heading text-lg md:text-xl font-bold tracking-tight text-current">
                  {title}
                </h3>
              )}
            </div>
            {subtitle && (
              <p className="text-xs md:text-sm font-mono opacity-80">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}

      <div className={`p-4 md:p-6 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
