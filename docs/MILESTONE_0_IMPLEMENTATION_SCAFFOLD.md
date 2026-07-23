# Milestone 0 Implementation Scaffold

This document turns Milestone 0 into actionable GitHub issues and an execution sequence.

## Objective

Set up a production-quality foundation for the static web app so feature work can start with low friction.

Definition of done:

- App boots locally
- CI runs lint, test, and build on pull requests
- JSON schemas validate example plan files
- Baseline data folder and contributor workflow are in place

## Proposed initial technical shape

Target stack for M0 setup:

- React + TypeScript + Vite
- Vitest for unit tests
- ESLint + Prettier
- Zod for runtime schema validation
- GitHub Actions for CI

## Planned repository structure after M0

```text
.github/
  workflows/
    ci.yml
  ISSUE_TEMPLATE/
  PULL_REQUEST_TEMPLATE.md
src/
  app/
  features/
  components/
  styles/
  main.tsx
  App.tsx
packages/
  core-engine/
    src/
    tests/
  data-model/
    src/
    tests/
data/
  seed/
    pilot-region/
      species.json
      metadata.json
schemas/
  plan.schema.json
  species.schema.json
  dataset-metadata.schema.json
docs/
  adr/
    0001-architecture-baseline.md
scripts/
  validate-data.ts
  validate-plan.ts
tests/
  fixtures/
    valid-plan-v1.json
    invalid-plan-missing-site.json
```

## Exact issue-to-file mapping

Use these issue IDs directly in GitHub.

### M0-01 Initialize frontend scaffold and package baseline

Files to create/update:

- package.json
- tsconfig.json
- vite.config.ts
- src/main.tsx
- src/App.tsx
- src/styles/index.css

Acceptance criteria:

- `npm run dev` starts app
- `npm run build` succeeds

### M0-02 Add linting, formatting, and test harness

Files to create/update:

- .eslintrc.cjs (or eslint.config.js)
- .prettierrc
- vitest.config.ts
- src/App.test.tsx
- package.json scripts

Acceptance criteria:

- `npm run lint` passes
- `npm run test` passes

### M0-03 Set up CI for pull requests

Files to create/update:

- .github/workflows/ci.yml

Acceptance criteria:

- CI runs install, lint, test, build on PR
- Fails correctly on lint/test/build errors

### M0-04 Add ADR framework and first architectural decision

Files to create/update:

- docs/adr/README.md
- docs/adr/0001-architecture-baseline.md

Acceptance criteria:

- ADR format documented
- Initial stack and rationale captured

### M0-05 Define plan and species schemas

Files to create/update:

- schemas/plan.schema.json
- schemas/species.schema.json
- schemas/dataset-metadata.schema.json
- packages/data-model/src/types.ts

Acceptance criteria:

- Schemas include required fields from PRD
- Types align with schema core fields

### M0-06 Add schema validators and fixtures

Files to create/update:

- scripts/validate-plan.ts
- scripts/validate-data.ts
- tests/fixtures/valid-plan-v1.json
- tests/fixtures/invalid-plan-missing-site.json
- tests/fixtures/species-minimal-valid.json

Acceptance criteria:

- Validation scripts pass valid fixtures
- Validation scripts fail invalid fixtures with clear output

### M0-07 Add pilot seed dataset folder and metadata contract

Files to create/update:

- data/seed/pilot-region/species.json
- data/seed/pilot-region/metadata.json
- docs/DATA_LICENSE_POLICY.md (reference section update)

Acceptance criteria:

- Seed dataset validates against schema
- Metadata includes source, license, and import notes

### M0-08 Add PR template and branch/commit workflow docs

Files to create/update:

- .github/PULL_REQUEST_TEMPLATE.md
- CONTRIBUTING.md (workflow detail section)

Acceptance criteria:

- PR template requests issue link, test evidence, and screenshots for UI changes

### M0-09 Add task runner scripts for common dev tasks

Files to create/update:

- package.json scripts:
  - `dev`
  - `build`
  - `test`
  - `lint`
  - `check` (lint + test + build)
  - `validate:data`
  - `validate:plan`

Acceptance criteria:

- `npm run check` and validation scripts run locally

### M0-10 M0 release checklist and sign-off

Files to create/update:

- docs/M0_RELEASE_CHECKLIST.md

Acceptance criteria:

- Checklist includes CI, schema validation, data metadata, and docs readiness

## First PR breakdown (recommended sequence)

### PR-001 Repository bootstrap

Includes:

- M0-01
- M0-02

Review focus:

- Build and test reproducibility

### PR-002 CI and governance plumbing

Includes:

- M0-03
- M0-08

Review focus:

- CI reliability and contributor workflow

### PR-003 Schema and type baseline

Includes:

- M0-04
- M0-05

Review focus:

- Data model correctness and clarity

### PR-004 Validation pipeline and fixtures

Includes:

- M0-06
- M0-09

Review focus:

- Validation quality and developer experience

### PR-005 Seed data and milestone closure

Includes:

- M0-07
- M0-10

Review focus:

- Data provenance and release readiness

## Suggested labels for M0 issues

- milestone:M0
- area:foundation
- area:data
- area:dx
- type:feature
- priority:P0

## Suggested estimates (story points)

- M0-01: 3
- M0-02: 2
- M0-03: 2
- M0-04: 1
- M0-05: 3
- M0-06: 3
- M0-07: 2
- M0-08: 1
- M0-09: 1
- M0-10: 1

Total: 19 points

## Ready-to-create issue titles

1. [M0-01] Initialize frontend scaffold and baseline scripts
2. [M0-02] Add linting, formatting, and unit-test harness
3. [M0-03] Configure CI workflow for PR checks
4. [M0-04] Add ADR template and architecture baseline ADR
5. [M0-05] Define v1 schemas for plan and species models
6. [M0-06] Implement validation scripts and schema fixtures
7. [M0-07] Add pilot seed dataset and metadata contract
8. [M0-08] Add pull request template and contribution workflow details
9. [M0-09] Add unified task runner scripts for local checks
10. [M0-10] Add M0 release checklist and sign-off criteria
