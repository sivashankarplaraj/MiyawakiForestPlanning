# Data collection guide

This guide helps contributors gather species data that fits the repository’s schema and validation rules.

## 1. Start with the right scope

Choose one region pack before collecting records.

- Seed packs live under data/seed/
- New regional packs should be added under data/regions/<region>/
- The current pilot region is IN-TN, so Tamil Nadu and nearby regional references are a good starting point

## 2. What to collect for each species

For every species entry, collect the following fields:

- id: stable lowercase identifier such as `ficus-religiosa`
- commonName: local or widely used common name
- scientificName: accepted scientific name
- nativeRegions: one or more region codes, such as `IN-TN`
- forestLayers: one or more of `canopy`, `subcanopy`, `shrub`, `ground`
- siteFit.sunlight: `full`, `partial`, or `shade`
- siteFit.water: `low`, `medium`, or `high`
- ecologicalRoles: roles such as `shade`, `pollinator-support`, `food`, `nitrogen-fixer`
- isInvasiveRisk: boolean
- evidence: at least taxonomy and nativity evidence for curated regional packs
- confidence: `low`, `medium`, or `high`
- reviewStatus: `draft`, `reviewed`, `approved`, or `rejected`

## 3. Evidence requirements

For curated regional packs, each species should include structured evidence.

Required evidence claims:

- taxonomy
- nativity
- site-fit
- ecological-role
- invasive-risk

Each evidence item should contain:

- claim
- sourceUrl
- accessedOn
- citation

Prefer sources such as:

- regional floras
- herbarium records
- forest department or biodiversity board references
- academic publications
- reputable botanical databases

## 4. Recommended collection workflow

1. Select a target region and define the species list.
2. Gather one primary source and one supporting source for each species.
3. Record the species fields in a spreadsheet or JSON draft.
4. Check whether the species is native to the target region and whether it is invasive or high-risk.
5. Map the species into canopy layers and ecological roles.
6. Add evidence links and review status.
7. Validate the dataset before submitting it.

## 5. Suggested field checklist

Use this checklist while collecting data:

- [ ] Scientific name is correct and accepted
- [ ] Common name is clear and not ambiguous
- [ ] Native region is explicitly supported by a source
- [ ] Light and water fit are reasonably assigned
- [ ] At least one ecological role is recorded
- [ ] Invasive risk is marked where known
- [ ] Evidence URL and access date are present
- [ ] Confidence and review status are assigned

## 6. Dataset structure

Each data pack should contain:

- metadata.json
- species.json

A regional pack should also include:

- sourceUrls
- reviewStatus
- region metadata

## 7. Validation

After preparing the data, run:

```bash
npm run validate:data
```

This validates the species records against the repository schema and checks the dataset structure.

## 8. Good practices

- Keep records concise and factual.
- Do not infer nativity without a citation.
- Prefer transparent evidence over assumptions.
- Flag uncertain species as `low` confidence.
- Keep the dataset versioned and reviewable.

## 9. Starter template

A starter CSV template is available at data/templates/species-contribution.csv.

For more structured contributions, use the schema in schemas/species.schema.json as the source of truth.
