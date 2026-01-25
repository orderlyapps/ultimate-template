import { searchStreets } from "@services/vendor/mapbox/helper/searchStreets";
import { getBboxFromBoundary } from "@feature/maps/door-to-door/components/add-address-modal/helper/getBboxFromBoundary";
import { useAddStreetModalStore } from "../store/useAddStreetModalStore";
import type { MapMaster } from "@tanstack-db/map_master/mapMasterSchema";
import type { Suburb } from "@tanstack-db/suburb/suburbSchema";

export const handleSearch = async (
  query: string,
  suburb: Suburb | null,
  mapMaster: MapMaster[] | undefined
) => {
  const { setSearchQuery, setSearchResults, setIsSearching } =
    useAddStreetModalStore.getState();

  setSearchQuery(query);

  if (!query.trim()) {
    setSearchResults([]);
    return;
  }

  const bbox =
    (suburb?.bbox as [number, number, number, number] | undefined) ??
    getBboxFromBoundary(mapMaster?.[0]?.boundary);
  if (!bbox) {
    console.error("No bbox available for street search");
    return;
  }

  setIsSearching(true);
  try {
    const results = await searchStreets(query, bbox);
    setSearchResults(results);
  } catch (error) {
    console.error("Error searching streets:", error);
    setSearchResults([]);
  } finally {
    setIsSearching(false);
  }
};
