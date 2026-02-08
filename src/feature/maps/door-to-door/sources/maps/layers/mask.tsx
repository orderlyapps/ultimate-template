import type { LayerProps } from "react-map-gl/mapbox";

export const getMaskLayer = (): LayerProps => {
  return {
    id: "maps-mask",
    type: "fill",
    source: "maps-mask",
    minzoom: 14,
    paint: {
      "fill-color": "#000",
      "fill-opacity": 0.175,
    },
    beforeId: "road-label",
  };
};
