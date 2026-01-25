
export interface StreetSearchResult {
  id: string;
  name: string;
  place_name: string;
  coordinates: [number, number]; // [longitude, latitude]
}

interface MapboxFeature {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    mapbox_id?: string;
    address_line1?: string;
    street?: string;
    name?: string;
    full_address?: string;
    place_name?: string;
  };
}

/**
 * Search for streets using Mapbox Geocoding API v6
 */
export async function searchStreets(
  query: string,
  bbox: [number, number, number, number],
  padding: number = 0.01
): Promise<StreetSearchResult[]> {
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("Mapbox access token not found. Please set VITE_MAPBOX_TOKEN environment variable.");
  }

  try {
    // Apply padding to bbox
    const [minLng, minLat, maxLng, maxLat] = bbox;
    const paddedBbox = [
      minLng - padding,
      minLat - padding,
      maxLng + padding,
      maxLat + padding
    ];

    const encodedQuery = encodeURIComponent(query);
    const bboxParam = paddedBbox.join(',');
    
    // Try multiple search strategies
    const searchUrls = [
      // Strategy 1: Search for addresses and streets within bbox
      `https://api.mapbox.com/search/geocode/v6/forward?` +
        `q=${encodedQuery}&` +
        `access_token=${accessToken}&` +
        `country=AU&` +
        `limit=20&` +
        `types=address,street&` +
        `bbox=${bboxParam}`,
      
      // // Strategy 2: Search for just addresses within bbox (fallback)
      // `https://api.mapbox.com/search/geocode/v6/forward?` +
      //   `q=${encodedQuery}&` +
      //   `access_token=${accessToken}&` +
      //   `country=AU&` +
      //   `limit=20&` +
      //   `types=address&` +
      //   `bbox=${bboxParam}`,
        
      // // Strategy 3: Broader search without strict bbox (if others fail)
      // `https://api.mapbox.com/search/geocode/v6/forward?` +
      //   `q=${encodedQuery}&` +
      //   `access_token=${accessToken}&` +
      //   `country=AU&` +
      //   `limit=10&` +
      //   `types=address`
    ];
    
    let data = null;
    
    // Try each search strategy until we get results
    for (let i = 0; i < searchUrls.length; i++) {
      const url = searchUrls[i];
      console.log(`Street search attempt ${i + 1}:`, url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.warn(`Search attempt ${i + 1} failed:`, response.status, response.statusText);
        continue;
      }
      
      const responseData = await response.json();
      console.log(`Search attempt ${i + 1} response:`, responseData);
      
      if (responseData.features && responseData.features.length > 0) {
        data = responseData;
        console.log(`Found results with strategy ${i + 1}`);
        break;
      }
    }
    
    if (!data || !data.features || data.features.length === 0) {
      console.log('No features returned from street search');
      return [];
    }

    // Extract unique street names from address results
    const streetMap = new Map<string, StreetSearchResult>();
    
    data.features.forEach((feature: MapboxFeature, index: number) => {
      console.log(`Feature ${index}:`, feature);
      const [longitude, latitude] = feature.geometry.coordinates;
      
      // Try multiple ways to extract street name from Mapbox v6 response
      const streetName = feature.properties.address_line1 || 
                        feature.properties.street || 
                        feature.properties.name ||
                        feature.properties.full_address?.split(',')[0]?.replace(/^\d+\s*/, '')?.trim() ||
                        feature.properties.place_name?.split(',')[0]?.replace(/^\d+\s*/, '')?.trim();
      
      console.log(`Extracted street name: "${streetName}" from feature:`, feature.properties);
      
      if (streetName && !streetMap.has(streetName)) {
        streetMap.set(streetName, {
          id: feature.properties.mapbox_id || `${longitude}_${latitude}_${streetName}`,
          name: streetName,
          place_name: feature.properties.full_address || feature.properties.place_name || feature.properties.name || streetName,
          coordinates: [longitude, latitude]
        });
      }
    });

    const results = Array.from(streetMap.values());
    console.log('Final street search results:', results);
    return results;
  } catch (error) {
    console.error('Street search error:', error);
    throw error;
  }
}