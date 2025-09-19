import { NextResponse } from "next/server";
import path from "node:path";
import { promises as fs } from "node:fs";
import { spawn } from "node:child_process";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(s: string) {
  return s
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9\-]+/g, "-")
    .replace(/-+/g, "-").replace(/^-|-$|_/g, "");
}

async function findLatestMetricsFile(dir: string): Promise<string | null> {
  try {
    const items = await fs.readdir(dir);
    const candidates = items
      .filter((f) => /__metrics(\-\d+)?\.(xlsx|xls|csv)$/i.test(f))
      .map((f) => path.join(dir, f));
    if (!candidates.length) return null;

    const stats = await Promise.all(
      candidates.map(async (p) => ({ p, s: await fs.stat(p) }))
    );
    stats.sort((a, b) => b.s.mtimeMs - a.s.mtimeMs);
    return stats[0].p;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { client, wave, sheet = 0, pythonBin } = await req.json();
    const clientSlug = slugify(String(client || "").trim());
    const waveStr = String(wave || "").trim();

    if (!clientSlug || !waveStr) {
      return NextResponse.json(
        { ok: false, error: "Campos obrigatórios: client, wave" },
        { status: 400 }
      );
    }

    const repoRoot = process.cwd();
    const rawDir = path.resolve(repoRoot, "data", "raw", clientSlug, waveStr);
    const outDir = path.resolve(
      repoRoot,
      "data",
      "processed",
      clientSlug,
      waveStr,
      "pendulo"
    );
    await fs.mkdir(outDir, { recursive: true });

    const metricsPath = await findLatestMetricsFile(rawDir);
    if (!metricsPath) {
      return NextResponse.json(
        {
          ok: false,
          error: `Nenhum arquivo *__metrics.(csv|xlsx) encontrado em ${rawDir}`,
        },
        { status: 404 }
      );
    }

    const script = path.resolve(repoRoot, "etl", "sir_excel_pipeline_v6.py");
    const py =
      pythonBin ||
      (process.platform === "win32"
        ? path.resolve(repoRoot, ".venv", "Scripts", "python.exe")
        : "python");

    const args = [script, "--excel", metricsPath];

    // Só envia --sheet se NÃO for CSV e se veio algo do cliente
    const isCsv = /\.csv$/i.test(metricsPath);
    if (!isCsv && sheet !== undefined && sheet !== null && String(sheet).trim() !== "") {
      args.push("--sheet", String(sheet)); // Python coage "0" -> 0
    }

    // Diretório de saída para __Resultado.csv e __MetricsExport.csv
    args.push("--out-dir", outDir);

    const child = spawn(py, args, { cwd: repoRoot });
    let out = "",
      err = "";
    child.stdout.on("data", (d) => (out += d.toString()));
    child.stderr.on("data", (d) => (err += d.toString()));
    const code: number = await new Promise((resolve) =>
      child.on("close", resolve)
    );

    if (code !== 0) {
      return NextResponse.json(
        { ok: false, code, out, err },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      code,
      out,
      resultDir: outDir,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
