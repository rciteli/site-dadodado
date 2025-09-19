// src/app/api/internal/pendulo/run/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import path from 'path';
import fs from 'fs/promises';
import { spawn } from 'child_process';
import { getDataRoot } from '@/libs/paths';
import { assertUserAdminInClient } from '@/libs/authz';

export const runtime = 'nodejs';

function resolvePython() {
  if (process.env.PYTHON_BIN) return process.env.PYTHON_BIN!;
  const cwd = process.cwd();
  return process.platform === 'win32'
    ? path.join(cwd, '.venv', 'Scripts', 'python.exe')
    : path.join(cwd, '.venv', 'bin', 'python');
}

const WAVE_RE = /^P\d+$/i;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const uid = (session as any)?.uid as string | undefined;
  if (!uid) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const client = String(body.client || '').trim();
  const wave = String(body.wave || '').trim().toUpperCase();
  const excelFileName = String(body.excelFile || 'PlanilhaPresidentes.xlsx');
  const sheet = body.sheet ?? 0;

  // parâmetros opcionais
  const piso_positivo   = String(body.piso_positivo ?? 1.0);
  const cap_min         = String(body.cap_min ?? 98.0);
  const dominance_factor= String(body.dominance_factor ?? 10.0);

  const w_presenca = String(body.w_presenca ?? 12.0);
  const w_pop      = String(body.w_pop ?? 24.0);
  const w_ativ     = String(body.w_ativ ?? 16.0);
  const w_eng      = String(body.w_eng ?? 28.0);
  const w_dif      = String(body.w_dif ?? 20.0);

  const w_facebook  = String(body.w_facebook ?? 0.5);
  const w_twitter   = String(body.w_twitter ?? 0.1);
  const w_instagram = String(body.w_instagram ?? 1.0);
  const w_tiktok    = String(body.w_tiktok ?? 1.0);

  if (!client || !wave) return NextResponse.json({ error: 'missing_params' }, { status: 400 });
  if (!WAVE_RE.test(wave)) return NextResponse.json({ error: 'invalid_wave', hint: 'Use P{n}, ex.: P6' }, { status: 400 });

  try {
    await assertUserAdminInClient(uid, client);
  } catch (e: any) {
    const code = e?.message === 'forbidden' ? 403 : 404;
    return NextResponse.json({ error: e?.message || 'forbidden' }, { status: code });
  }

  const repoRoot = process.cwd();
  const dataRoot = getDataRoot();

  const script = path.join(repoRoot, 'etl', 'sir_excel_pipeline_v6.py');
  const excelPath = path.join(dataRoot, 'raw', client, wave, excelFileName);

  const outDir = path.join(dataRoot, 'processed', client, wave, 'pendulo');
  const outXlsx = path.join(outDir, 'pendulo_v6.xlsx');
  const plotsDir = path.join(outDir, 'plots');

  try { await fs.access(script); } catch {
    return NextResponse.json({ ok: false, error: 'script_not_found', script }, { status: 200 });
  }
  try { await fs.access(excelPath); } catch {
    return NextResponse.json({ ok: false, error: 'excel_not_found', excelPath }, { status: 200 });
  }
  await fs.mkdir(outDir, { recursive: true });
  await fs.mkdir(plotsDir, { recursive: true });

  const python = resolvePython();
  const args = [
    script,
    '--excel', excelPath,
    '--sheet', String(sheet),
    '--out-xlsx', outXlsx,
    '--out-dir', outDir,
    '--plots-dir', plotsDir,
    '--piso_positivo', piso_positivo,
    '--cap_min', cap_min,
    '--dominance_factor', dominance_factor,
    '--w-presenca', w_presenca,
    '--w-pop', w_pop,
    '--w-ativ', w_ativ,
    '--w-eng', w_eng,
    '--w-dif', w_dif,
    '--w-facebook', w_facebook,
    '--w-twitter', w_twitter,
    '--w-instagram', w_instagram,
    '--w-tiktok', w_tiktok,
    '--plot-prefix', 'PENDULO_',
  ];

  const env = { ...process.env, DATA_ROOT: dataRoot };
  const output: string[] = [];
  const code: number = await new Promise((resolve) => {
    const p = spawn(python, args, { env, shell: false });
    p.stdout?.on('data', (d) => output.push(String(d)));
    p.stderr?.on('data', (d) => output.push(String(d)));
    p.on('error', (err) => { output.push(`spawn error: ${err?.message || err}`); resolve(1); });
    p.on('close', (c) => resolve(c ?? 0));
  });

  return NextResponse.json({
    ok: code === 0,
    code,
    python,
    excel: excelPath,
    outXlsx,
    plotsDir,
    output: output.join(''),
  });
}
