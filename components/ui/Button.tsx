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
    'inline-flex items-center justify-center font-medium transition-colors duration-200 cursor-pointer leading-none border tracking-[1px] rounded-[3px]';

  const variants = {
    primary:
      'bg-[var(--button-bg)] text-[var(--button-text)] border-[var(--button-border)] hover:bg-[var(--button-hover-bg)] hover:text-[var(--button-hover-text)] hover:border-[var(--button-hover-border)]',
    secondary:
      'bg-[var(--button-hover-bg)] text-[var(--button-hover-text)] border-[var(--button-hover-border)] hover:bg-[var(--button-bg)] hover:text-[var(--button-text)] hover:border-[var(--button-border)]',
    'accent-pink':
      'bg-[#F29CA3] text-white border-[#F29CA3] hover:bg-white hover:text-[#F29CA3] hover:border-[#F29CA3]',
    'accent-gold':
      'bg-[#D4A373] text-white border-[#D4A373] hover:bg-white hover:text-[#D4A373] hover:border-[#D4A373]',
  };

  const sizes = {
    sm:  'text-[14px] px-[20px] py-[9px]',
    md:  'text-[15px] px-[20px] py-[11px]',
    lg:  'text-[15px] px-[20px] py-[13px]',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) return <a href={href} className={classes}>{children}</a>;
  return <button onClick={onClick} className={classes}>{children}</button>;
}
