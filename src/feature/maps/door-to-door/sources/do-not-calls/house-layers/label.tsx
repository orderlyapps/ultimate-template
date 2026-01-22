import type { LayerProps } from "react-map-gl/mapbox";

export const getHouseLabelLayer = (): LayerProps => {
  return {
    id: "do-not-call-house-labels",
    type: "symbol",
    source: "do-not-calls",
    minzoom: 16,
    filter: ["case", ["==", ["get", "unit_count"], 1], true, false],
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
      "text-size": ["interpolate", ["linear"], ["zoom"], 16.5, 6, 18, 30],
      "text-offset": [0, 0],
      "text-anchor": "center",
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": "#000",
      "text-halo-width": 5,
    },
  };
};
