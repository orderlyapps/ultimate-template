import type { Map } from "@tanstack-db/map/mapSchema";
import type { LayerProps } from "react-map-gl/mapbox";

export const getBorderLayer = (
  selectedMap: Map | null,
  borderWidth: number
): LayerProps => {
  const selectedMapId = selectedMap?.id || "";

  return {
    id: "maps-borders",
    type: "line",
    source: "maps",
    minzoom: 11,
    filter: ["==", ["get", "id"], ["literal", selectedMapId]],
    paint: {
      "line-color": "#f00",
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        14,
        2 * borderWidth,
        23,
        12 * borderWidth,
      ],
      "line-opacity": 1,
    },
    beforeId: "road-label",
  };
};
