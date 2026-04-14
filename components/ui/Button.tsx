'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent-pink' | 'accent-gold';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full cursor-pointer leading-none';

  const variants = {
    primary:
      'bg-[#0D593C] text-white hover:bg-[#0f6a48] hover:-translate-y-0.5 shadow-sm hover:shadow-md active:translate-y-0',
    secondary:
      'border-2 border-[#0D593C] text-[#0D593C] bg-white hover:bg-[#0D593C] hover:text-white active:scale-95',
    'accent-pink':
      'bg-[#F29CA3] text-white hover:bg-[#e8858d] hover:-translate-y-0.5 shadow-sm active:translate-y-0',
    'accent-gold':
      'bg-[#D4A373] text-white hover:bg-[#c0905e] hover:-translate-y-0.5 shadow-sm active:translate-y-0',
  };

  const sizes = {
    sm:  'text-sm px-5 py-2.5',
    md:  'text-base px-6 py-3',
    lg:  'text-base px-8 py-4',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) return <a href={href} className={classes}>{children}</a>;
  return <button onClick={onClick} className={classes}>{children}</button>;
}
