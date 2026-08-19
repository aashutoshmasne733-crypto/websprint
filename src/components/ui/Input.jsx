import React from 'react';

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  name,
  required = false,
  disabled = false,
  ...props
}) {
  const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 font-mono">
      {label && (
        <label htmlFor={inputId} className="block text-xs md:text-sm font-bold uppercase tracking-wider text-ink flex items-center gap-1">
          {label}
          {required && <span className="text-red font-bold">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-ink opacity-70">
            <Icon className="w-5 h-5 stroke-[2.5]" />
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full border-2 md:border-[3px] border-ink rounded-lg bg-white px-3.5 py-2.5 md:py-3 text-sm md:text-base font-mono text-ink placeholder:text-ink/40
            shadow-hard-sm focus:shadow-hard focus:-translate-x-0.5 focus:-translate-y-0.5 focus:border-ink focus:outline-none transition-all duration-150
            disabled:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed
            ${Icon ? 'pl-11' : ''}
            ${error ? 'border-red shadow-hard-red' : ''}
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs font-bold text-red flex items-center gap-1 mt-1">
          ⚠️ {error}
        </p>
      )}

      {helperText && !error && (
        <p className="text-xs text-ink/70 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}
