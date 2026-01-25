import { mapMasterCollection } from "@tanstack-db/map_master/mapMasterCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { Layer, Source } from "react-map-gl/mapbox";
import type { FeatureCollection } from "geojson";
import { getBorderLayer } from "@feature/maps/door-to-door/sources/map-master/layers/border";

export const SOURCE_ID = "map-master";

export const MapMaster: React.FC = () => {
  const { data } = useLiveQuery((q) =>
    q.from({
      c: mapMasterCollection,
    }),
  );

  if (!data) return null;

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: data
      .filter(
        (mapMaster): mapMaster is typeof mapMaster & { boundary: [number, number][] } =>
          mapMaster.boundary !== null &&
          Array.isArray(mapMaster.boundary) &&
          mapMaster.boundary.length > 0,
      )
      .map((mapMaster) => ({
        type: "Feature" as const,
        id: mapMaster.congregation_id,
        properties: {
          congregation_id: mapMaster.congregation_id,
          details: mapMaster.details,
        },
        geometry: {
          type: "Polygon",
          coordinates: [mapMaster.boundary],
        },
      })),
  };

  return (
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...getBorderLayer()} />
    </Source>
  );
};
