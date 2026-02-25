import type { LayerProps } from "react-map-gl/mapbox";
import { SOURCE_ID } from "../Blocks";
import { SHARED_CONSTANTS } from "./shared-constants";

export const getPolygonBorderLayer = (): LayerProps => ({
  id: "blocks-polygon-borders",
  type: "line",
  source: SOURCE_ID,
  filter: ["==", ["get", "type"], "block"],
  minzoom: 15.5,
  paint: {
    "line-color": SHARED_CONSTANTS.color,
    "line-width": 2,
    "line-opacity": 0.4,
    "line-dasharray": [2, 4],
  },
  beforeId: "road-label",
});
