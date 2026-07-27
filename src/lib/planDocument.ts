import type { CanopyLayer, ForestPlan, PlanInput } from "../types";

export interface PlanDocumentV1 {
  schemaVersion: "1.0.0";
  site: {
    areaM2: number;
    region: string;
    sunlight: "full" | "partial" | "shade";
    water: "low" | "medium" | "high";
  };
  objectives: {
    forestType: string;
    densityPerM2: number;
  };
  recommendations: Array<{
    speciesId: string;
    qty: number;
    layer: "canopy" | "subcanopy" | "shrub" | "ground";
  }>;
}

function toSchemaSunlight(sunlight: PlanInput["sunlight"]): "full" | "partial" | "shade" {
  if (sunlight === "full_sun") {
    return "full";
  }

  if (sunlight === "partial_shade") {
    return "partial";
  }

  return "shade";
}

function fromSchemaSunlight(sunlight: "full" | "partial" | "shade"): PlanInput["sunlight"] {
  if (sunlight === "full") {
    return "full_sun";
  }

  if (sunlight === "partial") {
    return "partial_shade";
  }

  return "shade";
}

function toSchemaLayer(layer: CanopyLayer): "canopy" | "subcanopy" | "shrub" {
  if (layer === "sub_canopy") {
    return "subcanopy";
  }

  return layer;
}

export function createPlanDocument(
  input: PlanInput,
  plan: ForestPlan,
  region: string
): PlanDocumentV1 {
  return {
    schemaVersion: "1.0.0",
    site: {
      areaM2: input.areaM2,
      region,
      sunlight: toSchemaSunlight(input.sunlight),
      water: input.waterAvailability
    },
    objectives: {
      forestType: input.forestType,
      densityPerM2: input.densityPerM2
    },
    recommendations: plan.items.map((item) => ({
      speciesId: item.species.id,
      qty: item.count,
      layer: toSchemaLayer(item.species.layer)
    }))
  };
}

export function toInputFromPlanDocument(document: PlanDocumentV1): PlanInput {
  return {
    areaM2: document.site.areaM2,
    densityPerM2: document.objectives.densityPerM2,
    forestType: document.objectives.forestType as PlanInput["forestType"],
    sunlight: fromSchemaSunlight(document.site.sunlight),
    waterAvailability: document.site.water
  };
}

export function parsePlanDocument(text: string): PlanDocumentV1 {
  const parsed = JSON.parse(text) as Partial<PlanDocumentV1>;

  if (parsed.schemaVersion !== "1.0.0" || !parsed.site || !parsed.objectives || !parsed.recommendations) {
    throw new Error("Unsupported or invalid plan document.");
  }

  return parsed as PlanDocumentV1;
}
