import type { LayerProps } from "react-map-gl/mapbox";
import { SOURCE_ID } from "../Blocks";
import { getSharedConstants } from "./shared-constants";

export const getLineStringLabelEndpointsLayer = (isDark: boolean): LayerProps => {
  const constants = getSharedConstants(isDark);
  return {
    id: "blocks-linestring-labels-endpoints",
    type: "symbol",
    source: SOURCE_ID,
    filter: ["==", ["get", "type"], "face"],
    minzoom: 14.5,
    layout: {
      "text-field": ["get", "name"],
      "text-size": ["interpolate", ["linear"], ["zoom"], 14, 16, 23, 75],
      "symbol-placement": "point",
      "text-anchor": "center",
      "text-allow-overlap": false,
    },
    paint: {
      "text-color": constants.labelColor,
    },
  };
};
