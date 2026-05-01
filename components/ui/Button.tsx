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

// Named export for Gallery4 / icon-button usage
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'icon';
  variant?: 'default' | 'ghost';
}
export function Button({ size = 'default', variant = 'default', className = '', ...props }: IconButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50';
  const sizes = size === 'icon' ? 'h-9 w-9' : 'h-9 px-4 py-2';
  const variants = variant === 'ghost'
    ? 'bg-transparent hover:bg-[#E8F3EC] text-[#1A1A1A]'
    : 'bg-[#0D593C] text-white hover:bg-[#094530]';
  return <button className={`${base} ${sizes} ${variants} ${className}`} {...props} />;
}

export default function DefaultButton({
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
