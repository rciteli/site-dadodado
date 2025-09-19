import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";

function findLatestFiles(client: string) {
  const dir = path.resolve(process.cwd(), "data", "processed");
  const reBase = new RegExp(`^(\\d{8})__${client}__metrics__`);
  const files = fs.readdirSync(dir).filter(f => reBase.test(f));
  if (!files.length) return null;

  // Agrupa por data e pega a mais recente
  const byDate = files.reduce<Record<string,string[]>>((acc, f) => {
    const m = f.match(/^(\d{8})__/);
    if (m) (acc[m[1]] ||= []).push(f);
    return acc;
  }, {});
  const latestDate = Object.keys(byDate).sort().pop()!;
  const wanted = byDate[latestDate];

  const resultado = wanted.find(f => f.endsWith("__Resultado.csv"));
  const metrics   = wanted.find(f => f.endsWith("__MetricsExport.csv"));
  if (!resultado || !metrics) return null;

  return {
    date: latestDate,
    resultadoPath: path.join(dir, resultado),
    metricsPath: path.join(dir, metrics),
  };
}

export async function GET(
  _req: Request,
  { params }: { params: { client: string } }
) {
  try {
    const clientSlug = params.client; // use slug (ex: "presidentes", "avila-cred")
    const found = findLatestFiles(clientSlug);
    if (!found) {
      return NextResponse.json({ ok: false, error: "Arquivos não encontrados" }, { status: 404 });
    }

    const resultadoCsv = fs.readFileSync(found.resultadoPath, "utf-8");
    const metricsCsv   = fs.readFileSync(found.metricsPath, "utf-8");

    const resultado = parse(resultadoCsv, { columns: true, skip_empty_lines: true });
    const metrics   = parse(metricsCsv,   { columns: true, skip_empty_lines: true });

    return NextResponse.json({
      ok: true,
      date: found.date,
      resultado, // para overview/radar
      metrics,   // para aba metrics
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
