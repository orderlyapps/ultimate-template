import type { LayerProps } from "react-map-gl/mapbox";

export const getClusterPointLayer = (): LayerProps => {
  return {
    id: "not-at-home-cluster-points",
    type: "circle",
    source: "not-at-home",
    maxzoom: 14,
    filter: [
      "case",
      ["all", ["!", ["has", "point_count"]], ["==", ["get", "write"], false]],
      false,
      true,
    ],
    paint: {
      "circle-radius": 30,
      "circle-color": "#4a6da7",
    },
  };
};
