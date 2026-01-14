import type { MapStyle } from "@services/vendor/mapbox/hooks/use-map-style-url/useMapStyleURL";
import { getMapStyleKey } from "../use-map-style/useMapStyle";

export const getMapStyle = (id?: string): MapStyle | null => {
  const value = localStorage.getItem(getMapStyleKey(id));

  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};
