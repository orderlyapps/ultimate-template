import type { FeatureCollection } from "geojson";
import type { Map } from "@tanstack-db/map/mapSchema";

const WORLD_BOUNDS: [number, number][] = [
  [-180, -90],
  [180, -90],
  [180, 90],
  [-180, 90],
  [-180, -90],
];

export const getMaskGeoJson = (
  selectedMap: Map | null,
  data: Map[],
): FeatureCollection | null => {
  if (!selectedMap) return null;

  const mapData = data.find((m) => m.id === selectedMap.id);
  if (!mapData?.boundary || mapData.boundary.length === 0) return null;

  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [WORLD_BOUNDS, mapData.boundary],
        },
      },
    ],
  };
};
