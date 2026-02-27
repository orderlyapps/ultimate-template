import type { LayerProps } from "react-map-gl/mapbox";
import { SOURCE_ID } from "../Blocks";
import { getSharedConstants } from "./shared-constants";

export const getPolygonBorderLayer = (isDark: boolean): LayerProps => {
  const constants = getSharedConstants(isDark);
  return {
    id: "blocks-polygon-borders",
    type: "line",
    source: SOURCE_ID,
    filter: ["==", ["get", "type"], "block"],
    minzoom: 15.5,
    paint: {
      "line-color": constants.color,
      "line-width": 2,
      "line-opacity": 0.4,
      "line-dasharray": [2, 4],
    },
    beforeId: "road-label",
  };
};
