import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'primary' | 'default' | 'success' | 'outline';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  dot = true,
  className = '',
}) => {
  const variantStyles = {
    gold: 'bg-blue-50 border-blue-200 text-blue-700 font-semibold',
    primary: 'bg-blue-50 border-blue-200 text-blue-700 font-semibold',
    default: 'bg-slate-100 border-slate-200 text-slate-700 font-medium',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium',
    outline: 'bg-transparent border-slate-300 text-slate-600',
  };

  const dotColors = {
    gold: 'bg-blue-600 shadow-[0_0_8px_rgba(2,103,214,0.4)]',
    primary: 'bg-blue-600 shadow-[0_0_8px_rgba(2,103,214,0.4)]',
    default: 'bg-slate-400',
    success: 'bg-emerald-500 shadow-[0_0_8px_#22C55E]',
    outline: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border tracking-wider uppercase backdrop-blur-sm ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} shrink-0`} />}
      <span>{children}</span>
    </span>
  );
};
