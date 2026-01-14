import type { MapStyle } from "@services/vendor/mapbox/hooks/use-map-style-url/useMapStyleURL";
import { useLocalStorage } from "@util/hooks/useLocalStorage";

export const getMapStyleKey = (id?: string) => `map-style-[${id || "default"}]`;

export const useMapStyle = (id?: string) => {
  return useLocalStorage<MapStyle>(getMapStyleKey(id));
};
