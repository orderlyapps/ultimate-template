import { doNotCallCollection } from "@tanstack-db/do_not_call/doNotCallCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { Layer, Source } from "react-map-gl/mapbox";
import type { FeatureCollection } from "geojson";
import { getPointLayer } from "@feature/maps/door-to-door/components/sources/do-not-calls/layers/point";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import type { DoNotCall as DoNotCallBase } from "@tanstack-db/do_not_call/doNotCallSchema";

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

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: data
      .filter(
        (dnc): dnc is typeof dnc & { coordinates: [number, number] } =>
          dnc.coordinates !== null &&
          Array.isArray(dnc.coordinates) &&
          dnc.coordinates.length === 2,
      )
      .map((dnc) => ({
        type: "Feature" as const,
        id: dnc.id,
        properties: {
          id: dnc.id,
          house_number: dnc.house_number,
          unit_number: dnc.unit_number,
          notes: dnc.notes,
          suburb: dnc.suburb,
          street: dnc.street,
          congregation_id: dnc.congregation_id,
          updated_at: dnc.updated_at,
        },
        geometry: {
          type: "Point",
          coordinates: dnc.coordinates,
        },
      })),
  };

  return (
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...getPointLayer()} />
    </Source>
  );
};
