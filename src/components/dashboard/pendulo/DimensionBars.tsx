'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Player = { name: string; color: string };
type RadarRow = { metric: string; [playerName: string]: string | number };

export function DimensionBars({
  players,
  radarData,
}: {
  players: Player[];
  radarData: RadarRow[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {radarData.map((row) => {
        const data = players.map((p) => ({ player: p.name, value: Number(row[p.name] || 0), color: p.color }));
        return (
          <Card key={`bar-${row.metric}`}>
            <CardHeader>
              <CardTitle>{row.metric} — Comparativo</CardTitle>
              <CardDescription>Todos os concorrentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 overflow-hidden overscroll-contain relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="player" stroke="#ccc" />
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
                    <Bar dataKey="value">
                      {data.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default DimensionBars;
