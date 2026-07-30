import { describe, expect, it } from "vitest";
import { generatePlan } from "./planner";
import type { PlanInput, Species } from "../types";

const baseInput: PlanInput = {
  areaM2: 100,
  densityPerM2: 3,
  forestType: "mixed",
  sunlight: "full_sun",
  waterAvailability: "medium",
  excludeInvasiveRisk: true
};

const species: Species[] = [
  {
    id: "safe-species",
    scientificName: "Safe Species",
    commonName: "Safe Species",
    layer: "canopy",
    sunlight: "full_sun",
    waterNeed: "medium",
    tags: ["mixed"],
    isInvasiveRisk: false
  },
  {
    id: "risky-species",
    scientificName: "Risky Species",
    commonName: "Risky Species",
    layer: "canopy",
    sunlight: "full_sun",
    waterNeed: "medium",
    tags: ["mixed"],
    isInvasiveRisk: true
  }
];

describe("generatePlan", () => {
  it("excludes species flagged as invasive risk when the filter is enabled", () => {
    const plan = generatePlan(species, baseInput);

    expect(plan.items.some((item) => item.species.id === "safe-species")).toBe(true);
    expect(plan.items.some((item) => item.species.id === "risky-species")).toBe(false);
  });

  it("keeps invasive-risk species when the filter is disabled", () => {
    const plan = generatePlan(species, { ...baseInput, excludeInvasiveRisk: false });

    expect(plan.items.some((item) => item.species.id === "risky-species")).toBe(true);
  });
});
