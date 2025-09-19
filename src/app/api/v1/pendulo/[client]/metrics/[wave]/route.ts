// src/app/api/v1/pendulo/[client]/metrics/[wave]/route.ts
import { getOrBuildWave, okJSON } from '@/libs/api/pendulo-server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ client: string; wave: string }> }
) {
  const { client, wave } = await params;
  const { metrics } = await getOrBuildWave(client, wave);
  return okJSON(metrics);
}
