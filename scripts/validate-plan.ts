import fs from 'node:fs';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';

const root = process.cwd();
const schemaPath = path.join(root, 'schemas', 'plan.schema.json');
const validPath = path.join(root, 'tests', 'fixtures', 'valid-plan-v1.json');
const invalidPath = path.join(root, 'tests', 'fixtures', 'invalid-plan-missing-site.json');

const ajv = new Ajv2020({ allErrors: true });
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const validate = ajv.compile(schema);

const cases = [
  { file: validPath, shouldPass: true },
  { file: invalidPath, shouldPass: false },
];

let failed = false;
for (const testCase of cases) {
  const data = JSON.parse(fs.readFileSync(testCase.file, 'utf8'));
  const ok = validate(data);
  if (ok !== testCase.shouldPass) {
    failed = true;
    console.error(`Unexpected validation result for ${path.basename(testCase.file)}.`);
    if (validate.errors) {
      console.error(validate.errors);
    }
  } else {
    console.log(`${path.basename(testCase.file)}: ${ok ? 'valid' : 'invalid as expected'}`);
  }
}

if (failed) {
  process.exit(1);
}
