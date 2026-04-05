import { Layer, Source } from "react-map-gl/mapbox";
import type { FeatureCollection, Point } from "geojson";
import { getHeatmapLayer } from "@feature/maps/sources/publisher-heat-map/layers/heatmap";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import type { PublisherLocal } from "@state/rxdb/collections/publisher";
import type { DeepPartial } from "@/util/types/deep-partial";

export const SOURCE_ID = "publisher-heat-map";

type PublisherHeatMapProps = {
  publishers: {
    publisher: Publisher;
    publisher_local?: DeepPartial<PublisherLocal>;
  }[];
};

export const PublisherHeatMap: React.FC<PublisherHeatMapProps> = ({
  publishers,
}) => {
  const geojson: FeatureCollection<Point> = {
    type: "FeatureCollection",
    features: publishers.flatMap((p) => {
      const addresses = p.publisher_local?.address ?? [];
      return addresses
        .filter(
          (addr): addr is NonNullable<typeof addr> & { coordinates: number[] } =>
            !!addr &&
            Array.isArray(addr.coordinates) &&
            addr.coordinates.length >= 2,
        )
        .map((addr) => ({
          type: "Feature" as const,
          properties: {},
          geometry: {
            type: "Point" as const,
            coordinates: [addr.coordinates[0], addr.coordinates[1]],
          },
        }));
    }),
  };

  return (
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...getHeatmapLayer()} />
    </Source>
  );
};
