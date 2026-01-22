import { notAtHomeCollection } from "@tanstack-db/not_at_home/notAtHomeCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { Layer, Source } from "react-map-gl/mapbox";
import type { FeatureCollection } from "geojson";
import { getPointLayer } from "@feature/maps/door-to-door/sources/not-at-home/layers/point";
import { getLabelLayer } from "@feature/maps/door-to-door/sources/not-at-home/layers/label";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import type { NotAtHome as NotAtHomeBase } from "@tanstack-db/not_at_home/notAtHomeSchema";
import { getClusterPointLayer } from "@feature/maps/door-to-door/sources/not-at-home/cluster-layers/clusterPoint";
import { getClusterLabelLayer } from "@feature/maps/door-to-door/sources/not-at-home/cluster-layers/clusterLabel";

export const SOURCE_ID = "not-at-home";

export type NotAtHome = NotAtHomeBase & {
  street: string;
  suburb: string;
};

export const NotAtHome: React.FC = () => {
  const { data } = useLiveQuery((q) =>
    q
      .from({
        nah: notAtHomeCollection,
      })

      .join({ st: streetCollection }, ({ st, nah }) => eq(st.id, nah.street_id))

      .join({ sb: suburbCollection }, ({ sb, nah }) => eq(sb.id, nah.suburb_id))

      .select(({ nah, st, sb }) => {
        return { ...nah, street: st?.name, suburb: sb?.name };
      }),
  ) as { data: NotAtHome[] };

  if (!data) return null;

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: data
      .filter(
        (nah): nah is typeof nah & { coordinates: [number, number] } =>
          nah.coordinates !== null &&
          Array.isArray(nah.coordinates) &&
          nah.coordinates.length === 2,
      )
      .map((nah) => ({
        type: "Feature" as const,
        id: nah.id,
        properties: nah,
        geometry: {
          type: "Point",
          coordinates: nah.coordinates,
        },
      })),
  };
  console.log();
  return (
    <Source
      id={SOURCE_ID}
      type="geojson"
      data={geojson}
      cluster
      clusterMaxZoom={13}
      clusterRadius={50}
      clusterProperties={{
        return_count: ["+", ["case", ["==", ["get", "write"], false], 1, 0]],
        write_count: ["+", ["case", ["==", ["get", "write"], true], 1, 0]],
      }}
    >
      <Layer {...getPointLayer()} />
      <Layer {...getLabelLayer()} />
      <Layer {...getClusterPointLayer()} />
      <Layer {...getClusterLabelLayer()} />
    </Source>
  );
};
