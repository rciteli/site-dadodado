export type ResultadoRow = {
  name: string;
  presenca_100: string | number;
  popularidade_100: string | number;
  atividade_100: string | number;
  engajamento_100: string | number;
  difusao_100: string | number;
  sir_final_0_100: string | number;
};

export type MetricsRow = {
  name: string;
  platform: "facebook" | "instagram" | "twitter" | "tiktok" | string;
  metric:
    | "fans" | "posts" | "likes" | "comments" | "shares" | "engagement"
    | "var_fans" | "var_likes" | "var_comments" | "var_shares" | "var_engagement"
    | string;
  period_start?: string | null;
  period_end?: string | null;
  value: string | number | null;
};

export type LatestResponse = {
  ok: true;
  date: string; // YYYYMMDD
  resultado: ResultadoRow[];
  metrics: MetricsRow[];
};

export async function getLatest(clientSlug: string): Promise<LatestResponse> {
  const res = await fetch(`/api/v1/pendulo/${clientSlug}/latest`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch latest: ${res.status}`);
  }
  return res.json();
}

/** helpers de conversão numérica segura */
export const toNum = (x: unknown) => {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
};

/** monta dados para o radar de um 'name' específico */
export function buildRadarData(resultado: ResultadoRow[], name: string) {
  const row = resultado.find(r => r.name === name);
  if (!row) return [];
  return [
    { dim: "Presença",     value: toNum(row.presenca_100) },
    { dim: "Popularidade", value: toNum(row.popularidade_100) },
    { dim: "Atividade",    value: toNum(row.atividade_100) },
    { dim: "Engajamento",  value: toNum(row.engajamento_100) },
    { dim: "Difusão",      value: toNum(row.difusao_100) },
  ];
}

/** top N por score (sir_final_0_100) para cards/overview */
export function topByScore(resultado: ResultadoRow[], n = 10) {
  return [...resultado]
    .map(r => ({ ...r, score: toNum(r.sir_final_0_100) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

/** agrupa metrics (long) -> { [platform]: { [metric]: [{name,value,period_*}] } } */
export function groupMetrics(metrics: MetricsRow[]) {
  const out: Record<string, Record<string, Array<{ name: string; value: number; period_start?: string|null; period_end?: string|null }>>> = {};
  for (const m of metrics) {
    const plat = m.platform || "unknown";
    const met  = m.metric || "value";
    out[plat] ??= {};
    out[plat][met] ??= [];
    out[plat][met].push({
      name: m.name,
      value: toNum(m.value),
      period_start: m.period_start ?? null,
      period_end:   m.period_end ?? null,
    });
  }
  return out;
}
