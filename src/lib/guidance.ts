import type { PlanInput } from "../types";

export interface GuidanceItem {
  title: string;
  detail: string;
}

export function buildMaintenanceGuidance(input: PlanInput): GuidanceItem[] {
  const items: GuidanceItem[] = [
    {
      title: "Mulching",
      detail: "Apply 8-12 cm organic mulch after planting and replenish every 4-6 months in year one."
    },
    {
      title: "Weed management",
      detail: "Hand-weed monthly in the first year to reduce competition with young saplings."
    }
  ];

  if (input.waterAvailability === "low") {
    items.push({
      title: "Irrigation",
      detail: "Provide deep watering 2-3 times per week for first 10 weeks, then taper based on soil moisture."
    });
  } else if (input.waterAvailability === "medium") {
    items.push({
      title: "Irrigation",
      detail: "Water deeply 1-2 times per week during first 8-10 weeks, then switch to need-based watering."
    });
  } else {
    items.push({
      title: "Irrigation",
      detail: "Water once weekly initially and pause during sustained rainy periods to avoid root stress."
    });
  }

  if (input.sunlight === "full_sun") {
    items.push({
      title: "Heat stress watch",
      detail: "Inspect for leaf scorch during peak heat and add temporary shade netting where needed."
    });
  }

  if (input.forestType === "pollinator") {
    items.push({
      title: "Pollinator support",
      detail: "Stagger flowering shrubs and avoid chemical pesticides around bloom cycles."
    });
  }

  if (input.forestType === "fruit") {
    items.push({
      title: "Fruit tree training",
      detail: "Prune damaged or crossing branches lightly after establishment to shape healthy crowns."
    });
  }

  return items;
}
