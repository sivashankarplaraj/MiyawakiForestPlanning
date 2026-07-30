import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

function readJson(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

describe('regional pack summary fixture', () => {
  it('loads the UK starter regional pack metadata and species entries', () => {
    const root = process.cwd();
    const metadata = readJson(path.join(root, 'data', 'regions', 'uk', 'metadata.json'));
    const species = readJson(path.join(root, 'data', 'regions', 'uk', 'species.json'));

    expect(metadata.region).toBe('UK');
    expect(Array.isArray(species)).toBe(true);
    expect(species.length).toBeGreaterThan(0);
    expect(species[0].evidence?.length).toBeGreaterThan(0);
  });
});
