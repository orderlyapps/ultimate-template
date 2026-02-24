import type { LayerProps } from "react-map-gl/mapbox";
import { SOURCE_ID } from "../Blocks";
import { SHARED_CONSTANTS } from "./shared-constants";

export const getLineStringLabelEndpointsLayer = (): LayerProps => ({
  id: "blocks-linestring-labels-endpoints",
  type: "symbol",
  source: SOURCE_ID,
  filter: ["==", ["get", "type"], "face"],
  minzoom: 14,
  layout: {
    "text-field": ["get", "name"],
    "text-size": ["interpolate", ["linear"], ["zoom"], 14, 8, 23, 75],
    "symbol-placement": "point",
    "text-anchor": "center",
    "text-allow-overlap": false,
  },
  paint: {
    "text-color": SHARED_CONSTANTS.labelColor,
  },
});
