import type { ForestPlan, PlanInput } from "../types";

export interface LayoutPoint {
  id: string;
  speciesId: string;
  speciesName: string;
  layer: string;
  x: number;
  y: number;
}

function estimateSideLength(areaM2: number): number {
  return Math.max(1, Math.sqrt(areaM2));
}

export function generateLayoutPoints(plan: ForestPlan, input: PlanInput): LayoutPoint[] {
  const side = estimateSideLength(input.areaM2);
  const spacing = Math.max(0.5, Math.sqrt(1 / Math.max(0.5, input.densityPerM2)));
  const columns = Math.max(1, Math.floor(side / spacing));

  const points: LayoutPoint[] = [];
  let index = 0;

  for (const item of plan.items) {
    for (let i = 0; i < item.count; i += 1) {
      const row = Math.floor(index / columns);
      const col = index % columns;

      points.push({
        id: `${item.species.id}-${i + 1}`,
        speciesId: item.species.id,
        speciesName: item.species.commonName,
        layer: item.species.layer,
        x: Number((col * spacing + spacing / 2).toFixed(2)),
        y: Number((row * spacing + spacing / 2).toFixed(2))
      });

      index += 1;
    }
  }

  return points;
}

export function createLayoutGeoJson(plan: ForestPlan, input: PlanInput): string {
  const points = generateLayoutPoints(plan, input);

  return JSON.stringify(
    {
      type: "FeatureCollection",
      features: points.map((point) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [point.x, point.y]
        },
        properties: {
          id: point.id,
          speciesId: point.speciesId,
          speciesName: point.speciesName,
          layer: point.layer
        }
      }))
    },
    null,
    2
  );
}

function layerColor(layer: string): string {
  if (layer === "canopy") {
    return "#2e7d32";
  }

  if (layer === "sub_canopy") {
    return "#558b2f";
  }

  return "#8bc34a";
}

export function createLayoutSvg(plan: ForestPlan, input: PlanInput): string {
  const side = estimateSideLength(input.areaM2);
  const points = generateLayoutPoints(plan, input);
  const scale = 16;
  const width = Math.ceil(side * scale);
  const height = Math.ceil(side * scale);

  const circles = points
    .map((point) => {
      const cx = Math.round(point.x * scale);
      const cy = Math.round(point.y * scale);
      const fill = layerColor(point.layer);
      return `<circle cx="${cx}" cy="${cy}" r="4" fill="${fill}"><title>${point.speciesName} (${point.layer})</title></circle>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Miyawaki layout export">
  <rect x="0" y="0" width="${width}" height="${height}" fill="#f5fbe9" stroke="#bfd8a4"/>
  ${circles}
</svg>`;
}
