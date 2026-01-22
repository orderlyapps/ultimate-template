import type { LayerProps } from "react-map-gl/mapbox";

export const getHousePointLayer = (): LayerProps => {
  return {
    id: "do-not-call-house-points",
    type: "circle",
    source: "do-not-calls",
    minzoom: 14,
    filter: ["case", ["==", ["get", "unit_count"], 1], true, false],
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        14,
        3,
        16.5,
        8,
        18,
        32,
      ],
      "circle-color": "#000",
    },
  };
};
