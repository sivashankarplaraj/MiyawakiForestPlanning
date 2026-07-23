import type { Species } from "../types";

export const sampleSpecies: Species[] = [
  {
    id: "ficus-religiosa",
    scientificName: "Ficus religiosa",
    commonName: "Peepal",
    layer: "canopy",
    sunlight: "full_sun",
    waterNeed: "medium",
    tags: ["mixed", "shade", "wildlife", "climate_resilience"]
  },
  {
    id: "azadirachta-indica",
    scientificName: "Azadirachta indica",
    commonName: "Neem",
    layer: "canopy",
    sunlight: "full_sun",
    waterNeed: "low",
    tags: ["mixed", "shade", "climate_resilience"]
  },
  {
    id: "syzygium-cumini",
    scientificName: "Syzygium cumini",
    commonName: "Jamun",
    layer: "canopy",
    sunlight: "full_sun",
    waterNeed: "medium",
    tags: ["mixed", "fruit", "wildlife", "climate_resilience"]
  },
  {
    id: "murraya-koenigii",
    scientificName: "Murraya koenigii",
    commonName: "Curry Leaf",
    layer: "sub_canopy",
    sunlight: "partial_shade",
    waterNeed: "medium",
    tags: ["mixed", "medicinal", "pollinator", "wildlife"]
  },
  {
    id: "phyllanthus-emblica",
    scientificName: "Phyllanthus emblica",
    commonName: "Amla",
    layer: "sub_canopy",
    sunlight: "full_sun",
    waterNeed: "low",
    tags: ["fruit", "climate_resilience", "wildlife"]
  },
  {
    id: "hibiscus-rosa-sinensis",
    scientificName: "Hibiscus rosa-sinensis",
    commonName: "Hibiscus",
    layer: "shrub",
    sunlight: "full_sun",
    waterNeed: "medium",
    tags: ["pollinator", "flower", "mixed"]
  },
  {
    id: "clerodendrum-inerme",
    scientificName: "Clerodendrum inerme",
    commonName: "Seaside Clerodendrum",
    layer: "shrub",
    sunlight: "partial_shade",
    waterNeed: "low",
    tags: ["pollinator", "wildlife", "climate_resilience"]
  }
];
