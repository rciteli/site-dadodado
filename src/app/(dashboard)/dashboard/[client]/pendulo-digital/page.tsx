'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useParams } from 'next/navigation';

import { fetchWaves, fetchOverview, fetchRadar, fetchMetrics } from '@/libs/api/pendulo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

import {
  ResponsiveContainer,
  LineChart as RLineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

type SeriesPoint = { date: string; [playerName: string]: number | string };
type Overview = {
  wave: string;
  players: { id: string; name: string; color: string; isClient?: boolean; sirIndex: number }[];
  series: SeriesPoint[];
};

export default function PenduloDigitalClientPage() {
  const { status } = useSession();
  const params = useParams();
  const clientSlug = (params?.client as string) ?? '';

  const [waves, setWaves] = useState<string[]>([]);
  const [wave, setWave] = useState<string>('');
  const [overview, setOverview] = useState<Overview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(undefined, { callbackUrl: clientSlug ? `/dashboard/${clientSlug}/pendulo-digital` : '/dashboard' });
    }
  }, [status, clientSlug]);

  useEffect(() => {
    if (status !== 'authenticated' || !clientSlug) return;
    let mounted = true;
    fetchWaves(clientSlug).then(({ waves }) => {
      if (!mounted) return;
      setWaves(waves);
      setWave((prev) => prev || waves[0] || '');
    });
    return () => {
      mounted = false;
    };
  }, [status, clientSlug]);

  useEffect(() => {
    if (status !== 'authenticated' || !clientSlug || !wave) return;
    let mounted = true;
    setLoading(true);
    Promise.all([
      fetchOverview(clientSlug, wave),
      fetchRadar(clientSlug, wave),
      fetchMetrics(clientSlug, wave),
    ])
      .then(([ov]) => {
        if (!mounted) return;
        setOverview(ov);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [status, clientSlug, wave]);

  const labelByWave = useMemo(
    () => Object.fromEntries(waves.map((w) => [w, `Pêndulo ${w.slice(1)}`])),
    [waves]
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 text-white">
      <div className="sticky top-[68px] z-[60] mb-4 flex flex-wrap items-center gap-3">
        <Select value={wave} onValueChange={setWave} labelByValue={labelByWave}>
          <SelectTrigger className="w-44" aria-label="Selecionar período (Pêndulo)" style={{ position: 'relative', zIndex: 61 }}>
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            {waves.map((w) => (
              <SelectItem key={w} value={w as string}>{`Pêndulo ${w.slice(1)}`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ranking de Influência</CardTitle>
            <CardDescription>
              {wave ? `Período: ${labelByWave[wave] ?? wave}` : 'Selecione um período'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && <div className="text-white/70">Carregando dados…</div>}
            {!loading && overview && (
              <div className="space-y-4">
                {[...overview.players]
                  .sort((a, b) => b.sirIndex - a.sirIndex)
                  .map((p, idx) => (
                    <div key={p.id} className="flex items-center gap-4 rounded-lg border border-white/10 p-4">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm font-bold">#{idx + 1}</div>
                      <div
                        className="grid h-10 w-10 place-items-center rounded-full text-white font-bold"
                        style={{ backgroundColor: p.color }}
                        aria-label={`Avatar ${p.name}`}
                      >
                        {p.name.split(' ').map((s) => s[0]).slice(0, 2).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            {p.name} {p.isClient && <span className="text-xs text-[#38d4b0]">(cliente)</span>}
                          </h3>
                        </div>
                        <div className="mt-2">
                          <div className="mb-1 flex items-center justify-between text-xs text-white/70">
                            <span>Índice</span>
                            <span>{p.sirIndex}/100</span>
                          </div>
                          <Progress value={p.sirIndex} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {!loading && !overview && (
              <div className="text-white/70">
                Sem dados para {labelByWave[wave] ?? wave}. Verifique os snapshots em{' '}
                <code className="ml-1">data/processed/{clientSlug}/{wave}</code>.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução do Índice</CardTitle>
            <CardDescription>Variação ao longo do período selecionado</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && <div className="text-white/70">Carregando gráfico…</div>}
            {!loading && overview && (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RLineChart data={overview.series}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="#ccc" />
                    <YAxis stroke="#ccc" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    {overview.players.map((p) => (
                      <Line
                        key={p.id}
                        type="monotone"
                        dataKey={p.name}
                        stroke={p.color}
                        strokeWidth={2}
                        dot={{ r: 3, fill: p.color }}
                      />
                    ))}
                  </RLineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
