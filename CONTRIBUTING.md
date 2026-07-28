# Contributing Guide

Thank you for contributing to Miyawaki Forest Planner.

## Ways to contribute

- Improve application code and tests
- Add or validate native species data for a region
- Improve ecological guidance and checklists
- Improve export compatibility and documentation
- Report bugs and usability issues

## Development workflow

1. Create an issue or pick an existing issue
2. Fork the repository and create a feature branch
3. Make small, focused changes
4. Add or update tests for logic changes
5. Open a pull request with clear summary and rationale

## Pull request expectations

- Link to issue
- Explain what changed and why
- Include screenshots for UI changes
- Include sample inputs/outputs for planning logic changes
- Ensure checks pass

## Coding standards

- TypeScript with strict typing
- Keep domain logic deterministic and testable
- Prefer pure functions in the planning engine
- Keep user-facing text clear and actionable

## Data contribution standards

Every species data contribution should include:

- Scientific name and source references
- Nativity evidence for target region
- Site fit fields (soil, water, sunlight, climate)
- Ecological role and canopy layer rationale
- Confidence rating and reviewer notes
- License compatibility confirmation

### Regional data pack workflow

1. Copy `data/templates/species-contribution.csv` and collect candidate records with source URLs before editing JSON.
2. Create `data/regions/<ISO-region-code>/metadata.json` and `species.json` using the schemas in `schemas/`.
3. Include taxonomy and nativity evidence for every species. Site-fit and ecological-role evidence should be included when available.
4. Start new records with `reviewStatus: "draft"`; only an ecology reviewer should promote them to `reviewed` or `approved`.
5. Run `npm run validate:data` before opening a pull request. The validator rejects malformed records, duplicate IDs or scientific names, region mismatches, and missing curation fields.

Do not place collection spreadsheets or unverified records in `data/seed`. Seed data is application-facing; `data/regions` is the reviewed expansion path.

## Ecological quality checks

- Do not include known invasive species in recommendation pools
- Flag sensitive or protected species where legal handling is required
- Record uncertainty explicitly rather than guessing

## Commit style (recommended)

- feat: add objective weighting controls
- fix: handle invalid polygon edge case
- docs: update data provenance policy
- chore: add schema migration test fixture

## Community conduct

By participating, you agree to follow the project Code of Conduct.

## Questions

If you are unsure where to start, open an issue with context and proposed approach.
