import type { LayerProps } from "react-map-gl/mapbox";

export const getLabelLayer = (): LayerProps => {
  return {
    id: "not-at-home-labels",
    type: "symbol",
    source: "not-at-home",
    minzoom: 16,
    layout: {
      "text-field": [
        "concat",
        [
          "case",
          ["!=", ["get", "unit_number"], ""],
          ["concat", ["get", "unit_number"], "/"],
          "",
        ],
        ["get", "house_number"],
      ],
      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-size": ["interpolate", ["linear"], ["zoom"], 16, 8, 23, 40],
      "text-offset": [0, 0],
      "text-anchor": "center",
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": "#ff0000",
      "text-halo-width": 5,
    },
  };
};
