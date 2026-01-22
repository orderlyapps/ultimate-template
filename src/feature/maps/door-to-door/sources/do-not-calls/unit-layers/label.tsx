import type { LayerProps } from "react-map-gl/mapbox";

export const getUnitLabelLayer = (): LayerProps => {
  return {
    id: "do-not-call-unit-labels",
    type: "symbol",
    source: "do-not-calls",
    minzoom: 16,
    filter: ["case", [">", ["get", "unit_count"], 1], true, false],
    layout: {
      "text-field": [
        "concat",
        ["get", "house_number"],
        "\n",
        ["get", "unit_count"],
        " unit",
        ["case", ["==", ["get", "unit_count"], 1], "", "s"],
      ],
      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-size": ["interpolate", ["linear"], ["zoom"], 16.5, 5, 18, 27],
      "text-offset": [0, -0.25],
      "text-anchor": "center",
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": "#000",
      "text-halo-width": 5,
    },
  };
};
