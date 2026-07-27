import { describe, expect, it } from "vitest";
import { createLayoutGeoJson, createLayoutSvg, generateLayoutPoints } from "./layoutExport";
import type { ForestPlan, PlanInput } from "../types";

const input: PlanInput = {
  areaM2: 25,
  densityPerM2: 2,
  forestType: "mixed",
  sunlight: "full_sun",
  waterAvailability: "medium"
};

const plan: ForestPlan = {
  totalSaplings: 3,
  layerSplit: {
    canopy: 1,
    sub_canopy: 1,
    shrub: 1
  },
  growth: [],
  items: [
    {
      species: {
        id: "ficus-religiosa",
        commonName: "Peepal",
        scientificName: "Ficus religiosa",
        layer: "canopy",
        sunlight: "full_sun",
        waterNeed: "medium",
        tags: ["mixed"]
      },
      count: 1
    },
    {
      species: {
        id: "murraya-koenigii",
        commonName: "Curry Leaf",
        scientificName: "Murraya koenigii",
        layer: "sub_canopy",
        sunlight: "partial_shade",
        waterNeed: "medium",
        tags: ["mixed"]
      },
      count: 1
    },
    {
      species: {
        id: "hibiscus-rosa-sinensis",
        commonName: "Hibiscus",
        scientificName: "Hibiscus rosa-sinensis",
        layer: "shrub",
        sunlight: "full_sun",
        waterNeed: "medium",
        tags: ["mixed"]
      },
      count: 1
    }
  ]
};

describe("layoutExport", () => {
  it("generates one point per sapling", () => {
    const points = generateLayoutPoints(plan, input);

    expect(points).toHaveLength(3);
    expect(points[0]?.speciesId).toBe("ficus-religiosa");
  });

  it("creates valid geojson feature collection", () => {
    const geojson = createLayoutGeoJson(plan, input);
    const parsed = JSON.parse(geojson) as { type: string; features: unknown[] };

    expect(parsed.type).toBe("FeatureCollection");
    expect(parsed.features).toHaveLength(3);
  });

  it("creates svg with circle markers", () => {
    const svg = createLayoutSvg(plan, input);

    expect(svg).toContain("<svg");
    expect(svg).toContain("<circle");
  });
});
