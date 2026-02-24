import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { Layer, Source } from "react-map-gl/mapbox";
import type { FeatureCollection } from "geojson";
import type { LayerProps } from "react-map-gl/mapbox";

export const SOURCE_ID = "blocks";

const getBlocksBorderLayer = (): LayerProps => ({
  id: "blocks-borders",
  type: "line",
  source: SOURCE_ID,
  paint: {
    "line-color": "#3b82f6",
    "line-width": 3,
    "line-opacity": 0.3,
  },
  beforeId: "road-label",
});

const getBlocksLabelLayer = (): LayerProps => ({
  id: "blocks-labels",
  type: "symbol",
  source: SOURCE_ID,
  layout: {
    "text-field": ["get", "name"],
    "text-size": 20,
    "text-anchor": "center",
    "text-allow-overlap": false,
  },
  paint: {
    "text-color": "#1e40af",
    // "text-halo-color": "#ffffff",
    // "text-halo-width": 2,
  },
});

export const Blocks: React.FC = () => {
  const selectedMap = useDoorToDoorStore((state) => state.selectedMap);

  if (!selectedMap?.blocks || selectedMap.blocks.length === 0) return null;

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: selectedMap.blocks
      .filter((block) => block.coordinates && block.coordinates.length > 0)
      .map((block) => ({
        type: "Feature" as const,
        id: block.id,
        properties: {
          id: block.id,
          name: block.name,
          type: block.type,
        },
        geometry: block.type === "block"
          ? {
              type: "Polygon" as const,
              coordinates: [block.coordinates],
            }
          : {
              type: "LineString" as const,
              coordinates: block.coordinates,
            },
      })),
  };

  return (
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...getBlocksBorderLayer()} />
      <Layer {...getBlocksLabelLayer()} />
    </Source>
  );
};
