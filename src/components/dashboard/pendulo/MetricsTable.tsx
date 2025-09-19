'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Eye, Play, MessageCircle } from 'lucide-react';

type Player = { id: string; name: string; isClient?: boolean };
export type Platform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'x';
export type PlatformMetricsRow = {
  platform: Platform;
  followers?: number;
  subscribers?: number;
  posts?: number;
  videos?: number;
  tweets?: number;
  engagementPct: number;
  likes?: number;
  comments?: number;
  shares?: number;
  views?: number;
  mentions?: number;
};

const platformIconByName: Record<Platform, React.ComponentType<{ className?: string }>> = {
  facebook: Globe, instagram: Eye, tiktok: Play, youtube: Play, x: MessageCircle,
};

export function MetricsTable({
  players,
  metricsPlayerId,
  onChangePlayer,
  showDelta,
  onToggleDelta,
  platformDataByPlayer,
  platformPrevDataByPlayer,
  pctDelta,
}: {
  players: Player[];
  metricsPlayerId: Player['id'];
  onChangePlayer: (id: Player['id']) => void;
  showDelta: boolean;
  onToggleDelta: () => void;
  platformDataByPlayer: Record<string, PlatformMetricsRow[]>;
  platformPrevDataByPlayer: Record<string, PlatformMetricsRow[]>;
  pctDelta: (curr?: number, prev?: number) => number;
}) {
  const selected = players.find(p => p.id === metricsPlayerId)!;

  // ✅ usa id; se não houver no mock atual, cai para nome (compat)
  const currList: PlatformMetricsRow[] =
    (platformDataByPlayer as any)[selected.id] ??
    (platformDataByPlayer as any)[selected.name] ??
    [];

  const prevList: PlatformMetricsRow[] =
    (platformPrevDataByPlayer as any)[selected.id] ??
    (platformPrevDataByPlayer as any)[selected.name] ??
    [];

  const labelByValue = Object.fromEntries(players.map(p => [p.id, p.name + (p.isClient ? ' (cliente)':'')]));

  const fmt = (v: number) =>
    showDelta ? `${v >= 0 ? '+' : ''}${v.toFixed(1)}%` : v.toLocaleString('pt-BR');

  const fmtEng = (v: number) =>
    showDelta ? `${v >= 0 ? '+' : ''}${v.toFixed(1)}%` : `${v.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Métricas por Plataforma</CardTitle>
        <CardDescription>Alternar valores absolutos ↔ variação % (vs. período anterior)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Select value={metricsPlayerId} onValueChange={(v) => onChangePlayer(v)} labelByValue={labelByValue}>
            <SelectTrigger className="w-56" aria-label="Selecionar player de métricas">
              <SelectValue placeholder="Selecionar player" />
            </SelectTrigger>
            <SelectContent>
              {players.map(p => <SelectItem key={p.id} value={p.id}>{p.name}{p.isClient && ' (cliente)'}</SelectItem>)}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={onToggleDelta} aria-pressed={showDelta}>
            {showDelta ? 'Ver valores absolutos' : 'Ver variações %'}
          </Button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-[880px] w-full text-sm">
            <thead className="bg-white/5 text-white/80">
              <tr>
                <th className="px-3 py-2 text-left">Plataforma</th>
                <th className="px-3 py-2 text-right">Base</th>
                <th className="px-3 py-2 text-right">Posts/Vídeos/Tweets</th>
                <th className="px-3 py-2 text-right">Engajamento</th>
                <th className="px-3 py-2 text-right">Likes</th>
                <th className="px-3 py-2 text-right">Comentários</th>
                <th className="px-3 py-2 text-right">Compart.</th>
                <th className="px-3 py-2 text-right">Views</th>
                <th className="px-3 py-2 text-right">Menções</th>
              </tr>
            </thead>
            <tbody>
              {currList.map((currRow) => {
                const prevRow = prevList.find(r => r.platform === currRow.platform) ?? ({} as PlatformMetricsRow);

                const baseCurr = currRow.followers ?? currRow.subscribers ?? 0;
                const basePrev = prevRow.followers ?? prevRow.subscribers ?? 0;

                const activityCurr = currRow.posts ?? currRow.videos ?? currRow.tweets ?? 0;
                const activityPrev = prevRow.posts ?? prevRow.videos ?? prevRow.tweets ?? 0;

                const cells = {
                  base: showDelta ? pctDelta(baseCurr, basePrev) : baseCurr,
                  activity: showDelta ? pctDelta(activityCurr, activityPrev) : activityCurr,
                  engagement: showDelta ? pctDelta(currRow.engagementPct, prevRow.engagementPct) : currRow.engagementPct,
                  likes: showDelta ? pctDelta(currRow.likes, prevRow.likes) : (currRow.likes ?? 0),
                  comments: showDelta ? pctDelta(currRow.comments, prevRow.comments) : (currRow.comments ?? 0),
                  shares: showDelta ? pctDelta(currRow.shares, prevRow.shares) : (currRow.shares ?? 0),
                  views: showDelta ? pctDelta(currRow.views, prevRow.views) : (currRow.views ?? 0),
                  mentions: showDelta ? pctDelta(currRow.mentions, prevRow.mentions) : (currRow.mentions ?? 0),
                };

                const Icon = platformIconByName[currRow.platform];

                return (
                  <tr key={`${metricsPlayerId}-${currRow.platform}`} className="border-t border-white/10">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4 text-[#38d4b0]" />}
                        <span className="capitalize">{currRow.platform}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">{fmt(cells.base)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{fmt(cells.activity)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{fmtEng(cells.engagement)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{fmt(cells.likes)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{fmt(cells.comments)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{fmt(cells.shares)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{fmt(cells.views)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{fmt(cells.mentions)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
