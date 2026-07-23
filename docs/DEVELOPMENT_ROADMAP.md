# Development Roadmap

## Delivery model

- Sprint length: 2 weeks
- Release cadence: milestone-based
- Issue model: one issue per scoped unit of value

## Milestone 0: Foundation (Weeks 1-3)

Outcome: repository and architecture ready for feature development.

- Define architecture and technical decisions
- Initialize frontend application scaffold
- Set up TypeScript, linting, formatting, and testing
- Define JSON schemas for plan files and core entities
- Add sample seed dataset for one pilot region
- Configure CI workflows and branch protections

Definition of done:
- App runs locally
- CI passes on pull requests
- Schema validation works for example plan files

## Milestone 1: Core Planning MVP (Weeks 4-8)

Outcome: user can build a complete plan and save/load locally.

- Implement map-based site and plot definition
- Implement site condition forms and validation
- Implement objective presets and weight controls
- Build species recommendation and filtering engine
- Build layout and density generator
- Implement local save/load with schema versioning

Definition of done:
- User can generate first complete plan in browser
- Project file round-trip works (save then load)

## Milestone 2: Simulation + Guidance (Weeks 9-12)

Outcome: user can preview plausible growth and follow actionable checklists.

- Implement lightweight growth/survival simulation
- Build timeline visualization (year 1, 3, 10)
- Implement best/base/stress scenario switching
- Add guidance module (site prep, planting, maintenance, monitoring)
- Add checklist tracking in project state

Definition of done:
- Simulation produces consistent outputs from plan input
- Guidance sections included in project and exports

## Milestone 3: Export + Interoperability (Weeks 13-15)

Outcome: user can share plan across operational tools.

- Implement PDF report export template
- Implement SVG and GeoJSON export
- Implement DXF export beta
- Add export validation fixtures and sample files

Definition of done:
- Exports open correctly in common viewers
- PDF contains all critical implementation sections

## Milestone 4: Data Quality + Community Operations (Weeks 16-20)

Outcome: repeatable process for data expansion and trusted curation.

- Add contributor workflows for regional data packs
- Add data linting and provenance checks
- Add expert review workflow documentation
- Add quality dashboard for dataset completeness/confidence

Definition of done:
- New region data can be added through documented process
- Validation checks catch malformed or low-quality records

## Milestone 5: Reliability and Adoption Enhancements (Post-MVP)

Outcome: stronger confidence and broader usability.

- Improve accessibility and localization coverage
- Add optional nursery matching and sourcing hints
- Add advanced simulation calibration options
- Add optional integration adapters for external biodiversity APIs

Definition of done:
- Usability and quality metrics show measurable improvement

## Cross-cutting workstreams

- Developer experience and docs
- Data governance and licensing compliance
- UX research with real-world pilot users
- Field feedback loops for model tuning

## Risk gates

- Gate A (end M1): recommendation quality and usability sanity check
- Gate B (end M2): simulation credibility and messaging review
- Gate C (end M3): export interoperability validation
- Gate D (end M4): data governance and contributor model readiness

## Suggested KPIs by phase

- M1: Time to first plan, plan completion rate
- M2: Simulation comprehension and confidence metrics
- M3: Export success rate and import compatibility
- M4: Data quality score and contributor throughput
