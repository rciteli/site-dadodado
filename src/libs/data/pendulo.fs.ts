import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.env.DATA_ROOT || 'data';

async function readJson(p: string) {
  const full = path.join(ROOT, p);
  const raw = await fs.readFile(full, 'utf-8');
  return JSON.parse(raw);
}

export async function listWaves(slug: string) {
  const dir = path.join(ROOT, 'processed', slug);
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  return entries.filter(e => e.isDirectory()).map(e => e.name).sort().reverse();
}

export const repo = {
  overview: (slug: string, wave: string) => readJson(`processed/${slug}/${wave}/overview.json`),
  radar:    (slug: string, wave: string) => readJson(`processed/${slug}/${wave}/radar.json`),
  metrics:  (slug: string, wave: string) => readJson(`processed/${slug}/${wave}/metrics.json`),
};
