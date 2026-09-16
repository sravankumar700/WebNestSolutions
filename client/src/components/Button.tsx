import React from 'react';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  showArrow = true,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group';

  const variants = {
    primary: 'bg-brandRed-500 hover:bg-brandRed-600 text-[#f8f3ee] shadow-md hover:-translate-y-0.5',
    secondary: 'bg-cream-200 hover:bg-cream-300 text-warmNeutral-900 border border-cream-300 hover:-translate-y-0.5',
    outline: 'bg-transparent border border-cream-400 hover:border-brandRed-500 text-warmNeutral-900 hover:text-brandRed-500 hover:-translate-y-0.5',
    ghost: 'bg-transparent text-warmNeutral-700 hover:text-brandRed-500 hover:bg-cream-200',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-xs font-semibold',
    md: 'px-6 py-3 text-sm font-semibold',
    lg: 'px-8 py-3.5 text-sm sm:text-base font-semibold',
  };

  return (
    <button className={clsx(baseStyles, variants[variant], sizes[size], className)} {...props}>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
};
