import path from 'path';

export function getDataRoot() {
  const root = process.env.DATA_ROOT || './data';
  return path.resolve(process.cwd(), root);
}

export function rawDir(client: string, wave: string) {
  return path.join(getDataRoot(), 'raw', client, wave);
}

export function processedDir(client: string, wave?: string) {
  return wave
    ? path.join(getDataRoot(), 'processed', client, wave)
    : path.join(getDataRoot(), 'processed', client);
}
