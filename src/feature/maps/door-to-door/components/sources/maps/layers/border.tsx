import type { Map } from "@tanstack-db/map/mapSchema";
import type { LayerProps } from "react-map-gl/mapbox";

export const getBorderLayer = (selectedMap: Map | null): LayerProps => {
  const selectedMapId = selectedMap?.id || "";

  return {
    id: "maps-borders",
    type: "line",
    source: "maps",
    minzoom: 14,
    paint: {
      "line-color": [
        "case",
        ["==", ["get", "id"], ["literal", selectedMapId]],
        "#f00",
        "#f00",
      ],
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        14,
        2,
        23,
        ["case", ["==", ["get", "id"], ["literal", selectedMapId]], 12, 2],
      ],
      "line-opacity": [
        "case",
        ["==", ["get", "id"], ["literal", selectedMapId]],
        1,
        0.3,
      ],
    },
    beforeId: "road-label",
  };
};
