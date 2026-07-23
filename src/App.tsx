import { useMemo, useState } from "react";
import { sampleSpecies } from "./data/sampleSpecies";
import { generatePlan } from "./lib/planner";
import type { ForestType, PlanInput } from "./types";

const forestTypeOptions: Array<{ value: ForestType; label: string }> = [
  { value: "mixed", label: "Mixed Forest" },
  { value: "pollinator", label: "Pollinator Forest" },
  { value: "fruit", label: "Fruit Forest" },
  { value: "shade", label: "Shade Forest" },
  { value: "wildlife", label: "Bird and Wildlife Forest" },
  { value: "climate_resilience", label: "Climate-Resilience Forest" }
];

export default function App() {
  const [input, setInput] = useState<PlanInput>({
    areaM2: 100,
    densityPerM2: 3,
    forestType: "mixed",
    sunlight: "full_sun",
    waterAvailability: "medium"
  });

  const [generatedAt, setGeneratedAt] = useState<string>("");

  const plan = useMemo(() => generatePlan(sampleSpecies, input), [input]);

  return (
    <div className="page">
      <header className="hero">
        <h1>Miyawaki Forest Planner Demo</h1>
        <p>
          Static, local-first planning demo. Adjust site conditions and instantly generate a dense native
          planting plan with growth-stage preview.
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

        <button className="generate" onClick={() => setGeneratedAt(new Date().toLocaleString())}>
          Generate / Refresh Plan
        </button>
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
