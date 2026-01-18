import type { Map } from "@tanstack-db/map/mapSchema";
import type { LayerProps } from "react-map-gl/mapbox";

export const getLabelLayer = (selectedMap: Map | null): LayerProps => {
  const opacity = selectedMap ? 50 : 75;
  const selectedMapID = selectedMap?.id || "";

  return {
    id: "maps-labels",
    type: "symbol",
    source: "maps",
    minzoom: 14,
    layout: {
      "text-field": ["get", "name"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        14,
        8,
        23,
        [
          "case",
          ["==", ["get", "id"], ["literal", selectedMapID]],
          100,
          opacity,
        ],
      ],

      "text-anchor": "center",
    },
    paint: {
      "text-color": "#F00",
    },
    beforeId: "road-label",
  };
};
