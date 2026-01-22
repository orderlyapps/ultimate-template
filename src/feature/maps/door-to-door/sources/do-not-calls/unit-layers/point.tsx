import type { LayerProps } from "react-map-gl/mapbox";

export const getUnitPointLayer = (): LayerProps => {
  return {
    id: "do-not-call-unit-points",
    type: "circle",
    source: "do-not-calls",
    minzoom: 14,
    filter: ["case", [">", ["get", "unit_count"], 1], true, false],
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        14,
        4,
        16.5,
        10,
        18,
        55,
      ],
      "circle-color": "#000",
    },
  };
};
