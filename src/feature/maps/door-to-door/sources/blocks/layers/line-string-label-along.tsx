import type { LayerProps } from "react-map-gl/mapbox";
import { SOURCE_ID } from "../Blocks";
import { SHARED_CONSTANTS } from "./shared-constants";

export const getLineStringLabelAlongLayer = (): LayerProps => ({
  id: "blocks-linestring-labels-along",
  type: "symbol",
  source: SOURCE_ID,
  filter: ["==", ["get", "type"], "face"],
  minzoom: 14.5,
  layout: {
    "text-field": ["get", "name"],
    "text-size": ["interpolate", ["linear"], ["zoom"], 14, 16, 23, 75],
    "symbol-placement": "line",
    "text-rotation-alignment": "viewport",
    "text-keep-upright": true,
    "text-allow-overlap": false,
  },
  paint: {
    "text-color": SHARED_CONSTANTS.labelColor,
  },
});
