type Suburb = {
  name: string;
  bbox: number[];
};

import type {
  MapboxGeocodingFeature,
  MapboxGeocodingResponse,
} from "@services/vendor/mapbox/types/MapboxGeocodingResponse";

// export interface GeocodeResult {
//   coordinates: [number, number]; // [longitude, latitude]
//   place_name: string;
//   relevance: number;
// }

export interface GeocodeOptions {
  suburb: Suburb;
  padding?: number; // padding in degrees, default 0.01
}

/**
 * Geocode an address using Mapbox Geocoding API with suburb bbox constraints
 */
export async function geocodeAddress(
  address: string,
  options: GeocodeOptions,
): Promise<MapboxGeocodingFeature | null> {
  const { suburb, padding = 0.01 } = options;

  // Get Mapbox access token from environment
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error(
      "Mapbox access token not found. Please set VITE_MAPBOX_TOKEN environment variable.",
    );
  }

  // Apply padding to bbox
  const [minLng, minLat, maxLng, maxLat] = suburb.bbox;
  const paddedBbox = [
    minLng - padding,
    minLat - padding,
    maxLng + padding,
    maxLat + padding,
  ];

  // Helper function to try geocoding with a specific address string
  const tryGeocode = async (
    addressString: string,
  ): Promise<MapboxGeocodingFeature | null> => {
    try {
      const encodedAddress = encodeURIComponent(addressString);
      const bboxParam = paddedBbox.join(",");

      const url =
        `https://api.mapbox.com/search/geocode/v6/forward?` +
        `q=${encodedAddress}&` +
        `access_token=${accessToken}&` +
        `bbox=${bboxParam}&` +
        `country=AU&` +
        `limit=1&` +
        `types=address`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Geocoding API error: ${response.status} ${response.statusText}`,
        );
      }

      const { features }: MapboxGeocodingResponse = await response.json();

      if (!features) {
        return null; // No results found
      }

      return features[0];
    } catch (error) {
      console.error(`Geocoding error for "${addressString}":`, error);
      return null;
    }
  };

  // Try the original address first
  let result = await tryGeocode(address);
  if (result) {
    return result;
  }

  // If original failed and address contains a unit (has "/" character), try fallback strategies
  if (address.includes("/")) {
    const parts = address.split(" ");
    const unitHousePart = parts[0]; // e.g., "2/123"
    const restOfAddress = parts.slice(1).join(" "); // e.g., "Main Street Suburb"

    if (unitHousePart.includes("/")) {
      const [, houseNumber] = unitHousePart.split("/");

      // Fallback 1: Try without unit number
      const addressWithoutUnit = `${houseNumber} ${restOfAddress}`;
      result = await tryGeocode(addressWithoutUnit);
      if (result) {
        console.log(
          `Geocoded using fallback (without unit): ${addressWithoutUnit}`,
        );
        return result;
      }

      // Fallback 2: Try with "Unit X" format
      const [unitNumber] = unitHousePart.split("/");
      const addressWithUnitPrefix = `Unit ${unitNumber} ${houseNumber} ${restOfAddress}`;
      result = await tryGeocode(addressWithUnitPrefix);
      if (result) {
        console.log(
          `Geocoded using fallback (Unit prefix): ${addressWithUnitPrefix}`,
        );
        return result;
      }

      // Fallback 3: Try with comma separation
      const addressWithComma = `${unitNumber}/${houseNumber}, ${restOfAddress}`;
      result = await tryGeocode(addressWithComma);
      if (result) {
        console.log(
          `Geocoded using fallback (comma separation): ${addressWithComma}`,
        );
        return result;
      }
    }
  }

  return null; // All attempts failed
}

/**
 * Build a full address string from components
 */
export function buildAddressString(
  houseNumber: string,
  unitNumber: string,
  streetName: string,
  suburbName: string,
): string {
  const parts: string[] = [];

  if (unitNumber.trim()) {
    parts.push(`${unitNumber.trim()}/${houseNumber.trim()}`);
  } else {
    parts.push(houseNumber.trim());
  }

  parts.push(streetName.trim());
  parts.push(suburbName.trim());

  return parts.join(" ");
}
