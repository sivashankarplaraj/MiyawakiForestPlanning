# Data License and Provenance Policy

This project separates code licensing and data licensing.

## Policy summary

- Code is licensed under MIT in `LICENSE`.
- Project-native data contributions are licensed under CC BY 4.0 by default.
- ODbL is maintained as a future option for curated database share-alike strategy.

## Current default for data

- Active data contribution license: CC BY 4.0
- Data license file: `LICENSE-data-CC-BY-4.0`

## When to consider switching to ODbL

- Significant community-curated database growth
- Requirement to enforce share-back on adapted databases
- Maintainer decision recorded in ADR and changelog

## Third-party data intake rules

Before importing any external dataset:

1. Record source name and URL.
2. Record upstream license.
3. Confirm compatibility with repository policy.
4. Store attribution text in dataset metadata.
5. Keep raw source and transformed outputs traceable.

## Required metadata per dataset

- `region`
- `source`
- `sourceUrls`
- `license`
- `lastUpdated`
- `datasetVersion`
- `maintainers`
- `reviewStatus`
- transformation details in `notes` when source records were changed

## Attribution requirements

All exported plans and docs that include third-party-derived data should include:

- Dataset source attribution
- License reference
- Date of access/import

## Compliance warning

Do not merge external data files into main branches without license compatibility review.

## Pilot region metadata contract

For seed and regional pack `metadata.json` files, include:

- `region`
- `source`
- `license`
- `lastUpdated`
- optional `datasetVersion`, `maintainers`, `reviewStatus`, `sourceUrls`, and `notes` for legacy seed packs

All new packs under `data/regions` must include `sourceUrls` and `reviewStatus`. Every species record in a regional pack must include structured taxonomy and nativity evidence, a confidence rating, and review status.
