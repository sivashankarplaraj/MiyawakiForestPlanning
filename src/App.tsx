import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { getPilotMetadata, getPilotSpeciesForPlanner } from "./data/pilotDataset";
import { sampleSpecies } from "./data/sampleSpecies";
import { buildMaintenanceGuidance } from "./lib/guidance";
import { buildPlanInsight } from "./lib/insights";
import { createLayoutGeoJson, createLayoutSvg, generateLayoutPoints } from "./lib/layoutExport";
import { generatePlan } from "./lib/planner";
import { createPlanDocument, parsePlanDocument, toInputFromPlanDocument } from "./lib/planDocument";
import { getPresetById, scenarioPresets } from "./lib/presets";
import type { ForestType, PlanInput } from "./types";

const forestTypeOptions: Array<{ value: ForestType; label: string }> = [
  { value: "mixed", label: "Mixed Forest" },
  { value: "pollinator", label: "Pollinator Forest" },
  { value: "fruit", label: "Fruit Forest" },
  { value: "shade", label: "Shade Forest" },
  { value: "wildlife", label: "Bird and Wildlife Forest" },
  { value: "climate_resilience", label: "Climate-Resilience Forest" }
];

const defaultInput: PlanInput = {
  areaM2: 100,
  densityPerM2: 3,
  forestType: "mixed",
  sunlight: "full_sun",
  waterAvailability: "medium"
};

const draftStorageKey = "miyawaki-plan-input-v1";
const previewPointLimit = 1200;
type SimulationMode = "base" | "best" | "stress";

export default function App() {
  const pilotMetadata = useMemo(() => getPilotMetadata(), []);
  const plannerSpecies = useMemo(() => {
    const pilotSpecies = getPilotSpeciesForPlanner();
    const merged = [...pilotSpecies];

    for (const species of sampleSpecies) {
      if (!merged.some((entry) => entry.id === species.id)) {
        merged.push(species);
      }
    }

    return merged;
  }, []);

  const [input, setInput] = useState<PlanInput>({
    ...defaultInput
  });

  const [generatedAt, setGeneratedAt] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [comparePresetId, setComparePresetId] = useState<string>(scenarioPresets[0]?.id ?? "");
  const [simulationMode, setSimulationMode] = useState<SimulationMode>("base");

  const plan = useMemo(() => generatePlan(plannerSpecies, input), [input, plannerSpecies]);
  const layoutPoints = useMemo(() => generateLayoutPoints(plan, input), [plan, input]);
  const previewPoints = useMemo(() => layoutPoints.slice(0, previewPointLimit), [layoutPoints]);
  const layoutSideM = useMemo(() => Math.max(1, Math.sqrt(input.areaM2)), [input.areaM2]);
  const previewScale = useMemo(() => Math.max(4, 320 / layoutSideM), [layoutSideM]);
  const previewSize = useMemo(() => Math.max(160, Math.round(layoutSideM * previewScale)), [layoutSideM, previewScale]);
  const guidance = useMemo(() => buildMaintenanceGuidance(input), [input]);
  const insight = useMemo(() => buildPlanInsight(plan, input), [plan, input]);
  const comparePreset = useMemo(() => getPresetById(comparePresetId), [comparePresetId]);
  const compareInput = useMemo(() => comparePreset?.input ?? defaultInput, [comparePreset]);
  const comparePlan = useMemo(() => generatePlan(plannerSpecies, compareInput), [plannerSpecies, compareInput]);
  const compareInsight = useMemo(() => buildPlanInsight(comparePlan, compareInput), [comparePlan, compareInput]);
  const adjustedGrowth = useMemo(() => {
    if (simulationMode === "base") {
      return plan.growth;
    }

    const heightDelta = simulationMode === "best" ? 0.8 : -0.8;
    const canopyDelta = simulationMode === "best" ? 8 : -12;
    const survivalDelta = simulationMode === "best" ? 6 : -10;

    return plan.growth.map((stage) => ({
      ...stage,
      avgHeightM: Math.max(0.5, Number((stage.avgHeightM + heightDelta).toFixed(1))),
      canopyClosurePct: Math.max(10, Math.min(98, stage.canopyClosurePct + canopyDelta)),
      survivalPct: Math.max(30, Math.min(99, stage.survivalPct + survivalDelta))
    }));
  }, [plan.growth, simulationMode]);

  function layerColor(layer: string): string {
    if (layer === "canopy") {
      return "#2e7d32";
    }

    if (layer === "sub_canopy") {
      return "#558b2f";
    }

    return "#8bc34a";
  }

  useEffect(() => {
    const savedDraft = window.localStorage.getItem(draftStorageKey);
    if (!savedDraft) {
      return;
    }

    try {
      const parsed = JSON.parse(savedDraft) as PlanInput;
      setInput(parsed);
      setStatusMessage("Restored your last local draft inputs.");
    } catch {
      window.localStorage.removeItem(draftStorageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(draftStorageKey, JSON.stringify(input));
  }, [input]);

  function downloadPlan() {
    const document = createPlanDocument(input, plan, pilotMetadata.region);
    const fileName = `miyawaki-plan-${new Date().toISOString().slice(0, 10)}.json`;
    const blob = new Blob([JSON.stringify(document, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);

    setStatusMessage(`Plan exported as ${fileName}`);
  }

  async function downloadPdfSummary() {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF();
    const now = new Date().toLocaleString();

    pdf.setFontSize(18);
    pdf.text("Miyawaki Forest Planner - Plan Summary", 14, 18);
    pdf.setFontSize(11);
    pdf.text(`Generated: ${now}`, 14, 26);
    pdf.text(`Region: ${pilotMetadata.region}`, 14, 32);
    pdf.text(`Area: ${input.areaM2} m2`, 14, 38);
    pdf.text(`Density: ${input.densityPerM2} saplings/m2`, 14, 44);
    pdf.text(`Forest type: ${input.forestType}`, 14, 50);
    pdf.text(`Sunlight: ${input.sunlight}`, 14, 56);
    pdf.text(`Water: ${input.waterAvailability}`, 14, 62);
    pdf.text(`Total saplings: ${plan.totalSaplings}`, 14, 68);

    let line = 78;
    pdf.setFontSize(13);
    pdf.text("Species allocation", 14, line);
    line += 8;
    pdf.setFontSize(10);

    for (const item of plan.items) {
      pdf.text(`${item.species.commonName} (${item.species.layer}) - ${item.count}`, 14, line);
      line += 6;

      if (line > 280) {
        pdf.addPage();
        line = 16;
      }
    }

    const fileName = `miyawaki-plan-summary-${new Date().toISOString().slice(0, 10)}.pdf`;
    pdf.save(fileName);
    setStatusMessage(`Plan summary exported as ${fileName}`);
  }

  function downloadLayoutGeoJson() {
    const geojson = createLayoutGeoJson(plan, input);
    const fileName = `miyawaki-layout-${new Date().toISOString().slice(0, 10)}.geojson`;
    const blob = new Blob([geojson], { type: "application/geo+json" });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);

    setStatusMessage(`Layout exported as ${fileName}`);
  }

  function downloadLayoutSvg() {
    const svg = createLayoutSvg(plan, input);
    const fileName = `miyawaki-layout-${new Date().toISOString().slice(0, 10)}.svg`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);

    setStatusMessage(`Layout exported as ${fileName}`);
  }

  async function importPlan(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const document = parsePlanDocument(text);

      setInput(toInputFromPlanDocument(document));
      setGeneratedAt(new Date().toLocaleString());
      setStatusMessage(`Loaded plan from ${file.name}`);
    } catch {
      setStatusMessage("Could not load plan file. Please use a schemaVersion 1.0.0 export.");
    } finally {
      event.target.value = "";
    }
  }

  function resetDraft() {
    setInput(defaultInput);
    setGeneratedAt("");
    window.localStorage.removeItem(draftStorageKey);
    setStatusMessage("Draft reset to default inputs.");
  }

  function applyPreset(presetId: string) {
    const preset = getPresetById(presetId);
    if (!preset) {
      return;
    }

    setInput(preset.input);
    setGeneratedAt(new Date().toLocaleString());
    setStatusMessage(`Preset applied: ${preset.label}`);
  }

  return (
    <div className="page">
      <header className="hero">
        <h1>Miyawaki Forest Planner Demo</h1>
        <p>
          Static, local-first planning demo. Adjust site conditions and instantly generate a dense native
          planting plan with growth-stage preview.
        </p>
        <p className="pilot-note">
          Pilot dataset: {pilotMetadata.region} | {pilotMetadata.license} | {plannerSpecies.length} species in
          active planner catalog.
        </p>
      </header>

      <section className="card controls">
        <h2>Site Inputs</h2>
        <div className="preset-row" aria-label="Scenario presets">
          {scenarioPresets.map((preset) => (
            <button key={preset.id} className="preset-button" onClick={() => applyPreset(preset.id)} title={preset.description}>
              <span>{preset.label}</span>
              <small>{preset.description}</small>
            </button>
          ))}
        </div>
        <div className="grid">
          <label>
            Plot Area (m2)
            <input
              type="number"
              min={10}
              max={5000}
              value={input.areaM2}
              onChange={(e) => setInput((prev) => ({ ...prev, areaM2: Number(e.target.value || 0) }))}
            />
          </label>

          <label>
            Density (saplings per m2)
            <input
              type="number"
              min={2}
              max={5}
              step={0.5}
              value={input.densityPerM2}
              onChange={(e) => setInput((prev) => ({ ...prev, densityPerM2: Number(e.target.value || 0) }))}
            />
          </label>

          <label>
            Forest Type
            <select
              value={input.forestType}
              onChange={(e) => setInput((prev) => ({ ...prev, forestType: e.target.value as ForestType }))}
            >
              {forestTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sunlight
            <select
              value={input.sunlight}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, sunlight: e.target.value as "full_sun" | "partial_shade" | "shade" }))
              }
            >
              <option value="full_sun">Full Sun</option>
              <option value="partial_shade">Partial Shade</option>
              <option value="shade">Shade</option>
            </select>
          </label>

          <label>
            Water Availability
            <select
              value={input.waterAvailability}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, waterAvailability: e.target.value as "low" | "medium" | "high" }))
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>

        <div className="action-row">
          <button className="generate" onClick={() => setGeneratedAt(new Date().toLocaleString())}>
            Generate / Refresh Plan
          </button>
          <button className="secondary" onClick={downloadPlan}>
            Export Plan JSON
          </button>
          <button className="secondary" onClick={downloadPdfSummary}>
            Export Summary PDF
          </button>
          <button className="secondary" onClick={downloadLayoutGeoJson}>
            Export Layout GeoJSON
          </button>
          <button className="secondary" onClick={downloadLayoutSvg}>
            Export Layout SVG
          </button>
          <button className="secondary" onClick={resetDraft}>
            Reset Inputs
          </button>
          <label className="import-label">
            Load Plan JSON
            <input type="file" accept="application/json" onChange={importPlan} />
          </label>
        </div>
        {statusMessage ? <p className="status">{statusMessage}</p> : null}
      </section>

      <section className="card summary">
        <h2>Generated Plan</h2>
        <p>
          <strong>Total Saplings:</strong> {plan.totalSaplings}
        </p>
        <p>
          <strong>Layer Split:</strong> Canopy {plan.layerSplit.canopy}, Sub-canopy {plan.layerSplit.sub_canopy}, Shrub {plan.layerSplit.shrub}
        </p>
        <p>
          <strong>Last Refreshed:</strong> {generatedAt || "Not manually refreshed yet"}
        </p>

        <table>
          <thead>
            <tr>
              <th>Species</th>
              <th>Layer</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {plan.items.map((item) => (
              <tr key={item.species.id}>
                <td>
                  {item.species.commonName}
                  <span className="sci">{item.species.scientificName}</span>
                </td>
                <td>{item.species.layer}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card insight">
        <h2>Plan Quality Snapshot</h2>
        <div className="insight-grid">
          <article>
            <h3>Diversity Index</h3>
            <p>{insight.diversityIndex}</p>
          </article>
          <article>
            <h3>Water Stress Risk</h3>
            <p className={`risk risk-${insight.waterStressRisk}`}>{insight.waterStressRisk.toUpperCase()}</p>
          </article>
          <article>
            <h3>Year-10 Survival</h3>
            <p>{insight.projectedYear10Survival}%</p>
          </article>
          <article>
            <h3>Nursery Order Buffer</h3>
            <p>{insight.recommendedNurseryOrderBufferPct}%</p>
          </article>
        </div>
      </section>

      <section className="card compare">
        <h2>Scenario Compare</h2>
        <p>Compare your current input against a preset to quickly evaluate tradeoffs.</p>
        <label className="compare-select">
          Comparison preset
          <select value={comparePresetId} onChange={(e) => setComparePresetId(e.target.value)}>
            {scenarioPresets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.label}
              </option>
            ))}
          </select>
        </label>
        <div className="compare-grid">
          <article>
            <h3>Current</h3>
            <p>Total saplings: {plan.totalSaplings}</p>
            <p>Year-10 survival: {insight.projectedYear10Survival}%</p>
            <p>Water risk: {insight.waterStressRisk}</p>
            <p>Diversity: {insight.diversityIndex}</p>
          </article>
          <article>
            <h3>{comparePreset?.label ?? "Preset"}</h3>
            <p>Total saplings: {comparePlan.totalSaplings}</p>
            <p>Year-10 survival: {compareInsight.projectedYear10Survival}%</p>
            <p>Water risk: {compareInsight.waterStressRisk}</p>
            <p>Diversity: {compareInsight.diversityIndex}</p>
          </article>
          <article>
            <h3>Delta (Current - Preset)</h3>
            <p>Saplings: {plan.totalSaplings - comparePlan.totalSaplings}</p>
            <p>Survival: {insight.projectedYear10Survival - compareInsight.projectedYear10Survival}%</p>
            <p>Diversity: {(insight.diversityIndex - compareInsight.diversityIndex).toFixed(2)}</p>
            <p>
              Buffer: {insight.recommendedNurseryOrderBufferPct - compareInsight.recommendedNurseryOrderBufferPct}%
            </p>
          </article>
        </div>
      </section>

      <section className="card growth">
        <h2>Lightweight Growth Preview</h2>
        <div className="sim-mode-row">
          <button
            className={`sim-mode ${simulationMode === "best" ? "active" : ""}`}
            onClick={() => setSimulationMode("best")}
          >
            Best
          </button>
          <button
            className={`sim-mode ${simulationMode === "base" ? "active" : ""}`}
            onClick={() => setSimulationMode("base")}
          >
            Base
          </button>
          <button
            className={`sim-mode ${simulationMode === "stress" ? "active" : ""}`}
            onClick={() => setSimulationMode("stress")}
          >
            Stress
          </button>
        </div>
        <div className="growth-grid">
          {adjustedGrowth.map((stage) => (
            <article key={stage.year} className="stage">
              <h3>Year {stage.year}</h3>
              <p>Avg Height: {stage.avgHeightM.toFixed(1)} m</p>
              <p>Canopy Closure: {stage.canopyClosurePct}%</p>
              <p>Survival: {stage.survivalPct}%</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card guidance">
        <h2>Year-1 Maintenance Guidance</h2>
        <ul className="guidance-list">
          {guidance.map((item) => (
            <li key={item.title}>
              <strong>{item.title}:</strong> {item.detail}
            </li>
          ))}
        </ul>
      </section>

      <section className="card layout-preview">
        <h2>Layout Preview</h2>
        <p>
          Approximate point layout generated from area and density. This view is local-only and intended for quick
          visual checks before export.
        </p>
        <div className="layout-legend">
          <span><i className="dot canopy" />Canopy</span>
          <span><i className="dot subcanopy" />Sub-canopy</span>
          <span><i className="dot shrub" />Shrub</span>
        </div>
        <svg
          className="layout-canvas"
          viewBox={`0 0 ${previewSize} ${previewSize}`}
          width={previewSize}
          height={previewSize}
          role="img"
          aria-label="Layout preview"
        >
          <rect x="0" y="0" width={previewSize} height={previewSize} fill="#f5fbe9" stroke="#bfd8a4" />
          {previewPoints.map((point) => (
            <circle
              key={point.id}
              cx={Math.round(point.x * previewScale)}
              cy={Math.round(point.y * previewScale)}
              r={2.2}
              fill={layerColor(point.layer)}
            >
              <title>
                {point.speciesName} ({point.layer})
              </title>
            </circle>
          ))}
        </svg>
        <p className="layout-meta">
          Showing {previewPoints.length} of {layoutPoints.length} points | Approximate plot side: {layoutSideM.toFixed(1)} m
        </p>
      </section>
    </div>
  );
}
