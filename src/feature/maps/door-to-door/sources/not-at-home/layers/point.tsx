import type { LayerProps } from "react-map-gl/mapbox";

export const getPointLayer = (): LayerProps => {
  return {
    id: "not-at-home-points",
    type: "circle",
    source: "not-at-home",
    minzoom: 14,
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 14, 3, 16.5, 8, 18, 32],
      "circle-color": ["case", ["==", ["get", "write"], false], "#F00", "#090"],
    },
  };
};
