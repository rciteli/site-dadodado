import { NextResponse } from "next/server";
import path from "node:path";
import { promises as fs } from "node:fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(s: string) {
  return s
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9\-]+/g, "-")
    .replace(/-+/g, "-").replace(/^-|-$|_/g, "");
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const client = slugify(String(fd.get("client") || "").trim());
    const wave = String(fd.get("wave") || "").trim();
    const expectedBase = String(fd.get("expectedBase") || "").trim(); // YYYYMMDD__client__metrics
    const file = fd.get("file") as File | null;

    if (!client || !wave || !file) {
      return NextResponse.json(
        { ok: false, error: "Campos obrigatórios: client, wave, file" },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name).toLowerCase();
    if (![".xlsx", ".xls", ".csv"].includes(ext)) {
      return NextResponse.json(
        { ok: false, error: "Formato inválido (use .xlsx, .xls ou .csv)" },
        { status: 400 }
      );
    }

    // Valida nome: 8 dígitos + __client__metrics (+ sufixo -N opcional)
    const basename = path.basename(file.name, ext);
    const re = new RegExp(`^\\d{8}__${client}__metrics(\\-\\d+)?$`, "i");
    if (!re.test(basename)) {
      const hint = expectedBase || `YYYYMMDD__${client}__metrics`;
      return NextResponse.json(
        { ok: false, error: `Nome inválido. Use ${hint}${ext}` },
        { status: 400 }
      );
    }

    // Grava em data/raw/<client>/<wave>/<basename>.<ext>
    const rawDir = path.resolve(process.cwd(), "data", "raw", client, wave);
    await fs.mkdir(rawDir, { recursive: true });

    // Evita overwrite: se existir, cria -2, -3...
    let dest = path.join(rawDir, `${basename}${ext}`);
    let i = 2;
    while (true) {
      try {
        await fs.access(dest);
        dest = path.join(rawDir, `${basename}-${i}${ext}`);
        i++;
      } catch {
        break;
      }
    }

    const buf = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(dest, buf);

    return NextResponse.json({
      ok: true,
      rawDir,
      basename: path.basename(dest, ext),
      ext,
      saved: dest,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
