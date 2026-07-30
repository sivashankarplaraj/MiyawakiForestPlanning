export interface ProvenanceMetadata {
  region: string;
  source: string;
  license: string;
  lastUpdated: string;
  sourceUrls?: string[];
  reviewStatus?: string;
}

export interface ProvenanceValidationResult {
  ok: boolean;
  issues: string[];
}

const supportedLicenses = ['CC-BY-4.0', 'CC-BY-SA-4.0', 'CC0-1.0', 'ODbL-1.0', 'CC-BY-NC-4.0'] as const;

export function validateProvenanceMetadata(metadata: ProvenanceMetadata): ProvenanceValidationResult {
  const issues: string[] = [];

  if (!metadata.region?.trim()) {
    issues.push('region is required');
  }

  if (!metadata.source?.trim()) {
    issues.push('source is required');
  }

  if (!metadata.lastUpdated) {
    issues.push('lastUpdated is required');
  }

  if (!supportedLicenses.includes(metadata.license as (typeof supportedLicenses)[number])) {
    issues.push(`license must be one of: ${supportedLicenses.join(', ')}`);
  }

  const hasValidSourceUrls = Array.isArray(metadata.sourceUrls) && metadata.sourceUrls.some((url) => /^https?:\/\//i.test(url));
  if (!hasValidSourceUrls) {
    issues.push('sourceUrls must contain at least one valid URL');
  }

  if (metadata.reviewStatus && !['draft', 'reviewed', 'approved'].includes(metadata.reviewStatus)) {
    issues.push('reviewStatus must be one of: draft, reviewed, approved');
  }

  return { ok: issues.length === 0, issues };
}
