import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  icon: Icon,
  fullWidth = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-heading font-bold border-2 md:border-[3px] border-ink transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    primary: "bg-red text-white hover:bg-red-dark shadow-hard hover:shadow-hard-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-hard-sm",
    secondary: "bg-cardWhite text-ink hover:bg-white shadow-hard hover:shadow-hard-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-hard-sm",
    yellow: "bg-yellow text-ink hover:bg-yellow-dark shadow-hard hover:shadow-hard-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-hard-sm",
    violet: "bg-violet text-white hover:bg-violet-dark shadow-hard hover:shadow-hard-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-hard-sm",
    green: "bg-green text-ink hover:bg-green-dark shadow-hard hover:shadow-hard-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-hard-sm",
    black: "bg-ink text-white hover:bg-ink-light shadow-hard hover:shadow-hard-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-hard-sm",
    outline: "bg-transparent text-ink hover:bg-white shadow-hard hover:shadow-hard-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-hard-sm",
    ghost: "bg-transparent text-ink border-transparent shadow-none hover:bg-ink/5 hover:border-ink"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-md gap-1.5",
    md: "px-4 py-2.5 text-sm md:text-base rounded-lg gap-2",
    lg: "px-6 py-3.5 text-base md:text-lg rounded-xl gap-2.5",
    icon: "p-2 rounded-lg text-sm"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} stroke-[2.5]`} />}
      {children}
    </button>
  );
}
