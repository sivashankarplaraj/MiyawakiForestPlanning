import { describe, expect, it } from "vitest";
import { createPlanDocument, parsePlanDocument, toInputFromPlanDocument } from "./planDocument";
import type { ForestPlan, PlanInput } from "../types";

const input: PlanInput = {
  areaM2: 120,
  densityPerM2: 3,
  forestType: "mixed",
  sunlight: "partial_shade",
  waterAvailability: "medium"
};

const plan: ForestPlan = {
  totalSaplings: 360,
  layerSplit: {
    canopy: 126,
    sub_canopy: 126,
    shrub: 108
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
      count: 126
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
      count: 126
    }
  ]
};

describe("planDocument", () => {
  it("creates schema-versioned export payload", () => {
    const document = createPlanDocument(input, plan, "IN-TN");

    expect(document.schemaVersion).toBe("1.0.0");
    expect(document.site.sunlight).toBe("partial");
    expect(document.recommendations[1]?.layer).toBe("subcanopy");
  });

  it("parses exported payload and restores planner input", () => {
    const document = createPlanDocument(input, plan, "IN-TN");
    const serialized = JSON.stringify(document);

    const parsed = parsePlanDocument(serialized);
    const restored = toInputFromPlanDocument(parsed);

    expect(restored).toEqual(input);
  });

  it("rejects invalid payloads", () => {
    expect(() => parsePlanDocument(JSON.stringify({ schemaVersion: "2.0.0" }))).toThrow(
      "Unsupported or invalid plan document."
    );
  });
});
