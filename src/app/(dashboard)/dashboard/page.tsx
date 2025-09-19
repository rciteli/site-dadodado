'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

import KpiCard from '@/components/dashboard/KpiCard';
import Chart from '@/components/dashboard/Chart';

const mock = Array.from({ length: 14 }, (_, i) => ({
  x: `D${i + 1}`,
  y: Math.round(40 + Math.random() * 60),
}));

export default function DashboardOverview() {
  const { status } = useSession();
  const [slug, setSlug] = useState<string | null>(null);
  const [loadingSlug, setLoadingSlug] = useState(true);

  // força login no client (middleware já protege, isso é um extra)
  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(undefined, { callbackUrl: '/dashboard' });
    }
  }, [status]);

  // cria/recupera o cliente do usuário e pega o slug
  useEffect(() => {
    if (status !== 'authenticated') return;
    let mounted = true;
    setLoadingSlug(true);
    fetch('/api/internal/bootstrap', { method: 'POST' })
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        if (d?.slug) setSlug(d.slug);
      })
      .finally(() => {
        if (mounted) setLoadingSlug(false);
      });
    return () => {
      mounted = false;
    };
  }, [status]);

  const base = useMemo(() => (slug ? `/dashboard/${slug}` : null), [slug]);

  const shortcuts = useMemo(
    () => [
      { href: base ? `${base}/pendulo-digital` : '#', label: 'Ver ranking de influência' },
      { href: base ? `${base}/lupa-social` : '#', label: 'Abrir análise de sentimento' },
      { href: base ? `${base}/pulso-publico` : '#', label: 'Resultados da última onda' },
      { href: base ? `${base}/rastro-360` : '#', label: 'Mapear rotas de difusão' },
    ],
    [base]
  );

  return (
    <div className="space-y-8">
      {/* KPIs principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard label="Influência (score)" value="78,4" delta="+2,1 vs. semana anterior" />
        <KpiCard label="Sentimento (Índice)" value="+0,22" delta="estável" />
        <KpiCard label="Menções (7d)" value="124k" delta="+18%" />
        <KpiCard label="Narrativas ativadas" value="6" delta="+2" />
      </div>

      {/* Série geral */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="mb-2 text-sm text-[#d9d9d9]/80">Volume ao longo do período</h3>
          <Chart data={mock} />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm text-[#d9d9d9]/80">Atalhos</h3>

          {loadingSlug && (
            <div className="rounded-xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10 text-white/70">
              Preparando seu espaço…
            </div>
          )}

          {!loadingSlug &&
            shortcuts.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className={`block rounded-xl px-4 py-3 text-sm ring-1 ring-white/10 ${
                  base
                    ? 'bg-white/5 hover:bg-white/10'
                    : 'bg-white/5 opacity-60 pointer-events-none'
                }`}
                aria-disabled={!base}
                tabIndex={base ? 0 : -1}
              >
                {a.label} →
              </Link>
            ))}

          {/* dica de debug caso esteja sem slug */}
          {!loadingSlug && !base && (
            <p className="text-xs text-white/60">
              Não foi possível determinar o cliente. Verifique se você está logado e se o{' '}
              <code>/api/internal/bootstrap</code> está criando o <em>Client</em> corretamente
              (confira no Prisma Studio).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
