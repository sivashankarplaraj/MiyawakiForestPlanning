# M1 Acceptance Checklist

## Scope covered in current implementation

- [x] Site condition form (area, density, forest type, sunlight, water)
- [x] Forest objective presets (School Campus, Roadside Strip, Community Fruit Grove)
- [x] Species recommendation and layer-balanced quantity plan generation
- [x] Local save to plan JSON (`schemaVersion: 1.0.0`)
- [x] Local load from plan JSON with input restoration
- [x] Local draft persistence via browser storage
- [x] Scenario compare view (current vs selected preset)

## Planning outputs and explainability

- [x] Total saplings and layer split visible
- [x] Species allocation table visible
- [x] Growth preview for year 1, 3, and 10
- [x] Dynamic year-1 maintenance guidance
- [x] Plan quality snapshot (diversity, water risk, survival, buffer)
- [x] In-app layout preview for spatial sanity check

## Export and interoperability currently available

- [x] Plan JSON export/import round-trip
- [x] Summary PDF export
- [x] Layout GeoJSON export
- [x] Layout SVG export

## Quality gates

- [x] `npm run lint` passes
- [x] `npm run test` passes
- [x] `npm run build` passes
- [x] Plan and dataset schema validations pass (`validate:plan`, `validate:data`)

## Evidence artifacts

- Demo runbook: `docs/DEMO_SCRIPT.md`
- Core planner UI: `src/App.tsx`
- Plan file contract helper: `src/lib/planDocument.ts`
- Export modules: `src/lib/layoutExport.ts`
- Guidance module: `src/lib/guidance.ts`
- Insights module: `src/lib/insights.ts`
- Presets module: `src/lib/presets.ts`

## Deferred from original roadmap (explicit)

- [ ] Map-based plot drawing controls (roadmap M1 item)
- [ ] Invasive-risk exclusion pipeline exposed in UI
- [ ] Plan version migration/warning UI beyond strict v1 load

## Sign-off

- [ ] Milestone 1 accepted for demo and pilot testing
- [ ] Milestone 2 backlog finalized from demo feedback
