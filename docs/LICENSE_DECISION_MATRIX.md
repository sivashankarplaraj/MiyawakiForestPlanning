# License Decision Matrix

This document helps select licensing for code, data, and documentation.

## Goals for this project

- Maximize open collaboration
- Keep compliance simple for contributors
- Preserve attribution and provenance for ecological data
- Avoid legal ambiguity when mixing external datasets

## Recommended split license model

- Code: MIT (default recommendation)
- Data: ODbL-1.0 for community-curated database OR CC BY 4.0 for simpler attribution workflows
- Documentation: CC BY-SA 4.0

## Comparison: code licenses

| Option | Best for | Pros | Trade-offs | Recommendation |
|---|---|---|---|---|
| MIT | Fast adoption, broad reuse | Very permissive, short text, easy compliance | No explicit patent grant | **Default** |
| Apache-2.0 | Corporate/legal comfort | Explicit patent grant, strong clarity | Longer text, slightly more overhead | Use if patent clause is important |
| GPL-3.0 | Copyleft enforcement | Ensures derivatives stay open | Limits integration for some users/orgs | Not recommended for this project phase |

## Comparison: data licenses

| Option | Best for | Pros | Trade-offs | Recommendation |
|---|---|---|---|---|
| ODbL-1.0 | Open database with share-alike | Protects openness of derived databases | More complex obligations | Good for curated species database |
| CC BY 4.0 | Broad reuse and easy attribution | Simple, familiar, flexible | No share-alike for datasets | Good for adoption-first strategy |
| CC0 1.0 | Maximum frictionless reuse | No attribution burden | Loses attribution expectation | Not recommended for this dataset |

## Decision guidance

Choose MIT + CC BY 4.0 if:

- You want fastest onboarding for contributors and downstream users
- You prefer low legal friction for NGOs, schools, and local councils

Choose MIT + ODbL if:

- You want to preserve openness of derivative plant databases
- You accept more legal complexity for data reusers

Choose Apache-2.0 + ODbL if:

- You expect institutional or enterprise participation with patent concerns
- You still want strong data share-back behavior

## Practical recommendation for this repository

- Start with MIT for code
- Start with CC BY 4.0 for data in early phase (faster adoption)
- Re-evaluate ODbL for data once community curation volume increases

## Important operational policy

- Keep third-party data in clearly separated source folders
- Store source-level attribution and upstream license metadata per dataset
- Do not import external datasets until compatibility is verified

## Next action

1. Keep `LICENSE` as MIT for now.
2. Keep `LICENSE-data-CC-BY-4.0` active for project-native data contributions.
3. Use `LICENSE-data-ODbL-1.0` as optional future switch path.
