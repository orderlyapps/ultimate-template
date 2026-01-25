export interface SuburbSearchResult {
  id: string;
  name: string;
  bbox: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
  place_name: string;
  coordinates: [number, number]; // [longitude, latitude]
}

interface MapboxFeature {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    mapbox_id?: string;
    name: string;
    bbox?: [number, number, number, number];
    full_address?: string;
  };
}

export async function getSuburbs(
  query: string,
  bbox?: [number, number, number, number],
): Promise<SuburbSearchResult[]> {
  const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
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

    // Add bbox constraint if provided
    if (bbox) {
      const bboxParam = bbox.join(",");
      url += `&bbox=${bboxParam}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Mapbox API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      return [];
    }

    return data.features.map((feature: MapboxFeature) => {
      const [longitude, latitude] = feature.geometry.coordinates;
      const bounds = feature.properties.bbox;

      return {
        id: feature.properties.mapbox_id || `${longitude}_${latitude}`,
        name: feature.properties.name,
        bbox: bounds
          ? [bounds[0], bounds[1], bounds[2], bounds[3]]
          : [
              longitude - 0.01,
              latitude - 0.01,
              longitude + 0.01,
              latitude + 0.01,
            ],
        place_name: feature.properties.full_address || feature.properties.name,
        coordinates: [longitude, latitude],
      };
    });
  } catch (error) {
    console.error("Suburb search error:", error);
    throw error;
  }
}
