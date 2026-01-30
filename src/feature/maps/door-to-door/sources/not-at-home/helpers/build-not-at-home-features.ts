import type { Feature } from "geojson";

import { hashStringToSeed, mulberry32 } from "./seeded-random";

type NotAtHomeWithCoordinates = {
  id: string;
  coordinates: [number, number];
  write: boolean;
  [key: string]: unknown;
};

export const buildNotAtHomeFeatures = (
  groupedByAddress: Record<string, NotAtHomeWithCoordinates[]>,
  offsetMeters: { min: number; max: number },
): Array<
  Feature<
    import("geojson").Point,
    NotAtHomeWithCoordinates & {
      unit_count: number;
      unit_data: NotAtHomeWithCoordinates[];
      write_count: number;
      return_count: number;
    }
  >
> => {
  return Object.values(groupedByAddress).map((group) => {
    const firstItem = group[0];
    const write_count = group.filter((item) => item.write === true).length;
    const return_count = group.filter((item) => item.write === false).length;

    const seed = hashStringToSeed(`${firstItem.id}`);
    const random = mulberry32(seed);

    const distanceMeters = offsetMeters.min + random() * (offsetMeters.max - offsetMeters.min);
    const angleRadians = random() * 2 * Math.PI;

    const deltaLatMeters = Math.cos(angleRadians) * distanceMeters;
    const deltaLngMeters = Math.sin(angleRadians) * distanceMeters;

    const latRadians = (firstItem.coordinates[1] * Math.PI) / 180;
    const metersPerDegreeLat = 111320;
    const metersPerDegreeLng = 111320 * Math.cos(latRadians);

    const randomOffsetLat = deltaLatMeters / metersPerDegreeLat;
    const randomOffsetLng = deltaLngMeters / metersPerDegreeLng;

    const offsetCoordinates: [number, number] = [
      firstItem.coordinates[0] + randomOffsetLng,
      firstItem.coordinates[1] + randomOffsetLat,
    ];

    return {
      type: "Feature" as const,
      id: firstItem.id,
      properties: {
        ...(firstItem as NotAtHomeWithCoordinates),
        unit_count: group.length,
        unit_data: group,
        write_count,
        return_count,
      },
      geometry: {
        type: "Point" as const,
        coordinates: offsetCoordinates,
      },
    };
  });
};
