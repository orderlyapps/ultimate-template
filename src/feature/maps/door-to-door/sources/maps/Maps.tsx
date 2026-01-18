import { mapCollection } from "@tanstack-db/map/mapCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { Layer, Source } from "react-map-gl/mapbox";
import type { FeatureCollection } from "geojson";
import { label } from "@feature/maps/door-to-door/sources/maps/layers/label";
import { border } from "@feature/maps/door-to-door/sources/maps/layers/border";

export const SOURCE_ID = "maps";

export const Maps: React.FC = () => {
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
        (map) =>
          map.boundary &&
          Array.isArray(map.boundary) &&
          map.boundary.length > 0,
      )
      .map((map) => ({
        type: "Feature" as const,
        id: map.id,
        properties: {
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

  console.log(geojson);
  return (
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...label} />
      <Layer {...border} />
    </Source>
  );
};
