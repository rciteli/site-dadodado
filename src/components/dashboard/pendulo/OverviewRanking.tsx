'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

type Player = {
  id: string;
  name: string;
  sirIndex: number;
  trend: 'up'|'down';
  trendValue: number;
  color: string;
  avatar?: string;
  isClient?: boolean;
};

export function OverviewRanking({ players }: { players: Player[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Ranking de Influência</CardTitle>
        <CardDescription>Nota 0–100 e variação vs. período anterior</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...players].sort((a,b)=>b.sirIndex-a.sirIndex).map((player, idx) => (
            <div key={player.id} className="flex items-center gap-4 rounded-lg border border-white/10 p-4">
              <div className="grid place-items-center h-8 w-8 rounded-full bg-white/10 text-sm font-bold">#{idx+1}</div>
              <div className="grid place-items-center h-10 w-10 rounded-full text-white font-bold" style={{ backgroundColor: player.color }}>
                {player.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{player.name} {player.isClient && <span className="text-xs text-[#38d4b0]">(cliente)</span>}</h3>
                  <Badge variant={player.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                    {player.trend === 'up' ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                    {Math.abs(player.trendValue)}%
                  </Badge>
                </div>
                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between text-xs text-white/70">
                    <span>Índice</span><span>{player.sirIndex}/100</span>
                  </div>
                  <Progress value={player.sirIndex} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
