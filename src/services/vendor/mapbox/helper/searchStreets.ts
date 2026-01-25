import type {
  MapboxGeocodingResponse,
  MapboxGeocodingFeature,
} from "@services/vendor/mapbox/types/MapboxGeocodingResponse";

export async function searchStreets(
  query: string,
  bbox: [number, number, number, number],
  padding: number = 0.01,
): Promise<MapboxGeocodingFeature[]> {
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error(
      "Mapbox access token not found. Please set VITE_MAPBOX_TOKEN environment variable.",
    );
  }

  try {
    // Apply padding to bbox
    const [minLng, minLat, maxLng, maxLat] = bbox;
    const paddedBbox = [
      minLng - padding,
      minLat - padding,
      maxLng + padding,
      maxLat + padding,
    ];

    const encodedQuery = encodeURIComponent(query);
    const bboxParam = paddedBbox.join(",");

    // Try multiple search strategies
    const searchUrls =
      // Strategy 1: Search for addresses and streets within bbox
      `https://api.mapbox.com/search/geocode/v6/forward?` +
      `q=${encodedQuery}&` +
      `access_token=${accessToken}&` +
      `country=AU&` +
      `limit=20&` +
      `types=address,street&` +
      `bbox=${bboxParam}`;

    const response = await fetch(searchUrls);

    const { features }: MapboxGeocodingResponse = await response.json();

    console.log(features);
    return features;
  } catch (error) {
    console.error("Street search error:", error);
    throw error;
  }
}
