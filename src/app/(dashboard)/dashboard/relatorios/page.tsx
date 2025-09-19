// app/(dashboard)/dashboard/relatorios/page.tsx
'use client';

import Link from 'next/link';

const files = [
  { name: 'Relatório Semanal — 2025-09-05.pdf', href: '#' },
  { name: 'Pulso Público — Onda 12.pdf', href: '#' },
];

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">Relatórios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {files.map((f) => (
          <Link
            key={f.name}
            href={f.href}
            className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10 text-sm"
          >
            {f.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
