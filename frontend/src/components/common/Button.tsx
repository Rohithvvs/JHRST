import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/50 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#B89428] text-black font-semibold shadow-gold-sm hover:shadow-gold-md hover:brightness-105 active:scale-[0.98]',
    secondary:
      'bg-[#141414] hover:bg-[#1C1C1C] text-white border border-[#292929] hover:border-gold-500/50 shadow-card active:scale-[0.98]',
    outline:
      'bg-transparent text-gold-300 border border-gold-500/40 hover:border-gold-400 hover:bg-gold-500/10 active:scale-[0.98]',
    ghost:
      'bg-transparent text-gray-300 hover:text-gold-300 hover:bg-white/5 active:scale-[0.98]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Subtle shine on hover for primary */}
      {variant === 'primary' && (
        <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
      )}

      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0 group-hover:translate-x-0.5 transition-transform">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

