'use client';

import {
  ResponsiveContainer,
  LineChart as RLineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Player = { id: string; name: string; color: string };
export type TimeSeriesRow = { date: string } & Record<string, number | string>;
type SeriesMap = Record<string, TimeSeriesRow[]>;

export function DimensionEvolutions({
  players,
  dimensionSeries,
  dimKeys,
}: {
  players: Player[];
  dimensionSeries: SeriesMap;
  dimKeys: ReadonlyArray<string>;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {dimKeys.map((dim) => (
        <Card key={`evo-${dim}`}>
          <CardHeader>
            <CardTitle>{dim} — Evolução</CardTitle>
            <CardDescription>Variação por player</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 overflow-hidden overscroll-contain relative">
              <ResponsiveContainer width="100%" height="100%">
                <RLineChart data={dimensionSeries[dim]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="#ccc" />
                  <YAxis stroke="#ccc" domain={[0, 100]} />
                  <Tooltip
                    allowEscapeViewBox={{ x: true, y: true }}
                    offset={10}
                    wrapperStyle={{
                      position: 'fixed',
                      zIndex: 60,
                      pointerEvents: 'none',
                      transform: 'translate3d(0,0,0)',
                    }}
                    contentStyle={{
                      background: 'rgba(0,0,0,0.7)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      borderRadius: 8,
                    }}
                    labelStyle={{ color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  {players.map((p) => (
                    <Line key={p.id} type="monotone" dataKey={p.name} stroke={p.color} strokeWidth={2} dot={false} />
                  ))}
                </RLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default DimensionEvolutions;
