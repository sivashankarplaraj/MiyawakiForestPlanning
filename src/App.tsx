import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { getPilotMetadata, getPilotSpeciesForPlanner } from "./data/pilotDataset";
import { sampleSpecies } from "./data/sampleSpecies";
import { generatePlan } from "./lib/planner";
import { createPlanDocument, parsePlanDocument, toInputFromPlanDocument } from "./lib/planDocument";
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

  const plan = useMemo(() => generatePlan(plannerSpecies, input), [input, plannerSpecies]);

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

      <section className="card growth">
        <h2>Lightweight Growth Preview</h2>
        <div className="growth-grid">
          {plan.growth.map((stage) => (
            <article key={stage.year} className="stage">
              <h3>Year {stage.year}</h3>
              <p>Avg Height: {stage.avgHeightM.toFixed(1)} m</p>
              <p>Canopy Closure: {stage.canopyClosurePct}%</p>
              <p>Survival: {stage.survivalPct}%</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
