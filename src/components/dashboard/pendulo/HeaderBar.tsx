'use client';
import { Target } from 'lucide-react';
import { ReactNode } from 'react';

export function HeaderBar({
  title,
  subtitle,
  rightSlot,
  badge,
  isDark,
  onToggleTheme,
}: {
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  badge?: ReactNode;
  isDark?: boolean;
  onToggleTheme?: () => void;
}) {
  return (
    <div className="border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-[#38d4b0]" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
              {subtitle && <p className="text-xs text-white/60 -mt-1">{subtitle}</p>}
            </div>
            {badge && <div className="ml-2">{badge}</div>}
          </div>
          {rightSlot}
        </div>
      </div>
    </div>
  );
}
