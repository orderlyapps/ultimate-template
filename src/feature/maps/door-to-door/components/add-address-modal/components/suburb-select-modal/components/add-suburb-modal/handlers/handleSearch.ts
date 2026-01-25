import { searchSuburbs } from "@services/vendor/mapbox/helper/searchSuburbs";
import { getBboxFromBoundary } from "@feature/maps/door-to-door/components/add-address-modal/components/suburb-select-modal/components/add-suburb-modal/handlers/getBboxFromBoundary";
import { useAddSuburbModalStore } from "../store/useAddSuburbModalStore";
import type { MapMaster } from "@tanstack-db/map_master/mapMasterSchema";

export const handleSearch = async (
  query: string,
  mapMaster: MapMaster[] | undefined
) => {
  const { setSearchQuery, setSearchResults, setIsSearching } =
    useAddSuburbModalStore.getState();

  setSearchQuery(query);

  if (!query.trim()) {
    setSearchResults([]);
    return;
  }

  setIsSearching(true);
  try {
    const bbox = getBboxFromBoundary(mapMaster?.[0]?.boundary);
    const results = await searchSuburbs(query, bbox);
    setSearchResults(results);
  } catch (error) {
    console.error("Error searching suburbs:", error);
    setSearchResults([]);
  } finally {
    setIsSearching(false);
  }
};
