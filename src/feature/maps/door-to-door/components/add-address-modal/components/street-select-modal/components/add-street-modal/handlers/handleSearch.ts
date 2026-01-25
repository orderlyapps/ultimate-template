import { searchStreets } from "@services/vendor/mapbox/helper/searchStreets";
import { useAddStreetModalStore } from "../store/useAddStreetModalStore";
import type { Suburb } from "@tanstack-db/suburb/suburbSchema";

export const handleSearch = async (query: string, suburb: Suburb | null) => {
  const { setSearchQuery, setSearchResults, setIsSearching } =
    useAddStreetModalStore.getState();

  setSearchQuery(query);

  if (!query.trim()) {
    setSearchResults([]);
    return;
  }

  if (!suburb?.bbox) {
    setSearchResults([]);
    return;
  }

  setIsSearching(true);
  try {
    const results = await searchStreets(query, suburb.bbox);
    setSearchResults(results);
  } catch (error) {
    console.error("Error searching streets:", error);
    setSearchResults([]);
  } finally {
    setIsSearching(false);
  }
};
