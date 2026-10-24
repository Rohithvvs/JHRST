import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'default' | 'success' | 'outline';
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
    gold: 'bg-gold-500/10 border-gold-500/30 text-gold-300',
    default: 'bg-white/5 border-white/10 text-gray-300',
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    outline: 'bg-transparent border-[#292929] text-gray-400',
  };

  const dotColors = {
    gold: 'bg-gold-400 shadow-[0_0_8px_#D4AF37]',
    default: 'bg-gray-400',
    success: 'bg-emerald-400 shadow-[0_0_8px_#22C55E]',
    outline: 'bg-gray-500',
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

