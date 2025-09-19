import * as React from 'react';
import clsx from 'clsx';

type Variant = 'default' | 'outline' | 'ghost';
type Size = 'sm' | 'md';

export function Button({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none';
  const sizes: Record<Size, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
  };
  const variants: Record<Variant, string> = {
    default: 'bg-[#3b25a1] text-white shadow-[0_8px_22px_rgba(59,37,161,0.35)] hover:brightness-110',
    outline: 'border border-white/20 text-white hover:bg-white/10',
    ghost: 'text-white hover:bg-white/10',
  };
  return <button className={clsx(base, sizes[size], variants[variant], className)} {...props} />;
}
