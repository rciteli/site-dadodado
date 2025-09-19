import * as React from 'react';
import clsx from 'clsx';

type Variant = 'default' | 'secondary' | 'destructive';

export function Badge({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold';
  const variants: Record<Variant, string> = {
    default: 'bg-[#38d4b0] text-black',
    secondary: 'bg-white/10 text-white',
    destructive: 'bg-red-500/80 text-white',
  };
  return <span className={clsx(base, variants[variant], className)} {...props} />;
}
