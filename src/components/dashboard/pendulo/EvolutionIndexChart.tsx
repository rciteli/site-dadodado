'use client';

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Player = { id: string; name: string; color: string };
export type TimeSeriesRow = { date: string } & Record<string, number | string>;

export function EvolutionIndexChart({
  data,
  players,
  title = 'Evolução do Índice',
  subtitle = 'Variação ao longo do período selecionado',
}: {
  data: TimeSeriesRow[];
  players: Player[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* evita qualquer scroll interno ao mostrar tooltip */}
        <div className="h-80 overflow-hidden overscroll-contain relative">
          <ResponsiveContainer width="100%" height="100%">
            <RLineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" domain={[0, 100]} />
              <Tooltip
                allowEscapeViewBox={{ x: true, y: true }}
                offset={10}
                // O pulo do gato: tirar o tooltip do fluxo do Card
                wrapperStyle={{
                  position: 'fixed',       // não influencia o layout do Card
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
              <Legend />
              {players.map((p) => (
                <Line
                  key={p.id}
                  type="monotone"
                  dataKey={p.name}
                  stroke={p.color}
                  strokeWidth={2}
                  dot={{ r: 2, fill: p.color }}
                  activeDot={{ r: 3 }}
                />
              ))}
            </RLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default EvolutionIndexChart;
