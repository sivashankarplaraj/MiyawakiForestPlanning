# Product Requirements Document (PRD)

## 1. Product summary

Miyawaki Forest Planner is an open-source static web app that helps users design dense native pocket forests using location-aware species selection, practical planting logic, and lightweight growth previews.

## 2. Goals and non-goals

### Goals

- Enable practical Miyawaki planning without backend dependencies
- Provide region-aware native species recommendations
- Generate implementation-ready planting plans
- Support local save/load and printable/exportable outputs
- Provide actionable guidance for preparation and long-term care

### Non-goals

- Replace professional ecological field assessments
- Predict exact ecological outcomes
- Support every geography from day one
- Provide cloud-based collaboration in MVP

## 3. Users and jobs to be done

### Primary users

- Community organizers
- Schools and environmental clubs
- NGOs and municipal greening teams
- Individual land stewards

### Jobs to be done

- Define a restoration site and intent
- Identify suitable native plants by site conditions
- Build a dense multi-layer planting plan
- Visualize a plausible growth trajectory
- Share and execute the plan with volunteers/partners

## 4. Functional requirements

### FR-01 Site definition

- User can select location via map and/or coordinates
- User can define plot boundary and area
- User can add site constraints (access, existing trees, irrigation)

Acceptance criteria:
- Plot geometry supports polygon editing
- Area calculation shown in square meters
- Site can be saved in project file and restored on load

### FR-02 Ecological profile input

- User can input soil, drainage, pH, sunlight, and water profile
- User can mark climate risk priorities (heat, drought, flood, wind)

Acceptance criteria:
- Required fields validated before plan generation
- Reasonable default values available

### FR-03 Forest objective presets

- User can choose one or more forest subcategories:
  - Fruit forest
  - Bird/wildlife forest
  - Flower forest
  - Mixed forest
  - Pollinator forest
  - Shade forest
  - Medicinal/native utility forest
  - Climate-resilience forest

Acceptance criteria:
- Presets alter species ranking weights
- User can manually tune objective weights

### FR-04 Native species recommendation engine

- System recommends species filtered by region and site fit
- Species record includes ecological roles and canopy layer
- System can exclude invasive/high-risk species

Acceptance criteria:
- Recommendation list shows explainability fields
- Recommendations include confidence score and source attribution

### FR-05 Miyawaki layout generation

- System generates species mix, quantities, and layer distribution
- System generates plant placement for high-density planting

Acceptance criteria:
- User can configure planting density range
- Output includes total sapling count and per-species quantities

### FR-06 Lightweight simulation

- System provides stage-based preview for years 1, 3, and 10
- Preview includes canopy closure and survival scenarios

Acceptance criteria:
- Simulation runs in browser within acceptable performance threshold
- Scenarios include best/base/stress views

### FR-07 Guidance and checklists

- System provides site preparation and maintenance guidance
- System provides checklist milestones and monitoring tasks

Acceptance criteria:
- Checklist entries are tied to timeline phases
- Guidance can be exported with plan

### FR-08 Local save/load

- User can save full project as local reusable file
- User can upload saved plan and continue editing

Acceptance criteria:
- Uses versioned JSON schema
- Supports backwards-compatible migration where possible

### FR-09 Export

- User can export plan as PDF
- User can export CAD/GIS-friendly format

Acceptance criteria:
- PDF includes site summary, species list, quantities, layout, and checklist
- MVP export includes SVG and GeoJSON
- DXF export targeted for post-MVP or beta

## 5. Non-functional requirements

### NFR-01 Local-first and privacy

- App functions without account
- No mandatory data transmission for core functionality

### NFR-02 Performance

- Initial app load under 3 seconds on typical broadband
- Layout and simulation interactions remain responsive

### NFR-03 Accessibility

- Target WCAG 2.2 AA baseline
- Keyboard navigation for core tasks

### NFR-04 Maintainability

- Typed domain models
- Test coverage for core planning logic
- Clear data provenance tracking

### NFR-05 Internationalization readiness

- String externalization from UI components
- Species common names support locale variants

## 6. Data requirements

### Mandatory species fields

- Taxonomy: scientific name, family, accepted name/synonyms
- Nativity: indigenous/native status by region
- Ecology: climate fit, soil fit, light, water
- Structure: canopy layer and mature size
- Function: ecological roles and biodiversity values
- Operations: growth rate, maintenance needs
- Governance: source, license, confidence, last verification

## 7. Success metrics

- Time to first complete plan
- Plan export completion rate
- Save/load reuse rate
- Recommendation acceptance/edit ratio
- Checklist completion rate (self-reported)
- Contributor growth for regional data packs

## 8. Risks and mitigations

- Risk: data quality variance by region
  - Mitigation: confidence labels + expert review workflow
- Risk: overconfidence in simulation outputs
  - Mitigation: uncertainty messaging and scenario framing
- Risk: license conflicts across sources
  - Mitigation: strict provenance and compatibility checks
- Risk: CAD interoperability complexity
  - Mitigation: phased export rollout with validation samples

## 9. Assumptions

- MVP launches with one region and expandable data packs
- Users are comfortable with local-file workflows
- Community contributors can support species data enrichment

## 10. Open questions

- Which geography is launch region?
- Minimum evidence threshold for indigenous status?
- Should non-native but non-invasive species ever be allowed in specific presets?
- Which DXF consumers are priority (AutoCAD, LibreCAD, QGIS import)?

## 11. Release definition for MVP

MVP is complete when:

- User can define site, set objectives, generate plan, run preview, export PDF/SVG/GeoJSON, and save/reload project locally
- Core guidance and checklists are available
- Data provenance and confidence are visible in recommendations
