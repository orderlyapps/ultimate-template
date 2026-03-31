import { Layer, Source, useMap } from "react-map-gl/mapbox";
import type { FeatureCollection, Point } from "geojson";
import { getCircleLayer } from "@feature/maps/sources/publishers/layers/circle";
import { usePublishersMapStore } from "@/content/publishers/map/store/use-publishers-map-store";
import type { HouseholdMember } from "@/content/publishers/map/store/use-publishers-map-store";
import { useEffect } from "react";
import type { PublisherLocal } from "@state/rxdb/collections/publisher";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import type { DeepPartial } from "@/util/types/deep-partial";

export const SOURCE_ID = "publishers-addresses";
export const LAYER_ID = "publishers-addresses-circle";

type PublishersAddressesProps = {
  publishers: {
    publisher: Publisher;
    publisher_local?: DeepPartial<PublisherLocal>;
  }[];
};

type HouseholdFeatureProperties = {
  members: string;
};

const groupByCoordinates = (
  publishersWithAddresses: PublishersAddressesProps,
) => {
  const publishers =
    publishersWithAddresses.publishers.map((p) => ({
      publisher_id: p.publisher_local?.publisher_id ?? p.publisher.id,
      address: p.publisher_local?.address,
    })) ?? [];

  const coordMap = new Map<string, HouseholdMember[]>();

  publishers.forEach((publisher) => {
    if (!publisher.address) return;

    publisher.address
      .filter(
        (addr): addr is NonNullable<typeof addr> & { id: string; coordinates: number[] } =>
          !!addr &&
          !!addr.id &&
          Array.isArray(addr.coordinates) &&
          addr.coordinates.length >= 2,
      )
      .forEach(({ id, label, coordinates }) => {
        const key = `${coordinates[0]},${coordinates[1]}`;
        const member: HouseholdMember = {
          publisher_id: publisher.publisher_id,
          address_id: id,
          label: label ?? "",
        };

        if (coordMap.has(key)) {
          coordMap.get(key)!.push(member);
        } else {
          coordMap.set(key, [member]);
        }
      });
  });

  return coordMap;
};

export const PublishersAddresses: React.FC<PublishersAddressesProps> = ({
  publishers,
}) => {
  const { current: map } = useMap();
  const openHouseholdModal = usePublishersMapStore(
    (state) => state.openHouseholdModal,
  );

  const households = groupByCoordinates({ publishers });

  const geojson: FeatureCollection<Point, HouseholdFeatureProperties> = {
    type: "FeatureCollection",
    features: Array.from(households.entries()).map(([coordKey, members]) => {
      const [lng, lat] = coordKey.split(",").map(Number);
      return {
        type: "Feature" as const,
        id: coordKey,
        properties: {
          members: JSON.stringify(members),
        },
        geometry: {
          type: "Point" as const,
          coordinates: [lng, lat],
        },
      };
    }),
  };

  useEffect(() => {
    if (!map) return;

    const handleClick = (e: mapboxgl.MapMouseEvent) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: [LAYER_ID],
      });

      if (features.length > 0) {
        const feature = features[0];
        const members = JSON.parse(
          feature.properties?.members ?? "[]",
        ) as HouseholdMember[];
        openHouseholdModal(members);
      }
    };

    map.on("click", LAYER_ID, handleClick);
    map.on("mouseenter", LAYER_ID, () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", LAYER_ID, () => {
      map.getCanvas().style.cursor = "";
    });

    return () => {
      map.off("click", LAYER_ID, handleClick);
    };
  }, [map, openHouseholdModal]);

  return (
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...getCircleLayer()} />
    </Source>
  );
};
