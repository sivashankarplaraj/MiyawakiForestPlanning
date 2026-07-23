export type Sunlight = 'full' | 'partial' | 'shade';
export type Water = 'low' | 'medium' | 'high';
export type Layer = 'canopy' | 'subcanopy' | 'shrub' | 'ground';

export interface SpeciesRecord {
  id: string;
  commonName: string;
  scientificName: string;
  nativeRegions: string[];
  forestLayers: Layer[];
  siteFit: {
    sunlight: Sunlight;
    water: Water;
  };
  ecologicalRoles: string[];
  isInvasiveRisk?: boolean;
}

export interface PlanV1 {
  schemaVersion: '1.0.0';
  site: {
    areaM2: number;
    region: string;
    sunlight: Sunlight;
    water: Water;
  };
  objectives: {
    forestType: string;
    densityPerM2: number;
  };
  recommendations: Array<{
    speciesId: string;
    qty: number;
    layer: Layer;
  }>;
}
