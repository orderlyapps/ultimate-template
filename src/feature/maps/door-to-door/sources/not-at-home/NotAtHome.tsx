import { notAtHomeCollection } from "@tanstack-db/not_at_home/notAtHomeCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { Layer, Source } from "react-map-gl/mapbox";
import type { FeatureCollection } from "geojson";
import { getHousePointLayer } from "@feature/maps/door-to-door/sources/not-at-home/house-layers/point";
import { getHouseLabelLayer } from "@feature/maps/door-to-door/sources/not-at-home/house-layers/label";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import type { NotAtHome as NotAtHomeBase } from "@tanstack-db/not_at_home/notAtHomeSchema";
import { getClusterPointLayer } from "@feature/maps/door-to-door/sources/not-at-home/cluster-layers/point";
import { getClusterLabelLayer } from "@feature/maps/door-to-door/sources/not-at-home/cluster-layers/label";
import { getUnitPointLayer } from "@feature/maps/door-to-door/sources/not-at-home/unit-layers/point";
import { getUnitLabelLayer } from "@feature/maps/door-to-door/sources/not-at-home/unit-layers/label";

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

  // Filter valid coordinates
  const validData = data.filter(
    (nah): nah is typeof nah & { coordinates: [number, number] } =>
      nah.coordinates !== null &&
      Array.isArray(nah.coordinates) &&
      nah.coordinates.length === 2,
  );

  // Group by suburb and street
  const groupedByAddress = validData.reduce(
    (acc, nah) => {
      const key = `${nah.suburb}|${nah.street}|${nah.house_number}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(nah);
      return acc;
    },
    {} as Record<string, typeof validData>,
  );

  // Create features with unit_count and unit_data
  const features = Object.values(groupedByAddress).map((group) => {
    const firstItem = group[0];
    const write_count = group.filter((item) => item.write === true).length;
    const return_count = group.filter((item) => item.write === false).length;

    return {
      type: "Feature" as const,
      id: firstItem.id,
      properties: {
        ...firstItem,
        unit_count: group.length,
        unit_data: group,
        write_count,
        return_count,
      },
      geometry: {
        type: "Point" as const,
        coordinates: firstItem.coordinates,
      },
    };
  });

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features,
  };

  return (
    <Source
      id={SOURCE_ID}
      type="geojson"
      data={geojson}
      cluster
      clusterMaxZoom={13}
      clusterRadius={50}
      clusterProperties={{
        return_count: ["+", ["get", "return_count"], 0],
        write_count: ["+", ["get", "write_count"], 0],
      }}
    >
      <Layer {...getUnitPointLayer()} />
      <Layer {...getUnitLabelLayer()} />
      <Layer {...getHousePointLayer()} />
      <Layer {...getHouseLabelLayer()} />
      <Layer {...getClusterPointLayer()} />
      <Layer {...getClusterLabelLayer()} />
    </Source>
  );
};
