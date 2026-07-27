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

Expected outcome:
- PDF summary file downloads for sharing.
- GeoJSON layout file downloads for GIS workflows.
- SVG layout file downloads for visual review.

## 6) Close with trust and governance

Call out:
- Data license policy in `docs/DATA_LICENSE_POLICY.md`.
- Schema contracts in `schemas/`.
- Validation scripts: `npm run validate:plan` and `npm run validate:data`.
