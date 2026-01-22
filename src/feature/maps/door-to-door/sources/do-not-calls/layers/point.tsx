import type { LayerProps } from "react-map-gl/mapbox";

export const getPointLayer = (): LayerProps => {
  return {
    id: "do-not-call-points",
    type: "circle",
    source: "do-not-calls",
    minzoom: 14,
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 14, 3, 16.5, 8, 18, 30],
      "circle-color": "#000",
    },
  };
};
