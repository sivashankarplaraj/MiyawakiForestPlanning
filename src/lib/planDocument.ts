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

export interface ParsedPlanDocumentResult {
  document: PlanDocumentV1;
  migrated: boolean;
  warnings: string[];
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

export function parsePlanDocumentWithWarnings(text: string): ParsedPlanDocumentResult {
  const parsed = JSON.parse(text) as Partial<PlanDocumentV1> & { schemaVersion?: string };
  const warnings: string[] = [];

  if (!parsed.site || !parsed.objectives || !parsed.recommendations) {
    throw new Error("Unsupported or invalid plan document.");
  }

  const schemaVersion = parsed.schemaVersion ?? "1.0.0";
  const hasLegacySchema = typeof parsed.schemaVersion === "string" && parsed.schemaVersion.startsWith("0.");

  if (hasLegacySchema) {
    warnings.push("Imported a legacy plan file using schema version 0.9.0. The app migrated it to the current v1 format.");
    return {
      document: {
        schemaVersion: "1.0.0",
        site: {
          areaM2: parsed.site.areaM2,
          region: parsed.site.region,
          sunlight: parsed.site.sunlight ?? "full",
          water: parsed.site.water ?? "medium"
        },
        objectives: {
          forestType: parsed.objectives.forestType ?? "mixed",
          densityPerM2: parsed.objectives.densityPerM2 ?? 3
        },
        recommendations: parsed.recommendations.map((item) => ({
          speciesId: item.speciesId,
          qty: item.qty,
          layer: item.layer ?? "shrub"
        }))
      },
      migrated: true,
      warnings
    };
  }

  if (schemaVersion !== "1.0.0") {
    throw new Error("Unsupported or invalid plan document.");
  }

  return {
    document: parsed as PlanDocumentV1,
    migrated: false,
    warnings
  };
}

export function parsePlanDocument(text: string): PlanDocumentV1 {
  return parsePlanDocumentWithWarnings(text).document;
}
