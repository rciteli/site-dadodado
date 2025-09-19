// app/(dashboard)/dashboard/alertas/page.tsx
'use client';

export default function AlertasPage() {
  const items = [
    { when: 'Hoje 10:32', type: 'Pico de menções', detail: 'Tema “X” +140% em 2h' },
    { when: 'Ontem 18:10', type: 'Virada de sentimento', detail: 'Frame “Y” migrou para neutro' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">Alertas</h1>
      <div className="overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[#d9d9d9]/70">
              <th className="px-4 py-3">Quando</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Detalhe</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="px-4 py-3">{a.when}</td>
                <td className="px-4 py-3">{a.type}</td>
                <td className="px-4 py-3">{a.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
