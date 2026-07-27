import type { PlanInput } from "../types";

export const inputLimits = {
  areaM2: { min: 10, max: 5000 },
  densityPerM2: { min: 2, max: 5 }
} as const;

export interface SanitizedInputResult {
  input: PlanInput;
  warnings: string[];
}

export function sanitizePlanInput(raw: PlanInput): SanitizedInputResult {
  const warnings: string[] = [];
  let areaM2 = raw.areaM2;
  let densityPerM2 = raw.densityPerM2;

  if (!Number.isFinite(areaM2)) {
    areaM2 = inputLimits.areaM2.min;
    warnings.push(`Plot area was invalid and reset to ${inputLimits.areaM2.min} m2.`);
  } else if (areaM2 < inputLimits.areaM2.min) {
    areaM2 = inputLimits.areaM2.min;
    warnings.push(`Plot area raised to the ${inputLimits.areaM2.min} m2 minimum for a viable Miyawaki patch.`);
  } else if (areaM2 > inputLimits.areaM2.max) {
    areaM2 = inputLimits.areaM2.max;
    warnings.push(`Plot area capped at ${inputLimits.areaM2.max} m2 for this planner.`);
  }

  if (!Number.isFinite(densityPerM2)) {
    densityPerM2 = inputLimits.densityPerM2.min;
    warnings.push(`Density was invalid and reset to ${inputLimits.densityPerM2.min} saplings/m2.`);
  } else if (densityPerM2 < inputLimits.densityPerM2.min) {
    densityPerM2 = inputLimits.densityPerM2.min;
    warnings.push(`Density raised to ${inputLimits.densityPerM2.min} saplings/m2 (Miyawaki method minimum).`);
  } else if (densityPerM2 > inputLimits.densityPerM2.max) {
    densityPerM2 = inputLimits.densityPerM2.max;
    warnings.push(`Density capped at ${inputLimits.densityPerM2.max} saplings/m2 to avoid overcrowding.`);
  }

  return {
    input: { ...raw, areaM2, densityPerM2 },
    warnings
  };
}
