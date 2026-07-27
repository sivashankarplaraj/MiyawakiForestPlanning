import pilotMetadata from "../../data/seed/pilot-region/metadata.json";
import pilotSpecies from "../../data/seed/pilot-region/species.json";
import type { ForestType, Species } from "../types";

interface PilotSpeciesRecord {
  id: string;
  commonName: string;
  scientificName: string;
  nativeRegions: string[];
  forestLayers: Array<"canopy" | "subcanopy" | "shrub" | "ground">;
  siteFit: {
    sunlight: "full" | "partial" | "shade";
    water: "low" | "medium" | "high";
  };
  ecologicalRoles: string[];
}

interface PilotMetadata {
  region: string;
  source: string;
  license: string;
  lastUpdated: string;
  notes?: string;
}

function mapLayer(layer: PilotSpeciesRecord["forestLayers"][number]): Species["layer"] {
  if (layer === "subcanopy") {
    return "sub_canopy";
  }

  if (layer === "ground") {
    return "shrub";
  }

  return layer;
}

function mapSunlight(sunlight: PilotSpeciesRecord["siteFit"]["sunlight"]): Species["sunlight"] {
  if (sunlight === "full") {
    return "full_sun";
  }

  if (sunlight === "partial") {
    return "partial_shade";
  }

  return "shade";
}

function mapRolesToTags(roles: string[]): ForestType[] {
  const tags = new Set<ForestType>(["mixed"]);

  for (const role of roles) {
    if (role.includes("pollinator")) {
      tags.add("pollinator");
    }

    if (role.includes("shade")) {
      tags.add("shade");
    }

    if (role.includes("food") || role.includes("fruit")) {
      tags.add("fruit");
    }

    if (role.includes("wildlife")) {
      tags.add("wildlife");
    }
  }

  return Array.from(tags);
}

export function getPilotMetadata(): PilotMetadata {
  return pilotMetadata as PilotMetadata;
}

export function getPilotSpeciesForPlanner(): Species[] {
  const source = pilotSpecies as PilotSpeciesRecord[];

  return source.map((species) => ({
    id: species.id,
    commonName: species.commonName,
    scientificName: species.scientificName,
    layer: mapLayer(species.forestLayers[0] ?? "shrub"),
    sunlight: mapSunlight(species.siteFit.sunlight),
    waterNeed: species.siteFit.water,
    tags: mapRolesToTags(species.ecologicalRoles)
  }));
}
