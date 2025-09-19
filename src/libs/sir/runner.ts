
// src/libs/sir/runner.ts — unified runner using CSV outputs from sir_excel_pipeline_v6.py
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { parse as parseCsv } from 'csv-parse/sync';
import { assembleFromSir, type SirRow } from '@/libs/api/pendulo/assembleFromSir';

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

function slug(s: string) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function findExcelOrCsv(rawDir: string, nameHint?: string) {
  if (!fs.existsSync(rawDir)) return null;
  if (nameHint) {
    const cand = path.join(rawDir, nameHint);
    if (fs.existsSync(cand)) return cand;
  }
  const files = fs.readdirSync(rawDir);
  for (const ext of ['.xlsx', '.xls', '.csv']) {
    const f = files.find((f) => f.toLowerCase().endsWith(ext));
    if (f) return path.join(rawDir, f);
  }
  return null;
}

function findOutCsvs(outDir: string) {
  if (!fs.existsSync(outDir)) return { resultado: null as string | null, metrics: null as string | null };
  const files = fs.readdirSync(outDir);
  const resultado = files.find((f) => f.endsWith('__Resultado.csv')) || null;
  const metrics   = files.find((f) => f.endsWith('__MetricsExport.csv')) || null;
  return {
    resultado: resultado ? path.join(outDir, resultado) : null,
    metrics: metrics ? path.join(outDir, metrics) : null,
  };
}

function resolvePython() {
  if (process.env.PYTHON_BIN) return process.env.PYTHON_BIN!;
  const cwd = process.cwd();
  return process.platform === 'win32'
    ? path.join(cwd, '.venv', 'Scripts', 'python.exe')
    : path.join(cwd, '.venv', 'bin', 'python');
}

/**
 * Executa o SIR v6.1 para um client/wave e retorna payloads prontos para o front.
 * - Lê a planilha em data/raw/<client>/<wave>/(.xlsx|.csv)
 * - Escreve saídas em data/processed/<client>/<wave>/pendulo/
 * - Consome __Resultado.csv (overview/radar) e __MetricsExport.csv (metrics)
 */
export async function runSirAndRead({
  client,
  wave,
  rawRoot = 'data/raw',
  outRoot = 'data/processed',
  excelFileName,
  sheet = 0,
  weights,
}: {
  client: string;
  wave: string;
  rawRoot?: string;
  outRoot?: string;
  excelFileName?: string;
  sheet?: number | string;
  weights?: Partial<{
    w_presenca: number; w_pop: number; w_ativ: number; w_eng: number; w_dif: number;
    w_facebook: number; w_twitter: number; w_instagram: number; w_tiktok: number;
    piso_positivo: number; cap_min: number; dominance_factor: number;
  }>;
}) {
  const dataRoot = process.env.DATA_ROOT ? path.resolve(process.cwd(), process.env.DATA_ROOT) : process.cwd() + '/data';
  const rawDir = path.resolve(dataRoot, rawRoot.replace(/^data\//, ''), client, wave);
  const outDir = path.resolve(dataRoot, outRoot.replace(/^data\//, ''), client, wave, 'pendulo');

  ensureDir(outDir);

  const inputPath = findExcelOrCsv(rawDir, excelFileName || undefined);
  if (!inputPath) {
    throw new Error(`Arquivo de métricas não encontrado em ${rawDir}`);
  }

  // roda o python se os CSVs não existirem ainda
  let { resultado, metrics } = findOutCsvs(outDir);
  if (!resultado || !metrics) {
    const python = resolvePython();
    const script = path.resolve(process.cwd(), 'etl', 'sir_excel_pipeline_v6.py');
    const args = [
      script,
      '--excel', inputPath,
      '--sheet', String(sheet),
      '--out-dir', outDir,
      '--out-xlsx', path.join(outDir, 'pendulo_v6.xlsx'),
    ];

    // pesos (opcionais)
    const w = weights || {};
    const pushNum = (flag: string, val?: number) => {
      if (typeof val === 'number' && Number.isFinite(val)) args.push(flag, String(val));
    };
    pushNum('--w-presenca', w.w_presenca);
    pushNum('--w-pop', w.w_pop);
    pushNum('--w-ativ', w.w_ativ);
    pushNum('--w-eng', w.w_eng);
    pushNum('--w-dif', w.w_dif);
    pushNum('--w-facebook', w.w_facebook);
    pushNum('--w-twitter', w.w_twitter);
    pushNum('--w-instagram', w.w_instagram);
    pushNum('--w-tiktok', w.w_tiktok);
    pushNum('--piso_positivo', w.piso_positivo);
    pushNum('--cap_min', w.cap_min);
    pushNum('--dominance_factor', w.dominance_factor);

    await new Promise<void>((resolve, reject) => {
      const p = spawn(python, args, { shell: false });
      let stderr = '';
      p.stderr?.on('data', (d) => { stderr += String(d); });
      p.on('error', (err) => reject(err));
      p.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`SIR falhou (code=${code}). ${stderr}`));
      });
    });

    ({ resultado, metrics } = findOutCsvs(outDir));
  }

  if (!resultado) throw new Error('Resultado CSV não encontrado após execução');
  // metrics pode faltar; tratamos depois

  const resultadoCsv = fs.readFileSync(resultado, 'utf-8');
  const rows = parseCsv(resultadoCsv, { columns: true, skip_empty_lines: true }) as SirRow[];

  // monta payloads a partir das linhas normalizadas
  const assembled = await assembleFromSir(rows, path.resolve(dataRoot, outRoot.replace(/^data\//, '')), client, wave);

  // Se existir MetricsExport, anexamos como "plataformas reais" no próximo passo do front
  if (metrics && fs.existsSync(metrics)) {
    // por enquanto, mantemos o assemble como está (usa "total") — opcional você pode expandir
  }

  return assembled;
}
