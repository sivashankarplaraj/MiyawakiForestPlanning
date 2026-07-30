import type { CanopyLayer, ForestPlan, PlanInput, Species } from "../types";

const layerWeights: Record<CanopyLayer, number> = {
  canopy: 0.35,
  sub_canopy: 0.35,
  shrub: 0.3
};

function scoreSpecies(species: Species, input: PlanInput): number {
  let score = 0;

  if (input.excludeInvasiveRisk && species.isInvasiveRisk) {
    return -Infinity;
  }

  if (species.tags.includes(input.forestType)) {
    score += 3;
  }

  if (species.sunlight === input.sunlight || (species.sunlight === "partial_shade" && input.sunlight !== "shade")) {
    score += 2;
  }

  if (species.waterNeed === input.waterAvailability) {
    score += 2;
  }

  if (input.waterAvailability === "low" && species.waterNeed === "low") {
    score += 1;
  }

  if (input.forestType === "climate_resilience" && species.waterNeed !== "high") {
    score += 1;
  }

  return score;
}

export function generatePlan(speciesList: Species[], input: PlanInput): ForestPlan {
  const filtered = speciesList
    .map((species) => ({ species, score: scoreSpecies(species, input) }))
    .filter((entry) => Number.isFinite(entry.score) && entry.score >= 2)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.species);

  const candidates = filtered.length > 0 ? filtered : speciesList;
  const totalSaplings = Math.max(1, Math.round(input.areaM2 * input.densityPerM2));

  const targetByLayer: Record<CanopyLayer, number> = {
    canopy: Math.round(totalSaplings * layerWeights.canopy),
    sub_canopy: Math.round(totalSaplings * layerWeights.sub_canopy),
    shrub: Math.round(totalSaplings * layerWeights.shrub)
  };

  const layerPools: Record<CanopyLayer, Species[]> = {
    canopy: candidates.filter((s) => s.layer === "canopy"),
    sub_canopy: candidates.filter((s) => s.layer === "sub_canopy"),
    shrub: candidates.filter((s) => s.layer === "shrub")
  };

  const items = Object.entries(layerPools).flatMap(([layer, pool]) => {
    const typedLayer = layer as CanopyLayer;
    if (pool.length === 0 || targetByLayer[typedLayer] === 0) {
      return [];
    }

    const baseCount = Math.floor(targetByLayer[typedLayer] / pool.length);
    let remainder = targetByLayer[typedLayer] % pool.length;

    return pool.map((species) => {
      const bonus = remainder > 0 ? 1 : 0;
      remainder = Math.max(0, remainder - 1);
      return {
        species,
        count: baseCount + bonus
      };
    });
  });

  const allocated = items.reduce((sum, item) => sum + item.count, 0);
  if (allocated < totalSaplings && items.length > 0) {
    items[0].count += totalSaplings - allocated;
  }

  const stressPenalty = input.waterAvailability === "low" ? 8 : input.waterAvailability === "medium" ? 4 : 1;

  return {
    totalSaplings,
    items,
    layerSplit: targetByLayer,
    growth: [
      {
        year: 1,
        avgHeightM: 1.2,
        canopyClosurePct: 22,
        survivalPct: Math.max(60, 92 - stressPenalty)
      },
      {
        year: 3,
        avgHeightM: 3.8,
        canopyClosurePct: 58,
        survivalPct: Math.max(50, 84 - stressPenalty)
      },
      {
        year: 10,
        avgHeightM: 9.5,
        canopyClosurePct: 91,
        survivalPct: Math.max(45, 76 - stressPenalty)
      }
    ]
  };
}
