import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { assertUserAdminInClient } from '@/libs/authz';
import { rawDir } from '@/libs/paths';
import fs from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs'; // garante acesso ao fs

const WAVE_RE = /^P\d+$/i;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const uid = (session as any)?.uid as string | undefined;
  if (!uid) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const form = await req.formData();
  const client = String(form.get('client') || '').trim();
  const rawWave = String(form.get('wave') || '').trim();
  const wave = rawWave.toUpperCase();

  if (!client || !wave) {
    return NextResponse.json({ error: 'missing_params' }, { status: 400 });
  }
  if (!WAVE_RE.test(wave)) {
    return NextResponse.json({ error: 'invalid_wave', hint: 'Use formato P{n}, ex.: P4, P12' }, { status: 400 });
  }

  try {
    await assertUserAdminInClient(uid, client);
  } catch (e: any) {
    const code = e?.message === 'forbidden' ? 403 : 404;
    return NextResponse.json({ error: e?.message || 'forbidden' }, { status: code });
  }

  const files = form.getAll('files') as File[];
  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'no_files' }, { status: 400 });
  }

  const dest = rawDir(client, wave);
  await fs.mkdir(dest, { recursive: true });

  const saved: string[] = [];
  for (const f of files) {
    const arrayBuffer = await f.arrayBuffer();
    const buf = Buffer.from(arrayBuffer);
    const safeName = f.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const full = path.join(dest, safeName);
    await fs.writeFile(full, buf);
    saved.push(path.basename(full));
  }

  return NextResponse.json({ ok: true, client, wave, saved });
}
