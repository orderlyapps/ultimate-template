import { doNotCallCollection } from "@tanstack-db/do_not_call/doNotCallCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { Layer, Source } from "react-map-gl/mapbox";
import type { FeatureCollection } from "geojson";
import { getHousePointLayer } from "@feature/maps/door-to-door/sources/do-not-calls/house-layers/point";
import { getHouseLabelLayer } from "@feature/maps/door-to-door/sources/do-not-calls/house-layers/label";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import type { DoNotCall as DoNotCallBase } from "@tanstack-db/do_not_call/doNotCallSchema";
import { getUnitPointLayer } from "@feature/maps/door-to-door/sources/do-not-calls/unit-layers/point";
import { getUnitLabelLayer } from "@feature/maps/door-to-door/sources/do-not-calls/unit-layers/label";

export const SOURCE_ID = "do-not-calls";

export type DoNotCall = DoNotCallBase & {
  street: string;
  suburb: string;
};

export const DoNotCalls: React.FC = () => {
  const { data } = useLiveQuery((q) =>
    q
      .from({
        dnc: doNotCallCollection,
      })

      .join({ st: streetCollection }, ({ st, dnc }) => eq(st.id, dnc.street_id))

      .join({ sb: suburbCollection }, ({ sb, dnc }) => eq(sb.id, dnc.suburb_id))

      .select(({ dnc, st, sb }) => {
        return { ...dnc, street: st?.name, suburb: sb?.name };
      }),
  ) as { data: DoNotCall[] };

  if (!data) return null;

  // Filter valid coordinates
  const validData = data.filter(
    (dnc): dnc is typeof dnc & { coordinates: [number, number] } =>
      dnc.coordinates !== null &&
      Array.isArray(dnc.coordinates) &&
      dnc.coordinates.length === 2,
  );

  // Group by suburb and street
  const groupedByAddress = validData.reduce(
    (acc, dnc) => {
      const key = `${dnc.suburb}|${dnc.street}|${dnc.house_number}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(dnc);
      return acc;
    },
    {} as Record<string, typeof validData>,
  );

  // Create features with unit_count and unit_data
  const features = Object.values(groupedByAddress).map((group) => {
    const firstItem = group[0];

    return {
      type: "Feature" as const,
      id: firstItem.id,
      properties: {
        ...firstItem,
        unit_count: group.length,
        unit_data: group,
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
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...getUnitPointLayer()} />
      <Layer {...getUnitLabelLayer()} />
      <Layer {...getHousePointLayer()} />
      <Layer {...getHouseLabelLayer()} />
    </Source>
  );
};
