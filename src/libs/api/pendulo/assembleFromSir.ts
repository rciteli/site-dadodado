// src/libs/api/pendulo/assembleFromSir.ts
import fs from 'node:fs/promises';
import path from 'node:path';

// --------- Tipos do front (compatíveis com a página do dashboard) ----------
export type Player = {
  id: string;
  name: string;
  color: string;
  isClient?: boolean;
  sirIndex: number;
};

export type SeriesPoint = { date: string; [playerName: string]: number | string };

export type Overview = {
  wave: string;
  players: Player[];
  series: SeriesPoint[]; // mantemos vazio por enquanto (sem série temporal intra-onda)
};

export type RadarRow = { metric: string; [playerName: string]: number | string };

export type RadarApi = {
  wave: string;
  dimensions: string[];
  data: RadarRow[];
  // opcional: series por dimensão, se desejar no futuro
  // dimensionSeries?: Record<string, SeriesPoint[]>;
};

// As plataformas do "mínimo viável" de métricas:
export type MetricsRow = {
  platform: 'total'; // literal
  followers: number;
  subscribers: number;
  posts: number;
  videos: number;
  tweets: number;
  engagementPct: number;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  mentions: number;
};

export type MetricsPayload = {
  wave: string;
  platformDataByPlayer: Record<string, MetricsRow[]>;       // chave por player-id (slug)
  platformPrevDataByPlayer: Record<string, MetricsRow[]>;   // idem para P(n-1)
};

// --------- Helpers ----------
const PALETTE = [
  '#38d4b0', '#3b25a1', '#7dd3fc', '#fca5a5', '#fde68a',
  '#f472b6', '#60a5fa', '#34d399', '#a78bfa', '#f59e0b',
];

const colorFor = (name: string) => {
  const i = Math.abs(hashCode(name)) % PALETTE.length;
  return PALETTE[i];
};

function hashCode(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h;
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const to2 = (n: number) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

// Lê metrics.json do período anterior e adapta as chaves para id (slug)
async function tryLoadPrevTotals(
  outRoot: string,
  client: string,
  wave: string
): Promise<Record<string, MetricsRow[]>> {
  const m = /^P(\d+)$/i.exec(wave);
  if (!m) return {};
  const n = Number(m[1]);
  if (!Number.isFinite(n) || n <= 1) return {};

  const prevWave = `P${n - 1}`;
  const prevPath = path.join(outRoot, client, prevWave, 'metrics.json');

  try {
    const raw = await fs.readFile(prevPath, 'utf-8');
    const json = JSON.parse(raw) as {
      platformDataByPlayer?: Record<string, any[]>;
    };
    if (!json.platformDataByPlayer) return {};

    const out: Record<string, MetricsRow[]> = {};
    for (const [k, rows] of Object.entries(json.platformDataByPlayer)) {
      const id = slug(k);
      const arr = Array.isArray(rows) ? rows : [];

      // pegue apenas a linha "total"; se não houver, sintetize
      const total = (arr.find((r) => r?.platform === 'total') ?? {
        platform: 'total',
        engagementPct: 0,
        followers: 0,
        subscribers: 0,
        posts: 0,
        videos: 0,
        tweets: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        mentions: 0,
      }) as MetricsRow;

      // força shape + duas casas
      const cast: MetricsRow = {
        platform: 'total',
        engagementPct: to2(Number((total as any).engagementPct ?? 0)),
        followers: Number((total as any).followers ?? 0),
        subscribers: Number((total as any).subscribers ?? 0),
        posts: Number((total as any).posts ?? 0),
        videos: Number((total as any).videos ?? 0),
        tweets: Number((total as any).tweets ?? 0),
        likes: Number((total as any).likes ?? 0),
        comments: Number((total as any).comments ?? 0),
        shares: Number((total as any).shares ?? 0),
        views: Number((total as any).views ?? 0),
        mentions: Number((total as any).mentions ?? 0),
      };

      out[id] = [cast];
    }
    return out;
  } catch {
    return {};
  }
}

// --------- Entrada "norm" (linhas do XLSX do SIR após leitura) ----------
// Esperamos pelo menos: name, presenca_100, popularidade_100, atividade_100, engajamento_100, difusao_100
// e, se existir, a coluna final: sir_final_0_100 (ou INFLUENCIA_DIGITAL mapeada para ela antes).
export type SirRow = {
  name: string;
  presenca_100?: number;
  popularidade_100?: number;
  atividade_100?: number;
  engajamento_100?: number;
  difusao_100?: number;
  sir_final_0_100?: number;
  INFLUENCIA_DIGITAL?: number; // fallback se ainda vier assim
};

// --------- Função principal ----------
// Recebe:
//  - norm: linhas lidas do XLSX gerado pelo sir_excel_pipeline_v6.py
//  - outRoot/client/wave: para buscar prev e depois escrever metrics.json em outro lugar (se precisar)
// Retorna: { overview, radar, metrics } prontos para o front.
export async function assembleFromSir(
  normInput: SirRow[],
  outRoot: string,
  client: string,
  wave: string
): Promise<{ overview: Overview; radar: RadarApi; metrics: MetricsPayload }> {
  // Normalize/clean + duas casas
  const norm = (normInput ?? []).map((r) => {
    const final =
      r.sir_final_0_100 ??
      (r as any).INFLUENCIA_DIGITAL ??
      0;
    return {
      name: String(r.name ?? '').trim(),
      presenca_100: to2(Number(r.presenca_100 ?? 0)),
      popularidade_100: to2(Number(r.popularidade_100 ?? 0)),
      atividade_100: to2(Number(r.atividade_100 ?? 0)),
      engajamento_100: to2(Number(r.engajamento_100 ?? 0)),
      difusao_100: to2(Number(r.difusao_100 ?? 0)),
      sir_final_0_100: to2(Number(final)),
    };
  }).filter(r => r.name.length > 0);

  // ---------- Overview ----------
  const players: Player[] = norm
    .slice()
    .sort((a, b) => (b.sir_final_0_100 ?? 0) - (a.sir_final_0_100 ?? 0))
    .map((r) => ({
      id: slug(r.name),
      name: r.name,
      color: colorFor(r.name),
      sirIndex: to2(Number(r.sir_final_0_100 ?? 0)),
      isClient: false,
    }));

  const overview: Overview = {
    wave,
    players,
    series: [], // sem série temporal intra-onda por ora
  };

  // ---------- Radar ----------
  const dims = ['Presença', 'Popularidade', 'Atividade', 'Engajamento', 'Difusão'];
  const data: RadarRow[] = [
    { metric: 'Presença',    ...Object.fromEntries(norm.map(r => [r.name, to2(r.presenca_100 ?? 0)])) },
    { metric: 'Popularidade',...Object.fromEntries(norm.map(r => [r.name, to2(r.popularidade_100 ?? 0)])) },
    { metric: 'Atividade',   ...Object.fromEntries(norm.map(r => [r.name, to2(r.atividade_100 ?? 0)])) },
    { metric: 'Engajamento', ...Object.fromEntries(norm.map(r => [r.name, to2(r.engajamento_100 ?? 0)])) },
    { metric: 'Difusão',     ...Object.fromEntries(norm.map(r => [r.name, to2(r.difusao_100 ?? 0)])) },
  ];

  const radar: RadarApi = {
    wave,
    dimensions: dims,
    data,
  };

  // ---------- Metrics (mínimo viável: 1 linha "total" por player-id) ----------
  const platformDataByPlayer: Record<string, MetricsRow[]> = Object.fromEntries(
    norm.map((r) => {
      const id = slug(r.name);
      const row: MetricsRow = {
        platform: 'total',
        engagementPct: to2(r.engajamento_100 ?? 0), // coerente com o painel
        followers: 0,
        subscribers: 0,
        posts: 0,
        videos: 0,
        tweets: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        mentions: 0,
      };
      return [id, [row]];
    })
  );

  const platformPrevDataByPlayer = await tryLoadPrevTotals(outRoot, client, wave);

  const metrics: MetricsPayload = {
    wave,
    platformDataByPlayer,
    platformPrevDataByPlayer,
  };

  return { overview, radar, metrics };
}
