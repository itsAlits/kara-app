import 'server-only';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { cache } from 'react';

const DATA_PATH = path.join(process.cwd(), 'data', 'content.json');

// Cache per-request so we don't read the file multiple times per render
export const getContent = cache(async () => {
  try {
    const raw = await readFile(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
});

// Write updated section back to file
export async function updateContent(section, data) {
  const current = await readFile(DATA_PATH, 'utf-8').then(JSON.parse);
  const updated = {
    ...current,
    [section]: data,
    _meta: {
      lastModified: new Date().toISOString(),
      lastModifiedBy: 'admin',
    },
  };
  await writeFile(DATA_PATH, JSON.stringify(updated, null, 2), 'utf-8');
  return updated;
}
