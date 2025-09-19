// components/dashboard/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gauge, Search, Users, Share2, BellRing, FileText, Home } from 'lucide-react';

const items = [
  { href: '/dashboard', icon: Home, label: 'Overview' },
  { href: '/dashboard/pendulo-digital', icon: Users, label: 'Pêndulo Digital' },
  { href: '/dashboard/lupa-social', icon: Search, label: 'Lupa Social' },
  { href: '/dashboard/pulso-publico', icon: Gauge, label: 'Pulso Público' },
  { href: '/dashboard/rastro-360', icon: Share2, label: 'Rastro 360' },
  { href: '/dashboard/alertas', icon: BellRing, label: 'Alertas' },
  { href: '/dashboard/relatorios', icon: FileText, label: 'Relatórios' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <img src="/logo.png" alt="DADODADO" className="h-8 w-auto" />
        </Link>
      </div>

      <nav className="mt-2 px-3 pb-6">
        <ul className="space-y-1.5">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition
                    ring-1 ring-transparent
                    ${active
                      ? 'bg-[#3b25a1]/25 ring-[#3b25a1]/40 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-[#d9d9d9]'
                    }`}
                >
                  <item.icon className="h-4 w-4 text-[#38d4b0]" />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto p-3 text-xs text-[#d9d9d9]/60">
        v0.1 • preview
      </div>
    </div>
  );
}
