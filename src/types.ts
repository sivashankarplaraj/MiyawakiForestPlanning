export type ForestType =
  | "mixed"
  | "pollinator"
  | "flower"
  | "fruit"
  | "shade"
  | "medicinal"
  | "wildlife"
  | "climate_resilience";

export type CanopyLayer = "canopy" | "sub_canopy" | "shrub";

export interface Species {
  id: string;
  scientificName: string;
  commonName: string;
  layer: CanopyLayer;
  sunlight: "full_sun" | "partial_shade" | "shade";
  waterNeed: "low" | "medium" | "high";
  tags: ForestType[];
  isInvasiveRisk?: boolean;
}

export interface PlanInput {
  areaM2: number;
  densityPerM2: number;
  forestType: ForestType;
  sunlight: "full_sun" | "partial_shade" | "shade";
  waterAvailability: "low" | "medium" | "high";
  excludeInvasiveRisk?: boolean;
}

export interface PlanItem {
  species: Species;
  count: number;
}

export interface GrowthStage {
  year: number;
  avgHeightM: number;
  canopyClosurePct: number;
  survivalPct: number;
}

export interface ForestPlan {
  totalSaplings: number;
  items: PlanItem[];
  layerSplit: Record<CanopyLayer, number>;
  growth: GrowthStage[];
}
