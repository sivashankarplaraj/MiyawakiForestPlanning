import { describe, expect, it } from "vitest";
import { getPresetById, scenarioPresets } from "./presets";

describe("scenarioPresets", () => {
  it("contains at least three starter scenarios", () => {
    expect(scenarioPresets.length).toBeGreaterThanOrEqual(3);
  });

  it("returns a known preset by id", () => {
    const preset = getPresetById("school-campus");

    expect(preset?.label).toBe("School Campus");
    expect(preset?.input.sunlight).toBe("partial_shade");
  });

  it("returns undefined for unknown ids", () => {
    expect(getPresetById("unknown-id")).toBeUndefined();
  });
});
