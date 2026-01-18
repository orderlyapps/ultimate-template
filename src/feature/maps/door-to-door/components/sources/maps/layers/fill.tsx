import type { Map } from "@tanstack-db/map/mapSchema";
import type { LayerProps } from "react-map-gl/mapbox";

export const getFillLayer = (selectedMap: Map | null): LayerProps => {
  const opacity = selectedMap ? 0.05 : 0;
  const selectedMapID = selectedMap?.id || "";

  return {
    id: "maps-fill",
    type: "fill",
    source: "maps",
    minzoom: 14,
    paint: {
      "fill-color": "#f00",
      "fill-opacity": [
        "case",
        ["==", ["get", "id"], ["literal", selectedMapID]],
        0,
        opacity,
      ],
    },
    beforeId: "road-label",
  };
};
