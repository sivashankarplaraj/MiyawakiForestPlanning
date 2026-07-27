import { describe, expect, it } from "vitest";
import { buildMaintenanceGuidance } from "./guidance";
import type { PlanInput } from "../types";

function makeInput(overrides: Partial<PlanInput>): PlanInput {
  return {
    areaM2: 100,
    densityPerM2: 3,
    forestType: "mixed",
    sunlight: "full_sun",
    waterAvailability: "medium",
    ...overrides
  };
}

describe("buildMaintenanceGuidance", () => {
  it("includes low-water irrigation advice when water is low", () => {
    const items = buildMaintenanceGuidance(makeInput({ waterAvailability: "low" }));

    expect(items.some((item) => item.detail.includes("2-3 times per week"))).toBe(true);
    expect(items.some((item) => item.id === "irrigation-low-water")).toBe(true);
  });

  it("adds pollinator-specific guidance for pollinator forest", () => {
    const items = buildMaintenanceGuidance(makeInput({ forestType: "pollinator", sunlight: "partial_shade" }));

    expect(items.some((item) => item.title === "Pollinator support")).toBe(true);
  });

  it("does not add heat stress guidance for shade conditions", () => {
    const items = buildMaintenanceGuidance(makeInput({ sunlight: "shade" }));

    expect(items.some((item) => item.title === "Heat stress watch")).toBe(false);
  });

  it("produces unique IDs for checklist tracking", () => {
    const items = buildMaintenanceGuidance(makeInput({ forestType: "fruit" }));
    const ids = items.map((item) => item.id);

    expect(new Set(ids).size).toBe(ids.length);
  });
});
