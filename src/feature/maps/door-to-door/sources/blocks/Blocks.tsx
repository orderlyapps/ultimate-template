import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { Layer, Source } from "react-map-gl/mapbox";
import type { FeatureCollection } from "geojson";
import { getPolygonBorderLayer } from "./layers/polygon-border";
import { getPolygonLabelLayer } from "./layers/polygon-label";
import { getLineStringLayer } from "./layers/line-string";
import { getLineStringLabelAlongLayer } from "./layers/line-string-label-along";
import { getLineStringLabelEndpointsLayer } from "./layers/line-string-label-endpoints";

export const SOURCE_ID = "blocks";

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
      <Layer {...getPolygonBorderLayer()} />
      <Layer {...getPolygonLabelLayer()} />
      <Layer {...getLineStringLayer()} />
      <Layer {...getLineStringLabelAlongLayer()} />
      <Layer {...getLineStringLabelEndpointsLayer()} />
    </Source>
  );
};
