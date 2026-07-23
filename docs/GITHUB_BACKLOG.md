# GitHub Milestones and Issue Backlog Starter

Use this as a direct source for creating Milestones, Epics, and Issues.

## Milestone 0: Foundation

### Epic: Project setup and architecture

- [ ] Define architecture decision record template and first ADRs
- [ ] Initialize app scaffold with TypeScript and Vite
- [ ] Set up linting, formatting, and unit testing
- [ ] Configure CI workflow for build and tests
- [ ] Add contribution, conduct, and governance docs

### Epic: Core data model

- [ ] Define species schema and validation
- [ ] Define plan file schema with versioning
- [ ] Add sample pilot-region dataset and fixtures
- [ ] Add schema test suite and migration harness

## Milestone 1: Core planning MVP

### Epic: Site and objective input

- [ ] Build map view with plot drawing controls
- [ ] Build site condition form and validation rules
- [ ] Build forest objective presets and custom weight editor

### Epic: Recommendation and planning engine

- [ ] Implement species filtering by region and site fit
- [ ] Implement species ranking with explainability fields
- [ ] Implement invasive-risk exclusion logic
- [ ] Implement density and quantity calculator
- [ ] Implement layer-balanced species mix generator

### Epic: Local project lifecycle

- [ ] Implement save to local plan file
- [ ] Implement load from local plan file
- [ ] Implement version migration and warning UI

## Milestone 2: Simulation and guidance

### Epic: Lightweight simulation

- [ ] Implement growth factor and survival logic
- [ ] Implement scenario model (best/base/stress)
- [ ] Build timeline visualization for year 1, 3, 10
- [ ] Add simulation assumptions and uncertainty panel

### Epic: Implementation guidance

- [ ] Add site preparation checklist module
- [ ] Add planting-day procedure module
- [ ] Add maintenance and monitoring calendar module
- [ ] Add replacement strategy guidance logic

## Milestone 3: Export and interoperability

### Epic: Report export

- [ ] Build PDF report layout and content sections
- [ ] Add export settings for paper format and branding
- [ ] Add print style verification tests

### Epic: CAD/GIS export

- [ ] Implement SVG export with scale metadata
- [ ] Implement GeoJSON export for plot and plant points
- [ ] Implement DXF export beta path
- [ ] Add interoperability test set for common viewers

## Milestone 4: Data governance and contributors

### Epic: Data quality pipeline

- [ ] Add provenance and license validation scripts
- [ ] Add confidence scoring checks and completeness checks
- [ ] Add taxonomy sanity checks and synonym handling tests

### Epic: Community contribution workflow

- [ ] Create native species contribution template
- [ ] Create ecological evidence submission template
- [ ] Create reviewer workflow and triage labels
- [ ] Publish data source attribution and licensing policy

## Recommended labels

- area:ui
- area:data
- area:simulation
- area:export
- area:docs
- type:bug
- type:feature
- type:tech-debt
- priority:P0
- priority:P1
- priority:P2
- good-first-issue
- needs-ecology-review
- needs-data-license-review

## Recommended issue templates

- Bug report
- Feature request
- Species data correction
- New region data pack proposal
- Export compatibility issue

## Recommended project board columns

- Backlog
- Ready
- In Progress
- In Review
- Done

## First 10 high-priority issues to create now

1. Initialize application scaffold and CI
2. Define plan JSON schema v1 and migration strategy
3. Implement map-based plot drawing and area calculation
4. Implement site condition form and validation
5. Implement species recommendation filter pipeline
6. Implement objective presets and ranking weights
7. Implement layout and density generator
8. Implement local save/load with schema validation
9. Implement PDF export with core sections
10. Implement simulation v1 with scenario toggles
