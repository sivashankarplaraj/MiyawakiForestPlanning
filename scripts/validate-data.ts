import fs from 'node:fs';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { validateProvenanceMetadata } from '../src/lib/dataValidation';

const root = process.cwd();
const speciesSchemaPath = path.join(root, 'schemas', 'species.schema.json');
const metadataSchemaPath = path.join(root, 'schemas', 'dataset-metadata.schema.json');

const speciesFixturePath = path.join(root, 'tests', 'fixtures', 'species-minimal-valid.json');
const seedRoot = path.join(root, 'data', 'seed');
const regionsRoot = path.join(root, 'data', 'regions');

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

const speciesSchema = JSON.parse(fs.readFileSync(speciesSchemaPath, 'utf8'));
const metadataSchema = JSON.parse(fs.readFileSync(metadataSchemaPath, 'utf8'));

interface ValidationSummary {
  packName: string;
  speciesCount: number;
  reviewedCount: number;
  draftCount: number;
  evidenceCoverage: number;
  missingEvidence: string[];
}

const validateSpecies = ajv.compile(speciesSchema);
const validateMetadata = ajv.compile(metadataSchema);

let failed = false;

function readJson(filePath: string): unknown {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function report(message: string, details?: unknown): void {
  failed = true;
  console.error(message);
  if (details) {
    console.error(details);
  }
}

function validateSpeciesEntries(name: string, value: unknown, requireCuration: boolean, region?: string): ValidationSummary {
  const summary: ValidationSummary = {
    packName: name,
    speciesCount: 0,
    reviewedCount: 0,
    draftCount: 0,
    evidenceCoverage: 0,
    missingEvidence: []
  };
  if (!Array.isArray(value)) {
    report(`${name}: species.json must contain an array.`);
    return;
  }

  const ids = new Set<string>();
  const scientificNames = new Set<string>();

  for (const entry of value) {
    summary.speciesCount += 1;
    if (!validateSpecies(entry)) {
      report(`${name}: species record is invalid.`, validateSpecies.errors);
      continue;
    }

    const record = entry as {
      id: string;
      scientificName: string;
      nativeRegions: string[];
      evidence?: Array<{ claim: string }>;
      confidence?: string;
      reviewStatus?: string;
    };
    const normalizedScientificName = record.scientificName.toLocaleLowerCase();

    if (ids.has(record.id)) {
      report(`${name}: duplicate species id "${record.id}".`);
    }
    if (scientificNames.has(normalizedScientificName)) {
      report(`${name}: duplicate scientific name "${record.scientificName}".`);
    }
    if (region && !record.nativeRegions.includes(region)) {
      report(`${name}: ${record.id} does not include pack region "${region}" in nativeRegions.`);
    }

    if (record.reviewStatus === 'reviewed' || record.reviewStatus === 'approved') {
      summary.reviewedCount += 1;
    } else {
      summary.draftCount += 1;
    }

    if (requireCuration) {
      const claims = new Set(record.evidence?.map((item) => item.claim));
      if (!claims.has('taxonomy') || !claims.has('nativity')) {
        report(`${name}: ${record.id} requires taxonomy and nativity evidence.`);
      }
      if (!record.confidence || !record.reviewStatus) {
        report(`${name}: ${record.id} requires confidence and reviewStatus.`);
      }

      const requiredClaims = ['taxonomy', 'nativity', 'site-fit', 'ecological-role', 'invasive-risk'];
      const missing = requiredClaims.filter((claim) => !claims.has(claim));
      if (missing.length > 0) {
        summary.missingEvidence.push(`${record.id}:${missing.join(',')}`);
      }
    }

    ids.add(record.id);
    scientificNames.add(normalizedScientificName);
  }

  if (summary.speciesCount > 0) {
    summary.evidenceCoverage = Math.round(
      ((summary.speciesCount - summary.missingEvidence.length) / summary.speciesCount) * 100
    );
  }

  return summary;
}

function validatePack(directory: string, requireCuration: boolean): void {
  const name = path.relative(root, directory);
  const metadataPath = path.join(directory, 'metadata.json');
  const speciesPath = path.join(directory, 'species.json');

  if (!fs.existsSync(metadataPath) || !fs.existsSync(speciesPath)) {
    report(`${name}: each data pack requires metadata.json and species.json.`);
    return;
  }

  const metadata = readJson(metadataPath);
  if (!validateMetadata(metadata)) {
    report(`${name}: dataset metadata is invalid.`, validateMetadata.errors);
    return;
  }

  const typedMetadata = metadata as { region: string; source: string; license: string; lastUpdated: string; sourceUrls?: string[]; reviewStatus?: string };
  const provenanceResult = validateProvenanceMetadata(typedMetadata);
  if (requireCuration && !provenanceResult.ok) {
    report(`${name}: provenance metadata is invalid.`, provenanceResult.issues);
  }
  if (requireCuration && (!typedMetadata.sourceUrls?.length || !typedMetadata.reviewStatus)) {
    report(`${name}: regional packs require sourceUrls and reviewStatus metadata.`);
  }

  const summary = validateSpeciesEntries(name, readJson(speciesPath), requireCuration, typedMetadata.region);
  if (requireCuration) {
    console.log(
      `${name}: checked (${summary.speciesCount} species, ${summary.reviewedCount} reviewed, ${summary.draftCount} draft, ${summary.evidenceCoverage}% evidence coverage)`
    );
  } else {
    console.log(`${name}: checked`);
  }
}

function packDirectories(parent: string): string[] {
  if (!fs.existsSync(parent)) {
    return [];
  }

  return fs
    .readdirSync(parent, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
    .map((entry) => path.join(parent, entry.name));
}

validateSpeciesEntries('species fixture', [readJson(speciesFixturePath)], false);

for (const directory of packDirectories(seedRoot)) {
  validatePack(directory, false);
}

for (const directory of packDirectories(regionsRoot)) {
  validatePack(directory, true);
}

if (failed) {
  process.exit(1);
}

console.log('All dataset checks passed.');
