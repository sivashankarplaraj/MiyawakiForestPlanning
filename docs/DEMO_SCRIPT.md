# Demo Script (5 Minutes)

Use this flow to show end-to-end local-first planning with no backend.

## 1) Start app

1. Run `npm install` (first time only).
2. Run `npm run dev`.
3. Open the local Vite URL.

## 2) Show planning inputs

1. Set `Plot Area` to `250`.
2. Set `Density` to `3`.
3. Choose `Climate-Resilience Forest`.
4. Choose `Partial Shade` and `Medium` water.
5. Click `Generate / Refresh Plan`.

Expected outcome:
- Total saplings and layer split update.
- Species allocation table updates.
- Growth preview cards show year-wise progression.
- Year-1 maintenance guidance updates to match site conditions.
- Layout preview shows point-based planting distribution.
- Plan quality snapshot shows diversity, water-risk, survival, and nursery buffer hints.

## 3) Show local-first continuity

1. Change `Plot Area` to `300`.
2. Refresh the browser tab.

Expected outcome:
- Inputs restore automatically from local storage.

## 4) Show plan portability

1. Click `Export Plan JSON`.
2. Click `Reset Inputs`.
3. Use `Load Plan JSON` and select the exported file.

Expected outcome:
- Inputs restore from the exported plan file.

## 5) Show reporting and interoperability

1. Click `Export Summary PDF`.
2. Click `Export Layout GeoJSON`.
3. Click `Export Layout SVG`.
4. Click `Export Checklist JSON`.

Expected outcome:
- PDF summary file downloads for sharing.
- GeoJSON layout file downloads for GIS workflows.
- SVG layout file downloads for visual review.
- Checklist JSON downloads with completion status per task.

## 6) Show simulation mode switching

1. In `Lightweight Growth Preview`, switch between `Best`, `Base`, and `Stress`.
2. Highlight changes in survival and canopy closure per year.

Expected outcome:
- Stakeholders understand scenario sensitivity without backend compute.

## 7) Show visual planning confidence

1. Point out the in-app layout preview legend (canopy, sub-canopy, shrub).
2. Change density and show point distribution become tighter or sparser.

Expected outcome:
- Stakeholders can see that export files match the in-app visual layout model.

## 8) Compare scenario tradeoffs

1. Open `Scenario Compare`.
2. Select `Roadside Strip` and observe deltas.
3. Switch to `Community Fruit Grove` and compare again.

Expected outcome:
- Stakeholders can reason about saplings, survival, diversity, and nursery buffer deltas quickly.

## 9) Close with trust and governance

Call out:
- Data license policy in `docs/DATA_LICENSE_POLICY.md`.
- Schema contracts in `schemas/`.
- Validation scripts: `npm run validate:plan` and `npm run validate:data`.

## 10) Show checklist execution workflow

1. Tick a few Year-1 maintenance checklist items.
2. Confirm progress text updates (for example, `Completed 2 of 4 checklist tasks`).
3. Export checklist JSON and mention it can be shared with field teams.

Expected outcome:
- Stakeholders see an actionable operations handoff, not just a planning report.
