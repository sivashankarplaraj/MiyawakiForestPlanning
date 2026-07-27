import { describe, expect, it } from "vitest";
import { buildPlanInsight } from "./insights";
import type { ForestPlan, PlanInput } from "../types";

const baseInput: PlanInput = {
  areaM2: 100,
  densityPerM2: 3,
  forestType: "mixed",
  sunlight: "full_sun",
  waterAvailability: "medium"
};

const basePlan: ForestPlan = {
  totalSaplings: 100,
  layerSplit: {
    canopy: 35,
    sub_canopy: 35,
    shrub: 30
  },
  items: [
    {
      species: {
        id: "a",
        scientificName: "A",
        commonName: "A",
        layer: "canopy",
        sunlight: "full_sun",
        waterNeed: "medium",
        tags: ["mixed"]
      },
      count: 50
    },
    {
      species: {
        id: "b",
        scientificName: "B",
        commonName: "B",
        layer: "sub_canopy",
        sunlight: "full_sun",
        waterNeed: "medium",
        tags: ["mixed"]
      },
      count: 30
    },
    {
      species: {
        id: "c",
        scientificName: "C",
        commonName: "C",
        layer: "shrub",
        sunlight: "full_sun",
        waterNeed: "medium",
        tags: ["mixed"]
      },
      count: 20
    }
  ],
  growth: [
    { year: 1, avgHeightM: 1.2, canopyClosurePct: 20, survivalPct: 90 },
    { year: 3, avgHeightM: 3, canopyClosurePct: 50, survivalPct: 82 },
    { year: 10, avgHeightM: 8, canopyClosurePct: 90, survivalPct: 74 }
  ]
};

describe("buildPlanInsight", () => {
  it("uses year-10 survival from growth series", () => {
    const insight = buildPlanInsight(basePlan, baseInput);
    expect(insight.projectedYear10Survival).toBe(74);
  });

  it("marks high risk when water availability is low", () => {
    const insight = buildPlanInsight(basePlan, { ...baseInput, waterAvailability: "low" });
    expect(insight.waterStressRisk).toBe("high");
    expect(insight.recommendedNurseryOrderBufferPct).toBe(18);
  });

  it("calculates a positive diversity index", () => {
    const insight = buildPlanInsight(basePlan, baseInput);
    expect(insight.diversityIndex).toBeGreaterThan(0);
  });
});
