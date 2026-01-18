import { mapCollection } from "@tanstack-db/map/mapCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { Layer, Source } from "react-map-gl/mapbox";
import type { FeatureCollection } from "geojson";
import { getLabelLayer } from "@feature/maps/door-to-door/sources/maps/layers/label";
import { getBorderLayer } from "@feature/maps/door-to-door/sources/maps/layers/border";
import { getFillLayer } from "@feature/maps/door-to-door/sources/maps/layers/fill";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";

export const SOURCE_ID = "maps";

export const Maps: React.FC = () => {
  const selectedMap = useDoorToDoorStore((state) => state.selectedMap);

  const { data } = useLiveQuery((q) =>
    q.from({
      c: mapCollection,
    }),
  );

  if (!data) return null;

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: data
      .filter(
        (map): map is typeof map & { boundary: [number, number][] } =>
          map.boundary !== null &&
          Array.isArray(map.boundary) &&
          map.boundary.length > 0,
      )
      .map((map) => ({
        type: "Feature" as const,
        id: map.id,
        properties: {
          id: map.id,
          name: map.name,
          details: map.details,
          congregation_id: map.congregation_id,
        },
        geometry: {
          type: "Polygon",
          coordinates: [map.boundary],
        },
      })),
  };

  return (
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...getFillLayer(selectedMap)} />
      <Layer {...getBorderLayer(selectedMap)} />
      <Layer {...getLabelLayer(selectedMap)} />
    </Source>
  );
};
