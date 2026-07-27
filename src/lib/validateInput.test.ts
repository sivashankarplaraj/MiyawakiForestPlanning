import { describe, expect, it } from "vitest";
import { sanitizePlanInput } from "./validateInput";
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

describe("sanitizePlanInput", () => {
  it("passes through valid input without warnings", () => {
    const result = sanitizePlanInput(makeInput({}));

    expect(result.input.areaM2).toBe(100);
    expect(result.warnings).toHaveLength(0);
  });

  it("clamps NaN area to minimum with a warning", () => {
    const result = sanitizePlanInput(makeInput({ areaM2: Number.NaN }));

    expect(result.input.areaM2).toBe(10);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it("clamps zero area up to minimum", () => {
    const result = sanitizePlanInput(makeInput({ areaM2: 0 }));

    expect(result.input.areaM2).toBe(10);
  });

  it("caps oversized area and density", () => {
    const result = sanitizePlanInput(makeInput({ areaM2: 999999, densityPerM2: 50 }));

    expect(result.input.areaM2).toBe(5000);
    expect(result.input.densityPerM2).toBe(5);
    expect(result.warnings).toHaveLength(2);
  });

  it("raises low density to Miyawaki minimum", () => {
    const result = sanitizePlanInput(makeInput({ densityPerM2: 0.5 }));

    expect(result.input.densityPerM2).toBe(2);
  });
});
