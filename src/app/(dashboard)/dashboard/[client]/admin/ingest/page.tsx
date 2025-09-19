'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useParams } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type WavesResp = { waves: string[] };

function todayYYYYMMDD() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}
function slugify(s: string) {
  return s
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9\-]+/g, '-')
    .replace(/-+/g, '-').replace(/^-|-$|_/g, '');
}

export default function IngestPage() {
  const { status } = useSession();
  const params = useParams();
  const client = (params?.client as string) ?? '';
  const clientSlug = slugify(client);

  const [waves, setWaves] = useState<string[]>([]);
  const [wave, setWave] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<string>('');
  const [sheetName, setSheetName] = useState<string | number>('0');

  const waveOk = /^P\d+$/i.test(wave);

  // auth guard
  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(undefined, { callbackUrl: `/dashboard/${client}/admin/ingest` });
    }
  }, [status, client]);

  // carrega ondas existentes
  useEffect(() => {
    if (status !== 'authenticated' || !client) return;
    fetch(`/api/v1/pendulo/${client}/waves`)
      .then((r) => (r.ok ? r.json() : ({ waves: [] } as WavesResp)))
      .then((d: WavesResp) => {
        setWaves(d.waves || []);
        setWave((prev) => prev || d.waves?.[0] || 'P1');
      })
      .catch(() => {});
  }, [status, client]);

  const labelByWave = useMemo(
    () => Object.fromEntries(waves.map((w) => [w, `Pêndulo ${w.slice(1)}`])),
    [waves]
  );

  // ===== Nome esperado e validação =====
  const [dateStr, setDateStr] = useState<string>(todayYYYYMMDD());

  const expectedBase = useMemo(() => {
    return `${dateStr}__${clientSlug}__metrics`;
  }, [dateStr, clientSlug]);

  const expectedName = useMemo(() => {
    const ext =
      file?.name?.toLowerCase().endsWith('.xlsx') ? '.xlsx' :
      file?.name?.toLowerCase().endsWith('.xls')  ? '.xls'  :
      '.csv';
    return `${expectedBase}${ext}`;
  }, [expectedBase, file?.name]);

  const fileMatchesPattern = useMemo(() => {
    if (!file) return false;
    // aceita qualquer data, mas exige client-slug e sufixo __metrics + extensão válida
    const re = new RegExp(`^\\d{8}__${clientSlug}__metrics(\\-\\d+)?\\.(xlsx|xls|csv)$`, 'i');
    return re.test(file.name);
  }, [file, clientSlug]);

  const supportedTypes = useMemo(
    () => [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    []
  );

  const isSupported = useCallback(
    (f: File) =>
      supportedTypes.includes(f.type) ||
      f.name.toLowerCase().endsWith('.csv') ||
      f.name.toLowerCase().endsWith('.xlsx') ||
      f.name.toLowerCase().endsWith('.xls'),
    [supportedTypes]
  );

  const onChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!isSupported(f)) {
      alert('Apenas .csv, .xlsx ou .xls são aceitos.');
      e.target.value = '';
      return;
    }
    setFile(f);
    e.target.value = ''; // permite selecionar o mesmo arquivo novamente
  };

  // drag & drop
  const [dragOver, setDragOver] = useState(false);
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer?.files?.[0];
    if (!f) return;
    if (!isSupported(f)) {
      alert('Apenas .csv, .xlsx ou .xls são aceitos.');
      return;
    }
    setFile(f);
  };

  const clearFile = () => setFile(null);

  const onRename = () => {
    if (!file) return;
    // cria um novo File com o nome correto (não altera o original no disco)
    const renamed = new File([file], expectedName, { type: file.type });
    setFile(renamed);
  };

  const onUpload = async () => {
    if (!waveOk || !client || !file) {
      alert('Informe client, um período válido (ex.: P6) e selecione o arquivo (.csv/.xlsx).');
      return;
    }
    if (!fileMatchesPattern) {
      alert(`O arquivo deve se chamar exatamente: ${expectedBase}.(xlsx|xls|csv)\nEx.: ${expectedName}`);
      return;
    }

    setBusy(true);
    setLog((l) => l + 'Fazendo upload…\n');

    const form = new FormData();
    form.append('client', clientSlug);
    form.append('wave', wave.toUpperCase());
    // envia também o basename esperado para dupla verificação no servidor
    form.append('expectedBase', expectedBase);
    form.append('file', file, file.name);

    const res = await fetch('/api/admin/pendulo/upload', { method: 'POST', body: form });
    const data = await res.json();
    setLog((l) => l + JSON.stringify(data, null, 2) + '\n');
    setBusy(false);
  };

  const onProcess = async () => {
    if (!waveOk || !client) {
      alert('Informe client e um período válido (ex.: P6).');
      return;
    }
    setBusy(true);
    setLog((l) => l + '\nProcessando com Python…\n');

    const res = await fetch('/api/admin/pendulo/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client: clientSlug,
        wave: wave.toUpperCase(),
        sheet: /^\d+$/.test(String(sheetName)) ? Number(sheetName) : sheetName,
      }),
    });
    const data = await res.json();
    setLog((l) => l + (data.out || JSON.stringify(data, null, 2)) + '\n');
    setBusy(false);
  };

  const fileLabel =
    file?.name ? `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)` : 'Nenhum arquivo selecionado';

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 text-white">
      <Card>
        <CardHeader>
          <CardTitle>Ingestão — {client}</CardTitle>
          <CardDescription>
            Padrão exigido: <code>{`YYYYMMDD__${clientSlug}__metrics.(xlsx|xls|csv)`}</code>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Seleção / criação de onda */}
          <div className="flex flex-wrap items-center gap-3">
            <Select value={wave} onValueChange={setWave} labelByValue={{ ...labelByWave, P1: 'Pêndulo 1' }}>
              <SelectTrigger className="w-48" aria-label="Selecionar período">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                {waves.map((w) => (
                  <SelectItem key={w} value={w}>{`Pêndulo ${w.slice(1)}`}</SelectItem>
                ))}
                <div className="px-3 py-2 text-xs text-white/60">Ou digite abaixo uma nova onda:</div>
              </SelectContent>
            </Select>

            <input
              type="text"
              value={wave}
              onChange={(e) => setWave(e.target.value)}
              placeholder="Ex.: P6"
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#38d4b0]/50"
              aria-label="Período manual"
            />

            {/* Data e nome esperado */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-white/70">Data (YYYYMMDD)</label>
              <input
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value.replace(/[^0-9]/g, '').slice(0, 8))}
                className="w-32 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#38d4b0]/50"
              />
            </div>
            <div className="text-xs opacity-70">
              Nome esperado: <code>{expectedName}</code>
            </div>
          </div>

          {/* Upload (um arquivo) */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`rounded-2xl border border-white/10 bg-white/5 p-4 transition ${
              dragOver ? 'ring-2 ring-[#38d4b0]/60' : ''
            }`}
          >
            <p className="mb-2 text-sm text-white/80">
              Selecione a planilha (<code>.csv</code>, <code>.xlsx</code>, <code>.xls</code>) com o nome exigido.
            </p>
            <input
              id="file-input"
              type="file"
              accept=".csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              onChange={onChooseFile}
              disabled={!client || !waveOk || busy}
            />

            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs">
              <div className={`mb-2 ${fileMatchesPattern ? 'text-emerald-400' : 'text-red-400'}`}>
                {fileMatchesPattern ? '✓ Nome válido' : '✗ Nome inválido'}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="truncate">{fileLabel}</span>
                <div className="flex gap-2">
                  <Button variant="outline" type="button" onClick={onRename} disabled={!file}>
                    Renomear automaticamente
                  </Button>
                  {file && (
                    <button
                      onClick={clearFile}
                      className="rounded bg-white/10 px-2 py-1 text-[11px] hover:bg-white/15"
                    >
                      remover
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={onUpload} disabled={busy || !file || !waveOk || !client || !fileMatchesPattern}>
                Enviar arquivo
              </Button>
            </div>
          </div>

          {/* Processar */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="mb-3 text-sm text-white/80">Pêndulo (processamento via Python)</p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="sheet-name" className="text-xs text-white/70">
                  Aba (sheet) — XLSX
                </label>
                <input
                  id="sheet-name"
                  type="text"
                  value={String(sheetName)}
                  onChange={(e) => setSheetName(e.target.value)}
                  placeholder="0 ou Planilha1"
                  className="w-48 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#38d4b0]/50"
                />
              </div>

              <Button variant="outline" onClick={onProcess} disabled={busy || !waveOk || !client}>
                Processar (__Resultado.csv / __MetricsExport.csv)
              </Button>
            </div>

            <p className="mt-2 text-xs text-white/60">
              Upload salva em <code>data/raw/{clientSlug}/{wave || 'P?'}/</code>. Saídas vão para{' '}
              <code className="mx-1">data/processed/{clientSlug}/{wave || 'P?'}/pendulo/</code>.
            </p>
          </div>

          {/* Log */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
            <p className="mb-2 text-sm text-white/80">Log</p>
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-xs text-white/80">
              {log || 'Aguardando ações…'}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
