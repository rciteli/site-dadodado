'use client';

import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, Legend,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Player = { id: string; name: string; color: string; isClient?: boolean };
type RadarRow = { metric: string; [playerName: string]: string | number };

export function RadarVisibility({
  players,
  radarData,
  visiblePlayerIds,
  onToggle,
}: {
  players: Player[];
  radarData: RadarRow[];
  visiblePlayerIds: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Radar por Dimensão</CardTitle>
        <CardDescription>Selecione concorrentes (default: cliente + 1º colocado)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {players.map(p => {
            const id = `vis-${p.id}`;
            const checked = visiblePlayerIds.includes(p.id);
            return (
              <div key={p.id} className="inline-flex items-center gap-2">
                <input
                  id={id}
                  type="checkbox"
                  className="h-4 w-4 accent-[#38d4b0]"
                  checked={checked}
                  onChange={() => onToggle(p.id)}
                />
                <label htmlFor={id} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm cursor-pointer">
                  <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.name}{p.isClient && ' (cliente)'}
                </label>
              </div>
            );
          })}
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <Tooltip />
              <Legend />
              {players
                .filter(p => visiblePlayerIds.includes(p.id))
                .map(p => (
                  <Radar
                    key={p.id}
                    name={p.name}
                    dataKey={p.name}
                    stroke={p.color}
                    fill={p.color}
                    fillOpacity={0.12}
                    strokeWidth={2}
                  />
                ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
