export async function fetchWaves(clientSlug: string) {
  const r = await fetch(`/api/v1/pendulo/${clientSlug}/waves`, { cache: 'no-store' });
  if (!r.ok) throw new Error('Falha ao listar ondas');
  return (await r.json()) as { waves: string[] };
}

export async function fetchOverview(clientSlug: string, wave: string) {
  const r = await fetch(`/api/v1/pendulo/${clientSlug}/overview/${wave}`, { next: { revalidate: 60 } });
  if (!r.ok) throw new Error('Falha ao carregar overview');
  return await r.json();
}

export async function fetchRadar(clientSlug: string, wave: string) {
  const r = await fetch(`/api/v1/pendulo/${clientSlug}/radar/${wave}`, { next: { revalidate: 120 } });
  if (!r.ok) throw new Error('Falha ao carregar radar');
  return await r.json();
}

export async function fetchMetrics(clientSlug: string, wave: string) {
  const r = await fetch(`/api/v1/pendulo/${clientSlug}/metrics/${wave}`, { next: { revalidate: 120 } });
  if (!r.ok) throw new Error('Falha ao carregar métricas');
  return await r.json();
}
