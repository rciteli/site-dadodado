// src/app/api/v1/pendulo/[client]/waves/route.ts
import { okJSON, listWaves } from '@/libs/api/pendulo-server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ client: string }> }
) {
  const { client } = await params;
  const waves = listWaves(client);
  return okJSON({ waves });
}
