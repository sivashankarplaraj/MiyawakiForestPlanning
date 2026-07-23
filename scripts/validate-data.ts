import fs from 'node:fs';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const root = process.cwd();
const speciesSchemaPath = path.join(root, 'schemas', 'species.schema.json');
const metadataSchemaPath = path.join(root, 'schemas', 'dataset-metadata.schema.json');

const speciesFixturePath = path.join(root, 'tests', 'fixtures', 'species-minimal-valid.json');
const speciesSeedPath = path.join(root, 'data', 'seed', 'pilot-region', 'species.json');
const metadataPath = path.join(root, 'data', 'seed', 'pilot-region', 'metadata.json');

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

const speciesSchema = JSON.parse(fs.readFileSync(speciesSchemaPath, 'utf8'));
const metadataSchema = JSON.parse(fs.readFileSync(metadataSchemaPath, 'utf8'));

const validateSpecies = ajv.compile(speciesSchema);
const validateMetadata = ajv.compile(metadataSchema);

const speciesFixture = JSON.parse(fs.readFileSync(speciesFixturePath, 'utf8'));
const speciesSeed = JSON.parse(fs.readFileSync(speciesSeedPath, 'utf8'));
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

let failed = false;

for (const [name, item] of [
  ['species fixture', speciesFixture],
  ['species seed', speciesSeed],
] as const) {
  const arr = Array.isArray(item) ? item : [item];
  for (const entry of arr) {
    const ok = validateSpecies(entry);
    if (!ok) {
      failed = true;
      console.error(`${name} invalid:`);
      console.error(validateSpecies.errors);
    }
  }
}

const metadataOk = validateMetadata(metadata);
if (!metadataOk) {
  failed = true;
  console.error('dataset metadata invalid:');
  console.error(validateMetadata.errors);
}

if (failed) {
  process.exit(1);
}

console.log('All dataset checks passed.');
