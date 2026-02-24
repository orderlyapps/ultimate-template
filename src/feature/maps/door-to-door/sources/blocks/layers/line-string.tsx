import type { LayerProps } from "react-map-gl/mapbox";
import { SOURCE_ID } from "../Blocks";
import { SHARED_CONSTANTS } from "./shared-constants";

export const getLineStringLayer = (): LayerProps => ({
  id: "blocks-linestring",
  type: "line",
  source: SOURCE_ID,
  filter: ["==", ["get", "type"], "face"],
  minzoom: 14,
  paint: {
    "line-color": SHARED_CONSTANTS.color,
    "line-width": 2,
    "line-opacity": 0.7,
    "line-dasharray": [2, 4],
  },
  beforeId: "road-label",
});
