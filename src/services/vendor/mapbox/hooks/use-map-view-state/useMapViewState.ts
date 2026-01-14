import { useLocalStorage } from "@util/hooks/useLocalStorage";
import type { ViewState } from "react-map-gl/mapbox";

export const getMapViewStateKey = (id?: string) =>
  `map-view-state-[${id || "default"}]`;

export const useMapViewState = (id?: string) => {
  return useLocalStorage<Partial<ViewState>>(getMapViewStateKey(id), {
    longitude: 133.5,
    latitude: -29,
    zoom: 2.8,
  });
};
