import type { LayerProps } from "react-map-gl/mapbox";

export const getPointLayer = (): LayerProps => {
  return {
    id: "not-at-home-points",
    type: "circle",
    source: "not-at-home",
    minzoom: 14,
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 14, 1, 23, 40],
      "circle-color": "#ff0000",
    },
  };
};
