import type { ViewState } from "react-map-gl/mapbox";
import { getMapViewStateKey } from "../use-map-view-state/useMapViewState";

export const getMapViewState = (id?: string): Partial<ViewState> | null => {
  const value = localStorage.getItem(getMapViewStateKey(id));

  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};
