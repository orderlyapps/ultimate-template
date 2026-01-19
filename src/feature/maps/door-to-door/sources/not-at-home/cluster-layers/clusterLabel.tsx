import type { LayerProps } from "react-map-gl/mapbox";

export const getClusterLabelLayer = (): LayerProps => {
  return {
    id: "not-at-home-cluster-labels",
    type: "symbol",
    source: "not-at-home",
    filter: [
      "case",
      ["all", ["!", ["has", "point_count"]], ["==", ["get", "write"], false]],
      false,
      true,
    ],
    maxzoom: 14,
    layout: {
      "text-field": [
        "case",
        ["has", "point_count"],
        ["concat", ["get", "return_count"]],
        "1",
      ],
      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-size": 20,
      "text-offset": [0, 0],
      "text-anchor": "center",
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": "#4a6da7",
      "text-halo-width": 5,
    },
  };
};
