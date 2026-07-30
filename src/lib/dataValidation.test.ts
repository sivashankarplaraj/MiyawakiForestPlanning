import { describe, expect, it } from 'vitest';
import { validateProvenanceMetadata } from './dataValidation';

describe('validateProvenanceMetadata', () => {
  it('accepts well-documented regional metadata with a supported license', () => {
    const result = validateProvenanceMetadata({
      region: 'UK',
      source: 'UK Woodland Society',
      license: 'CC-BY-4.0',
      lastUpdated: '2026-07-30',
      sourceUrls: ['https://example.org/species/uk']
    });

    expect(result.ok).toBe(true);
    expect(result.issues).toEqual([]);
  });

  it('flags unsupported licenses and missing provenance links', () => {
    const result = validateProvenanceMetadata({
      region: 'UK',
      source: 'UK Woodland Society',
      license: 'Unknown License',
      lastUpdated: '2026-07-30'
    });

    expect(result.ok).toBe(false);
    expect(result.issues).toContain('license must be one of: CC-BY-4.0, CC-BY-SA-4.0, CC0-1.0, ODbL-1.0, CC-BY-NC-4.0');
    expect(result.issues).toContain('sourceUrls must contain at least one valid URL');
  });
});
