import type { PlanInput } from "../types";

export interface ScenarioPreset {
  id: string;
  label: string;
  description: string;
  input: PlanInput;
}

export const scenarioPresets: ScenarioPreset[] = [
  {
    id: "school-campus",
    label: "School Campus",
    description: "Balanced mix for medium-size shaded learning spaces.",
    input: {
      areaM2: 220,
      densityPerM2: 3,
      forestType: "shade",
      sunlight: "partial_shade",
      waterAvailability: "medium"
    }
  },
  {
    id: "roadside-strip",
    label: "Roadside Strip",
    description: "Hardy species profile for sunny, linear edges.",
    input: {
      areaM2: 160,
      densityPerM2: 2.5,
      forestType: "climate_resilience",
      sunlight: "full_sun",
      waterAvailability: "low"
    }
  },
  {
    id: "community-fruit-grove",
    label: "Community Fruit Grove",
    description: "Edible species focus with moderate water support.",
    input: {
      areaM2: 300,
      densityPerM2: 3,
      forestType: "fruit",
      sunlight: "full_sun",
      waterAvailability: "medium"
    }
  }
];

export function getPresetById(id: string): ScenarioPreset | undefined {
  return scenarioPresets.find((preset) => preset.id === id);
}
