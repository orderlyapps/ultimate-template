import type {
  MapboxGeocodingFeature,
  MapboxGeocodingResponse,
} from "@services/vendor/mapbox/types/MapboxGeocodingResponse";

export async function searchSuburbs(
  query: string,
  bbox?: [number, number, number, number],
): Promise<MapboxGeocodingFeature[]> {
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error(
      "Mapbox access token not found. Please set VITE_MAPBOX_TOKEN environment variable.",
    );
  }

  try {
    const encodedQuery = encodeURIComponent(query);
    let url =
      `https://api.mapbox.com/search/geocode/v6/forward?` +
      `q=${encodedQuery}&` +
      `access_token=${accessToken}&` +
      `country=AU&` +
      `limit=10&` +
      `types=locality,place`;

    if (bbox) {
      const bboxParam = bbox.join(",");
      url += `&bbox=${bboxParam}`;
    }

    const response = await fetch(url);

    const { features }: MapboxGeocodingResponse = await response.json();

    console.log(features);
    return features;
  } catch (error) {
    console.error("Suburb search error:", error);
    throw error;
  }
}
