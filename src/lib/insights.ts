import type { ForestPlan, PlanInput } from "../types";

export interface PlanInsight {
  diversityIndex: number;
  waterStressRisk: "low" | "medium" | "high";
  projectedYear10Survival: number;
  recommendedNurseryOrderBufferPct: number;
}

export function buildPlanInsight(plan: ForestPlan, input: PlanInput): PlanInsight {
  const total = Math.max(1, plan.totalSaplings);
  const shares = plan.items
    .map((item) => item.count / total)
    .filter((value) => value > 0);

  const diversityIndex = Number((-shares.reduce((sum, p) => sum + p * Math.log(p), 0)).toFixed(2));

  const survivalAtYear10 = plan.growth.find((stage) => stage.year === 10)?.survivalPct ?? 70;

  let waterStressRisk: "low" | "medium" | "high" = "low";
  if (input.waterAvailability === "medium") {
    waterStressRisk = "medium";
  }
  if (input.waterAvailability === "low") {
    waterStressRisk = "high";
  }

  const recommendedNurseryOrderBufferPct = waterStressRisk === "high" ? 18 : waterStressRisk === "medium" ? 12 : 8;

  return {
    diversityIndex,
    waterStressRisk,
    projectedYear10Survival: survivalAtYear10,
    recommendedNurseryOrderBufferPct
  };
}
