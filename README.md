# Miyawaki Forest Planner

An open-source, local-first web application to design small, dense, biodiverse Miyawaki-style native forests.

## Why this project exists

Communities, schools, NGOs, and local councils want to restore biodiversity with practical pocket forests, but planning is fragmented across spreadsheets, local species lists, maps, and field notes. This project unifies those steps into a single static web application that runs in the browser without requiring accounts or a backend.

## Vision

Enable anyone to go from an empty site to an export-ready, ecologically grounded Miyawaki forest plan in under 30 minutes.

## Core principles

- Native-first and ecology-first recommendations
- Local-first architecture with no account required
- Explainable recommendations, not black-box outputs
- Lightweight simulation suitable for browser use
- Open data provenance and licensing clarity
- Accessibility and multilingual readiness

## Who this is for

- Individuals and neighborhood groups
- Schools and campuses
- NGOs and restoration volunteers
- Municipal teams and local councils
- Landscape practitioners and nurseries

## Main capabilities

- Site intake: map-based plot definition, dimensions, constraints
- Ecological profiling: soil, sunlight, water, climate risk factors
- Native species selection: region-aware filtering with ecological role mapping
- Forest presets: fruit, pollinator, mixed, shade, wildlife, medicinal, climate-resilience
- Layout generation: density, canopy layering, species mixing, quantity planning
- Simulation: growth stage preview and canopy progression over time
- Guidance: preparation, planting, maintenance, and monitoring checklists
- Export: PDF report and CAD/GIS-friendly outputs
- Local project save/load: continue planning from reusable plan files

## Product scope

### In scope for MVP

- Static web application
- Seed data for one launch geography
- Browser-based layout planner and basic simulation
- Local save/load plan files (JSON)
- PDF export
- SVG and GeoJSON export

### Out of scope for MVP

- User accounts and cloud sync
- Multi-user real-time collaboration
- Heavy ecological or climate-model compute
- Global full-coverage plant database on day one

## High-level architecture

- Frontend: TypeScript + React + Vite
- Mapping: MapLibre GL JS + OpenStreetMap basemap + Turf.js
- State management: Zustand (or Redux Toolkit)
- Validation: Zod schemas
- Local persistence: IndexedDB (Dexie)
- Exports: jsPDF, SVG, GeoJSON, optional DXF module
- Deployment: GitHub Pages or Netlify (static hosting)

## Data foundations

The project relies on a structured indigenous/native plant dataset with:

- Taxonomy and accepted names
- Geographic nativity and climate-zone fit
- Soil, water, and sunlight suitability
- Canopy layer and ecological role
- Growth and maintenance characteristics
- Biodiversity support and Miyawaki suitability scores
- Source provenance and confidence levels

See docs/PRODUCT_REQUIREMENTS.md for full requirements and docs/GITHUB_BACKLOG.md for execution details.

## Repository roadmap

- Milestone 0: Foundation and schemas
- Milestone 1: Core planning MVP
- Milestone 2: Simulation and guidance
- Milestone 3: Export and interoperability
- Milestone 4: Data quality and contributor workflows

Detailed plan: docs/DEVELOPMENT_ROADMAP.md

## Open-source governance intent

- Open development through GitHub issues and milestones
- Contributor guide and code of conduct
- Clear licensing split for code and data
- Public methodology and data provenance documentation

## Suggested licenses

- Code: MIT or Apache-2.0
- Data: ODbL or CC BY 4.0 (source compatibility dependent)
- Documentation content: CC BY-SA 4.0

Current repository defaults:

- Code: MIT (`LICENSE`)
- Data policy and options: `docs/DATA_LICENSE_POLICY.md`, `LICENSE-data-CC-BY-4.0`, `LICENSE-data-ODbL-1.0`

## Getting started (project bootstrap target)

1. Clone repository
2. Install dependencies: npm install
3. Run local development server: npm run dev
4. Open the local URL shown by Vite in your terminal
5. Adjust area, density, forest type, sunlight, and water inputs
6. Click Generate / Refresh Plan to demo species mix and growth preview
7. Export a schema-aligned plan JSON and re-load it using Load Plan JSON

Build check:

- npm run build

## Contribution highlights

- Help add validated native species records by region
- Improve simulation assumptions with field evidence
- Add accessibility and localization support
- Improve CAD/GIS interoperability

## Safety and responsibility note

This tool supports planning decisions and community action, but it does not replace local ecological expertise, legal permitting checks, or protected-species compliance.

## Status

Milestone 1 MVP flow in progress with working local planner and JSON import/export demo.

## Next documentation

- Product requirements: docs/PRODUCT_REQUIREMENTS.md
- Development roadmap: docs/DEVELOPMENT_ROADMAP.md
- GitHub-ready backlog: docs/GITHUB_BACKLOG.md
- License decision matrix: docs/LICENSE_DECISION_MATRIX.md
- Milestone 0 execution scaffold: docs/MILESTONE_0_IMPLEMENTATION_SCAFFOLD.md

## Community and security

- Contributing guide: CONTRIBUTING.md
- Code of conduct: CODE_OF_CONDUCT.md
- Security policy: SECURITY.md
