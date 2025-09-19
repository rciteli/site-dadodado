// src/libs/api/pendulo-server.ts — server helpers for pendulo v6.1
import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { runSirAndRead } from '@/libs/sir/runner';

const OUT_ROOT = 'data/processed';
const RAW_ROOT = 'data/raw';

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

export async function getOrBuildWave(client: string, wave: string) {
  const dataRoot = process.env.DATA_ROOT ? path.resolve(process.cwd(), process.env.DATA_ROOT) : path.resolve(process.cwd(), 'data');
  // Garante estruturas
  ensureDir(path.join(dataRoot, RAW_ROOT.replace(/^data\//,''), client, wave));
  ensureDir(path.join(dataRoot, OUT_ROOT.replace(/^data\//,''), client, wave, 'pendulo'));

  // Delega toda a orquestração para o runner (ele chama o Python se necessário e monta os payloads)
  return await runSirAndRead({ client, wave, rawRoot: RAW_ROOT, outRoot: OUT_ROOT });
}

export function listWaves(client: string): string[] {
  const dir = path.resolve(process.cwd(), OUT_ROOT, client);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((d) => /^P\d+$/i.test(d))
    .sort((a, b) => Number(b.slice(1)) - Number(a.slice(1)));
}

/** Helper para responses JSON com cache */
export function okJSON(data: unknown) {
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=120' },
  });
}
